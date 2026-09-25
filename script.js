const imagenes = document.querySelectorAll(".imagen-gasto");

const botonAnterior = document.querySelector(".galeria-btn.izquierda");
const botonSiguiente = document.querySelector(".galeria-btn.derecha");

let imagenActual = 0;

function mostrarImagen(numero) {

    imagenes.forEach((imagen) => {
        imagen.classList.remove("activa");
    });

    imagenes[numero].classList.add("activa");
}

botonSiguiente.addEventListener("click", () => {

    imagenActual++;

    if (imagenActual >= imagenes.length) {
        imagenActual = 0;
    }

    mostrarImagen(imagenActual);
});

botonAnterior.addEventListener("click", () => {

    imagenActual--;

    if (imagenActual < 0) {
        imagenActual = imagenes.length - 1;
    }

    mostrarImagen(imagenActual);
});
// =========================
// VISOR DE IMAGEN
// =========================

const visorImagen = document.getElementById("visorImagen");
const imagenGrande = document.getElementById("imagenGrande");
const cerrarVisor = document.getElementById("cerrarVisor");


// Abrir imagen al hacer click

imagenes.forEach((imagen) => {

    imagen.addEventListener("click", () => {

        imagenGrande.src = imagen.src;
        imagenGrande.alt = imagen.alt;

        visorImagen.classList.add("activo");

    });

});


// Cerrar con el botón X

cerrarVisor.addEventListener("click", () => {

    visorImagen.classList.remove("activo");

});


// Cerrar haciendo click fuera de la imagen

visorImagen.addEventListener("click", (e) => {

    if (e.target === visorImagen) {

        visorImagen.classList.remove("activo");

    }

});


// Cerrar presionando ESC

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        visorImagen.classList.remove("activo");

    }

});

// =========================
// NAVBAR: MENÚ HAMBURGUESA
// =========================

const menuToggle = document.getElementById("menuToggle");
const menuNav = document.getElementById("menuNav");
const linksNav = menuNav.querySelectorAll("a");

function cerrarMenu() {
    menuNav.classList.remove("abierto");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

menuToggle.addEventListener("click", () => {
    const abierto = menuNav.classList.toggle("abierto");
    menuToggle.setAttribute("aria-expanded", abierto);
    menuToggle.innerHTML = abierto
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Al tocar un link, se cierra el menú
linksNav.forEach((link) => link.addEventListener("click", cerrarMenu));

// Al tocar fuera del menú, también se cierra
document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) cerrarMenu();
});


// =========================
// NAVBAR: LINK ACTIVO SEGÚN LA SECCIÓN
// =========================

const secciones = [...linksNav].map((link) =>
    document.querySelector(link.getAttribute("href"))
);

function marcarLinkActivo() {
    const alturaNavbar = document.querySelector(".navbar").offsetHeight;
    const posicion = window.scrollY + alturaNavbar + 120;
    const alFinal = window.innerHeight + window.scrollY >= document.body.scrollHeight - 5;

    let actual = 0;
    secciones.forEach((seccion, i) => {
        if (seccion && seccion.offsetTop <= posicion) actual = i;
    });
    if (alFinal) actual = secciones.length - 1; // Contacto, aunque no llegue arriba

    linksNav.forEach((link, i) => link.classList.toggle("activo", i === actual));
}

window.addEventListener("scroll", marcarLinkActivo, { passive: true });
marcarLinkActivo();


// =========================
// BOTONES DE EMAIL
// -------------------------
// Computadora: abre Gmail en una pestaña nueva.
// Celular: abre la app de correo (mailto).
// Siempre: copia el email y muestra un aviso.
// =========================

const EMAIL = "iribarneejoaco@gmail.com";
const aviso = document.getElementById("aviso");
let temporizadorAviso;

function mostrarAviso(texto) {
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => aviso.classList.remove("visible"), 3000);
}

function copiarEmail() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(EMAIL).catch(() => {});
    }
}

document.querySelectorAll(".link-email").forEach((link) => {
    link.addEventListener("click", (e) => {
        copiarEmail();

        const esCelular = window.matchMedia("(pointer: coarse)").matches;

        if (!esCelular) {
            e.preventDefault();
            window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=" + EMAIL,
                "_blank",
                "noopener"
            );
        }
        // En el celular se deja seguir el mailto: normal

        const enIngles = document.documentElement.lang === "en";
        mostrarAviso(enIngles ? "Email copied: " + EMAIL : "Email copiado: " + EMAIL);
    });
});
