// ===== NAVEGACIÓN MÓVIL =====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            navLinks.classList.remove('active');
        }
    });
}

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ===== HEADER SCROLLED =====
const header = document.querySelector('header');
const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== FADE-IN ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== FORMULARIO DE CONTACTO =====
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');
const formBtn = document.getElementById('form-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(contactForm));
        const temas = contactForm.querySelectorAll('input[name="tema"]:checked');
        data.tema = Array.from(temas).map(cb => cb.value).join(', ');

        formBtn.disabled = true;
        formBtn.textContent = 'Enviando...';
        formResult.className = 'form-result';
        formResult.textContent = '';

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify(data),
            });
            const json = await res.json();

            if (res.ok && json.success) {
                formResult.className = 'form-result form-result--ok';
                formResult.textContent = '¡Mensaje enviado! Te responderé lo antes posible.';
                contactForm.reset();
            } else {
                throw new Error(json.message || 'Error al enviar');
            }
        } catch {
            formResult.className = 'form-result form-result--error';
            formResult.textContent = 'Algo salió mal. Escríbeme directamente a j.lanau.gomez@gmail.com';
        } finally {
            formBtn.disabled = false;
            formBtn.innerHTML = 'Enviar <span class="btn-arrow">↗</span>';
        }
    });
}
