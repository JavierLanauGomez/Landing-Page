// ===== NAVEGACIÓN MÓVIL =====
const alternarMenu = document.querySelector('.menu-toggle');
const enlacesNavegacion = document.querySelector('.nav-links');

alternarMenu.addEventListener('click', () => {
    enlacesNavegacion.classList.toggle('active');
});

enlacesNavegacion.addEventListener('click', (evento) => {
    if (evento.target.tagName === 'A') {
        enlacesNavegacion.classList.remove('active');
    }
});

// ===== SCROLL SUAVE PARA NAVEGACIÓN =====
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (evento) {
        evento.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMACIONES AL HACER SCROLL =====
const opcionesObservador = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        }
    });
}, opcionesObservador);

document.querySelectorAll('.fade-in').forEach(elemento => {
    observador.observe(elemento);
});

// ===== CAMBIAR HEADER AL HACER SCROLL =====
const cabecera = document.querySelector('header');

window.addEventListener('scroll', () => {
    const desplazamientoActual = window.pageYOffset || document.documentElement.scrollTop;

    if (desplazamientoActual > 100) {
        cabecera.style.background = 'rgba(255, 255, 255, 0.95)';
        cabecera.style.backdropFilter = 'blur(10px)';
    } else {
        cabecera.style.background = '#ffffff';
        cabecera.style.backdropFilter = 'none';
    }
});

// ===== TYPING EFFECT EN EL HERO =====
function efectoEscritura(elemento, texto, velocidad = 50) {
    let i = 0;
    elemento.innerHTML = '';

    function escribir() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        }
    }
    escribir();
}

window.addEventListener('load', () => {
    const tituloHero = document.querySelector('.hero h1');
    if (tituloHero) {
        const textoOriginal = tituloHero.textContent;
        efectoEscritura(tituloHero, textoOriginal, 80);
    }
});

// ===== FADE IN AL CARGAR =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== BOTÓN SCROLL TO TOP =====
const botonSubir = document.createElement('button');
botonSubir.innerHTML = '↑';
botonSubir.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
`;

botonSubir.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.body.appendChild(botonSubir);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        botonSubir.style.display = 'block';
    } else {
        botonSubir.style.display = 'none';
    }
});
