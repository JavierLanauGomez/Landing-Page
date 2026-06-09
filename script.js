/// ===== MENÚ MÓVIL (HAMBURGUESA) =====
// Busca el botón del menú hamburguesa y la lista de enlaces
const botonMenu = document.getElementById('menu-toggle');
const enlaceNavegacion = document.getElementById('nav-links');

// Si ambos elementos existen en el HTML
if (botonMenu && enlaceNavegacion) {
    // Cuando haces clic en el botón hamburguesa
    botonMenu.addEventListener('click', () => {
        // Añade o quita la clase 'active' para mostrar/ocultar el menú
        enlaceNavegacion.classList.toggle('active');
    });

    // Cuando haces clic en cualquier enlace del menú
    enlaceNavegacion.addEventListener('click', (evento) => {
        // Si el clic fue en un enlace (<a>)
        if (evento.target.closest('a')) {
            // Cierra el menú móvil automáticamente
            enlaceNavegacion.classList.remove('active');
        }
    });
}

// ===== SCROLL SUAVE AL HACER CLIC EN ENLACES INTERNOS =====
// Busca todos los enlaces que empiezan con # (ej: #sobre-mi, #proyectos)
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (evento) {
        const destino = this.getAttribute('href');
        
        // Si el enlace no tiene destino válido, no hacer nada
        if (!destino || destino === '#') return;
        
        // Busca la sección de destino en el HTML
        const seccionDestino = document.querySelector(destino);
        if (!seccionDestino) return;
        
        // Prevenir el salto brusco predeterminado del navegador
        evento.preventDefault();
        
        // Calcula la altura del header para ajustar el scroll
        const cabecera = document.querySelector('header');
        const alturaCabecera = cabecera ? cabecera.offsetHeight : 0;
        
        // Calcula la posición exacta donde hacer scroll
        const posicionFinal = seccionDestino.getBoundingClientRect().top + window.scrollY - alturaCabecera + 1;
        
        // Hacer scroll suave hasta esa posición
        window.scrollTo({ top: posicionFinal, behavior: 'smooth' });
    });
});

// ===== CAMBIAR ESTILO DEL HEADER AL HACER SCROLL =====
const cabecera = document.querySelector('header');

// Función que se ejecuta cada vez que haces scroll
const alHacerScroll = () => {
    if (!cabecera) return;
    
    // Si has bajado más de 40 píxeles desde arriba
    if (window.scrollY > 40) {
        cabecera.classList.add('scrolled'); // Añade clase CSS
    } else {
        cabecera.classList.remove('scrolled'); // Quita clase CSS
    }
};

// Ejecutar la función cada vez que se hace scroll
window.addEventListener('scroll', alHacerScroll, { passive: true });
// Ejecutar también al cargar la página
alHacerScroll();

// ===== ANIMACIÓN DE APARICIÓN AL HACER SCROLL =====
// Observador para detectar cuando un elemento entra en pantalla
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        // Si el elemento es visible en la pantalla
        if (entrada.isIntersecting) {
            // Añadir clase 'visible' para activar animación CSS
            entrada.target.classList.add('visible');
            // Dejar de observar ese elemento (ya apareció)
            observador.unobserve(entrada.target);
        }
    });
}, { 
    threshold: 0.1, // El elemento debe estar 10% visible
    rootMargin: '0px 0px -40px 0px' // Margen de detección
});

// Observar todos los elementos con clase 'fade-in'
document.querySelectorAll('.fade-in').forEach(elemento => observador.observe(elemento));

// ===== FORMULARIO DE CONTACTO =====
const formularioContacto = document.getElementById('contact-form');
const resultadoFormulario = document.getElementById('form-result');
const botonEnviar = document.getElementById('form-btn');

if (formularioContacto) {
    // Cuando se envía el formulario
    formularioContacto.addEventListener('submit', async (evento) => {
        // Prevenir que la página se recargue
        evento.preventDefault();

        // Recoger todos los datos del formulario
        const datos = Object.fromEntries(new FormData(formularioContacto));
        
        // Recoger todos los checkboxes marcados de 'tema'
        const temasSeleccionados = formularioContacto.querySelectorAll('input[name="tema"]:checked');
        datos.tema = Array.from(temasSeleccionados).map(checkbox => checkbox.value).join(', ');

        // Deshabilitar botón mientras se envía
        botonEnviar.disabled = true;
        botonEnviar.textContent = 'Enviando...';
        resultadoFormulario.className = 'form-result';
        resultadoFormulario.textContent = '';

        try {
            // Enviar datos a Web3Forms (servicio de formularios)
            const respuesta = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json', 
                    Accept: 'application/json' 
                },
                body: JSON.stringify(datos),
            });
            const jsonRespuesta = await respuesta.json();

            // Si el envío fue exitoso
            if (respuesta.ok && jsonRespuesta.success) {
                resultadoFormulario.className = 'form-result form-result--ok';
                resultadoFormulario.textContent = '¡Mensaje enviado! Te responderé lo antes posible.';
                formularioContacto.reset(); // Limpiar formulario
            } else {
                throw new Error(jsonRespuesta.message || 'Error al enviar');
            }
        } catch {
            // Si hubo error
            resultadoFormulario.className = 'form-result form-result--error';
            resultadoFormulario.textContent = 'Algo salió mal. Escríbeme directamente a j.lanau.gomez@gmail.com';
        } finally {
            // Siempre volver a habilitar el botón
            botonEnviar.disabled = false;
            botonEnviar.innerHTML = 'Enviar <span class="btn-arrow">↗</span>';
        }
    });
}

// ===== DARK MODE =====
const html = document.documentElement;
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado) html.setAttribute('data-theme', temaGuardado);

const botonTema = document.getElementById('btn-tema');
if (botonTema) {
    const etiquetaActual = html.getAttribute('data-theme') === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro';
    botonTema.setAttribute('aria-label', etiquetaActual);

    botonTema.addEventListener('click', () => {
        const actual = html.getAttribute('data-theme');
        const nuevo = actual === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nuevo);
        localStorage.setItem('tema', nuevo);
        botonTema.setAttribute('aria-label', nuevo === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro');
    });
}

// ===== BARRA DE PROGRESO DE LECTURA =====
const barraProgreso = document.getElementById('progress-bar');
const actualizarProgreso = () => {
    if (!barraProgreso) return;
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progreso = scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0;
    barraProgreso.style.width = progreso + '%';
};
window.addEventListener('scroll', actualizarProgreso, { passive: true });

// ===== BOTÓN VOLVER ARRIBA =====
const botonArriba = document.getElementById('btn-arriba');
if (botonArriba) {
    window.addEventListener('scroll', () => {
        botonArriba.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    botonArriba.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}