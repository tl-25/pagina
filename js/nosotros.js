// ==== About: contadores animados ====
(() => {
  const nums = Array.from(document.querySelectorAll(".about .stat__num"));
  if (!nums.length) return;

  const animate = (el) => {
    const target = Number(el.dataset.target || "0");
    const dur = 900; // ms
    const start = performance.now();
    const from = 0;
    const fmt = (n) => Math.round(n).toLocaleString();

    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = fmt(from + (target - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const seen = new WeakSet();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !seen.has(e.target)) {
          seen.add(e.target);
          animate(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  nums.forEach((n) => io.observe(n));
})();

// ==== About: progreso de la línea de tiempo ====
(() => {
  const bar = document.querySelector(".about .timeline__bar");
  const list = document.querySelector(".about .timeline");
  if (!bar || !list) return;

  const onScroll = () => {
    const r = list.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = Math.max(0, vh * 0.4 - r.top);
    const total = r.height - vh * 0.2; // recorre entre 10% y 80% del viewport
    const p = Math.max(0, Math.min(1, start / total));
    bar.style.setProperty("--t-progress", `${p * 100}%`);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();

// ==== About: tilt sutil en la imagen si hay puntero (convive con float) ====
(() => {
  const wrap = document.querySelector(".about__media.fx-float3d");
  if (!wrap || !matchMedia("(hover:hover)").matches) return;
  const img = wrap.querySelector("img");
  let raf = 0;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const move = (e) => {
    const r = wrap.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 2 - 1; // -1..1
    const y = ((e.clientY - r.top) / r.height) * 2 - 1;
    const rx = clamp(-y * 6, -8, 8),
      ry = clamp(x * 6, -8, 8);
    if (raf) return;
    raf = requestAnimationFrame(() => {
      img.style.transform = `translateY(0) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      raf = 0;
    });
  };
  const reset = () => {
    img.style.transform = "";
  };
  wrap.addEventListener("mousemove", move);
  wrap.addEventListener("mouseleave", reset);
})();
