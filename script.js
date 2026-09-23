// --- Data Structure for Projects ---
const projectsData = {
    featured: {
        title: "Complejo de Infraestructura Comercial & Logística",
        location: "Valencia, Venezuela",
        type: "Residencial",
        img: "images/foto1.jpeg",
        desc: "",
    },
    p1: {
        title: "Desarrollo Habitacional Moderno",
        location: "Carabobo(Valencia), Venezuela",
        type: "Industrial",
        img: "images/foto3.jpg",
        desc: ""
    },
    p2: {
        title: "Centro de Distribución Empresarial",
        location: "Carabobo(Valencia), Venezuela",
        type: "Industrial",
        img: "images/foto4.jpg",
        desc: ""
    },
    
};

// --- Theme Toggle (Dark / Light Mode) ---
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

const savedTheme = localStorage.getItem('fainca-theme');
if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('fainca-theme', newTheme);
    });
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

function setMenuIcon(isOpen) {
    if (!mobileMenuBtn) return;
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

function toggleMenu() {
    const isOpen = navLinks.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    setMenuIcon(isOpen);
}

function closeMenu() {
    navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    setMenuIcon(false);
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
}

if (overlay) {
    overlay.addEventListener('click', closeMenu);
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// --- Filter Projects ---
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.gallery-grid .project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- Modal Functionality ---
const modal = document.getElementById('project-modal');

function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data || !modal) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalLocation = document.getElementById('modal-location');
    const modalType = document.getElementById('modal-type');
    const modalDesc = document.getElementById('modal-desc');

    if (modalImg) modalImg.src = data.img;
    if (modalTitle) modalTitle.innerText = data.title;
    if (modalLocation) modalLocation.innerText = data.location;
    if (modalType) modalType.innerText = data.type;
    if (modalDesc) modalDesc.innerText = data.desc;

    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
}

function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

if (modal) {
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });
}

// --- Stats Counter Animation ---
let statsAnimated = false;
function animateStats() {
    const statsSection = document.getElementById('stats-counter');
    if (!statsSection) return;
    
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos && !statsAnimated) {
        statsAnimated = true;
        const numbers = document.querySelectorAll('.stat-number');
        
        numbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    num.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    num.innerText = target;
                }
            };
            updateCount();
        });
    }
}

// --- Scroll Reveal Animations ---
function revealOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 80) {
            el.classList.add('animated');
        }
    });
}

// --- Navbar Scroll Effect & Active Section ---
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scroll-top-btn');
const sections = document.querySelectorAll('section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateOnScroll() {
    revealOnScroll();
    animateStats();

    if (navbar) {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    if (scrollTopBtn) {
        if (window.scrollY > 60) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navAnchors.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateOnScroll);

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initial Trigger
updateOnScroll();
