(() => {
  // ========= GUARD: evita doble carga del módulo =========
  if (window.__i18nInit) return;
  window.__i18nInit = true;

  // ========= DICCIONARIO (amplía con tus claves) =========
  const I18N = {
    es: {
      "nav.home": "Inicio",
      "nav.services": "Servicios",
      "nav.platforms": "Plataformas",
      "nav.contact": "Contacto",

      "hero.badge1": "🌟 Innovación en cada dimensión 🌟",
      "hero.badge2":
        "Innovación visual y tecnología a la medida desde enero de 2024",
      "hero.description":
        "En Nuvidex diseñamos plataformas personalizadas, sistemas de proyección inteligentes y experiencias visuales interactivas que transforman procesos industriales y espacios creativos. Desde nuestro inicio en enero de 2024, combinamos software propio, hardware especializado y visión artificial para optimizar la producción, capacitar equipos y crear entornos digitales que inspiran y sorprenden.",

      "services.title": "Servicios",
      "services.description":
        "En Nuvidex ofrecemos soluciones integrales diseñadas para adaptarse a las necesidades de cada cliente. Nuestro compromiso es brindar un servicio de calidad, enfocado en la eficiencia, innovación y resultados.",
      "services.map_ind.title": "Mapping industrial",
      "services.map_ind.badge":
        "✨ La innovación que eleva la productividad de la industria ✨",
      "services.map_ind.description":
        "En Nuvidex transformamos el proceso de ensamble con sistemas de proyección inteligentes. Nuestro sistema guía al operador en cada paso, proyectando instrucciones directamente sobre la estación de trabajo y validando el resultado en tiempo real.",
      "services.map_ind.subtitle":
        "Con esta tecnología, garantizamos precisión, velocidad y confiabilidad en cada operación.",
      "services.map_ind.advantage1": "Integraciones avanzadas",
      "services.map_ind.advantage2": "Soporte prioritario",
      "services.map_ind.advantage3": "Entrenamiento de equipo",

      "services.map_int.title": "Mapping interactivo",
      "services.map_int.badge": "✨ La innovación también se puede tocar 👆",
      "services.map_int.description":
        "Nuestro sistema interactivo responde a tu movimiento: no solo ves la tecnología, también la sientes. Cada gesto activa la experiencia, guiando acciones con precisión y fluidez. Es intuitivo, cercano y funcional: convierte cada interacción en una respuesta clara, inmediata y útil.",

      "platforms.title": "Plataformas web",
      "platforms.description":
        "Ofrecemos soluciones de software por medio de nuestras plataformas",

      "platforms.projects.title": "Plataforma de proyectos",
      "platforms.projects.subtitle": "Organice, priorice y avance con claridad",
      "platforms.projects.description":
        "Centralice la planeación de sus proyectos con tareas y subtareas que facilitan el seguimiento diario. Visualice el estado real del trabajo, anticipe cuellos de botella y mantenga a su equipo alineado con objetivos y plazos.",

      "platforms.employees.title": "Plataforma de trabajadores",
      "platforms.employees.subtitle":
        "Productividad del equipo, proyecto por proyecto",
      "platforms.employees.description":
        "Asigne actividades por proyecto, divídalas en subtareas y supervise el progreso de cada colaborador con transparencia. Equilibre cargas de trabajo y tome decisiones informadas para cumplir objetivos sin contratiempos.",

      "platforms.production.title": "Plataforma de gestión de producción",
      "platforms.production.subtitle": "Rendimiento de planta a simple vista",
      "platforms.production.description":
        "Monitoree en tiempo real la cantidad de piezas producidas por máquina. Identifique paros, variaciones y metas cumplidas para ajustar a tiempo y asegurar la continuidad operativa.",

      "platforms.mapping.title": "Plataforma de mapping",
      "platforms.mapping.subtitle":
        "Espacios y procesos explicados de forma visual",
      "platforms.mapping.description":
        "Estandarice y agilice sus procesos de ensamblaje mediante instrucciones proyectadas directamente sobre el área de trabajo. La interfaz interactiva guía paso a paso, resalta piezas y secuencias, y verifica cada avance para reducir error y tiempos de capacitación.",

      "platforms.timeClock.title": "Plataforma checador",
      "platforms.timeClock.subtitle":
        "Control de asistencia confiable y transparente",
      "platforms.timeClock.description":
        "Registre entradas, salidas, tiempos de comida y horas extra con precisión. Obtenga reportes claros para nómina y administración, reduciendo errores y asegurando cumplimiento interno.",

      "contact.title": "Contáctanos",
      "contact.description":
        "Cuéntanos sobre tu proyecto o duda. Estamos listos para ayudarte.",

      "contact.phoneCard": "Teléfonos",
      "contact.mailCard": "Correo",
      "contact.socialCard": "Redes sociales",

      "form.title": "¡Encuentra la respuesta a tu desafío empresarial!",
      "form.name.label": "Nombre",
      "form.email.label": "Correo",
      "form.phone.label": "Teléfono",
      "form.subject.label": "Asunto",
      "form.subject.pHolder": "¿Cómo podemos ayudar?",
      "form.message.label": "Mensaje",
      "form.message.pHolder": "Escribe aquí tu mensaje",
      "form.privacy": "Acepto la política de privacidad",
      "form.button": "Enviar mensaje",

      "footer.title": "Todos los derechos reservados",
    },
    en: {
      "nav.home": "Home",
      "nav.services": "Services",
      "nav.platforms": "Web platforms",
      "nav.contact": "Contact us",

      "hero.badge1": "🌟 Innovation in every dimension 🌟",
      "hero.badge2":
        "Visual innovation and tailor-made technology since January 2024",
      "hero.description":
        "At Nuvidex, we design customized platforms, intelligent projection systems, and interactive visual experiences that transform industrial processes and creative spaces. Since our founding in January 2024, we have combined proprietary software, specialized hardware, and computer vision to optimize production, train teams, and create digital environments that inspire and amaze.",

      "services.title": "Services",
      "services.description":
        "At Nuvidex, we offer comprehensive solutions tailored to each client’s needs. Our commitment is to deliver quality service focused on efficiency, innovation, and results.",
      "services.map_ind.title": "Industrial Mapping",
      "services.map_ind.badge":
        "✨ Innovation that boosts industrial productivity ✨",
      "services.map_ind.description":
        "At Nuvidex, we transform the assembly process with intelligent projection systems. Our solution guides the operator step by step, projecting instructions directly onto the workstation and validating the results in real time.",
      "services.map_ind.subtitle":
        "With this technology, we guarantee precision, speed, and reliability in every operation.",
      "services.map_ind.advantage1": "Advanced Integrations",
      "services.map_ind.advantage2": "Priority Support",
      "services.map_ind.advantage3": "Team Training",

      "services.map_int.title": "Interactive Mapping",
      "services.map_int.badge": "✨ Innovation you can touch 👆",
      "services.map_int.description":
        "Our interactive system responds to your movement: you don’t just see the technology—you feel it. Every gesture activates the experience, guiding actions with precision and fluidity. It’s intuitive, engaging, and functional, turning every interaction into a clear, immediate, and useful response.",

      "platforms.title": "Web platforms",
      "platforms.description":
        "We offer software solutions through our platforms.",

      "platforms.projects.title": "Projects platform",
      "platforms.projects.subtitle":
        "Organize, prioritize, and move forward with clarity",
      "platforms.projects.description":
        "Centralize your project planning with tasks and subtasks that simplify daily tracking. Visualize the real status of the work, anticipate bottlenecks, and keep your team aligned with goals and deadlines.",

      "platforms.employees.title": "Employees Platform",
      "platforms.employees.subtitle": "Team productivity, project by project",
      "platforms.employees.description":
        "Assign activities by project, break them down into subtasks, and monitor each team member’s progress with transparency. Balance workloads and make informed decisions to achieve objectives without setbacks",

      "platforms.production.title": "Production Management Platform",
      "platforms.production.subtitle": "Plant performance at a glance",
      "platforms.production.description":
        "Monitor in real time the number of parts produced by each machine. Identify stoppages, variations, and achieved targets to make timely adjustments and ensure operational continuity.",

      "platforms.mapping.title": "Mapping platform",
      "platforms.mapping.subtitle": "Spaces and processes explained visually",
      "platforms.mapping.description":
        "Standardize and streamline your assembly processes with instructions projected directly onto the workstation. The interactive interface provides step-by-step guidance, highlights parts and sequences, and verifies each step to reduce errors and training time",

      "platforms.timeClock.title": "Attendance platform",
      "platforms.timeClock.subtitle":
        "Reliable and transparent attendance control",
      "platforms.timeClock.description":
        "Record check-ins, check-outs, meal breaks, and overtime with precision. Get clear reports for payroll and administration, reducing errors and ensuring internal compliance",

      "contact.title": "Contact Us",
      "contact.description":
        "Tell us about your project or question. We’re ready to help you.",

      "contact.phoneCard": "Contact numbers",
      "contact.mailCard": "E-mail",
      "contact.socialCard": "Social media",

      "form.title": "Find the answer to your business challenge!",
      "form.name.label": "Name",
      "form.email.label": "E-mail",
      "form.phone.label": "Phone number",
      "form.subject.label": "Subject",

      "form.subject.pHolder": "How can we help?",
      "form.message.label": "Message",
      "form.message.pHolder": "Type your message here",
      "form.privacy": "I agree to the privacy policy",
      "form.button": "Send",

      "footer.title": "All rights reserved",
    },
  };

  // ========= UTILIDADES =========
  const STORAGE_KEY = "ui-lang"; // 'es' | 'en'
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const detectInitial = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
    const nav = (navigator.language || "en").toLowerCase();
    return nav.startsWith("es") ? "es" : "en";
  };

  let currentLang = detectInitial();
  const tr = (key, lang = currentLang) =>
    (I18N[lang] && I18N[lang][key]) || I18N.es[key] || "";

  // ========= APLICADORES (seguros/rápidos) =========
  const setTextIfChanged = (el, text) => {
    if (el.textContent !== text) el.textContent = text;
  };
  const setHTMLIfChanged = (el, html) => {
    if (el.innerHTML !== html) el.innerHTML = html;
  };
  const setAttrIfChanged = (el, attr, val) => {
    if (el.getAttribute(attr) !== val) el.setAttribute(attr, val);
  };

  const translateElement = (el, lang = currentLang) => {
    // data-i18n -> textContent
    if (el.hasAttribute("data-i18n")) {
      const key = el.getAttribute("data-i18n");
      key && setTextIfChanged(el, tr(key, lang));
    }
    // data-i18n-html -> innerHTML (si lo usas)
    if (el.hasAttribute("data-i18n-html")) {
      const key = el.getAttribute("data-i18n-html");
      key && setHTMLIfChanged(el, tr(key, lang));
    }
    // data-i18n-attr -> atributos; separadores , o ;
    if (el.hasAttribute("data-i18n-attr")) {
      const defs = el.getAttribute("data-i18n-attr");
      if (defs) {
        defs.split(/[;,]/).forEach((pair) => {
          const [attr, kraw] = pair.split(":");
          const a = attr && attr.trim();
          const k = kraw && kraw.trim();
          if (!a || !k) return;
          const val = tr(k, lang);
          if (val) setAttrIfChanged(el, a, val);
        });
      }
    }
  };

  const translateTree = (root = document, lang = currentLang) => {
    // Solo recorremos los elementos que tengan nuestros atributos
    const sel = "[data-i18n], [data-i18n-html], [data-i18n-attr]";
    // Incluye root si coincide
    if (root.matches && root.matches(sel)) translateElement(root, lang);
    // Y todos sus descendientes
    $$(sel, root).forEach((el) => translateElement(el, lang));
  };

  // ========= API GLOBAL =========
  const setLang = (lang) => {
    if (!I18N[lang] || lang === currentLang) {
      // si no existe o ya está, no hagas nada
      // sincroniza UI visible por si venimos de recarga
      syncMenuUI(lang);
      return;
    }
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", lang);

    // Pausa el observer mientras traducimos (evita bucles)
    pauseObserver(() => translateTree(document, lang));

    syncMenuUI(lang);
    document.dispatchEvent(
      new CustomEvent("i18n:changed", { detail: { lang } })
    );
  };
  const getLang = () => currentLang;
  window.setLang = setLang;
  window.getLang = getLang;

  // ========= MENÚ (dropdown personalizado) =========
  const root = $("#langMenu");
  const btn = $("#langBtn");
  const list = $("#langMenuList");
  const items = $$(".langmenu__item");

  const syncMenuUI = (lang = getLang()) => {
    const current = $("#langCurrent");
    if (current) current.textContent = (lang || getLang()).toUpperCase();
    items.forEach((it) =>
      it.setAttribute(
        "aria-checked",
        String(it.dataset.lang === (lang || getLang()))
      )
    );
  };

  const openMenu = () => {
    if (!root) return;
    root.classList.add("langmenu--open");
    btn && btn.setAttribute("aria-expanded", "true");
    list && list.focus();
    const active =
      items.find((it) => it.dataset.lang === getLang()) || items[0];
    active && active.focus();
  };

  // ⬇⬇ Parche clave: no devolver foco al botón cuando cierras por click fuera
  const closeMenu = (opts = { focus: false }) => {
    if (!root) return;
    root.classList.remove("langmenu--open");
    btn && btn.setAttribute("aria-expanded", "false");
    if (opts.focus && btn) btn.focus(); // solo cuando elegiste idioma
  };

  if (btn)
    btn.addEventListener("click", () => {
      root.classList.contains("langmenu--open") ? closeMenu() : openMenu();
    });

  items.forEach((it) => {
    it.addEventListener("click", () => {
      setLang(it.dataset.lang);
      closeMenu({ focus: true }); // aquí sí devolvemos el foco al botón
    });
  });

  if (list)
    list.addEventListener("keydown", (e) => {
      const idx = items.indexOf(document.activeElement);
      const go = (n) => items[n] && items[n].focus();
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          go(Math.min(items.length - 1, idx + 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          go(Math.max(0, idx - 1));
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(items.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          document.activeElement?.click();
          break;
        case "Escape":
          e.preventDefault();
          closeMenu();
          break;
      }
    });

  // Click fuera: cierra SIN tocar el foco (para no “sacar” al input)
  document.addEventListener(
    "click",
    (e) => {
      if (!root) return;
      if (!root.classList.contains("langmenu--open")) return;
      if (!root.contains(e.target)) closeMenu({ focus: false });
    },
    { passive: true }
  );

  // ========= MUTATION OBSERVER (SEGURIDAD y RENDIMIENTO) =========
  let observer = null;
  let applying = false; // flag para pausar durante apply

  const pauseObserver = (fn) => {
    applying = true;
    observer && observer.disconnect();
    try {
      fn && fn();
    } finally {
      applying = false;
      startObserver();
    }
  };

  const startObserver = () => {
    if (observer || applying) return;
    observer = new MutationObserver((muts) => {
      // AGRUPA y procesa SOLO nodos añadidos con nuestras marcas
      const toTranslate = new Set();
      for (const m of muts) {
        if (!m.addedNodes || m.addedNodes.length === 0) continue;
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return; // solo Element
          const el = node;
          // si el nodo o sus hijos tienen data-i18n… lo traducimos
          if (
            el.hasAttribute?.("data-i18n") ||
            el.hasAttribute?.("data-i18n-html") ||
            el.hasAttribute?.("data-i18n-attr") ||
            el.querySelector?.(
              "[data-i18n], [data-i18n-html], [data-i18n-attr]"
            )
          ) {
            toTranslate.add(el);
          }
        });
      }
      if (toTranslate.size === 0) return;
      // Pausa el observer mientras traducimos esos subárboles
      pauseObserver(() => {
        toTranslate.forEach((el) => translateTree(el, getLang()));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  // ========= INIT =========
  document.addEventListener("DOMContentLoaded", () => {
    // Traducción inicial (rápida y sin parpadeos)
    translateTree(document, getLang());
    syncMenuUI();
    startObserver();
  });
})();
