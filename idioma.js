// =========================================================
// IDIOMA: ESPAÑOL / INGLÉS
// ---------------------------------------------------------
// Los textos en español están escritos en el index.html.
// Acá solo van las traducciones al inglés.
//
// Para traducir un texto nuevo:
//   1. En el HTML, agregale al elemento  data-i18n="una.clave"
//      (o data-i18n-alt / data-i18n-aria / data-i18n-href
//       para alt, aria-label y links)
//   2. Agregá esa misma clave acá abajo, dentro de "en".
// =========================================================

const traducciones = {
    en: {
        // Pestaña del navegador
        "pagina.titulo": "Joaquin Iribarne | Web Developer",

        // Navbar
        "nav.inicio": "Home",
        "nav.skills": "Skills",
        "nav.sobre": "About",
        "nav.proyectos": "Projects",
        "nav.contacto": "Contact",
        "menu.abrir": "Open menu",

        // Inicio
        "hero.titulo": "Hi! <br> I'm <span>Joaquin Iribarne</span>",
        "hero.subtitulo": "<strong>Web Developer</strong>",
        "hero.bajada": "Computer Science student",
        "hero.cv": "Download CV",
        "hero.cvArchivo": "CV-Joaquin_iribarne-English.pdf",
        "hero.foto": "Photo of Joaquin Iribarne",

        // Skills
        "skills.etiqueta": "What I know",
        "skills.desc": "Technologies and tools I use in my projects.",

        "skill.html.titulo": "HTML & CSS",
        "skill.html.desc": "Semantic, accessible and responsive websites, with custom styles and animations.",
        "skill.js.titulo": "JavaScript",
        "skill.js.desc": "Interactivity and client-side logic for websites and web apps.",
        "skill.react.titulo": "React",
        "skill.react.desc": "Interfaces built with reusable components for the apps I develop.",
        "skill.java.titulo": "Java",
        "skill.java.desc": "Object-oriented programming and data structures.",
        "skill.python.titulo": "Python",
        "skill.python.desc": "Applications, data processing and task automation.",
        "skill.sql.titulo": "SQL",
        "skill.sql.desc": "Database design and queries to manage app data.",
        "skill.git.titulo": "Git & GitHub",
        "skill.git.desc": "Version control, repositories and project publishing.",

        // Sobre mí
        "sobre.titulo": "ABOUT ME",
        "sobre.hola": "Hi, I'm <strong>Joaquin Iribarne</strong>.",
        "sobre.p1": "I'm a <strong>Computer Science</strong> student and I work as a web developer at <strong>Bailo Hnos.</strong>, where I build applications the company uses every day.",
        "sobre.p2": "What I enjoy most is finding a real problem, like a slow process or hard-to-read data, and turning it into a simple, clear tool. I work with <span>HTML, CSS, JavaScript, React, SQL, Java and Python</span>, and this year I'm focusing on <span>React and SQL</span> to build more complete apps.",
        "sobre.p3": "I want to keep growing as a developer, join projects where I can learn from others and build solutions people actually use.",

        // Proyecto: Analizador de Gastos
        "proy.etiqueta": "PROJECT 01",
        "proy.titulo": "Expense Analyzer",
        "proy.intro": "An application built for <strong>Bailo Hnos.</strong> to analyze and compare expenses from Excel files, showing the information in a fast, clear and organized way.",
        "proy.p1": "A system I developed for <strong>Bailo Hnos.</strong> to make it easier to analyze the company's expenses by uploading Excel files. It lets you compare periods, spot variations and view the information in a simple way.",
        "proy.p2": "The goal of the project is to turn financial data into clearer information to support control and decision-making.",
        "proy.foto1": "Expense Analyzer - Screenshot 1",
        "proy.foto2": "Expense Analyzer - Screenshot 2",
        "proy.foto3": "Expense Analyzer - Screenshot 3",
        "proy.foto4": "Expense Analyzer - Screenshot 4",
        "proy.foto5": "Expense Analyzer - Screenshot 5",
        "visor.imagen": "Enlarged image",
        "visor.cerrar": "Close",

        // Contacto
        "contacto.etiqueta": "Let's talk",
        "contacto.titulo": "Contact",
        "contacto.desc": "If you'd like to get in touch, you can find me through any of these channels.",
        "contacto.boton": "Send me a message <i class=\"fa-brands fa-whatsapp\"></i>"
    }
};


// =========================
// LÓGICA
// =========================

const botonIdioma = document.getElementById("idiomaToggle");

// Guardamos los textos originales (español) para poder volver a ellos
const originales = {
    titulo: document.title,
    textos: new Map(),
    alts: new Map(),
    arias: new Map(),
    hrefs: new Map()
};

document.querySelectorAll("[data-i18n]").forEach((el) => originales.textos.set(el, el.innerHTML));
document.querySelectorAll("[data-i18n-alt]").forEach((el) => originales.alts.set(el, el.alt));
document.querySelectorAll("[data-i18n-aria]").forEach((el) => originales.arias.set(el, el.getAttribute("aria-label")));
document.querySelectorAll("[data-i18n-href]").forEach((el) => originales.hrefs.set(el, el.getAttribute("href")));

function aplicarIdioma(idioma) {
    const dic = traducciones[idioma]; // undefined si es español

    originales.textos.forEach((textoEs, el) => {
        el.innerHTML = dic?.[el.dataset.i18n] ?? textoEs;
    });

    originales.alts.forEach((altEs, el) => {
        el.alt = dic?.[el.dataset.i18nAlt] ?? altEs;
    });

    originales.arias.forEach((ariaEs, el) => {
        el.setAttribute("aria-label", dic?.[el.dataset.i18nAria] ?? ariaEs);
    });

    originales.hrefs.forEach((hrefEs, el) => {
        el.setAttribute("href", dic?.[el.dataset.i18nHref] ?? hrefEs);
    });

    document.title = dic?.["pagina.titulo"] ?? originales.titulo;
    document.documentElement.lang = idioma;

    // El botón muestra el idioma al que vas a cambiar
    botonIdioma.textContent = idioma === "es" ? "EN" : "ES";
    botonIdioma.setAttribute("aria-label", idioma === "es" ? "Switch to English" : "Cambiar a español");

    try { localStorage.setItem("idioma", idioma); } catch (e) {}
}

// Idioma inicial: el que eligió antes, o el del navegador
let idiomaGuardado = null;
try { idiomaGuardado = localStorage.getItem("idioma"); } catch (e) {}

const idiomaInicial = idiomaGuardado || (navigator.language.startsWith("es") ? "es" : "en");
let idiomaActual = idiomaInicial;

if (idiomaActual !== "es") aplicarIdioma(idiomaActual);

botonIdioma.addEventListener("click", () => {
    idiomaActual = idiomaActual === "es" ? "en" : "es";
    aplicarIdioma(idiomaActual);
});
