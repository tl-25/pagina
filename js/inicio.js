/* Guardas de elementos existentes para prevenir errores */

const track = $("#testimonialTrack");

/* =========================================================
   Carrusel de testimonios (simple sin dependencias)
========================================================= */
(() => {
  const track = $("#testimonialTrack");
  const prev = $(".testimonial .prev");
  const next = $(".testimonial .next");
  if (!track || !prev || !next) return;

  const move = (dir = 1) => {
    const width = track.clientWidth;
    track.scrollBy({ left: dir * width, behavior: "smooth" });
  };
  prev.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
})();

/* =========================================================
   Acordeón accesible: mejorar <details>
========================================================= */
$$(".accordion__item").forEach((d) => {
  d.addEventListener("toggle", () => {
    if (d.open) {
      $$(".accordion__item").forEach((o) => {
        if (o !== d) o.open = false;
      });
    }
  });
});

/* =========================================================
   Respeta prefers-reduced-motion
========================================================= */
try {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) document.documentElement.style.scrollBehavior = "auto";
} catch (_) {
  /* noop */
}

/* ===== Scroll vertical → desplazamiento horizontal robusto ===== */
(() => {
  const section = document.getElementById("hscroll");
  const sticky = section?.querySelector(".hscroll__sticky");
  const track = section?.querySelector("#hTrack");
  if (!section || !sticky || !track) return;

  let vw = window.innerWidth,
    vh = window.innerHeight;
  let trackW = 0,
    maxX = 0,
    maxY = 0,
    startY = 0;

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function measure() {
    // Medimos de nuevo por si cambió el layout (breakpoints, fuentes, etc.)
    vw = window.innerWidth;
    vh = window.innerHeight;
    trackW = Math.round(track.scrollWidth); // ancho real del track
    maxX = Math.max(0, trackW - vw); // cuánto hay que mover en X
    // Altura total que debe recorrer la sección = desplazamiento horizontal + 1 viewport
    maxY = Math.max(vh, maxX + vh);
    section.style.height = `${maxY}px`;

    // Punto inicial (offset) de la sección en el documento
    const rect = section.getBoundingClientRect();
    startY = window.scrollY + rect.top; // posición Y absoluta de la sección
    // Ajusta inmediatamente el transform al estado actual del scroll
    onScroll();
  }

  function onScroll() {
    const scrollY = window.scrollY;
    // Progreso vertical dentro de la sección
    const y = clamp(scrollY - startY, 0, maxY - vh);
    const progress = maxY > vh ? y / (maxY - vh) : 0;
    const x = -progress * maxX;
    track.style.transform = `translate3d(${x}px,0,0)`;
  }

  // Observers que re-miden cuando algo cambie su tamaño
  const ro = new ResizeObserver(() => measure());
  ro.observe(track);
  ro.observe(sticky);
  window.addEventListener("resize", measure);
  window.addEventListener("orientationchange", measure);
  window.addEventListener("scroll", onScroll, { passive: true });

  // Recalcular tras cargar fuentes/imagenes (evita “me quedé sin elementos”)
  window.addEventListener("load", measure);
  document.fonts?.ready?.then?.(() => measure());
  // Por si hay imágenes internas (si las agregas después)
  track.querySelectorAll("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", measure, { once: true });
  });

  // Init
  measure();
})();

// Añade .is-revealed a las .gcard cuando entren por primera vez al viewport
(() => {
  const cards = Array.from(document.querySelectorAll(".gcard"));
  if (!cards.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-revealed");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  cards.forEach((c) => io.observe(c));
})();

// Si el header existe, aplica una animación suave al cargar (sin ocultarlo si falla)
(() => {
  const h = document.getElementById("header");
  if (!h) return;
  // Remueve cualquier transform heredado de estilos antiguos
  h.style.transform = "translateY(0)";
  h.style.opacity = "1";
  // Activa animación autocontenida
  requestAnimationFrame(() => h.classList.add("animate-in"));
})();

/* =========================================================
   Smooth scroll + resalte de link activo
========================================================= */
const navLinks = $$(".nav__link");
navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#")) return;
  link.addEventListener("click", (e) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", href);
  });
});

// Observa secciones para activar link actual
const sections = [
  "#inicio",
  "#ventajas",
  "#servicios",
  "#portafolio",
  "#testimonios",
  "#precios",
  "#faq",
]
  .map((id) => document.querySelector(id))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (!id) return;
        const link = navLinks.find((a) => a.getAttribute("href") === `#${id}`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.5, 1] }
  );
  sections.forEach((sec) => io.observe(sec));
}

(function () {
  const root = document.querySelector(".carousel");
  if (!root) return;
  const slides = Array.from(root.querySelectorAll(".carousel__slide"));
  if (slides.length <= 1) return;

  // Lee --hold y --fade (admite "ms" o "s")
  const ms = (v) =>
    v.endsWith("ms")
      ? parseFloat(v)
      : v.endsWith("s")
      ? parseFloat(v) * 1000
      : parseFloat(v) || 0;

  const cs = getComputedStyle(root);
  const HOLD = ms(cs.getPropertyValue("--hold")) || 3500;
  const FADE = ms(cs.getPropertyValue("--fade")) || 600;
  const INTERVAL = HOLD; // mostramos durante HOLD; el fade lo hace la transición

  let idx = 0,
    timer = null,
    paused = false;

  function show(i) {
    slides.forEach((el, j) => el.classList.toggle("is-active", j === i));
  }

  function tick() {
    idx = (idx + 1) % slides.length;
    show(idx);
    schedule(INTERVAL);
  }

  function schedule(delay) {
    clearTimeout(timer);
    timer = setTimeout(tick, delay);
  }

  function setPaused(p) {
    if (paused === p) return;
    paused = p;
    if (paused) {
      clearTimeout(timer);
      timer = null;
    } else {
      schedule(INTERVAL);
    }
  }

  // Init
  show(0);
  schedule(INTERVAL);

  // Pausa si la pestaña se oculta
  document.addEventListener("visibilitychange", () => {
    setPaused(document.hidden);
  });

  // Pausa si el carrusel sale del viewport (ahorra batería/CPU)
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => setPaused(!e.isIntersecting || document.hidden)),
    { threshold: 0.1 }
  );
  io.observe(root);
})();
