const gallery = document.querySelector("#category-gallery");
const category = document.body.dataset.category;
const pageHeadingTitle = document.querySelector(".page-heading h1");

const isVideoMedia = (source) => /\.(mp4|m4v|mov|webm)$/i.test(source);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const getCategoryWorks = () => {
  const localizedWorks = typeof getLocalizedWorks === "function"
    ? getLocalizedWorks()
    : works;

  return Array.isArray(localizedWorks)
    ? localizedWorks.filter((work) => work.category === category)
    : [];
};

const getCategoryTitle = () => {
  const categoryDefinition = Array.isArray(categoryDefinitions)
    ? categoryDefinitions.find((item) => item.key === category)
    : null;

  if (!categoryDefinition) {
    return document.body.dataset.categoryTitle || "";
  }

  return typeof localizeCategory === "function"
    ? localizeCategory(categoryDefinition).pageTitle
    : categoryDefinition.pageTitle;
};

const renderCoverMedia = (source, label) => {
  if (isVideoMedia(source)) {
    return `<video class="book-cover-image" src="${source}" muted autoplay loop playsinline preload="metadata" aria-label="${escapeHtml(label)}"></video>`;
  }

  return `<img class="book-cover-image" src="${source}" alt="${escapeHtml(label)}" />`;
};

const renderPreviewMedia = (source, label) => {
  if (isVideoMedia(source)) {
    return `
      <img src="" alt="" hidden />
      <video controls playsinline src="${source}" aria-label="${escapeHtml(label)}"></video>
    `;
  }

  return `
    <img src="${source}" alt="${escapeHtml(label)}" />
    <video controls playsinline hidden></video>
  `;
};

const makeSingleWorkPreview = (singleImageWorks) => {
  const existingPreview = document.querySelector("#category-image-preview");
  if (existingPreview) {
    existingPreview.remove();
  }

  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="image-preview category-image-preview" id="category-image-preview" aria-hidden="true">
        <button class="image-preview-backdrop" type="button" aria-label="${escapeHtml(getUiCopy("closeImagePreview"))}"></button>
        <div class="image-preview-panel" role="dialog" aria-modal="true" aria-label="${escapeHtml(getUiCopy("closeImagePreview"))}">
          <button class="image-preview-close" type="button" aria-label="${escapeHtml(getUiCopy("closeImagePreview"))}">×</button>
          <div class="image-preview-figure single-image-preview-figure"></div>
          <p class="image-preview-caption"></p>
        </div>
      </div>
    `
  );

  const preview = document.querySelector("#category-image-preview");
  const previewFigure = preview.querySelector(".image-preview-figure");
  const previewCaption = preview.querySelector(".image-preview-caption");
  const previewClose = preview.querySelector(".image-preview-close");
  const previewBackdrop = preview.querySelector(".image-preview-backdrop");

  const openPreview = (work) => {
    const image = work.images[0];
    previewFigure.innerHTML = renderPreviewMedia(image, work.title);
    previewCaption.textContent = `${work.title} / ${work.medium} / ${work.year}`;
    preview.classList.add("is-open");
    preview.setAttribute("aria-hidden", "false");
    previewClose.focus();
  };

  const closePreview = () => {
    preview.classList.remove("is-open");
    preview.setAttribute("aria-hidden", "true");
    previewFigure.innerHTML = "";
    previewCaption.textContent = "";
  };

  document.querySelectorAll(".single-work-preview-trigger").forEach((button) => {
    button.addEventListener("click", () => {
      const work = singleImageWorks.find((item) => item.id === button.dataset.workId);
      if (work) openPreview(work);
    });
  });

  previewClose.addEventListener("click", closePreview);
  previewBackdrop.addEventListener("click", closePreview);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && preview.classList.contains("is-open")) {
      closePreview();
    }
  });
};

const renderCategoryWork = (work) => {
  const isSingleImageWork = work.images.length === 1;
  const tagName = isSingleImageWork ? "button" : "a";
  const actionAttributes = isSingleImageWork
    ? `type="button" data-work-id="${work.id}"`
    : `href="work.html?id=${work.id}"`;
  const actionClass = isSingleImageWork
    ? "category-work-link category-work-button matrix-card book-cover-card single-work-preview-trigger"
    : "category-work-link matrix-card book-cover-card";

  return `
    <article class="category-work-row category-book-row">
      <${tagName} class="${actionClass}" ${actionAttributes}>
        <span class="book-cover-frame">
          ${renderCoverMedia(work.cover, work.title)}
        </span>
        <span class="work-caption">
          <span>${escapeHtml(work.title)}</span>
          <span>${escapeHtml(work.medium)}</span>
          <span>${escapeHtml(work.year)}</span>
        </span>
      </${tagName}>
    </article>
  `;
};

const renderCategory = () => {
  if (!gallery) return;
  const categoryWorks = getCategoryWorks();
  if (pageHeadingTitle) {
    pageHeadingTitle.textContent = getCategoryTitle();
  }
  document.title = `${getCategoryTitle()} | Shawn Qi`;

  const singleImageWorks = categoryWorks.filter((work) => work.images.length === 1);
  const gridClass = categoryWorks.length <= 3
    ? "category-book-grid category-book-grid-compact"
    : "category-book-grid";

  gallery.className = gridClass;
  gallery.innerHTML = categoryWorks.map((work) => renderCategoryWork(work)).join("");

  if (singleImageWorks.length) {
    makeSingleWorkPreview(singleImageWorks);
  }
};

if (gallery) {
  renderCategory();
  window.addEventListener("portfolioLanguageChange", renderCategory);
}
