(function () {
  const state = {
    lang: localStorage.getItem("orientWeltLang") || "en",
    slide: 0,
    slideTimer: null,
    homeProductCategory: null,
    navPill: null,
    globeFrame: null,
    globeResumeTimer: null,
    lastFocus: null
  };

  function t(key) {
    return window.translations?.[state.lang]?.[key] || window.translations?.en?.[key] || key;
  }

  function applyTranslations() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === state.lang);
    });
    renderHomeProductTabs();
    renderProducts();
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
    requestAnimationFrame(() => updateNavPill(undefined, false));
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
      button.innerHTML = `<span class="product-tab-icon" aria-hidden="true">${category.icon}</span><span>${category.name[state.lang]}</span>`;
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
    const categories = ["all", ...new Set(window.products.map((product) => product.category))];
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
        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `<img src="${product.image}" alt="${product.alt[state.lang]}" loading="lazy"><div><h3>${product.name[state.lang]}</h3><p>${product.short[state.lang]}</p><button class="btn btn-outline" type="button">${t("products.card.details")}</button></div>`;
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
    document.getElementById("modal-image").alt = product.alt[state.lang];
    document.getElementById("modal-title").textContent = product.name[state.lang];
    document.getElementById("modal-description").textContent = product.description[state.lang];
    document.getElementById("modal-packaging").textContent = product.packaging;
    document.getElementById("modal-storage").textContent = product.storage;
    document.getElementById("modal-origin").textContent = product.origin;
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
      const colorGreen = styles.getPropertyValue("--color-green").trim() || "#88c345";
      const colorGold = styles.getPropertyValue("--color-gold").trim() || "#f7be49";
      const colorOrange = styles.getPropertyValue("--color-orange").trim() || "#e38626";
      const colorLine = styles.getPropertyValue("--color-line").trim() || "#e4eaed";

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
        fill: am5.color("#f7fbfc"),
        fillOpacity: 0.95,
        stroke: am5.color(colorLine),
        strokeOpacity: 0.45
      });
      backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180)
      });

      const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      }));
      polygonSeries.mapPolygons.template.setAll({
        fill: am5.color("#dfe8e4"),
        fillOpacity: 0.92,
        stroke: am5.color("#ffffff"),
        strokeWidth: 0.45,
        strokeOpacity: 0.82,
        interactive: true,
        tooltipText: "{name}"
      });
      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.color("#c8dccb")
      });
      polygonSeries.events.on("datavalidated", function () {
        am5.array.each(polygonSeries.dataItems, function (dataItem) {
          const id = dataItem.get("id");
          const polygon = dataItem.get("mapPolygon");
          if (!polygon) return;
          if (["EG", "TR", "JO"].includes(id)) {
            polygon.setAll({
              fill: am5.color(colorGreen),
              fillOpacity: 0.72,
              tooltipText: "{name}: placeholder exporter"
            });
          }
          if (id === "DE") {
            polygon.setAll({
              fill: am5.color(colorBlue),
              fillOpacity: 0.78,
              tooltipText: "{name}: destination market"
            });
          }
        });
      });

      const sankeySeries = chart.series.push(am5map.MapSankeySeries.new(root, {
        polygonSeries: polygonSeries,
        maxWidth: 7,
        minWidth: 1.4,
        controlPointDistance: 0.18,
        resolution: 64,
        nodeType: "circle",
        nodePadding: 0.45
      }));

      sankeySeries.mapPolygons.template.setAll({
        fill: am5.color(colorBlue),
        fillOpacity: 0.42,
        stroke: am5.color(colorBlue),
        strokeOpacity: 0.25,
        strokeWidth: 0.8,
        interactive: true,
        tooltipText: "{route}: ~{value} tons/year"
      });
      sankeySeries.mapPolygons.template.states.create("hover", {
        fillOpacity: 0.64
      });
      sankeySeries.nodes.mapPolygons.template.setAll({
        fill: am5.color(colorGold),
        fillOpacity: 0.92,
        stroke: am5.color("#ffffff"),
        strokeWidth: 1.5,
        tooltipText: "{name}"
      });
      sankeySeries.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 0,
          autoRotate: true,
          sprite: am5.Circle.new(root, {
            radius: 4,
            fill: am5.color(colorOrange),
            stroke: am5.color("#ffffff"),
            strokeWidth: 1.5
          })
        });
      });

      // Placeholder route/volume data. Replace values and waypoints with verified logistics data when available.
      sankeySeries.data.setAll([
        {
          route: "Egypt → Germany",
          name: "Egypt to Germany",
          sourceLongitude: 32.31,
          sourceLatitude: 31.27,
          targetLongitude: 9.99,
          targetLatitude: 53.55,
          value: 850,
          waypoints: [
            { longitude: 32.55, latitude: 29.97 },
            { longitude: 32.31, latitude: 31.27 },
            { longitude: 26.2, latitude: 34.7 },
            { longitude: 16.5, latitude: 36.1 },
            { longitude: 4.8, latitude: 36.4 },
            { longitude: -5.35, latitude: 36.05 },
            { longitude: -9.4, latitude: 43.8 },
            { longitude: -4.8, latitude: 49.2 },
            { longitude: 2.2, latitude: 51.6 },
            { longitude: 6.3, latitude: 54.3 }
          ]
        },
        {
          route: "Turkey → Germany",
          name: "Turkey to Germany",
          sourceLongitude: 27.14,
          sourceLatitude: 38.42,
          targetLongitude: 9.99,
          targetLatitude: 53.55,
          value: 620,
          waypoints: [
            { longitude: 25.4, latitude: 37.2 },
            { longitude: 22.8, latitude: 35.7 },
            { longitude: 17.2, latitude: 36.1 },
            { longitude: 8.2, latitude: 37.2 },
            { longitude: -5.35, latitude: 36.05 },
            { longitude: -9.4, latitude: 43.8 },
            { longitude: -4.8, latitude: 49.2 },
            { longitude: 2.2, latitude: 51.6 },
            { longitude: 6.3, latitude: 54.3 }
          ]
        },
        {
          route: "Jordan → Germany",
          name: "Jordan to Germany",
          sourceLongitude: 35.0,
          sourceLatitude: 29.53,
          targetLongitude: 9.99,
          targetLatitude: 53.55,
          value: 390,
          waypoints: [
            { longitude: 34.8, latitude: 28.0 },
            { longitude: 34.3, latitude: 24.0 },
            { longitude: 32.55, latitude: 29.97 },
            { longitude: 32.31, latitude: 31.27 },
            { longitude: 26.2, latitude: 34.7 },
            { longitude: 16.5, latitude: 36.1 },
            { longitude: 4.8, latitude: 36.4 },
            { longitude: -5.35, latitude: 36.05 },
            { longitude: -9.4, latitude: 43.8 },
            { longitude: -4.8, latitude: 49.2 },
            { longitude: 2.2, latitude: 51.6 },
            { longitude: 6.3, latitude: 54.3 }
          ]
        }
      ]);

      sankeySeries.events.on("datavalidated", function () {
        am5.array.each(sankeySeries.dataItems, function (dataItem) {
          if (!dataItem.bullets) return;
          am5.array.each(dataItem.bullets, function (bullet) {
            bullet.animate({
              key: "locationX",
              from: 0,
              to: 1,
              duration: 5200,
              easing: am5.ease.linear,
              loops: Infinity
            });
          });
        });
      });

      let rotationPaused = false;
      const pauseRotation = function () {
        rotationPaused = true;
        window.clearTimeout(state.globeResumeTimer);
      };
      const resumeRotationSoon = function () {
        window.clearTimeout(state.globeResumeTimer);
        state.globeResumeTimer = window.setTimeout(function () {
          rotationPaused = false;
        }, 1200);
      };
      chartElement.addEventListener("pointerenter", pauseRotation);
      chartElement.addEventListener("pointerdown", pauseRotation);
      chartElement.addEventListener("pointerleave", resumeRotationSoon);
      window.addEventListener("pointerup", resumeRotationSoon);

      const rotate = function () {
        if (!rotationPaused) {
          chart.set("rotationX", (chart.get("rotationX") || 0) + 0.035);
        }
        state.globeFrame = window.requestAnimationFrame(rotate);
      };
      rotate();

      root.events.on("disposed", function () {
        window.cancelAnimationFrame(state.globeFrame);
        window.clearTimeout(state.globeResumeTimer);
      });

      chart.appear(1000, 100);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupCarousel();
    setupModal();
    setupContactForm();
    initGlobalTradeGlobe();
    applyTranslations();
  });
})();
