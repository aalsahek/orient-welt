(function () {
  const state = {
    lang: localStorage.getItem("orientWeltLang") || "en",
    homeProductCategory: null,
    navPill: null,
    rotatingTimer: null,
    lastFocus: null,
    productsStageSwiper: null,
    homeShaderFrame: null
  };

  function t(key) {
    return window.translations?.[state.lang]?.[key] || window.translations?.en?.[key] || key;
  }

  function applyProductRangeDirection() {
    const isArabic = state.lang === "ar";
    const filterHeading = document.querySelector('[data-i18n="products.filter.title"]')?.parentElement;
    const filterBar = document.getElementById("filter-bar");
    const grid = document.getElementById("product-grid");
    const modal = document.getElementById("product-modal");
    [filterHeading, filterBar, grid, modal].forEach((el) => {
      if (el) el.dir = isArabic ? "rtl" : "ltr";
    });
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
    applyProductRangeDirection();
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

  function setupCarousel(radioSelector = ".hero-radio", controlsSelector = ".hero-controls label", intervalMs = 5000) {
    const radios = [...document.querySelectorAll(radioSelector)];
    const controls = [...document.querySelectorAll(controlsSelector)];
    if (!radios.length) return;

    let slide = 0;
    let timer = null;

    function showSlide(index) {
      slide = (index + radios.length) % radios.length;
      radios[slide].checked = true;
      clearInterval(timer);
      timer = setInterval(() => showSlide(slide + 1), intervalMs);
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

  function initHomeShaderBackground() {
    if (document.body.dataset.page !== "home") return;
    const canvas = document.querySelector(".home-shader-bg");
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false
    });

    if (!gl) {
      document.body.classList.add("home-shader-fallback");
      return;
    }

    const vertexSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif

      uniform vec3 u_colors[8];
      uniform vec4 u_scene;
      uniform vec4 u_shape;
      uniform vec4 u_surface;
      uniform vec4 u_finish;
      uniform vec4 u_transform;
      uniform vec4 u_space;
      uniform vec4 u_cursor;

      #define u_resolution u_scene.xy
      #define u_time u_scene.z
      #define u_colorCount u_scene.w
      #define u_scale u_shape.x
      #define u_intensity u_shape.y
      #define u_paramA u_shape.z
      #define u_warp u_shape.w
      #define u_detail u_surface.x
      #define u_contrast u_surface.y
      #define u_brightness u_surface.z
      #define u_saturation u_surface.w
      #define u_hue u_finish.x
      #define u_vignette u_finish.y
      #define u_blur u_finish.z
      #define u_grain u_finish.w
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      #define u_seed u_transform.x
      #else
      #define u_seed mod(u_transform.x, 31.0)
      #endif
      #define u_rotate u_transform.y
      #define u_drift u_transform.z
      #define u_oklab u_transform.w
      #define u_offset u_space.xy
      #define u_mouse u_space.zw
      #define u_cursorPresence u_cursor.x
      #define u_cursorEffect u_cursor.y
      #define u_cursorStrength u_cursor.z
      #define u_cursorRadius u_cursor.w

      float hash21(vec2 p) {
      #ifndef GL_FRAGMENT_PRECISION_HIGH
        p = mod(p, 31.0);
      #endif
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float grainHash(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
          mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
          u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p = p * 2.03 + vec2(17.0, 9.2);
          a *= 0.5;
        }
        return v;
      }

      vec3 srgbToLinear(vec3 c) {
        return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),
          step(0.04045, c));
      }

      vec3 linearToSrgb(vec3 c) {
        return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
          step(0.0031308, c));
      }

      vec3 linToOklab(vec3 c) {
        float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
        float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
        float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
        l = pow(max(l, 0.0), 1.0 / 3.0);
        m = pow(max(m, 0.0), 1.0 / 3.0);
        s = pow(max(s, 0.0), 1.0 / 3.0);
        return vec3(
          0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
          1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
          0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);
      }

      vec3 oklabToLin(vec3 c) {
        float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
        float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
        float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
        l = l * l * l;
        m = m * m * m;
        s = s * s * s;
        return vec3(
          4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
      }

      vec3 mixColour(vec3 a, vec3 b, float t) {
        if (u_oklab > 0.5) {
          vec3 la = linToOklab(srgbToLinear(a));
          vec3 lb = linToOklab(srgbToLinear(b));
          return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);
        }
        return mix(a, b, t);
      }

      vec3 palette(float x) {
        float n = max(u_colorCount - 1.0, 1.0);
        float f = clamp(x, 0.0, 1.0) * n;
        vec3 col = u_colors[0];
        for (int i = 0; i < 7; i++) {
          if (float(i) < n)
            col = mixColour(col, u_colors[i + 1],
              smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
        }
        return col;
      }

      vec3 hueRotate(vec3 col, float a) {
        const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                                0.587, -0.274, -0.523,
                                0.114, -0.322, 0.312);
        const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                                0.956, -0.272, -1.106,
                                0.621, -0.647, 1.703);
        vec3 yiq = toYIQ * col;
        float ca = cos(a);
        float sa = sin(a);
        yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
        return toRGB * yiq;
      }

      vec3 shade(vec2 uv, vec2 p, float t) {
        vec3 acc = u_colors[0] * 0.006;
        float total = 0.006;
        for (int i = 0; i < 8; i++) {
          if (float(i) >= u_colorCount) break;
          float fi = float(i);
          vec2 c = vec2(
            sin(t * (0.21 + fi * 0.071) + fi * 2.4 + u_seed),
            cos(t * (0.17 + fi * 0.093) + fi * 1.7)) * (0.45 + u_intensity * 0.35);
          float sizeJitter = 0.5 + hash21(vec2(fi * 12.9898, u_seed + 3.1)) * 1.1;
          float w = exp(-dot(p - c, p - c) * (2.4 / sizeJitter));
          acc += u_colors[i] * w;
          total += w;
        }
        return acc / total;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 screenUv = uv;
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float cursorMask = 0.0;

        if (u_cursorPresence > 0.001) {
          vec2 cursor = (0.5 * u_mouse * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
          vec2 cursorDelta = p - cursor;
          if (u_cursorEffect < 0.5) {
            p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
          } else {
            float cursorDistance = length(cursorDelta);
            vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
            cursorMask = u_cursorPresence * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
            if (u_cursorEffect < 1.5) {
              p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
            } else if (u_cursorEffect < 2.5) {
              float cursorAngle = cursorMask * u_cursorStrength * 2.2;
              float cc = cos(cursorAngle);
              float cs = sin(cursorAngle);
              p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
            } else if (u_cursorEffect < 3.5) {
              float ripple = sin(cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
              p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
            }
          }
        }

        uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
        p *= u_scale;
        if (abs(u_rotate) > 0.0001) {
          float cr = cos(u_rotate);
          float sr = sin(u_rotate);
          p = mat2(cr, -sr, sr, cr) * p;
        }
        p += u_offset;
        if (u_drift > 0.0001)
          p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
        if (u_warp > 0.0) {
          p += u_warp * (vec2(
            fbm(p * u_detail + u_seed),
            fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
        }

        vec3 col;
        if (u_blur > 0.0) {
          float e = u_blur;
          float pe = e * u_scale;
          vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
          col = shade(uv, p, u_time) * 0.36;
          col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
          col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
          col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
          col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
        } else {
          col = shade(uv, p, u_time);
        }

        if (abs(u_contrast - 1.0) > 0.0001)
          col = (col - 0.5) * u_contrast + 0.5;
        if (abs(u_saturation - 1.0) > 0.0001) {
          float luma = dot(col, vec3(0.299, 0.587, 0.114));
          col = mix(vec3(luma), col, u_saturation);
        }
        if (abs(u_hue) > 0.0001)
          col = hueRotate(col, u_hue);
        if (abs(u_brightness) > 0.0001)
          col += u_brightness;
        if (u_vignette > 0.0001) {
          float vd = length(screenUv - 0.5) * 1.41421356;
          col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
        }
        if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)
          col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;
        if (u_grain > 0.0001)
          col += (grainHash(gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `;

    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("Home shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) {
      document.body.classList.add("home-shader-fallback");
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Home shader link error:", gl.getProgramInfoLog(program));
      document.body.classList.add("home-shader-fallback");
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       3, -1,
      -1,  3
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const uniforms = {
      colors: gl.getUniformLocation(program, "u_colors"),
      scene: gl.getUniformLocation(program, "u_scene"),
      shape: gl.getUniformLocation(program, "u_shape"),
      surface: gl.getUniformLocation(program, "u_surface"),
      finish: gl.getUniformLocation(program, "u_finish"),
      transform: gl.getUniformLocation(program, "u_transform"),
      space: gl.getUniformLocation(program, "u_space"),
      cursor: gl.getUniformLocation(program, "u_cursor")
    };
    const shaderSettings = {
      colors: [
        [0.9333333333333333, 0.9647058823529412, 0.9490196078431372],
        [0.09019607843137255, 0.4823529411764706, 0.6980392156862745],
        [0.09019607843137255, 0.4823529411764706, 0.6980392156862745],
        [0.09019607843137255, 0.4823529411764706, 0.6980392156862745],
        [0.09019607843137255, 0.4823529411764706, 0.6980392156862745],
        [0.09019607843137255, 0.4823529411764706, 0.6980392156862745],
        [0.09019607843137255, 0.4823529411764706, 0.6980392156862745],
        [0.5333333333333333, 0.7647058823529411, 0.27058823529411763]
      ].flat(),
      colorCount: 8,
      scale: 2,
      intensity: 0.9,
      paramA: 0.67,
      warp: 0.192,
      detail: 2.016,
      contrast: 1.04,
      brightness: 0,
      saturation: 1.2,
      hue: 0,
      vignette: 0.15,
      blur: 0.024,
      grain: 0.018,
      seed: 5069,
      rotate: 2.7227,
      offsetX: 0.09,
      offsetY: 0.15,
      drift: 0.148,
      cursorEffect: 2,
      cursorStrength: 0.65,
      cursorRadius: 0.46,
      oklab: 0,
      timeScale: -0.42
    };
    const maxPixels = 2000000;
    let startTime = performance.now();
    let visible = true;

    gl.useProgram(program);
    gl.uniform3fv(uniforms.colors, new Float32Array(shaderSettings.colors));
    gl.uniform4f(uniforms.shape, shaderSettings.scale, shaderSettings.intensity, shaderSettings.paramA, shaderSettings.warp);
    gl.uniform4f(uniforms.surface, shaderSettings.detail, shaderSettings.contrast, shaderSettings.brightness, shaderSettings.saturation);
    gl.uniform4f(uniforms.finish, shaderSettings.hue, shaderSettings.vignette, shaderSettings.blur, shaderSettings.grain);
    gl.uniform4f(uniforms.transform, shaderSettings.seed, shaderSettings.rotate, shaderSettings.drift, shaderSettings.oklab);
    gl.uniform4f(uniforms.cursor, 0, shaderSettings.cursorEffect, shaderSettings.cursorStrength, shaderSettings.cursorRadius);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const cssWidth = Math.max(1, Math.round(rect.width));
      const cssHeight = Math.max(1, Math.round(rect.height));
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(maxPixels / (cssWidth * cssHeight)));
      const width = Math.max(1, Math.floor(cssWidth * pixelRatio));
      const height = Math.max(1, Math.floor(cssHeight * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    }

    function render(now) {
      resize();
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.uniform4f(uniforms.scene, canvas.width, canvas.height, ((now - startTime) * 0.001) * shaderSettings.timeScale, shaderSettings.colorCount);
      gl.uniform4f(uniforms.space, shaderSettings.offsetX, shaderSettings.offsetY, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (visible && !document.hidden) {
        state.homeShaderFrame = window.requestAnimationFrame(render);
      }
    }

    function requestRender() {
      window.cancelAnimationFrame(state.homeShaderFrame);
      state.homeShaderFrame = window.requestAnimationFrame(render);
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) {
          startTime = performance.now();
          requestRender();
        } else {
          window.cancelAnimationFrame(state.homeShaderFrame);
        }
      }, { threshold: 0 });
      observer.observe(canvas);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.cancelAnimationFrame(state.homeShaderFrame);
      } else if (visible) {
        requestRender();
      }
    });

    if ("ResizeObserver" in window) {
      new ResizeObserver(requestRender).observe(canvas);
    }

    requestRender();
  }

  function setupHomeHeroScrollEffect() {
    const hero = document.querySelector(".hero-carousel");
    if (document.body.dataset.page !== "home" || !hero) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;
    let heroTop = hero.offsetTop;

    function setProgress(progress) {
      const eased = Math.min(1, Math.max(0, progress));
      hero.style.setProperty("--home-hero-y", `${-10 * eased}vh`);
      hero.style.setProperty("--home-hero-opacity", String(Math.max(0, 1 - (1.2 * eased))));
      hero.style.setProperty("--home-hero-blur", `${8 * eased}px`);
      hero.style.setProperty("--home-hero-controls-opacity", String(Math.max(0, 1 - (1.6 * eased))));
      hero.style.setProperty("--home-hero-controls-y", `${34 * eased}px`);
    }

    function update() {
      if (reduceMotion.matches) {
        setProgress(0);
        ticking = false;
        return;
      }
      const scroller = document.scrollingElement || document.documentElement;
      const currentY = window.scrollY || scroller.scrollTop || 0;
      const distance = Math.max(1, hero.offsetHeight * .58);
      setProgress((currentY - heroTop) / distance);
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", () => {
      heroTop = hero.offsetTop;
      requestUpdate();
    });
    reduceMotion.addEventListener?.("change", requestUpdate);
  }

  function setupStoryParallax() {
    const bgLayers = [...document.querySelectorAll(".story-slide")]
      .map((slide) => ({ slide, bg: slide.querySelector(".story-slide-bg") }))
      .filter((layer) => layer.bg);
    const photoLayers = [...document.querySelectorAll(".story-slide-photo")]
      .map((photo) => ({
        photo,
        slide: photo.closest(".story-slide"),
        base: photo.dataset.parallaxBase || "0px",
        factor: parseFloat(photo.dataset.parallaxFactor || "0")
      }))
      .filter((layer) => layer.slide);
    if (!bgLayers.length && !photoLayers.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const BG_FACTOR = 0.3;
    let ticking = false;

    function shiftFor(rect, factor) {
      const viewportMid = window.innerHeight / 2;
      const maxShift = rect.height * 0.4;
      const raw = (viewportMid - (rect.top + rect.height / 2)) * factor;
      return Math.max(-maxShift, Math.min(maxShift, raw));
    }

    function update() {
      if (reduceMotion.matches) {
        bgLayers.forEach(({ bg }) => { bg.style.transform = ""; });
        photoLayers.forEach(({ photo, base }) => { photo.style.translate = `0 ${base}`; });
        ticking = false;
        return;
      }
      bgLayers.forEach(({ slide, bg }) => {
        const shift = shiftFor(slide.getBoundingClientRect(), BG_FACTOR);
        bg.style.transform = `translateY(${shift}px)`;
      });
      photoLayers.forEach(({ photo, slide, base, factor }) => {
        const shift = shiftFor(slide.getBoundingClientRect(), factor);
        photo.style.translate = `0 calc(${base} + ${shift}px)`;
      });
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener?.("change", requestUpdate);
  }

  function initHandwrittenHeading() {
    const svg = document.querySelector(".handwritten-svg");
    const paths = [...document.querySelectorAll(".handwritten-path")];
    if (!svg || !paths.length) return;

    const svgNS = "http://www.w3.org/2000/svg";
    let defs = svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS(svgNS, "defs");
      svg.insertBefore(defs, svg.firstChild);
    }

    // Each glyph gets its own clip rect sized to its own bounding box
    // (padded slightly), defaulting to full coverage so the heading is a
    // normal solid word if JS/anime.js never runs. Filling the glyph shape
    // itself (rather than stroking its outline) is what keeps each letter
    // solid instead of a hollow double line.
    const reveals = paths.map((path, i) => {
      const bbox = path.getBBox();
      const pad = Math.max(bbox.width, bbox.height) * 0.06;
      const x0 = bbox.x - pad;
      const x1 = bbox.x + bbox.width + pad;
      const rect = document.createElementNS(svgNS, "rect");
      rect.setAttribute("x", x0);
      rect.setAttribute("y", bbox.y - pad);
      rect.setAttribute("width", x1 - x0);
      rect.setAttribute("height", bbox.height + pad * 2);

      const clipPath = document.createElementNS(svgNS, "clipPath");
      clipPath.id = `handwrittenClip${i}`;
      clipPath.setAttribute("clipPathUnits", "userSpaceOnUse");
      clipPath.appendChild(rect);
      defs.appendChild(clipPath);
      path.setAttribute("clip-path", `url(#${clipPath.id})`);

      return { rect, x0, x1 };
    });

    if (!window.anime || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Arabic reads right to left, so the last glyph in DOM/left-to-right
    // order (the rightmost one) must reveal first. Plays once on load and
    // settles on the fully-revealed state — no loop/alternate, so letters
    // don't keep vanishing and redrawing forever.
    const total = reveals.length;
    anime({
      targets: reveals.map((r) => r.rect),
      x: (el, i) => [reveals[i].x1, reveals[i].x0],
      width: (el, i) => [0, reveals[i].x1 - reveals[i].x0],
      easing: "easeInOutSine",
      duration: 260,
      delay: (el, i) => (total - 1 - i) * 70
    });
  }

  // Particle-burst spark (reference: CodePen /kaigth/pen/PoQMMv — a fading
  // particle shower; ported from its Three.js scene to a plain 2D canvas
  // since we only need two small bursts, not a full WebGL scene) timed to
  // the exact instants the .about-duo-grid border traces (css/style.css)
  // meet. Each trace toggles direction (animation-direction: alternate)
  // right at that meeting instead of continuing past it, so the "meet"
  // still happens at the top edge at the start of each 6s round-trip and
  // at the bottom edge halfway through it — same phase math either way.
  function initAboutDuoBorderSpark() {
    const grid = document.querySelector(".about-duo-grid");
    const canvas = grid?.querySelector(".border-spark-canvas");
    if (!grid || !canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const GOLD = ["255, 244, 214", "247, 190, 73", "217, 148, 31"];
    const CYCLE_MS = 6000;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles = [];

    function resize() {
      const rect = grid.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function spawnBurst(originY, directionY) {
      const originX = width / 2;
      for (let i = 0; i < 34; i++) {
        const angle = (Math.random() - 0.5) * Math.PI * 0.9;
        const speed = 0.6 + Math.random() * 1.8;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.sin(angle) * speed,
          vy: Math.cos(angle) * speed * directionY,
          size: 1 + Math.random() * 1.8,
          life: 1,
          fade: 0.02 + Math.random() * 0.02,
          color: GOLD[i % GOLD.length]
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= 0.97;
        p.vy = p.vy * 0.97 + 0.03;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.fade;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = `rgba(${p.color}, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    function repeat(fn, delay) {
      window.setTimeout(function fire() {
        fn();
        window.setTimeout(fire, CYCLE_MS);
      }, Math.max(delay, 0));
    }

    // The CSS border-trace (::before/::after on this element, css/style.css)
    // starts as soon as the page applies styles — long before this deferred
    // script finishes loading three.js/anime.js and runs. Starting the burst
    // timers from "now" instead of the trace's own clock left the spark
    // trailing the actual meeting point by however long that load took. The
    // Web Animations API exposes the trace's real start time, so phase-align
    // to that instead of to script-init time. document.getAnimations() (not
    // element.getAnimations({subtree:true})) is used because it reliably
    // reports pseudo-element animations across browsers.
    let traceStart = null;
    if (typeof document.getAnimations === "function") {
      const traceAnim = document
        .getAnimations()
        .find((a) => a.animationName === "aboutDuoBorderTraceCCW");
      if (traceAnim && typeof traceAnim.startTime === "number") {
        traceStart = traceAnim.startTime;
      }
    }

    const now = (document.timeline && document.timeline.currentTime) || performance.now();
    const elapsed = traceStart === null ? 0 : now - traceStart;
    const phase = ((elapsed % CYCLE_MS) + CYCLE_MS) % CYCLE_MS;

    // Each color only ever reaches the midpoint of the top/bottom edge
    // (css/style.css caps them at 50% instead of the far corner), so
    // unlike a full-edge sweep they don't share any pixels until the exact
    // instant both arrive at that midpoint — no "first contact precedes
    // full overlap" gap to account for. That instant is also where each
    // line reverses direction, at phase 0 (top) and CYCLE_MS/2 (bottom).
    const topMeetPhase = 0;
    const bottomMeetPhase = CYCLE_MS / 2;

    repeat(() => spawnBurst(0, 1), (topMeetPhase - phase + CYCLE_MS) % CYCLE_MS);
    repeat(() => spawnBurst(height, -1), (bottomMeetPhase - phase + CYCLE_MS) % CYCLE_MS);
  }

  function setupProductsStageCarousel() {
    const carousel = document.querySelector(".products-coverflow");
    const modal = document.getElementById("product-stage-modal");
    if (!carousel || !window.Swiper) return;

    renderProductsStageSlides();
    state.productsStageSwiper = createProductsStageSwiper(carousel);
    setupProductsStageAutoplayHover(carousel, state.productsStageSwiper);
    setupProductsFeatureReveal(state.productsStageSwiper);

    function closeStageModal() {
      if (!modal) return;
      modal.hidden = true;
      document.body.classList.remove("modal-open");
    }

    function openStageModal(product) {
      if (!modal || !product) return;
      const title = product.name?.[state.lang] || product.name?.en || "";
      const description = product.description?.[state.lang] || product.short?.[state.lang] || product.description?.en || product.short?.en || "";
      const packaging = product.packaging?.[state.lang] || product.spec?.[state.lang] || product.packaging?.en || product.spec?.en || "-";
      const storage = product.storage?.[state.lang] || product.storage?.en || "-";
      const origin = product.origin?.[state.lang] || product.origin?.en || "-";

      document.getElementById("stage-modal-image").src = product.image;
      document.getElementById("stage-modal-image").alt = product.alt?.[state.lang] || product.alt?.en || title;
      document.getElementById("stage-modal-title").textContent = title;
      document.getElementById("stage-modal-description").textContent = description;
      document.getElementById("stage-modal-carton").textContent = packaging;
      document.getElementById("stage-modal-pallet").textContent = origin;
      document.getElementById("stage-modal-storage").textContent = storage;
      document.getElementById("stage-modal-ean").textContent = product.ean || "-";
      document.getElementById("stage-modal-weight").textContent = productWeight(product);
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
        rotate: 32,
        stretch: 10,
        depth: 300,
        modifier: 1.1,
        scale: 0.88,
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

  function restartProductsFeatureReveal() {
    const featureBar = document.querySelector(".products-feature-bar");
    if (!featureBar) return;
    featureBar.classList.remove("is-revealing");
    void featureBar.offsetWidth;
    featureBar.classList.add("is-revealing");
  }

  function setupProductsFeatureReveal(swiper) {
    if (!swiper?.on) return;
    restartProductsFeatureReveal();
    swiper.on("slideChangeTransitionStart", restartProductsFeatureReveal);
  }

  function productText(value, lang = state.lang) {
    if (!value || typeof value !== "object") return value || "";
    return value[lang] || value.en || "";
  }

  function extractWeight(text) {
    const match = String(text || "").match(/\b\d+(?:[.,]\d+)?\s?(?:kg|g)\b/i);
    return match ? match[0].replace(/\s+/g, "") : "400g";
  }

  function productWeight(product) {
    const weights = {
      coriander: "200g",
      "okra-zero": "750g"
    };
    return product.weight || weights[product.id] || extractWeight(product.spec?.[state.lang] || product.spec?.en || product.packaging?.[state.lang] || product.packaging?.en);
  }

  function renderProductsStageSlides() {
    const wrapper = document.querySelector(".products-coverflow .swiper-wrapper");
    if (!wrapper || !window.products?.length) return;
    const shortNames = {
      en: {
        "ardh-shawki": "خرشوف أقراص (أرضي شوكي)",
        "coriander": "كزبرة ناعمة",
        "eggplant": "باذنجان مشوي (مهروس)",
        "falafel": "فلافل",
        "foul": "فول أخضر (حبة كاملة)",
        "green-bean": "فاصوليا خضراء",
        "mango": "شرائح المانجو",
        "mlokhya-leafs": "ملوخية ورق",
        "mlokhya": "ملوخية ناعمة",
        "peas-carrots": "بازلاء مع جزر",
        "peas": "بازلاء خضراء",
        "peeled-foul": "فول مُقشر",
        "okra-zero": "بامية ممتازة (زيرو)",
        "okra-f1": "بامية (F1)",
        "okra-extra": "بامية إكسترا (فاين)"
      },
      de: {
        "ardh-shawki": "Artischockenböden",
        "coriander": "Koriander fein gehackt",
        "eggplant": "Geröstete Auberginenpaste",
        "foul": "Dicke Bohnen",
        "green-bean": "Junge Brechbohnen",
        "mango": "Mango in Streifen",
        "mlokhya-leafs": "Molokhia (Blätter)",
        "mlokhya": "Molokhia (gehackt)",
        "peas-carrots": "Erbsen & Karotten",
        "peas": "Grüne Erbsen",
        "peeled-foul": "Saubohnen (geschält)",
        "okra-zero": "Okraschoten (Zero)",
        "okra-f1": "Okraschoten F1",
        "okra-extra": "Okra Extra (Fein)"
      }
    };
    wrapper.innerHTML = window.products.filter((product) => product.category === "vegetables").map((product) => {
      const name = shortNames[state.lang]?.[product.id] || productText(product.name, state.lang);
      const weight = productWeight(product);
      const halalAlt = state.lang === "de" ? "Halal zertifiziert" : "Halal certified";
      const nameDir = state.lang === "en" ? ' dir="rtl" lang="ar"' : "";
      return `
        <article class="swiper-slide product-stage-card" data-product-id="${product.id}">
          <img class="product-stage-badge" src="assets/images/halal.png" alt="${halalAlt}" loading="lazy">
          <img class="product-stage-image" src="${product.image}" alt="${productText(product.alt, state.lang) || name}" loading="lazy">
          <div class="product-stage-label"><h3${nameDir}>${name} (${weight})</h3></div>
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
    setupProductsFeatureReveal(state.productsStageSwiper);
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

  function initScrollReveal() {
    const targets = document.querySelectorAll(
      ".why-choose .why-card-grid, .why-choose .pillar-panel, .why-choose .pillar-item, " +
      ".contact-command-heading, .team-showcase-heading, .about-story, .contact-signal, .contact-team-card, .team-alt-row, .team-plain-row, .contact-map-frame"
    );
    if (!targets.length) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px" });
    targets.forEach((el) => observer.observe(el));
  }

  function setupAutoHideChrome() {
    const header = document.querySelector(".site-header");
    const floating = document.body.dataset.page === "contact" ? null : document.querySelector(".floating-social");
    if (!header && !floating) return;

    const IDLE_DELAY = 8000;
    let idleTimer = null;

    function isMenuOpen() {
      return document.querySelector(".primary-nav")?.classList.contains("open");
    }

    function show() {
      header?.classList.remove("is-chrome-hidden");
      floating?.classList.add("-visible");
    }

    function hide() {
      if (isMenuOpen()) return;
      header?.classList.add("is-chrome-hidden");
      floating?.classList.remove("-visible");
    }

    function scheduleHide() {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(hide, IDLE_DELAY);
    }

    function handleActivity() {
      show();
      scheduleHide();
    }

    window.setTimeout(handleActivity, 1000);

    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });
    window.addEventListener("pointerdown", handleActivity, { passive: true });
    window.addEventListener("scroll", handleActivity, { passive: true });
    header?.addEventListener("focusin", handleActivity);
    floating?.addEventListener("focusin", handleActivity);
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
        const weightBadge = product.category === "vegetables" ? `<span class="product-card-weight">${productWeight(product)}</span>` : "";
        card.innerHTML = `
          ${weightBadge}
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
    document.body.classList.add("modal-open");
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
    document.body.classList.remove("modal-open");
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
      window.location.href = `mailto:info@orientwelt.com?subject=${subject}&body=${body}`;
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
      if (root._logo) {
        root._logo.dispose();
      }
      if (window.am5themes_Animated) {
        root.setThemes([am5themes_Animated.new(root)]);
      }

      const chart = root.container.children.push(am5map.MapChart.new(root, {
        projection: am5map.geoOrthographic(),
        panX: "rotateX",
        panY: "rotateY",
        wheelY: "none",
        rotationX: -42,
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

      root.events.on("disposed", function () {
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
    // Arabic (and other cursive/joining scripts) render as isolated, disconnected
    // glyphs if split into one span per character, so animate those as a single
    // unit instead of letter-by-letter.
    const isJoiningScript = getComputedStyle(container).direction === "rtl";

    function splitLetters(word) {
      const content = word.getAttribute("data-word-text") || word.textContent.trim();
      word.setAttribute("data-word-text", content);
      word.innerHTML = "";
      const letters = [];
      if (isJoiningScript) {
        const unit = document.createElement("span");
        unit.className = "letter";
        unit.textContent = content;
        word.appendChild(unit);
        letters.push(unit);
      } else {
        for (let i = 0; i < content.length; i++) {
          const letter = document.createElement("span");
          letter.className = "letter";
          letter.innerHTML = content.charAt(i) === " " ? "&nbsp;" : content.charAt(i);
          word.appendChild(letter);
          letters.push(letter);
        }
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
    if (document.body.dataset.lang) {
      state.lang = document.body.dataset.lang;
    }
    setupNavigation();
    setupCarousel();
    initHomeShaderBackground();
    setupHomeHeroScrollEffect();
    setupStoryParallax();
    initHandwrittenHeading();
    initAboutDuoBorderSpark();
    setupProductsStageCarousel();
    setupProductsStageSnap();
    initScrollReveal();
    setupAutoHideChrome();
    setupModal();
    setupContactForm();
    initGlobalTradeGlobe();
    applyTranslations();
    initRotatingText();
  });
})();
