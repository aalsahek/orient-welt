/*
 * Infinite parallax product gallery.
 * Reference: CodePen /ol-ivier/pen/LERzpKJ (Three.js infinite scrolling image wall),
 * rebuilt with Orient Welt product imagery and adapted for the site's design system.
 */
(function () {
  function init() {
    const container = document.getElementById("product-wall-canvas");
    if (!container) return;

    const loadingEl = document.getElementById("product-wall-loading");
    const hintEl = document.getElementById("product-wall-hint");

    if (!window.THREE) {
      if (loadingEl) {
        loadingEl.textContent = document.documentElement.lang === "de"
          ? "Die Produktgalerie konnte nicht geladen werden."
          : "تعذّر تحميل المعرض التفاعلي. يرجى التحقق من الاتصال بالإنترنت.";
      }
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DEPTH_LAYERS = 5;
    const IMAGES_PER_LAYER = 6;
    const MAX_WIDTH = 130;
    const MAX_HEIGHT = 130;
    const LAYER_CONFIG = [
      { scale: 1.5, speed: 46, opacity: 1 },
      { scale: 1.15, speed: 30, opacity: .82 },
      { scale: .9, speed: 20, opacity: .64 },
      { scale: .7, speed: 13, opacity: .46 },
      { scale: .55, speed: 9, opacity: .32 }
    ];
    const IMAGE_PATHS = [
      "assets/images/products/bags/mango.png",
      "assets/images/products/bags/okra-f1.png",
      "assets/images/products/bags/okra-extra.png",
      "assets/images/products/bags/okra-zero.png",
      "assets/images/products/bags/green-bean.png",
      "assets/images/products/bags/green-ful.png",
      "assets/images/products/bags/peeled-ful.png",
      "assets/images/products/bags/peas.png",
      "assets/images/products/bags/carrot-peas.png",
      "assets/images/products/bags/mlokhya.png",
      "assets/images/products/bags/mlokhya-leavs.png",
      "assets/images/products/bags/falafel.png",
      "assets/images/products/bags/grilled-eggplant.png",
      "assets/images/products/bags/Chopped Coriander.png",
      "assets/images/products/bags/Ardh Shawki (Artichoke Bottoms).png"
    ];
    const FALLBACK_COLORS = ["#177bb2", "#1c6c94", "#215b78", "#264a5c", "#2a3c48"];
    const TOTAL = DEPTH_LAYERS * IMAGES_PER_LAYER;

    let layers = [];
    const textures = [];
    let loaded = 0;
    let lastTime = 0;
    let dragActive = false;
    let lastX = 0;
    let dragVelocity = 0;
    let speedFactor = reduceMotion ? 0 : 1;
    let shuffledImages = [];
    let currentImageIndex = 0;
    let camera;

    function shuffleArray(array) {
      const result = array.slice();
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    }

    function getNextRandomImage() {
      if (currentImageIndex >= shuffledImages.length) {
        shuffledImages = shuffleArray(IMAGE_PATHS);
        currentImageIndex = 0;
      }
      return shuffledImages[currentImageIndex++];
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function fallbackTexture(layerIndex) {
      const canvas = document.createElement("canvas");
      canvas.width = MAX_WIDTH;
      canvas.height = MAX_HEIGHT;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = FALLBACK_COLORS[layerIndex] || "#177bb2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return new THREE.CanvasTexture(canvas);
    }

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    for (let l = 0; l < DEPTH_LAYERS; l++) layers[l] = [];

    function resize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      if (!camera) {
        camera = new THREE.OrthographicCamera(0, w, h, 0, -1000, 1000);
        camera.position.z = 10;
      } else {
        camera.right = w;
        camera.top = h;
        camera.updateProjectionMatrix();
      }
      for (const sprites of layers) {
        if (!sprites) continue;
        for (const s of sprites) {
          scene.remove(s);
          if (s.material.map) s.material.map.dispose();
          s.material.dispose();
          s.geometry.dispose();
        }
      }
      layers = [];
      for (let l = 0; l < DEPTH_LAYERS; l++) layers[l] = [];
      if (textures.length === TOTAL) fillViewport();
    }
    window.addEventListener("resize", resize);
    resize();

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";

    function loadAll() {
      shuffledImages = shuffleArray(IMAGE_PATHS);
      currentImageIndex = 0;
      for (let l = 0; l < DEPTH_LAYERS; l++) {
        for (let i = 0; i < IMAGES_PER_LAYER; i++) {
          const path = getNextRandomImage();
          const layerIndex = l;
          loader.load(path, (tex) => onLoaded(tex), undefined, () => onLoaded(fallbackTexture(layerIndex)));
        }
      }
    }

    function onLoaded(tex) {
      textures.push(tex);
      loaded++;
      if (loaded === TOTAL) initSprites();
    }

    function initSprites() {
      fillViewport();
      if (loadingEl) loadingEl.hidden = true;
      if (hintEl) hintEl.hidden = false;
      lastTime = performance.now();
      animate();
    }

    function addSprite(layerIndex, startX) {
      const cfg = LAYER_CONFIG[layerIndex];
      const texIndex = Math.floor(Math.random() * textures.length);
      const texture = textures[texIndex] || fallbackTexture(layerIndex);
      const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: cfg.opacity });
      const sprite = new THREE.Sprite(mat);
      const image = texture.image;
      let width = MAX_WIDTH;
      let height = MAX_HEIGHT;
      if (image && image.width && image.height) {
        const ratio = image.width / image.height;
        if (ratio > 1) {
          width = MAX_WIDTH;
          height = MAX_WIDTH / ratio;
        } else {
          height = MAX_HEIGHT;
          width = MAX_HEIGHT * ratio;
        }
      }
      const sizeVar = rand(.85, 1.15);
      const w = width * cfg.scale * sizeVar;
      const h = height * cfg.scale * sizeVar;
      const spacing = w * rand(.5, .9);
      sprite.scale.set(w, h, 1);
      sprite.position.set(startX + w / 2 + spacing, rand(h / 2, container.clientHeight - h / 2), -layerIndex * 50);
      sprite.userData = {
        speed: cfg.speed * rand(.45, 1.15),
        width: w,
        height: h,
        seed: rand(0, 1000),
        baseY: sprite.position.y,
        opacity: cfg.opacity
      };
      layers[layerIndex].push(sprite);
      scene.add(sprite);
      return sprite;
    }

    function cleanupSprites() {
      const w = container.clientWidth;
      const bufferZone = w * .5;
      for (let l = 0; l < DEPTH_LAYERS; l++) {
        const sprites = layers[l];
        if (!sprites || !sprites.length) continue;
        const maxSprites = IMAGES_PER_LAYER + 3;
        if (sprites.length > maxSprites) {
          for (let i = sprites.length - 1; i >= 0; i--) {
            const s = sprites[i];
            const ud = s.userData;
            let shouldRemove = false;
            if (speedFactor > 0) shouldRemove = (s.position.x - ud.width / 2) > (w + bufferZone);
            else if (speedFactor < 0) shouldRemove = (s.position.x + ud.width / 2) < (-bufferZone);
            if (shouldRemove) {
              scene.remove(s);
              if (s.material.map) s.material.map.dispose();
              s.material.dispose();
              sprites.splice(i, 1);
              if (sprites.length <= maxSprites) break;
            }
          }
        }
      }
    }

    function fillViewport() {
      const w = container.clientWidth;
      for (let l = 0; l < DEPTH_LAYERS; l++) {
        let sprites = layers[l];
        if (!sprites) continue;
        let rightMost = sprites.length > 0
          ? Math.max(...sprites.map((s) => s.position.x + s.userData.width / 2))
          : -w * 1.2;
        while (rightMost < w) {
          addSprite(l, rightMost);
          sprites = layers[l];
          rightMost = Math.max(...sprites.map((s) => s.position.x + s.userData.width / 2));
        }
      }
    }

    function animate() {
      const now = performance.now();
      const dt = Math.min(40, now - lastTime) / 1000;
      lastTime = now;
      const w = container.clientWidth;
      dragVelocity *= .92;
      speedFactor = dragVelocity !== 0 ? Math.sign(dragVelocity) : speedFactor;
      if (Math.random() < .01) cleanupSprites();
      for (const sprites of layers) {
        if (!sprites || !sprites.length) continue;
        for (const s of sprites) {
          const ud = s.userData;
          s.position.x += ud.speed * speedFactor * dt;
          if (speedFactor > 0 && s.position.x - ud.width / 2 > w) {
            s.position.x = -ud.width / 2 - rand(0, ud.width);
          } else if (speedFactor < 0 && s.position.x + ud.width / 2 < 0) {
            s.position.x = w + ud.width / 2 + rand(0, ud.width);
          }
          const pulse = 1 + Math.sin(now * .001 + ud.seed) * .015;
          s.scale.x = ud.width * pulse;
          s.scale.y = ud.height * pulse;
          s.position.y = ud.baseY + Math.sin(now * .001 + ud.seed) * 5;
          s.material.opacity = ud.opacity;
        }
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    loadAll();

    function getX(e) {
      return e.touches ? e.touches[0].clientX : e.clientX;
    }
    container.addEventListener("mousedown", (e) => {
      dragActive = true;
      lastX = getX(e);
    });
    container.addEventListener("mousemove", (e) => {
      if (!dragActive) return;
      const x = getX(e);
      dragVelocity = (x - lastX) * .02;
      lastX = x;
    });
    window.addEventListener("mouseup", () => { dragActive = false; });
    container.addEventListener("touchstart", (e) => {
      dragActive = true;
      lastX = getX(e);
    }, { passive: true });
    container.addEventListener("touchmove", (e) => {
      if (!dragActive) return;
      const x = getX(e);
      dragVelocity = (x - lastX) * .02;
      lastX = x;
    }, { passive: true });
    window.addEventListener("touchend", () => { dragActive = false; });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
