/* =========================================================
   Utilidades y estado
========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const header = $("#header");
const nav = $("#nav");
const navToggle = $("#navToggle");
const toTopBtn = $("#toTop");
const yearEl = $("#year");

/* Año en footer */

if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================================================
   Navegación móvil (toggle accesible) + bloqueo scroll
========================================================= */
const closeMenu = () => {
  if (!nav || !navToggle) return;
  nav.classList.remove("nav--open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menú");
  document.body.classList.remove("menu-open");
};

const openMenu = () => {
  if (!nav || !navToggle) return;
  nav.classList.add("nav--open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Cerrar menú");
  document.body.classList.add("menu-open");
};

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  // Cerrar al hacer click en enlaces
  $$(".nav__link", nav).forEach((link) => {
    link.addEventListener("click", () => {
      // Sólo cierra si estamos en layout móvil (el toggle es visible)
      if (getComputedStyle(navToggle).display !== "none") closeMenu();
    });
  });

  // Cerrar con ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Al pasar a desktop, asegura estado consistente
  const mqDesktop = window.matchMedia("(min-width: 920px)");
  const syncWithMQ = () => {
    if (mqDesktop.matches) {
      // Estado desktop: menú siempre visible, sin clase abierta ni bloqueo
      document.body.classList.remove("menu-open");
      nav.classList.remove("nav--open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  };
  mqDesktop.addEventListener?.("change", syncWithMQ);
  syncWithMQ();
}

/* =========================================================
   Header en scroll: sombra + "shrink"
========================================================= */
const onScrollHeader = () => {
  const y = window.scrollY;
  if (!header) return;
  if (y > 8) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
window.addEventListener("scroll", onScrollHeader, { passive: true });
onScrollHeader();

/* =========================================================
   Botón "Volver arriba"
========================================================= */
const onScrollTopBtn = () => {
  if (!toTopBtn) return;
  if (window.scrollY > 600) toTopBtn.classList.add("show");
  else toTopBtn.classList.remove("show");
};
window.addEventListener("scroll", onScrollTopBtn, { passive: true });
onScrollTopBtn();

if (toTopBtn) {
  toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Cambiar logo de acuerdo al tema */
// if (document.body.classList.contains("theme-light-slate")) {
//   $("#brandLogo").src = "assets/imagenes/logo_black.png";
// }

/* ===== Tema claro/oscuro SOLO header ===== */
(() => {
  const STORAGE_KEY = "ui-theme"; // 'light' | 'dark'
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const osPrefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  )?.matches;
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial = saved ?? (osPrefersDark ? "dark" : "light");
  applyTheme(initial, false);

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change", (e) => {
    const userForced = localStorage.getItem(STORAGE_KEY);
    if (userForced) return;
    applyTheme(e.matches ? "dark" : "light");
  });

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  function applyTheme(mode, animate = true) {
    root.setAttribute("data-theme", mode);
    btn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
    if (animate) {
      root.style.transition = "background .001s";
      setTimeout(() => {
        root.style.transition = "";
      }, 50);
    }
  }
})();
