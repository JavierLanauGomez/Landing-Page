// ===== NAVEGACIÓN MÓVIL =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
    }
});

// ===== SCROLL SUAVE PARA NAVEGACIÓN =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== ANIMACIONES AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos los elementos con clase fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===== CAMBIAR HEADER AL HACER SCROLL =====
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Cambiar opacidad del header
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// ===== MODAL CONTACTO =====
const btnContacto = document.getElementById('btn-contacto');
const modalContacto = document.getElementById('modal-contacto');
const modalCerrar = document.getElementById('modal-cerrar');

btnContacto.addEventListener('click', () => {
    modalContacto.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function cerrarModal() {
    modalContacto.classList.remove('active');
    document.body.style.overflow = '';
}

modalCerrar.addEventListener('click', cerrarModal);

modalContacto.addEventListener('click', (e) => {
    if (e.target === modalContacto) cerrarModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
});

// ===== TYPING EFFECT EN EL HERO =====
const heroTyped = document.getElementById('hero-typed');
if (heroTyped) {
    const frases = [
        'Desarrollador Full Stack',
        'Backend Developer Java & Python',
        'Apasionado del código'
    ];
    let fraseIndex = 0;
    let charIndex = 0;
    let borrando = false;

    function typeLoop() {
        const frase = frases[fraseIndex];
        if (!borrando) {
            heroTyped.textContent = frase.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === frase.length) {
                borrando = true;
                setTimeout(typeLoop, 2000);
                return;
            }
        } else {
            heroTyped.textContent = frase.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                borrando = false;
                fraseIndex = (fraseIndex + 1) % frases.length;
            }
        }
        setTimeout(typeLoop, borrando ? 40 : 80);
    }
    typeLoop();
}

// ===== CONTADOR DE PROYECTOS (ANIMACIÓN) =====
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// ===== LOADER INICIAL (OPCIONAL) =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== MODO DARK/LIGHT (FUNCIONALIDAD EXTRA) =====
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
}

// Cargar tema guardado
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
});

// ===== BOTÓN DE SCROLL TO TOP =====
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.style.cssText = `
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

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});