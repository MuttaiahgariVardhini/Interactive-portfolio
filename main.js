// -------------------- MAIN.JS --------------------
window.portfolioData = {
    info: {
        name: "Vardhini",
        profilePicture: "assets/Profile.jpg",
        about: "I’m Vardhini, a 3rd-year Data Science student with a strong passion for web development and building interactive digital experiences. Alongside my academic work, I actively work on personal projects that combine analytical thinking with creative design.\n\nI enjoy developing clean, responsive, and user-friendly websites while exploring modern web technologies. My goal is to grow as a skilled developer, contribute to impactful projects, and continuously enhance my technical and problem-solving abilities.",
        contact: {
            email: "muttaihvardhini@gmail.com",
            linkedin: "https://www.linkedin.com/in/muttaiah-gari-vardhini-680540308",
            github: "https://github.com/MuttaiahgariVardhini"
        },
        taglines: [
            "Web Developer | Problem Solver | Learner.",
            "Frontend Developer",
            "Passionate about Data Science and AI"
        ]
    },
    skills: window.skillsData || [],
    education: window.educationData || [],
    projects: window.projectsData || [],
    certificates: window.certificatesData || []
};

// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
    renderPortfolio();
    startTaglineRotation();
    initNavbarToggle();
    initDarkMode();

    // Footer year
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ---- RENDER FUNCTIONS ----
function renderPortfolio() {
    renderHero();
    renderSkills();
    renderEducation();
    renderProjects();
    renderCertificates();
    renderContact();
}

function renderHero() {
    const data = window.portfolioData.info;
    const nameEl = document.getElementById("user-name");
    if (nameEl) nameEl.textContent = `Hello, I'm ${data.name}`;
    const profileEl = document.getElementById("profile-pic");
    if (profileEl) {
        profileEl.src = data.profilePicture;
        profileEl.alt = `${data.name}'s Profile Picture`;
    }
    const aboutEl = document.getElementById("about-text");
    if (aboutEl) aboutEl.textContent = data.about;
}

function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;
    container.innerHTML = "";
    (window.portfolioData.skills || []).forEach(skill => {
        const div = document.createElement("div");
        div.className = "skill-card";
        div.innerHTML = `<img src="${skill.icon}" alt="${skill.name}"><p>${skill.name}</p>`;
        container.appendChild(div);
    });
}

function renderEducation() {
    const container = document.getElementById("education-container");
    if (!container) return;
    container.innerHTML = "";
    (window.portfolioData.education || []).forEach(edu => {
        const card = document.createElement("div");
        card.className = "education-card fade-in-up";
        if (edu.logo) {
            const img = document.createElement("img");
            img.src = edu.logo;
            img.alt = `${edu.org} Logo`;
            card.appendChild(img);
        }
        const title = document.createElement("h3");
        title.textContent = edu.degree;
        card.appendChild(title);
        const orgYear = document.createElement("div");
        orgYear.className = "org-year";
        orgYear.textContent = `${edu.org} - ${edu.year}`;
        card.appendChild(orgYear);
        if (edu.cgpa) {
            const cgpa = document.createElement("div");
            cgpa.className = "cgpa";
            cgpa.textContent = `CGPA: ${edu.cgpa}`;
            card.appendChild(cgpa);
        }
        container.appendChild(card);
    });
}

function renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;
    container.innerHTML = "";
    (window.portfolioData.projects || []).forEach((proj, idx) => {
        const div = document.createElement("div");
        div.className = `project-card ${idx % 2 === 0 ? "left" : "right"}`;
        const imgHtml = proj.image ? `<img src="${proj.image}" alt="${proj.title}">` : "";
        const linkHtml = proj.link ? `<a href="${proj.link}" target="_blank" class="view-btn">View Project</a>` : "";
        div.innerHTML = `
            <div class="timeline-icon">${imgHtml}</div>
            <div class="project-content">
                <h3>${proj.title}</h3>
                <p>${proj.desc}</p>
                <p><strong>Tags:</strong> ${proj.tags.join(", ")}</p>
                ${linkHtml}
            </div>
        `;
        container.appendChild(div);
    });
}

function renderCertificates() {
    const container = document.getElementById("certificates-container");
    if (!container) return;
    container.innerHTML = "";
    (window.portfolioData.certificates || []).forEach(cert => {
        const card = document.createElement("div");
        card.className = "certificate-card active";
        if (cert.logo) {
            const img = document.createElement("img");
            img.src = cert.logo;
            img.alt = `${cert.org} Logo`;
            card.appendChild(img);
        }
        const title = document.createElement("h3");
        title.textContent = cert.title;
        card.appendChild(title);
        const orgYear = document.createElement("div");
        orgYear.className = "org-year";
        orgYear.textContent = `${cert.org} - ${cert.year}`;
        card.appendChild(orgYear);

        if (cert.file) {
            const btn = document.createElement("button");
            btn.className = "btn view-cert-btn";
            btn.textContent = "View Certificate";
            btn.addEventListener("click", () => window.open(cert.file, "_blank"));
            card.appendChild(btn);
        }

        container.appendChild(card);
    });
}

function renderContact() {
    const contact = window.portfolioData.info.contact || {};
    const emailEl = document.getElementById("contact-email");
    const linkedinEl = document.getElementById("contact-linkedin");
    const githubEl = document.getElementById("contact-github");
    if (emailEl) {
        emailEl.textContent = contact.email;
        emailEl.href = `mailto:${contact.email}`;
    }
    if (linkedinEl) {
        linkedinEl.textContent = "LinkedIn Profile";
        linkedinEl.href = contact.linkedin;
    }
    if (githubEl) {
        githubEl.textContent = "GitHub Profile";
        githubEl.href = contact.github;
    }
}

// ---- OTHER FUNCTIONS (TAGLINE, NAV, DARK MODE) ----
function startTaglineRotation() {
    const el = document.getElementById("tagline");
    const taglines = window.portfolioData.info.taglines || [];
    if (!el || !taglines.length) return;
    let idx = 0;
    setInterval(() => {
        el.textContent = taglines[idx % taglines.length];
        idx++;
    }, 2500);
}

function initNavbarToggle() {
    const toggle = document.getElementById("nav-toggle");
    const links = document.querySelector(".nav-links");
    if (toggle && links) toggle.addEventListener("click", () => links.classList.toggle("active"));
}

function initDarkMode() {
    const toggle = document.getElementById("dark-mode-toggle");
    if (toggle) toggle.addEventListener("click", () => document.body.classList.toggle("dark-mode"));
}
