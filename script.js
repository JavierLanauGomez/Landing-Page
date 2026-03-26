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

// ===== VALIDACIÓN Y ENVÍO DE FORMULARIO =====
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// Función para mostrar errores
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.textContent = message;
    document.getElementById(fieldId).style.borderColor = '#ef4444';
}

// Función para limpiar errores
function clearError(fieldId) {
    const errorElement = document.getElementById(fieldId + '-error');
    errorElement.textContent = '';
    document.getElementById(fieldId).style.borderColor = '#e5e7eb';
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validación en tiempo real
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim().length >= 2) {
        clearError('name');
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (isValidEmail(this.value)) {
        clearError('email');
    }
});

document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim().length >= 10) {
        clearError('message');
    }
});

// Envío del formulario
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let hasErrors = false;

    // Validar nombre
    if (name.length < 2) {
        showError('name', 'El nombre debe tener al menos 2 caracteres');
        hasErrors = true;
    } else {
        clearError('name');
    }

    // Validar email
    if (!isValidEmail(email)) {
        showError('email', 'Por favor, introduce un email válido');
        hasErrors = true;
    } else {
        clearError('email');
    }

    // Validar mensaje
    if (message.length < 10) {
        showError('message', 'El mensaje debe tener al menos 10 caracteres');
        hasErrors = true;
    } else {
        clearError('message');
    }

    // Si no hay errores, simular envío
    if (!hasErrors) {
        // Aquí normalmente enviarías los datos a tu servidor
        console.log('Formulario enviado:', { name, email, subject, message });
        
        // Mostrar mensaje de éxito
        successMessage.style.display = 'block';
        contactForm.reset();
        
        // Scroll hasta el mensaje de éxito
        successMessage.scrollIntoView({ behavior: 'smooth' });
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});

// ===== EFECTO PARALLAX EN HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
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

// ===== TYPING EFFECT EN EL HERO (OPCIONAL) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Activar typing effect cuando la página carga
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

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