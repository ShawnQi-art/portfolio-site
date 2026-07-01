const params = new URLSearchParams(window.location.search);
const workId = params.get("id");
const root = document.querySelector("#work-root");

const isVideoMedia = (source) => /\.(mp4|m4v|mov|webm)$/i.test(source);

const renderMedia = (source, label) => {
  if (isVideoMedia(source)) {
    return `<video src="${source}" muted autoplay loop playsinline preload="metadata" aria-label="${escapeHtml(label)}"></video>`;
  }

  return `<img src="${source}" alt="${escapeHtml(label)}" />`;
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const getWork = () => {
  const sourceWork = Array.isArray(works) ? works.find((item) => item.id === workId) : null;
  return sourceWork && typeof localizeWork === "function" ? localizeWork(sourceWork) : sourceWork;
};

const renderDescription = (description) => {
  const paragraphs = String(description)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs
    .map((paragraph, index) => {
      const className = paragraphs.length > 1 && index === 0 ? ` class="work-description-lead"` : "";
      return `<p${className}>${escapeHtml(paragraph)}</p>`;
    })
    .join("");
};

const buildPreviewCaption = (work, index) =>
  [String(index + 1).padStart(3, "0"), work.title, work.medium, work.year]
    .filter(Boolean)
    .join(" / ");

const renderWork = () => {
  const work = getWork();

  if (!work && root) {
    root.innerHTML = `
      <section class="missing-work">
        <h1>${escapeHtml(getUiCopy("missingWorkTitle"))}</h1>
        <a href="index.html">${escapeHtml(getUiCopy("backHome"))}</a>
      </section>
    `;
    return;
  }

  if (!work || !root) {
    return;
  }

  document.title = `${work.title} | Shawn Qi`;
  root.innerHTML = `
    <section class="work-detail work-detail-${work.id}" aria-labelledby="work-title">
      <div class="work-detail-info">
        <div>
          <h1 id="work-title">${escapeHtml(work.title)}</h1>
          <p class="work-meta">${escapeHtml(work.categoryLabel)} / ${escapeHtml(work.year)}</p>
        </div>
      </div>
      <div class="work-image-grid">
        ${work.images
          .map(
            (image, index) => {
              const label = `${work.title} image ${index + 1}`;
              return `
              <figure class="work-image-item work-image-item-${(index % 12) + 1}">
                <button class="work-image-button" type="button" data-image="${escapeHtml(image)}" data-alt="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">
                  ${renderMedia(image, label)}
                </button>
              </figure>
            `;
            }
          )
          .join("")}
      </div>
      <section class="work-description" aria-label="Work description">
        ${renderDescription(work.description)}
      </section>
      <div class="image-preview" id="image-preview" aria-hidden="true">
        <button class="image-preview-backdrop" type="button" aria-label="${escapeHtml(getUiCopy("closeImagePreview"))}"></button>
        <div class="image-preview-panel" role="dialog" aria-modal="true" aria-label="${escapeHtml(getUiCopy("closeImagePreview"))}">
          <div class="image-preview-figure">
            <button class="image-preview-nav image-preview-prev" type="button" aria-label="${escapeHtml(getUiCopy("previousImage"))}">←</button>
            <div class="image-preview-media-stack">
              <button class="image-preview-close" type="button" aria-label="${escapeHtml(getUiCopy("closeImagePreview"))}">×</button>
              <img src="" alt="" />
              <video controls playsinline hidden></video>
              <p class="image-preview-caption"></p>
            </div>
            <button class="image-preview-nav image-preview-next" type="button" aria-label="${escapeHtml(getUiCopy("nextImage"))}">→</button>
          </div>
        </div>
      </div>
    </section>
  `;

  const preview = document.querySelector("#image-preview");
  const previewImage = preview.querySelector("img");
  const previewVideo = preview.querySelector("video");
  const previewCaption = preview.querySelector(".image-preview-caption");
  const previewClose = preview.querySelector(".image-preview-close");
  const previewBackdrop = preview.querySelector(".image-preview-backdrop");
  const previewPrevious = preview.querySelector(".image-preview-prev");
  const previewNext = preview.querySelector(".image-preview-next");
  const imageButtons = document.querySelectorAll(".work-image-button");
  let currentImageIndex = 0;

  const setPreviewImage = (index) => {
    currentImageIndex = (index + work.images.length) % work.images.length;
    const image = work.images[currentImageIndex];
    const label = `${work.title} image ${currentImageIndex + 1}`;

    if (isVideoMedia(image)) {
      previewImage.hidden = true;
      previewImage.removeAttribute("src");
      previewImage.setAttribute("alt", "");
      previewVideo.hidden = false;
      previewVideo.src = image;
      previewVideo.setAttribute("aria-label", label);
      previewVideo.load();
    } else {
      previewVideo.hidden = true;
      previewVideo.pause();
      previewVideo.removeAttribute("src");
      previewVideo.removeAttribute("aria-label");
      previewImage.hidden = false;
      previewImage.src = image;
      previewImage.alt = label;
    }

    previewCaption.textContent = buildPreviewCaption(work, currentImageIndex);
  };

  const closePreview = () => {
    preview.classList.remove("is-open");
    preview.setAttribute("aria-hidden", "true");
    previewImage.removeAttribute("src");
    previewImage.setAttribute("alt", "");
    previewImage.hidden = false;
    previewVideo.pause();
    previewVideo.removeAttribute("src");
    previewVideo.removeAttribute("aria-label");
    previewVideo.hidden = true;
    previewCaption.textContent = "";
  };

  imageButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      setPreviewImage(index);
      preview.classList.add("is-open");
      preview.setAttribute("aria-hidden", "false");
      previewClose.focus();
    });
  });

  previewPrevious.addEventListener("click", () => setPreviewImage(currentImageIndex - 1));
  previewNext.addEventListener("click", () => setPreviewImage(currentImageIndex + 1));
  previewClose.addEventListener("click", closePreview);
  previewBackdrop.addEventListener("click", closePreview);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && preview.classList.contains("is-open")) {
      closePreview();
    }
    if (event.key === "ArrowLeft" && preview.classList.contains("is-open")) {
      setPreviewImage(currentImageIndex - 1);
    }
    if (event.key === "ArrowRight" && preview.classList.contains("is-open")) {
      setPreviewImage(currentImageIndex + 1);
    }
  });
};

renderWork();
window.addEventListener("portfolioLanguageChange", renderWork);
