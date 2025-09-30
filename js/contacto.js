// ==== Manejo del formulario (ficticio, validación nativa + mensaje) ====
(() => {
  const form = document.getElementById("formContacto");
  if (!form) return;
  const status = form.querySelector(".form__status");

  const setError = (field, msg) => {
    const err = field.parentElement.querySelector(".error");
    field.classList.add("is-invalid");
    if (err) err.textContent = msg || "";
  };
  const clearError = (field) => {
    const err = field.parentElement.querySelector(".error");
    field.classList.remove("is-invalid");
    if (err) err.textContent = "";
  };

  form.addEventListener("input", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement))
      return;
    if (el.checkValidity()) clearError(el);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "";

    let valid = true;
    const required = ["nombre", "email", "asunto", "mensaje", "consent"];
    required.forEach((id) => {
      const el = form.querySelector("#" + id);
      if (!el) return;
      if (el.type === "checkbox") {
        if (!el.checked) {
          valid = false;
          setError(el, "Requerido");
        } else clearError(el);
      } else {
        if (!el.checkValidity()) {
          valid = false;
          setError(el, "Revisa este campo");
        } else clearError(el);
      }
    });

    if (!valid) {
      status.textContent = "Por favor completa los campos requeridos.";
      return;
    }

    // Simulación de envío (aquí integrarías tu backend)
    status.textContent = "¡Mensaje enviado! Te responderemos pronto.";
    form.reset();
  });
})();

// Activar animación del título de contacto (sin depender de otras clases)
(() => {
  const h2 = document.getElementById("titulo-contacto");
  if (!h2) return;

  const play = () => h2.classList.add("is-playing");

  const isOnScreen = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < innerHeight * 0.9 && r.bottom > innerHeight * 0.1;
  };

  // si ya está visible al cargar
  if (isOnScreen(h2)) play();

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            play();
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(h2);
  } else {
    // fallback simple
    const onScroll = () => {
      if (isOnScreen(h2)) {
        play();
        removeEventListener("scroll", onScroll);
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
  }
})();

// ==== Reveal al hacer scroll (aplica .is-visible a .reveal-up) ====
(() => {
  const items = Array.from(document.querySelectorAll(".reveal-up"));
  if (!items.length || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  items.forEach((el) => io.observe(el));
})();
