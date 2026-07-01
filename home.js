const homeScatter = document.querySelector("#home-scatter");
const preferredHomeItems = [
  {
    workId: "paintings-2017-05",
    source: "assets/绘画/2017/《天亮之前》彩色练习1.jpg"
  },
  {
    workId: "art-books-2019-04",
    source: "assets/艺术书籍/2019/弥合/8.jpeg"
  },
  {
    workId: "art-books-2020-03",
    source: "assets/艺术书籍/2020/影/5.jpg"
  },
  {
    workId: "art-books-2022-02",
    source: "assets/艺术书籍/2022/我听见/我听见13.jpg"
  },
  {
    workId: "art-books-2024-01",
    source: "assets/艺术书籍/2024/龟兔赛跑/龟兔赛跑7.jpg"
  },
  {
    workId: "sculpture-2024-01",
    source: "assets/立体作品/2024/纸雕塑-同心结/2.jpg"
  },
  {
    workId: "paintings-2025-02",
    source: "assets/绘画/2025/腿怪1.jpg"
  },
  {
    workId: "paintings-2022-03",
    source: "assets/绘画/2022/点线面的练习4.jpg"
  }
];

const isVideoMedia = (source) => /\.(mp4|m4v|mov|webm)$/i.test(source);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const getLocalizedHomeWorks = () => {
  const localizedWorks = typeof getLocalizedWorks === "function"
    ? getLocalizedWorks()
    : works;

  return preferredHomeItems
    .map(({ workId, source }) => {
      const work = localizedWorks.find((item) => item.id === workId);
      return work ? { ...work, homeSource: source } : null;
    })
    .filter(Boolean);
};

const renderHomeMedia = (source, label) => {
  if (isVideoMedia(source)) {
    return `<video src="${source}" muted autoplay loop playsinline preload="metadata" aria-label="${escapeHtml(label)}"></video>`;
  }

  return `<img src="${source}" alt="${escapeHtml(label)}" />`;
};

if (homeScatter && Array.isArray(works)) {
  let homeWorks = getLocalizedHomeWorks();

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="image-preview home-image-preview" id="home-image-preview" aria-hidden="true">
        <button class="image-preview-backdrop" type="button" aria-label="Close work preview"></button>
        <div class="image-preview-panel" role="dialog" aria-modal="true" aria-label="Work preview">
          <div class="home-preview-stack">
            <div class="home-preview-header">
              <div class="image-preview-heading">
                <h2></h2>
                <p class="image-preview-meta"></p>
              </div>
              <button class="image-preview-close" type="button" aria-label="Close work preview">×</button>
            </div>
            <div class="home-preview-media">
              <img src="" alt="" />
              <video controls playsinline hidden></video>
            </div>
            <a class="image-preview-detail" href=""></a>
          </div>
        </div>
      </div>
    `
  );

  const preview = document.querySelector("#home-image-preview");
  const previewPanel = preview.querySelector(".image-preview-panel");
  const previewImage = preview.querySelector("img");
  const previewVideo = preview.querySelector("video");
  const previewTitle = preview.querySelector("h2");
  const previewMeta = preview.querySelector(".image-preview-meta");
  const previewDetail = preview.querySelector(".image-preview-detail");
  const previewClose = preview.querySelector(".image-preview-close");
  const previewBackdrop = preview.querySelector(".image-preview-backdrop");

  const activePreviewMedia = () => (previewVideo.hidden ? previewImage : previewVideo);

  const getUi = (key) =>
    typeof getUiCopy === "function" ? getUiCopy(key) : key;

  const renderHome = () => {
    homeWorks = getLocalizedHomeWorks();
    homeScatter.setAttribute("aria-label", getUi("selectedWorks"));
    homeScatter.innerHTML = homeWorks
      .map((work, index) => {
        return `
          <button class="scatter-work work-${String.fromCharCode(97 + index)}" type="button" data-home-index="${index}" aria-label="${escapeHtml(work.title)}">
            ${renderHomeMedia(work.homeSource, work.title)}
          </button>
        `;
      })
      .join("");

    previewDetail.textContent = getUi("viewDetails");
    previewClose.setAttribute("aria-label", getUi("closePreview"));
    previewBackdrop.setAttribute("aria-label", getUi("closePreview"));
    document.querySelectorAll(".scatter-work").forEach((button) => {
      button.addEventListener("click", () => {
        const work = homeWorks[Number(button.dataset.homeIndex)];
        openPreview(work);
      });
    });
  };

  const syncPreviewWidth = () => {
    if (!preview.classList.contains("is-open")) {
      return;
    }

    const media = activePreviewMedia();
    const width = media.getBoundingClientRect().width;
    if (width > 0) {
      previewPanel.style.setProperty("--home-preview-media-width", `${Math.ceil(width)}px`);
    }
  };

  const queuePreviewWidthSync = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(syncPreviewWidth);
    });
  };

  const openPreview = (work) => {
    previewPanel.style.removeProperty("--home-preview-media-width");
    if (isVideoMedia(work.homeSource)) {
      previewImage.hidden = true;
      previewImage.removeAttribute("src");
      previewImage.setAttribute("alt", "");
      previewVideo.hidden = false;
      previewVideo.src = work.homeSource;
      previewVideo.setAttribute("aria-label", work.title);
      previewVideo.load();
    } else {
      previewVideo.hidden = true;
      previewVideo.pause();
      previewVideo.removeAttribute("src");
      previewVideo.removeAttribute("aria-label");
      previewImage.hidden = false;
      previewImage.src = work.homeSource;
      previewImage.alt = work.title;
    }
    previewTitle.textContent = work.title;
    previewMeta.textContent = `${work.categoryLabel} / ${work.year}`;
    previewDetail.href = `work.html?id=${work.id}`;
    previewDetail.textContent = getUi("viewDetails");
    preview.classList.add("is-open");
    preview.setAttribute("aria-hidden", "false");
    queuePreviewWidthSync();
    previewClose.focus();
  };

  const closePreview = () => {
    preview.classList.remove("is-open");
    preview.setAttribute("aria-hidden", "true");
    previewPanel.style.removeProperty("--home-preview-media-width");
    previewImage.removeAttribute("src");
    previewImage.setAttribute("alt", "");
    previewImage.hidden = false;
    previewVideo.pause();
    previewVideo.removeAttribute("src");
    previewVideo.removeAttribute("aria-label");
    previewVideo.hidden = true;
  };

  renderHome();

  previewImage.addEventListener("load", queuePreviewWidthSync);
  previewVideo.addEventListener("loadedmetadata", queuePreviewWidthSync);
  window.addEventListener("resize", queuePreviewWidthSync);

  previewClose.addEventListener("click", closePreview);
  previewBackdrop.addEventListener("click", closePreview);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && preview.classList.contains("is-open")) {
      closePreview();
    }
  });

  window.addEventListener("portfolioLanguageChange", () => {
    closePreview();
    renderHome();
  });
}
