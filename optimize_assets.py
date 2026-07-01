#!/usr/bin/env python3
"""
Resize and recompress images in ./assets in place.

It uses macOS's built-in `sips`, so no third-party Python packages are needed.

Preview:
    python3 optimize_assets.py --dry-run

Run:
    python3 optimize_assets.py
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


SUPPORTED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".tif",
    ".tiff",
    ".bmp",
    ".heic",
    ".heif",
    ".avif",
    ".jp2",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Resize and recompress images in the assets folder."
    )
    parser.add_argument("--assets", type=Path, default=Path("assets"))
    parser.add_argument("--max-edge", type=int, default=2000)
    parser.add_argument("--quality", type=int, default=80)
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def image_files(root: Path) -> list[Path]:
    return sorted(
        path
        for path in root.rglob("*")
        if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
    )


def sips_property(path: Path, key: str) -> str | None:
    result = subprocess.run(
        ["sips", "-g", key, str(path)],
        check=False,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        return None

    marker = f"{key}:"
    for line in result.stdout.splitlines():
        line = line.strip()
        if line.startswith(marker):
            return line.split(":", 1)[1].strip()
    return None


def image_size(path: Path) -> tuple[int, int] | None:
    width = sips_property(path, "pixelWidth")
    height = sips_property(path, "pixelHeight")
    if not width or not height:
        return None
    return int(width), int(height)


def optimize_image(path: Path, max_edge: int, quality: int, dry_run: bool) -> tuple[bool, str]:
    before_size = path.stat().st_size
    before_dimensions = image_size(path)

    if before_dimensions is None:
        return False, f"SKIP  {path} (cannot read dimensions)"

    width, height = before_dimensions
    needs_resize = max(width, height) > max_edge

    if dry_run:
        action = "resize + compress" if needs_resize else "compress if smaller"
        return True, f"DRY   {path} ({width}x{height}, {before_size / 1024 / 1024:.2f} MB) -> {action}"

    temp_path = path.with_name(f".{path.stem}.optimized{path.suffix}")
    if temp_path.exists():
        temp_path.unlink()

    command = ["sips"]
    if needs_resize:
        command.extend(["-Z", str(max_edge)])
    command.extend(
        [
            "-s",
            "formatOptions",
            str(quality),
            str(path),
            "--out",
            str(temp_path),
        ]
    )

    result = subprocess.run(command, check=False, capture_output=True, text=True)
    if result.returncode != 0:
        error = (result.stderr or result.stdout).strip()
        return False, f"SKIP  {path} ({error})"

    temp_size = temp_path.stat().st_size
    if not needs_resize and temp_size >= before_size:
        temp_path.unlink()
        return True, (
            f"KEEP  {path} "
            f"{width}x{height}, {before_size / 1024 / 1024:.2f} MB "
            f"(compressed copy was not smaller)"
        )

    temp_dimensions = image_size(temp_path) or before_dimensions
    temp_path.replace(path)

    after_size = path.stat().st_size
    after_dimensions = temp_dimensions
    saved = before_size - after_size
    saved_percent = (saved / before_size * 100) if before_size else 0

    return True, (
        f"OK    {path} "
        f"{width}x{height} -> {after_dimensions[0]}x{after_dimensions[1]}, "
        f"{before_size / 1024 / 1024:.2f} MB -> {after_size / 1024 / 1024:.2f} MB "
        f"({saved_percent:.1f}% saved)"
    )


def main() -> int:
    args = parse_args()

    if shutil.which("sips") is None:
        print("This script needs macOS `sips`, but it was not found.", file=sys.stderr)
        return 1

    if not args.assets.exists():
        print(f"Assets folder not found: {args.assets}", file=sys.stderr)
        return 1

    files = image_files(args.assets)
    if not files:
        print(f"No supported image files found in {args.assets}")
        return 0

    ok_count = 0
    skip_count = 0

    for path in files:
        ok, message = optimize_image(path, args.max_edge, args.quality, args.dry_run)
        print(message)
        if ok:
            ok_count += 1
        else:
            skip_count += 1

    verb = "Would process" if args.dry_run else "Processed"
    print(f"\n{verb} {ok_count} image(s). Skipped {skip_count}.")
    return 0 if skip_count == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
