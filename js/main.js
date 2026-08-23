(function () {
  const state = {
    lang: localStorage.getItem("orientWeltLang") || "en",
    slide: 0,
    slideTimer: null,
    homeProductCategory: null,
    navPill: null,
    globeFrame: null,
    globeResumeTimer: null,
    rotatingTimer: null,
    lastFocus: null,
    productsStageSwiper: null
  };

  function t(key) {
    return window.translations?.[state.lang]?.[key] || window.translations?.en?.[key] || key;
  }

  function applyTranslations() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      if (node.classList.contains("word")) {
        node.removeAttribute("data-word-text");
      }
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === state.lang);
    });
    renderHomeProductTabs();
    renderProducts();
    refreshProductsStageCarousel();
    initRotatingText();
    requestAnimationFrame(() => updateNavPill(undefined, false));
  }

  function setupNavigation() {
    const current = location.pathname.split("/").pop() || "index.html";
    const nav = document.querySelector(".primary-nav");
    const links = [...document.querySelectorAll(".primary-nav a")];
    if (nav && !nav.querySelector(".nav-active-pill")) {
      state.navPill = document.createElement("span");
      state.navPill.className = "nav-active-pill";
      state.navPill.setAttribute("aria-hidden", "true");
      nav.prepend(state.navPill);
    } else {
      state.navPill = nav?.querySelector(".nav-active-pill") || null;
    }

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === current;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
      link.addEventListener("click", () => {
        links.forEach((item) => item.classList.remove("active"));
        link.classList.add("active", "is-pressing");
        updateNavPill(link, true);
        window.setTimeout(() => link.classList.remove("is-pressing"), 160);
      });
    });
    const toggle = document.querySelector(".menu-toggle");
    const header = document.querySelector(".site-header");
    const footer = document.querySelector(".site-footer");
    toggle?.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        state.lang = button.dataset.lang;
        localStorage.setItem("orientWeltLang", state.lang);
        applyTranslations();
      });
    });
    window.addEventListener("resize", () => {
      window.requestAnimationFrame(() => updateNavPill(undefined, false));
    });
    header?.addEventListener("mousemove", (event) => {
      const rect = header.getBoundingClientRect();
      header.style.setProperty("--glare-x", `${event.clientX - rect.left}px`);
      header.style.setProperty("--glare-y", `${event.clientY - rect.top}px`);
      header.classList.add("is-glowing");
    });
    header?.addEventListener("mouseleave", () => {
      header.classList.remove("is-glowing");
    });
    setupScrollChromeEffect(header, footer, nav);
    requestAnimationFrame(() => updateNavPill(undefined, false));
  }

  function setupScrollChromeEffect(header, footer, nav) {
    let ticking = false;
    let previousY = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);
    let coverflowInView = false;
    let scrollActive = false;
    let scrollResumeTimer = null;

    function setCoverflowHeaderState(forceVisible = false) {
      if (!header) return;
      const menuOpen = nav?.classList.contains("open");
      header.classList.toggle("is-coverflow-hidden", coverflowInView && !forceVisible && !menuOpen);
    }

    function setupCoverflowHeaderObserver() {
      const coverflowStage = document.querySelector(".products-stage-section");
      if (document.body.dataset.page !== "products" || !coverflowStage || !header || !("IntersectionObserver" in window)) return;

      const observer = new IntersectionObserver(([entry]) => {
        coverflowInView = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.55);
        setCoverflowHeaderState(scrollActive);
      }, { threshold: [0, 0.55, 0.8] });

      observer.observe(coverflowStage);
    }

    function update() {
      const scroller = document.scrollingElement || document.documentElement;
      const currentY = Math.max(0, window.scrollY || scroller.scrollTop || 0);
      const footerHeight = footer?.offsetHeight || 0;
      const maxScroll = Math.max(0, scroller.scrollHeight - window.innerHeight);
      const revealPoint = Math.max(0, maxScroll - footerHeight);
      const menuOpen = nav?.classList.contains("open");

      if (footer) {
        document.documentElement.style.setProperty("--footer-reveal-space", `${Math.ceil(footerHeight)}px`);
        footer.classList.toggle("topper", currentY >= revealPoint);
      }

      if (header) {
        if (!header.classList.contains("is-glowing")) {
          header.style.setProperty("--glare-x", "50%");
          header.style.setProperty("--glare-y", "50%");
        }
        scrollActive = true;
        setCoverflowHeaderState(true);
        window.clearTimeout(scrollResumeTimer);
        scrollResumeTimer = window.setTimeout(() => {
          scrollActive = false;
          setCoverflowHeaderState();
        }, 220);
      }
      previousY = currentY;
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    setupCoverflowHeaderObserver();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
  }

  function updateNavPill(target = document.querySelector(".primary-nav a.active"), animate = true) {
    const nav = document.querySelector(".primary-nav");
    const pill = state.navPill || nav?.querySelector(".nav-active-pill");
    if (!nav || !pill || !target) return;
    pill.classList.toggle("is-snapping", !animate);
    pill.style.width = `${target.offsetWidth}px`;
    pill.style.height = `${target.offsetHeight}px`;
    pill.style.transform = `translate(${target.offsetLeft}px, ${target.offsetTop}px)`;
    if (!animate) {
      requestAnimationFrame(() => pill.classList.remove("is-snapping"));
    }
  }

  function setupCarousel() {
    const radios = [...document.querySelectorAll(".hero-radio")];
    const controls = [...document.querySelectorAll(".hero-controls label")];
    if (!radios.length) return;

    function showSlide(index) {
      state.slide = (index + radios.length) % radios.length;
      radios[state.slide].checked = true;
      clearInterval(state.slideTimer);
      state.slideTimer = setInterval(() => showSlide(state.slide + 1), 5000);
    }

    radios.forEach((radio, index) => {
      radio.addEventListener("change", () => {
        if (radio.checked) showSlide(index);
      });
    });
    controls.forEach((control, index) => {
      control.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          radios[index].checked = true;
          showSlide(index);
        }
      });
      control.addEventListener("click", () => showSlide(index));
    });
    showSlide(0);
  }

  function setupProductsStageCarousel() {
    const carousel = document.querySelector(".products-coverflow");
    const modal = document.getElementById("product-stage-modal");
    if (!carousel || !window.Swiper) return;

    renderProductsStageSlides();
    state.productsStageSwiper = createProductsStageSwiper(carousel);
    setupProductsStageAutoplayHover(carousel, state.productsStageSwiper);

    function closeStageModal() {
      if (!modal) return;
      modal.hidden = true;
      document.body.classList.remove("modal-open");
    }

    function openStageModal(product) {
      if (!modal || !product) return;
      const title = product.name?.en || "";
      const description = product.description?.en || product.short?.en || "";
      const packaging = product.packaging?.en || product.spec?.en || "-";
      const storage = product.storage?.en || "-";
      const origin = product.origin?.en || "-";

      document.getElementById("stage-modal-image").src = product.image;
      document.getElementById("stage-modal-image").alt = product.alt?.en || title;
      document.getElementById("stage-modal-title").textContent = title;
      document.getElementById("stage-modal-description").textContent = description;
      document.getElementById("stage-modal-carton").textContent = packaging;
      document.getElementById("stage-modal-pallet").textContent = origin;
      document.getElementById("stage-modal-storage").textContent = storage;
      document.getElementById("stage-modal-ean").textContent = product.ean || "-";
      document.getElementById("stage-modal-weight").textContent = product.weight || extractWeight(product.spec?.en || packaging);
      modal.hidden = false;
      document.body.classList.add("modal-open");
    }

    carousel.addEventListener("click", (event) => {
      const slide = event.target.closest(".product-stage-card");
      if (!slide || !slide.classList.contains("swiper-slide-active")) return;
      const product = window.products?.find((item) => item.id === slide.dataset.productId);
      openStageModal(product);
    });

    modal?.querySelectorAll("[data-stage-modal-close]").forEach((button) => {
      button.addEventListener("click", closeStageModal);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal && !modal.hidden) closeStageModal();
    });
  }

  function createProductsStageSwiper(carousel) {
    const slideCount = carousel.querySelectorAll(".swiper-slide").length;
    const initialSlide = slideCount ? Math.floor(slideCount / 2) : 0;
    return new window.Swiper(carousel, {
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: "auto",
      initialSlide,
      loop: true,
      grabCursor: true,
      speed: 620,
      autoplay: {
        delay: 2800,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      },
      coverflowEffect: {
        rotate: 25,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: false
      },
      navigation: {
        nextEl: ".products-stage-carousel .swiper-button-next",
        prevEl: ".products-stage-carousel .swiper-button-prev"
      },
      pagination: {
        el: ".products-stage-carousel .swiper-pagination",
        clickable: true
      }
    });
  }

  function setupProductsStageAutoplayHover(carousel, swiper) {
    if (!carousel || !swiper?.autoplay) return;
    if (carousel.dataset.autoplayHoverBound === "true") return;
    carousel.dataset.autoplayHoverBound = "true";

    carousel.addEventListener("pointerover", (event) => {
      const slide = event.target.closest(".product-stage-card");
      if (slide?.classList.contains("swiper-slide-active")) {
        state.productsStageSwiper?.autoplay?.stop();
      }
    });

    carousel.addEventListener("pointerout", (event) => {
      const slide = event.target.closest(".product-stage-card");
      if (!slide?.classList.contains("swiper-slide-active")) return;
      if (slide.contains(event.relatedTarget)) return;
      state.productsStageSwiper?.autoplay?.start();
    });
  }

  function productText(value, lang = state.lang) {
    if (!value || typeof value !== "object") return value || "";
    return value[lang] || value.en || "";
  }

  function extractWeight(text) {
    const match = String(text || "").match(/\b\d+(?:[.,]\d+)?\s?(?:kg|g)\b/i);
    return match ? match[0].replace(/\s+/g, "") : "400g";
  }

  function renderProductsStageSlides() {
    const wrapper = document.querySelector(".products-coverflow .swiper-wrapper");
    if (!wrapper || !window.products?.length) return;
    wrapper.innerHTML = window.products.filter((product) => product.category === "vegetables").map((product) => {
      const name = productText(product.name, "en");
      return `
        <article class="swiper-slide product-stage-card" data-product-id="${product.id}">
          <img class="product-stage-badge" src="assets/images/halal.png" alt="Halal certified" loading="lazy">
          <img class="product-stage-image" src="${product.image}" alt="${productText(product.alt, "en") || name}" loading="lazy">
          <div class="product-stage-label"><h3>${name}</h3></div>
        </article>`;
    }).join("");
  }

  function refreshProductsStageCarousel() {
    const carousel = document.querySelector(".products-coverflow");
    if (!carousel || !window.Swiper || !window.products?.length) return;
    if (state.productsStageSwiper) {
      state.productsStageSwiper.destroy(true, true);
    }
    renderProductsStageSlides();
    state.productsStageSwiper = createProductsStageSwiper(carousel);
    setupProductsStageAutoplayHover(carousel, state.productsStageSwiper);
  }

  function setupProductsStageSnap() {
    const stage = document.querySelector(".products-stage-section");
    if (document.body.dataset.page !== "products" || !stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    let snapping = false;
    let snapped = false;
    let lastY = window.scrollY;

    function updateSnapState() {
      const currentY = window.scrollY;
      const direction = currentY > lastY ? "down" : "up";
      const rect = stage.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const approachingFromAbove = direction === "down" && rect.top > 0 && rect.top < viewHeight * 0.62;
      const approachingFromBelow = direction === "up" && rect.top < 0 && rect.bottom > viewHeight * 0.38;
      const farAway = rect.top > viewHeight * 0.86 || rect.bottom < viewHeight * 0.14;

      if (farAway) snapped = false;

      if (!snapping && !snapped && (approachingFromAbove || approachingFromBelow)) {
        snapping = true;
        snapped = true;
        stage.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => {
          snapping = false;
        }, 520);
      }

      lastY = currentY;
      ticking = false;
    }

    function requestSnapUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateSnapState);
    }

    window.addEventListener("scroll", requestSnapUpdate, { passive: true });
  }

  function initFloatingSocial() {
    if (document.body.dataset.page === "contact") return;
    const floating = document.querySelector(".floating-social");
    const hero = document.querySelector(".hero-carousel, .page-hero");
    if (!floating) return;

    function updateVisibility() {
      const heroHeight = hero?.offsetHeight || window.innerHeight;
      const revealAfter = Math.max(140, heroHeight * 0.45);
      floating.classList.toggle("-visible", window.scrollY > revealAfter);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
  }

  function categoryLabel(category) {
    const categoryData = window.productCategories?.find((item) => item.id === category);
    return categoryData?.name?.[state.lang] || category;
  }

  function renderHomeProductTabs() {
    const list = document.getElementById("home-product-tab-list");
    const panel = document.getElementById("home-product-panel");
    if (!list || !panel || !window.productCategories?.length) return;
    const categories = window.productCategories;
    state.homeProductCategory = state.homeProductCategory || categories[0].id;
    const activeCategory = categories.find((category) => category.id === state.homeProductCategory) || categories[0];

    list.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "product-tab";
      button.id = `home-tab-${category.id}`;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(category.id === activeCategory.id));
      button.setAttribute("aria-controls", "home-product-panel");
      button.classList.toggle("active", category.id === activeCategory.id);
      const icon = category.iconImage
        ? `<img src="${category.iconImage}" alt="" loading="lazy">`
        : category.icon;
      button.innerHTML = `<span class="product-tab-icon" aria-hidden="true">${icon}</span><span>${category.name[state.lang]}</span>`;
      button.addEventListener("click", () => {
        state.homeProductCategory = category.id;
        renderHomeProductTabs();
      });
      list.appendChild(button);
    });

    panel.classList.remove("is-swapping");
    void panel.offsetWidth;
    panel.classList.add("is-swapping");
    document.getElementById("home-product-image").src = activeCategory.image;
    document.getElementById("home-product-image").alt = activeCategory.alt[state.lang];
    document.getElementById("home-product-title").textContent = activeCategory.name[state.lang];
    document.getElementById("home-product-description").textContent = activeCategory.description[state.lang];
    panel.setAttribute("aria-labelledby", `home-tab-${activeCategory.id}`);
  }

  function renderProducts(active = document.querySelector(".filter-bar button.active")?.dataset.filter || "all") {
    const grid = document.getElementById("product-grid");
    const bar = document.getElementById("filter-bar");
    if (!grid || !bar || !window.products) return;

    const categoryOrder = window.productCategories ? window.productCategories.map((c) => c.id) : [];
    const availableCategories = [...new Set(window.products.map((product) => product.category))];
    const orderedCategories = [
      ...categoryOrder.filter((id) => availableCategories.includes(id)),
      ...availableCategories.filter((id) => !categoryOrder.includes(id))
    ];
    const categories = ["all", ...orderedCategories];

    bar.innerHTML = "";
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.filter = category;
      button.textContent = category === "all" ? t("products.filter.all") : categoryLabel(category);
      button.classList.toggle("active", category === active);
      button.addEventListener("click", () => renderProducts(category));
      bar.appendChild(button);
    });
    grid.innerHTML = "";
    window.products
      .filter((product) => active === "all" || product.category === active)
      .forEach((product) => {
        const specText = (typeof product.spec === "object" ? product.spec[state.lang] : product.spec) || "";
        const card = document.createElement("article");
        card.className = `product-card product-${product.id} product-category-${product.category}`;
        card.innerHTML = `
          <div class="card-img">
            <img src="${product.image}" alt="${product.alt?.[state.lang] || ''}" loading="lazy">
          </div>
          <div class="card-content">
            <h3 class="card-title">${product.name[state.lang]}</h3>
            <p class="card-subtitle">${categoryLabel(product.category)}</p>
            ${specText ? `<p class="card-spec">${specText}</p>` : ""}
            <h4 class="bg-title">${product.name[state.lang]}</h4>
            <button class="btn-action" type="button">${t("products.card.details")}</button>
          </div>`;
        card.querySelector("button").addEventListener("click", (event) => {
          event.stopPropagation();
          openModal(product);
        });
        card.addEventListener("click", () => openModal(product));
        grid.appendChild(card);
      });
  }

  function openModal(product) {
    const modal = document.getElementById("product-modal");
    if (!modal) return;
    state.lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-image").alt = product.alt?.[state.lang] || "";
    document.getElementById("modal-title").textContent = product.name[state.lang];
    document.getElementById("modal-description").textContent = product.description[state.lang];

    const packagingText = typeof product.packaging === "object" ? product.packaging[state.lang] : product.packaging;
    const storageText = typeof product.storage === "object" ? product.storage[state.lang] : product.storage;
    const originText = typeof product.origin === "object" ? product.origin[state.lang] : product.origin;

    document.getElementById("modal-packaging").textContent = packagingText || "-";
    document.getElementById("modal-storage").textContent = storageText || "-";
    document.getElementById("modal-origin").textContent = originText || "-";
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    const modal = document.getElementById("product-modal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    state.lastFocus?.focus();
  }

  function setupModal() {
    const modal = document.getElementById("product-modal");
    if (!modal) return;
    modal.addEventListener("click", (event) => {
      if (event.target.matches("[data-close-modal]")) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModal();
      if (event.key !== "Tab" || modal.hidden) return;
      const focusable = [...modal.querySelectorAll("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function setupContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = document.getElementById("form-status");
      if (!form.checkValidity()) {
        status.textContent = t("contact.form.required");
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const subject = encodeURIComponent(`Orient Welt inquiry from ${data.get("name")}`);
      const body = encodeURIComponent(`Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`);
      // Placeholder form handling: replace mailto with a real backend endpoint later.
      window.location.href = `mailto:info@orientwelt.example?subject=${subject}&body=${body}`;
      status.textContent = t("contact.form.success");
    });
  }

  function initGlobalTradeGlobe() {
    const chartElement = document.getElementById("trade-flow-globe");
    if (!chartElement) return;
    if (!window.am5 || !window.am5map || !window.am5geodata_worldLow) {
      chartElement.className = "trade-flow-fallback";
      chartElement.textContent = t("home.trade.fallback");
      return;
    }

    am5.ready(function () {
      am5.array.each(am5.registry.rootElements, function (rootElement) {
        if (rootElement.dom.id === "trade-flow-globe") {
          rootElement.dispose();
        }
      });

      const styles = getComputedStyle(document.documentElement);
      const colorBlue = styles.getPropertyValue("--color-blue").trim() || "#177bb2";
      const colorGold = styles.getPropertyValue("--color-gold").trim() || "#f7be49";
      const colorOrange = styles.getPropertyValue("--color-orange").trim() || "#e38626";
      const pageBackground = styles.getPropertyValue("--color-white").trim() || "#ffffff";
      const baseCountry = "#AFE1AF";
      const tradeCountryIds = [
        "IQ", "SY", "SA", "KW", "BH", "QA", "YE", "OM", "JO", "LB", "PS",
        "EG", "TR", "IR", "BG", "MY", "AE", "MA", "DE"
      ];
      const germanyDestination = { longitude: 10.45, latitude: 51.16 };

      const root = am5.Root.new("trade-flow-globe");
      if (window.am5themes_Animated) {
        root.setThemes([am5themes_Animated.new(root)]);
      }

      const chart = root.container.children.push(am5map.MapChart.new(root, {
        projection: am5map.geoOrthographic(),
        panX: "rotateX",
        panY: "rotateY",
        wheelY: "none",
        rotationX: -24,
        rotationY: -32,
        maxZoomLevel: 1.6,
        minZoomLevel: 1
      }));

      const backgroundSeries = chart.series.unshift(am5map.MapPolygonSeries.new(root, {}));
      backgroundSeries.mapPolygons.template.setAll({
        fill: am5.color(pageBackground),
        fillOpacity: 1,
        strokeOpacity: 0
      });
      backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180)
      });

      const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      }));
      polygonSeries.mapPolygons.template.setAll({
        fill: am5.color(baseCountry),
        fillOpacity: 0.9,
        stroke: am5.color("#ffffff"),
        strokeWidth: 0.45,
        strokeOpacity: 0.72,
        interactive: true
      });
      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color(baseCountry)
      });
      polygonSeries.events.on("datavalidated", function () {
        am5.array.each(polygonSeries.dataItems, function (dataItem) {
          const id = dataItem.get("id");
          const polygon = dataItem.get("mapPolygon");
          if (!polygon) return;
          if (tradeCountryIds.includes(id)) {
            polygon.setAll({
              fill: am5.color(colorBlue),
              fillOpacity: 0.86,
              cursorOverStyle: "pointer"
            });
            polygon.events.on("pointerover", function () {
              polygon.setAll({
                fill: am5.color(colorBlue),
                fillOpacity: 1,
                stroke: am5.color(colorGold),
                strokeWidth: 0.9
              });
            });
            polygon.events.on("pointerout", function () {
              polygon.setAll({
                fill: am5.color(colorBlue),
                fillOpacity: 0.86,
                stroke: am5.color("#ffffff"),
                strokeWidth: 0.45
              });
            });
          }
        });
      });

      const sankeySeries = chart.series.push(am5map.MapSankeySeries.new(root, {
        polygonSeries: polygonSeries,
        maxWidth: 0.6,
        minWidth: 0.14,
        controlPointDistance: 0.18,
        resolution: 64,
        nodeType: "circle",
        nodePadding: 0.04
      }));

      sankeySeries.mapPolygons.template.setAll({
        fill: am5.color(colorGold),
        fillOpacity: 0.58,
        stroke: am5.color(colorGold),
        strokeOpacity: 0.62,
        strokeWidth: 0.14,
        interactive: false
      });
      sankeySeries.mapPolygons.template.states.create("hover", {
        fillOpacity: 0.82
      });
      // Hide MapSankey's proportional endpoint nodes; a fixed-size point layer below keeps every country marker the same size.
      sankeySeries.nodes.mapPolygons.template.setAll({
        fillOpacity: 0,
        strokeOpacity: 0
      });
      sankeySeries.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 0,
          autoRotate: true,
          sprite: am5.Circle.new(root, {
            radius: 2.4,
            fill: am5.color("#9b5b00"),
            stroke: am5.color("#ffffff"),
            strokeWidth: 1.5
          })
        });
      });

      const northSeaHamburg = [
        { longitude: -5.35, latitude: 36.05 },
        { longitude: -9.4, latitude: 43.8 },
        { longitude: -4.8, latitude: 49.2 },
        { longitude: 2.2, latitude: 51.6 },
        { longitude: 6.3, latitude: 54.3 }
      ];
      const medToHamburg = [
        { longitude: 26.2, latitude: 34.7 },
        { longitude: 16.5, latitude: 36.1 },
        { longitude: 4.8, latitude: 36.4 },
        ...northSeaHamburg
      ];
      const suezToHamburg = [
        { longitude: 32.55, latitude: 29.97 },
        { longitude: 32.31, latitude: 31.27 },
        ...medToHamburg
      ];
      const gulfToHamburg = [
        { longitude: 56.5, latitude: 26.3 },
        { longitude: 58.7, latitude: 22.5 },
        { longitude: 56.7, latitude: 17.0 },
        { longitude: 45.2, latitude: 12.6 },
        { longitude: 40.0, latitude: 14.5 },
        { longitude: 35.0, latitude: 22.0 },
        ...suezToHamburg
      ];
      const westMedToHamburg = [
        { longitude: 4.8, latitude: 36.4 },
        ...northSeaHamburg
      ];
      const atlanticToHamburg = [
        { longitude: -9.4, latitude: 43.8 },
        { longitude: -4.8, latitude: 49.2 },
        { longitude: 2.2, latitude: 51.6 },
        { longitude: 6.3, latitude: 54.3 }
      ];
      const tradeFlows = [
        ["Iraq → Germany", 650, 43.68, 33.22, [{ longitude: 48.55, latitude: 29.96 }, ...gulfToHamburg]],
        ["Syria → Germany", 280, 38.99, 34.8, [{ longitude: 35.78, latitude: 35.52 }, ...medToHamburg]],
        ["Saudi Arabia → Germany", 720, 45.08, 23.89, [{ longitude: 39.15, latitude: 21.48 }, { longitude: 38.7, latitude: 22.0 }, { longitude: 37.2, latitude: 24.5 }, ...suezToHamburg]],
        ["Kuwait → Germany", 360, 47.48, 29.31, [{ longitude: 48.0, latitude: 29.38 }, ...gulfToHamburg]],
        ["Bahrain → Germany", 210, 50.56, 26.07, [{ longitude: 50.62, latitude: 26.25 }, ...gulfToHamburg]],
        ["Qatar → Germany", 240, 51.18, 25.35, [{ longitude: 51.58, latitude: 25.28 }, ...gulfToHamburg]],
        ["Yemen → Germany", 310, 47.5, 15.55, [{ longitude: 45.02, latitude: 12.78 }, { longitude: 42.8, latitude: 12.7 }, { longitude: 40.0, latitude: 14.5 }, { longitude: 35.0, latitude: 22.0 }, ...suezToHamburg]],
        ["Oman → Germany", 290, 57.0, 21.0, [{ longitude: 58.56, latitude: 23.62 }, { longitude: 58.7, latitude: 22.5 }, { longitude: 56.7, latitude: 17.0 }, { longitude: 45.2, latitude: 12.6 }, { longitude: 40.0, latitude: 14.5 }, { longitude: 35.0, latitude: 22.0 }, ...suezToHamburg]],
        ["Jordan → Germany", 390, 36.24, 30.59, [{ longitude: 35.0, latitude: 29.53 }, { longitude: 34.8, latitude: 28.0 }, { longitude: 34.3, latitude: 24.0 }, ...suezToHamburg]],
        ["Lebanon → Germany", 260, 35.86, 33.85, [{ longitude: 35.49, latitude: 33.9 }, ...medToHamburg]],
        ["Palestine → Germany", 180, 35.23, 31.95, [{ longitude: 34.45, latitude: 31.5 }, ...medToHamburg]],
        ["Egypt → Germany", 850, 30.8, 26.82, [{ longitude: 32.31, latitude: 31.27 }, ...suezToHamburg]],
        ["Turkey → Germany", 620, 35.24, 38.96, [{ longitude: 29.0, latitude: 40.2 }, { longitude: 25.5, latitude: 42.7 }, { longitude: 20.5, latitude: 44.8 }, { longitude: 16.4, latitude: 48.2 }, { longitude: 12.5, latitude: 49.7 }]],
        ["Iran → Germany", 540, 53.69, 32.43, [{ longitude: 51.65, latitude: 27.18 }, ...gulfToHamburg]],
        ["Bulgaria → Germany", 220, 25.49, 42.73, [{ longitude: 22.9, latitude: 44.0 }, { longitude: 19.0, latitude: 45.8 }, { longitude: 16.4, latitude: 48.2 }, { longitude: 12.5, latitude: 49.7 }]],
        ["Malaysia → Germany", 430, 102.0, 4.21, [{ longitude: 103.8, latitude: 1.25 }, { longitude: 95.8, latitude: 5.9 }, { longitude: 78.0, latitude: 7.5 }, { longitude: 58.7, latitude: 12.0 }, { longitude: 45.2, latitude: 12.6 }, { longitude: 40.0, latitude: 14.5 }, { longitude: 35.0, latitude: 22.0 }, ...suezToHamburg]],
        ["UAE → Germany", 520, 53.85, 23.42, [{ longitude: 55.27, latitude: 25.2 }, ...gulfToHamburg]],
        ["Morocco → Germany", 470, -7.09, 31.79, [{ longitude: -7.62, latitude: 33.6 }, { longitude: -9.8, latitude: 35.6 }, ...atlanticToHamburg]]
      ];

      // Placeholder route/volume data. Replace values and waypoints with verified logistics data when available.
      sankeySeries.data.setAll(tradeFlows.map(function (flow) {
        return {
          route: flow[0],
          name: flow[0],
          sourceLongitude: flow[2],
          sourceLatitude: flow[3],
          targetLongitude: germanyDestination.longitude,
          targetLatitude: germanyDestination.latitude,
          value: flow[1],
          waypoints: flow[4]
        };
      }));

      const markerSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
      markerSeries.bullets.push(function (root, series, dataItem) {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 3,
            fill: am5.color(colorBlue),
            fillOpacity: 0.95,
            stroke: am5.color("#ffffff"),
            strokeWidth: 1.2
          })
        });
      });
      markerSeries.data.setAll([
        ...tradeFlows.map(function (flow) {
          return {
            name: flow[0].replace(" → Germany", ": placeholder exporter"),
            geometry: { type: "Point", coordinates: [flow[2], flow[3]] }
          };
        }),
        {
          name: "Germany: destination market",
          geometry: { type: "Point", coordinates: [germanyDestination.longitude, germanyDestination.latitude] }
        }
      ]);

      const bulletTimers = [];
      sankeySeries.events.on("datavalidated", function () {
        am5.array.each(sankeySeries.dataItems, function (dataItem, dataIndex) {
          if (!dataItem.bullets) return;
          am5.array.each(dataItem.bullets, function (bullet, bulletIndex) {
            const delay = ((dataIndex * 1733) + (bulletIndex * 719) + Math.floor(Math.random() * 2800)) % 18000;
            const duration = 24000 + ((dataIndex * 631) % 7000);
            bullet.set("locationX", 0);
            bulletTimers.push(window.setTimeout(function () {
              bullet.animate({
                key: "locationX",
                from: 0,
                to: 1,
                duration: duration,
                easing: am5.ease.linear,
                loops: Infinity
              });
            }, delay));
          });
        });
      });

      const rotate = function () {
        chart.set("rotationX", (chart.get("rotationX") || 0) + 0.035);
        state.globeFrame = window.requestAnimationFrame(rotate);
      };
      rotate();

      root.events.on("disposed", function () {
        window.cancelAnimationFrame(state.globeFrame);
        bulletTimers.forEach(function (timer) {
          window.clearTimeout(timer);
        });
      });

      chart.appear(1000, 100);
    });
  }

  function initRotatingText() {
    const container = document.querySelector(".rotating-text");
    if (!container) return;
    const words = [...container.querySelectorAll(".word")];
    if (!words.length) return;

    if (state.rotatingTimer) {
      clearInterval(state.rotatingTimer);
      state.rotatingTimer = null;
    }

    const wordArray = [];
    let currentWord = 0;

    function splitLetters(word) {
      const content = word.getAttribute("data-word-text") || word.textContent.trim();
      word.setAttribute("data-word-text", content);
      word.innerHTML = "";
      const letters = [];
      for (let i = 0; i < content.length; i++) {
        const letter = document.createElement("span");
        letter.className = "letter";
        letter.innerHTML = content.charAt(i) === " " ? "&nbsp;" : content.charAt(i);
        word.appendChild(letter);
        letters.push(letter);
      }
      wordArray.push(letters);
    }

    words.forEach((word, index) => {
      word.style.opacity = index === 0 ? "1" : "0";
      splitLetters(word);
    });

    if (wordArray[0]) {
      wordArray[0].forEach((letter) => {
        letter.className = "letter in";
      });
    }

    function animateLetterOut(cw, i) {
      setTimeout(function () {
        if (cw && cw[i]) {
          cw[i].className = "letter out";
        }
      }, i * 80);
    }

    function animateLetterIn(nw, i) {
      setTimeout(function () {
        if (nw && nw[i]) {
          nw[i].className = "letter in";
        }
      }, 340 + (i * 80));
    }

    function changeWord() {
      if (!wordArray.length) return;
      const cw = wordArray[currentWord];
      const nextIndex = currentWord === wordArray.length - 1 ? 0 : currentWord + 1;
      const nw = wordArray[nextIndex];

      if (cw) {
        for (let i = 0; i < cw.length; i++) {
          animateLetterOut(cw, i);
        }
      }

      if (nw && nw.length) {
        for (let i = 0; i < nw.length; i++) {
          nw[i].className = "letter behind";
          if (nw[0]?.parentElement) {
            nw[0].parentElement.style.opacity = "1";
          }
          animateLetterIn(nw, i);
        }
      }

      currentWord = nextIndex;
    }

    state.rotatingTimer = setInterval(changeWord, 4000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupCarousel();
    setupProductsStageCarousel();
    setupProductsStageSnap();
    initFloatingSocial();
    setupModal();
    setupContactForm();
    initGlobalTradeGlobe();
    applyTranslations();
    initRotatingText();
  });
})();
