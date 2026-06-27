// Mobile navigation toggle
const headerMenu = document.getElementById("menu");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const navLinks = document.querySelectorAll("nav ul li a");

const toggleNavbar = () => {
    headerMenu.classList.toggle("active");
};

if (menuBtn) menuBtn.addEventListener("click", toggleNavbar);
if (closeBtn) closeBtn.addEventListener("click", toggleNavbar);

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        headerMenu.classList.remove("active");
    });
});

// Header background change on scroll
const handleScrollHeader = () => {
    if (window.scrollY > 50) {
        headerMenu.classList.add("scrolled");
    } else {
        headerMenu.classList.remove("scrolled");
    }
};

window.addEventListener("scroll", handleScrollHeader);
window.addEventListener("load", handleScrollHeader);

// Theme Switcher (Tokyo Night Dark / Tokyo Light)
const themeToggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Apply saved theme on load
if (currentTheme === "light") {
    document.body.classList.add("light-theme");
}

const toggleTheme = () => {
    document.body.classList.toggle("light-theme");
    
    // Save preference to localStorage
    if (document.body.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
};

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
}

// Scroll Progress and Top Button
const calcScrollValue = () => {
    const scrollProgress = document.getElementById("progress");
    const pos = document.documentElement.scrollTop || document.body.scrollTop;
    const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (calcHeight <= 0) return;
    
    const scrollValue = Math.round((pos * 100) / calcHeight);
    
    if (pos > 100) {
        scrollProgress.style.display = "grid";
    } else {
        scrollProgress.style.display = "none";
    }
    
    // Conic gradient representing the scroll progress
    // Tokyo Night Primary Cyan: #7dcfff, Background Track: #3b4261
    // In light theme: Blue: #2e7de9, Track: #d0d2da
    const isLightTheme = document.body.classList.contains("light-theme");
    const progressColor = isLightTheme ? "#2e7de9" : "#7dcfff";
    const trackColor = isLightTheme ? "#d0d2da" : "#3b4261";
    
    scrollProgress.style.background = `conic-gradient(${progressColor} ${scrollValue}%, ${trackColor} ${scrollValue}%)`;
};

// Scroll to top when progress element is clicked
const scrollProgressEl = document.getElementById("progress");
if (scrollProgressEl) {
    scrollProgressEl.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Update scroll values on scroll/load
window.addEventListener("scroll", calcScrollValue);
window.addEventListener("load", calcScrollValue);

// Dynamic recalculation when changing theme
if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", calcScrollValue);
}

// Contact Form Submit Redirect to Gmail (mailto:)
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        
        const subject = `Portfolio Contact from ${name}`;
        const bodyText = `Hi Karm,\n\nYou received a message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        // Construct direct Gmail web compose URL
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=contact.karmpatel@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
        
        // Open in a new tab
        window.open(gmailComposeUrl, "_blank");
    });
}