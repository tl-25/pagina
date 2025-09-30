// ===================== GALERÍA DE VIDEOS — JS (FIX CONTROLES / LAYOUT) =====================
(() => {
  const grid = document.getElementById("vidsGrid");
  const lb = document.getElementById("vlightbox");
  const stage = document.getElementById("vlightboxStage");
  const title = document.getElementById("vlightboxTitle");
  const prev = lb?.querySelector(".vprev");
  const next = lb?.querySelector(".vnext");
  if (!grid || !lb || !stage) return;

  // --- Filtros ---
  const chips = Array.from(document.querySelectorAll(".vids__filters .chip"));
  const cards = Array.from(grid.querySelectorAll(".vcard"));
  const applyFilter = (cat) => {
    chips.forEach((c) =>
      c.classList.toggle(
        "is-active",
        c.dataset.filter === cat ||
          (cat === "all" && c.dataset.filter === "all")
      )
    );
    cards.forEach((card) => {
      const cats = (card.getAttribute("data-cat") || "")
        .split(",")
        .map((s) => s.trim());
      const show = cat === "all" || cats.includes(cat);
      if (show) {
        card.hidden = false;
        requestAnimationFrame(() => card.classList.remove("is-hiding"));
      } else {
        card.classList.add("is-hiding");
        setTimeout(() => (card.hidden = true), 160);
      }
    });
  };
  chips.forEach((chip) =>
    chip.addEventListener("click", () =>
      applyFilter(chip.dataset.filter || "all")
    )
  );
  applyFilter("all");

  // --- Helpers player ---
  const withControls = (src) => {
    try {
      const u = new URL(src, location.href);
      if (u.hostname.includes("youtube.com")) {
        if (!u.searchParams.has("controls"))
          u.searchParams.set("controls", "1");
        if (!u.searchParams.has("playsinline"))
          u.searchParams.set("playsinline", "1");
      }
      return u.toString();
    } catch {
      return src;
    }
  };
  const getItems = () =>
    Array.from(grid.querySelectorAll(".vcard:not([hidden]) .vcard__btn"));
  let idx = -1;

  // --- Open/Close ---
  const open = (i) => {
    const items = getItems();
    if (!items.length) return;
    idx = (i + items.length) % items.length;
    const el = items[idx];

    const raw = el.getAttribute("data-video") || "";
    const src = withControls(raw);
    const provider = (el.getAttribute("data-provider") || "").toLowerCase();
    const ttl = el.getAttribute("data-title") || "Video";

    stage.innerHTML = "";
    let node;
    if (provider === "mp4" || /\.mp4(\?|$)/i.test(src)) {
      node = document.createElement("video");
      node.src = src;
      node.controls = true;
      node.playsInline = true;
      node.autoplay = true;
    } else {
      node = document.createElement("iframe");
      node.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      node.referrerPolicy = "strict-origin-when-cross-origin";
      node.allowFullscreen = true;
      node.src = src;
      node.title = ttl;
    }
    stage.appendChild(node);
    title.textContent = ttl;

    lb.hidden = false;
    document.body.style.overflow = "hidden";

    // focus seguro
    requestAnimationFrame(() => lb.querySelector(".vlightbox__close")?.focus());
  };

  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    stage.innerHTML = "";
    idx = -1;
  };

  // Abrir desde cards
  grid.querySelectorAll(".vcard__btn").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const items = getItems();
      const realIndex = items.indexOf(btn);
      open(realIndex >= 0 ? realIndex : i);
    });
  });

  // Navegación
  const goPrev = () => open(idx - 1);
  const goNext = () => open(idx + 1);

  prev?.addEventListener("click", goPrev);
  next?.addEventListener("click", goNext);

  // Cerrar: backdrop, botón, ESC
  lb.addEventListener("click", (e) => {
    const t = e.target;
    if (t instanceof Element && (t.hasAttribute("data-close") || t === lb))
      close();
  });
  window.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") goPrev();
    else if (e.key === "ArrowRight") goNext();
  });

  // Swipe en el stage (móvil)
  (() => {
    let sx = 0,
      sy = 0,
      dx = 0,
      dy = 0;
    const onStart = (e) => {
      const t = e.touches?.[0];
      if (!t) return;
      sx = t.clientX;
      sy = t.clientY;
      dx = dy = 0;
    };
    const onMove = (e) => {
      const t = e.touches?.[0];
      if (!t) return;
      dx = t.clientX - sx;
      dy = t.clientY - sy;
    };
    const onEnd = () => {
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy))
        dx > 0 ? goPrev() : goNext();
      sx = sy = dx = dy = 0;
    };
    stage.addEventListener("touchstart", onStart, { passive: true });
    stage.addEventListener("touchmove", onMove, { passive: true });
    stage.addEventListener("touchend", onEnd);
  })();
})();
