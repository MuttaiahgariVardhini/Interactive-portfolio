// -------------------- MAIN.JS --------------------

// -------------------- PORTFOLIO DATA --------------------
window.portfolioData = window.portfolioData || {};


// -------------------- PORTFOLIO DATA --------------------
window.portfolioData = {
    info: {
        name: "Vardhini",
        profilePicture: "assets/profile.jpg",
        about: "I'm a passionate Web Developer and UI/UX enthusiast...",
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

// Optional: clear localStorage to prevent old taglines being loaded



// Ensure other sections exist
window.portfolioData.skills = window.skillsData || [];
window.portfolioData.education = window.educationData || [];
window.portfolioData.projects = window.projectsData || [];
window.portfolioData.certificates = window.certificatesData || [];

// -------------------- DOM CONTENT LOADED --------------------
document.addEventListener("DOMContentLoaded", () => {
    renderPortfolio();
    startTaglineRotation();
    initNavbarToggle();
    initDarkMode();

    // Initialize EmailJS if loaded
    if (typeof emailjs !== "undefined") {
        emailjs.init("3Hm6ICdyO0i3TOfhu"); // Your EmailJS User ID
        initContactForm();
    } else {
        console.warn("EmailJS not loaded, contact form won't work");
    }

    // Update footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// -------------------- RENDER PORTFOLIO --------------------
function renderPortfolio() {
    renderHero();
    renderSkills();
    renderEducation();
    renderProjects();
    renderCertificates();
    renderContact();
}

// ---- HERO SECTION ----
function renderHero() {
    const data = window.portfolioData.info;
    const nameEl = document.getElementById("user-name");
    if (nameEl) nameEl.textContent = `Hello, I'm ${data.name}`;
    const profileEl = document.getElementById("profile-pic");
    if (profileEl) {
        profileEl.src = data.profilePicture || "assets/profile.jpg";
        profileEl.alt = `${data.name}'s Profile Picture`;
    }
    const aboutEl = document.getElementById("about-text");
    if (aboutEl) aboutEl.textContent = data.about || "";
}

// ---- SKILLS SECTION ----
function renderSkills() {
    const container = document.getElementById("skills-container");
    if (!container) return;
    container.innerHTML = "";
    (window.portfolioData.skills || []).forEach(skill => {
        const div = document.createElement("div");
        div.className = "skill-card";
        div.innerHTML = `<img src="${skill.icon || 'assets/skill-placeholder.png'}" alt="${skill.name}"><p>${skill.name}</p>`;
        container.appendChild(div);
    });
}

// ---- EDUCATION SECTION ----
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

// ---- PROJECTS SECTION ----
function renderProjects() {
    const container = document.getElementById("projects-container");
    if (!container) return;
    container.innerHTML = "";
    (window.portfolioData.projects || []).forEach((proj, index) => {
        const div = document.createElement("div");
        div.className = `project-card ${index % 2 === 0 ? "left" : "right"}`;

        const imgHtml = proj.image ? `<img src="${proj.image}" alt="${proj.title}">` : "<span>📌</span>";
        const linkHtml = proj.link ? `<a href="${proj.link}" target="_blank" class="view-btn">View Project</a>` : "";

        div.innerHTML = `
            <div class="timeline-icon">${imgHtml}</div>
            <div class="project-content">
                <h3>${proj.title}</h3>
                <p>${proj.desc}</p>
                <p><strong>Tags:</strong> ${proj.tags ? proj.tags.join(", ") : ""}</p>
                ${linkHtml}
            </div>
        `;
        container.appendChild(div);
    });
}

// ---- CERTIFICATES SECTION ----
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
            img.alt = `${cert.org || "Certificate"} Logo`;
            card.appendChild(img);
        } else {
            const placeholder = document.createElement("div");
            placeholder.textContent = cert.title || "Certificate";
            placeholder.style.background = "#222";
            placeholder.style.color = "#ff9800";
            placeholder.style.padding = "0.8rem";
            placeholder.style.borderRadius = "8px";
            placeholder.style.fontWeight = "600";
            placeholder.style.marginBottom = "0.5rem";
            placeholder.style.textAlign = "center";
            card.appendChild(placeholder);
        }

        const title = document.createElement("h3");
        title.textContent = cert.title || "No Title";
        card.appendChild(title);

        const orgYear = document.createElement("div");
        orgYear.className = "org-year";
        orgYear.textContent = `${cert.org || "Unknown Org"} - ${cert.year || "Year"}`;
        card.appendChild(orgYear);

        if (cert.file) {
            const viewBtn = document.createElement("button");
            viewBtn.textContent = "View Certificate";
            viewBtn.className = "btn view-cert-btn";
            viewBtn.style.marginTop = "0.7rem";
            viewBtn.style.background = "#ff7f00";
            viewBtn.style.color = "white";
            viewBtn.style.border = "none";
            viewBtn.style.borderRadius = "6px";
            viewBtn.style.padding = "6px 12px";
            viewBtn.style.cursor = "pointer";
            viewBtn.style.transition = "0.3s";

            viewBtn.addEventListener("mouseenter", () => viewBtn.style.background = "#ff9a33");
            viewBtn.addEventListener("mouseleave", () => viewBtn.style.background = "#ff7f00");

            viewBtn.addEventListener("click", () => {
                const fileUrl = cert.file;
                if (fileUrl.startsWith("blob:") || fileUrl.startsWith("data:")) {
                    const newWindow = window.open("", "_blank");
                    if (newWindow) {
                        newWindow.document.write(`
                            <html>
                                <head><title>${cert.title || "Certificate"}</title></head>
                                <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#111;">
                                    <iframe src="${fileUrl}" width="90%" height="90%" style="border:none;border-radius:10px;"></iframe>
                                </body>
                            </html>
                        `);
                    }
                } else if (fileUrl.startsWith("http") || fileUrl.startsWith("assets/")) {
                    window.open(fileUrl, "_blank", "noopener,noreferrer");
                } else {
                    alert("Certificate file not found or invalid path.");
                }
            });

            card.appendChild(viewBtn);
        }

        container.appendChild(card);
    });
}

// ---- CONTACT SECTION ----
function renderContact() {
    const contact = window.portfolioData.info.contact || {};
    const emailEl = document.getElementById("contact-email");
    const linkedinEl = document.getElementById("contact-linkedin");
    const githubEl = document.getElementById("contact-github");

    if (emailEl) {
        emailEl.textContent = contact.email || "";
        emailEl.href = `mailto:${contact.email || ""}`;
    }
    if (linkedinEl) {
        linkedinEl.textContent = "LinkedIn Profile";
        linkedinEl.href = contact.linkedin || "#";
    }
    if (githubEl) {
        githubEl.textContent = "GitHub Profile";
        githubEl.href = contact.github || "#";
    }
}

// ---- CONTACT FORM (EmailJS) ----
function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_n06kzsp",
            "template_1xqmi9l",
            this
        ).then(() => {
            if (formStatus) {
                formStatus.textContent = "Message sent successfully!";
                formStatus.style.color = "green";
            }
            contactForm.reset();
        }, (err) => {
            console.error("FAILED...", err);
            if (formStatus) {
                formStatus.textContent = "Failed to send message. Try again.";
                formStatus.style.color = "red";
            }
        });
    });
}

// ---- TAGLINES ROTATION ----
function startTaglineRotation() {
    const el = document.getElementById("tagline");
    const taglines = window.portfolioData.info.taglines || [];
    if (!el || taglines.length === 0) return;
    let idx = 0;
    setInterval(() => {
        el.textContent = taglines[idx % taglines.length];
        idx++;
    }, 2500);
}

// ---- NAVBAR TOGGLE ----
function initNavbarToggle() {
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
    }
}

// ---- DARK MODE TOGGLE ----
function initDarkMode() {
    const toggle = document.getElementById("dark-mode-toggle");
    if (toggle) toggle.addEventListener("click", () => document.body.classList.toggle("dark-mode"));
}

// ---- SAVE DATA TO localStorage ----
function saveData() {
    localStorage.setItem("portfolioData", JSON.stringify(window.portfolioData));
}
