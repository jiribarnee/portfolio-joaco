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