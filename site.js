const menuToggle = document.querySelector(".menu-toggle");
const categoryMenu = document.querySelector(".category-menu");
const siteHeader = document.querySelector(".site-header");
const brand = document.querySelector(".brand");
const copyright = document.querySelector(".copyright");
const rednoteUrl = "https://www.xiaohongshu.com/user/profile/5e60c8e4000000000100996f?xsec_token=ABFmjJDmlzI2DsjgjsGNkRJeM9xA3ten7ICnHcAi65wvQ=&xsec_source=pc_search";

const getLanguage = () =>
  typeof getCurrentLanguage === "function" ? getCurrentLanguage() : "en";

const setLanguage = (language) =>
  typeof setCurrentLanguage === "function" ? setCurrentLanguage(language) : language;

const getAllCopy = () => (typeof siteCopy === "object" ? siteCopy : {});

const getCopy = () => {
  const copy = getAllCopy();
  return copy[getLanguage()] || copy.en || {};
};

const getUiCopy = (key) => {
  const copy = getAllCopy();
  return getCopy().ui?.[key] || copy.en?.ui?.[key] || key;
};

const renderParagraphs = (paragraphs) =>
  paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");

if (categoryMenu) {
  const requiredLinks = [
    ["category-art-books.html", "Artist Books"],
    ["category-paintings.html", "Paintings"],
    ["category-graphic-works.html", "Graphic Works"],
    ["category-sculpture.html", "Sculptural Works"],
    ["about.html", "About"],
    ["contact.html", "Contact"]
  ];

  requiredLinks.forEach(([href, label]) => {
    const existingLink = Array.from(categoryMenu.querySelectorAll("a")).find((link) =>
      link.getAttribute("href") === href
    );

    if (!existingLink) {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      categoryMenu.appendChild(link);
    }
  });
}

const languageToggle = document.createElement("button");
languageToggle.className = "language-toggle";
languageToggle.type = "button";
languageToggle.setAttribute("aria-label", "Switch language");

if (siteHeader) {
  siteHeader.appendChild(languageToggle);
}

const renderLanguageToggle = () => {
  const language = getLanguage();
  languageToggle.innerHTML = `
    <span class="language-option ${language === "en" ? "is-active" : ""}" data-language="en">EN</span>
    <span class="language-separator" aria-hidden="true">/</span>
    <span class="language-option ${language === "zh" ? "is-active" : ""}" data-language="zh">中文</span>
  `;
  languageToggle.setAttribute(
    "aria-label",
    language === "en" ? "Current language: English. Switch language." : "当前语言：中文。切换语言。"
  );
};

const applyStaticPageCopy = () => {
  const language = getLanguage();
  const copy = getCopy();
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  if (brand) {
    brand.textContent = copy.brand || "Shawn Qi";
    brand.lang = language === "zh" ? "zh-CN" : "en";
  }

  if (copyright) {
    copyright.textContent = copy.copyright || getAllCopy().en?.copyright || "";
  }

  if (categoryMenu && copy.nav) {
    categoryMenu.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href");
      if (copy.nav[href]) {
        link.textContent = copy.nav[href];
      }
    });
  }

  if (menuToggle) {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", isOpen ? getUiCopy("closeMenu") : getUiCopy("openMenu"));
  }

  renderLanguageToggle();

  const aboutPage = document.querySelector(".about-page");
  if (aboutPage && copy.about) {
    const title = aboutPage.querySelector(".text-page-header h1");
    const body = aboutPage.querySelector(".text-page-body");
    if (title) title.textContent = copy.about.title;
    if (body) body.innerHTML = renderParagraphs(copy.about.paragraphs);
    document.title = `${copy.about.title} | Shawn Qi`;
  }

  const contactPage = document.querySelector(".contact-page");
  if (contactPage && copy.contact) {
    const title = contactPage.querySelector(".text-page-header h1");
    const list = contactPage.querySelector(".contact-list");
    if (title) title.textContent = copy.contact.title;
    if (list) {
      list.innerHTML = `
        <p><span>${copy.contact.email}</span> <a href="mailto:qixiangyu777@gmail.com">qixiangyu777@gmail.com</a></p>
        <p><span>${copy.contact.instagram}</span> <a href="https://www.instagram.com/freakos.world" target="_blank" rel="noreferrer">@freakos.world</a></p>
        <p><span>${copy.contact.rednote}</span> <a href="${rednoteUrl}" target="_blank" rel="noreferrer">小红书 @怪胎Freakos</a></p>
      `;
    }
    document.title = `${copy.contact.title} | Shawn Qi`;
  }
};

applyStaticPageCopy();

languageToggle.addEventListener("click", (event) => {
  const clickedOption = event.target.closest("[data-language]");
  const requestedLanguage = clickedOption?.dataset.language;
  if (requestedLanguage === getLanguage()) return;

  const nextLanguage = requestedLanguage || (getLanguage() === "en" ? "zh" : "en");
  setLanguage(nextLanguage);
  applyStaticPageCopy();
  window.dispatchEvent(new CustomEvent("portfolioLanguageChange", {
    detail: { language: nextLanguage }
  }));
});

if (menuToggle && categoryMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", !isOpen ? getUiCopy("closeMenu") : getUiCopy("openMenu"));
    categoryMenu.classList.toggle("is-open", !isOpen);
  });

  document.addEventListener("click", (event) => {
    const clickedInside = event.target.closest(".menu-shell");
    const clickedLanguageToggle = event.target.closest(".language-toggle");
    if (!clickedInside && !clickedLanguageToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", getUiCopy("openMenu"));
      categoryMenu.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", getUiCopy("openMenu"));
      categoryMenu.classList.remove("is-open");
    }
  });
}

window.getUiCopy = getUiCopy;
window.applyStaticPageCopy = applyStaticPageCopy;
