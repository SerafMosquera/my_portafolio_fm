/* =====================================================
   ELEMENTOS
   ===================================================== */

const projects = document.getElementById("projects");

const homeButton = document.getElementById("homeButton");
const homeButtonNav = document.getElementById("homeButtonNav");

const projectItems = document.querySelectorAll(".project-item");
const navLinks = document.querySelectorAll(".nav-links button");

const floatingNav = document.getElementById("floatingNav");
const scrollProgress = document.getElementById("scrollProgress");



/* =====================================================
   NAVEGACIÓN ENTRE SECCIONES (helper compartido)
   ===================================================== */

function goToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}



/* =====================================================
   PROYECTOS → VOLVER AL INICIO
   ===================================================== */

function returnHome() {
    window.location.href = "index.html";
}

homeButton.addEventListener("click", returnHome);
homeButtonNav.addEventListener("click", returnHome);



/* =====================================================
   MENÚ (PORTADA) → CADA SECCIÓN
   ===================================================== */

projectItems.forEach((item) => {
    item.addEventListener("click", () => {
        goToSection(item.dataset.section);
    });
});



/* =====================================================
   NAV FLOTANTE → CADA SECCIÓN
   ===================================================== */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        goToSection(link.dataset.section);
    });
});



/* =====================================================
   NAV FLOTANTE → FONDO AL HACER SCROLL + SCROLLSPY
   ===================================================== */

const sections = document.querySelectorAll(".project-section");

function updateFloatingNav() {

    if (!projects) return;

    const scrollY = window.scrollY;

    // Fondo del nav al pasar la portada
    if (scrollY > window.innerHeight * 0.6) {
        floatingNav.classList.add("scrolled");
    } else {
        floatingNav.classList.remove("scrolled");
    }

    // Barra de progreso
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = progress + "%";

    // Scrollspy: qué sección está activa
    let currentId = null;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.section === currentId);
    });

}

window.addEventListener("scroll", updateFloatingNav, { passive: true });



/* =====================================================
   ANIMACIÓN DE ENTRADA DE SECCIONES
   ===================================================== */

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
        }
    });

}, { threshold: 0.15 });

sections.forEach((section) => {
    sectionObserver.observe(section);
});



/* =====================================================
   ANIMACIÓN ESCALONADA DE TARJETAS
   ===================================================== */

const cards = document.querySelectorAll(".project-card, .about-box, .stack-card");

cards.forEach((card, index) => {
    card.style.transitionDelay = (index % 4) * 70 + "ms";
});
