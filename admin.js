// =================== ADMIN.JS ===================

// ----- GLOBAL VARIABLES -----
const adminModal = document.getElementById("admin-modal");
const closeBtn = document.querySelector(".close-btn");
const adminFormContainer = document.getElementById("admin-form-container");
const resetPortfolio = document.getElementById("reset-portfolio");
const tabButtons = document.querySelectorAll(".tab-btn");

// ----- LOAD PORTFOLIO DATA FROM localStorage OR DEFAULTS -----
window.portfolioData = JSON.parse(localStorage.getItem("portfolioData")) || window.portfolioData || {
  info: window.defaultInfo || { name: "Vardhini", profilePicture: "assets/profile.jpg", about: "", taglines: [] },
  skills: window.skillsData ? [...window.skillsData] : [],
  education: window.educationData ? [...window.educationData] : [],
  projects: window.projectsData ? [...window.projectsData] : [],
  certificates: window.certificatesData ? [...window.certificatesData] : []
};

// ----- SAVE DATA FUNCTION -----
function saveData() {
  localStorage.setItem("portfolioData", JSON.stringify(window.portfolioData));
}

// ----- OPEN/CLOSE MODAL -----
function initAdmin() {
  const adminBtn = document.getElementById("admin-toggle");
  if (!adminBtn) return;

  adminBtn.addEventListener("click", (e) => {
    e.preventDefault();
    adminModal.style.display = "block";
    renderForm("about"); // default tab
    setActiveTab("about");
  });

  closeBtn.addEventListener("click", () => adminModal.style.display = "none");

  window.addEventListener("click", e => {
    if (e.target === adminModal) adminModal.style.display = "none";
  });
}

// ----- RESET PORTFOLIO (Load from data.js) -----
resetPortfolio.addEventListener("click", () => {
  if (confirm("Reset portfolio to default data.js values?")) {

    // Restore default info and arrays from data.js
    window.portfolioData.info = window.defaultInfo ? { ...window.defaultInfo } : { name: "Vardhini", profilePicture: "assets/Profile.jpg", about: "", taglines: [] };
    window.portfolioData.skills = window.skillsData ? [...window.skillsData] : [];
    window.portfolioData.education = window.educationData ? [...window.educationData] : [];
    window.portfolioData.projects = window.projectsData ? [...window.projectsData] : [];
    window.portfolioData.certificates = window.certificatesData ? [...window.certificatesData] : [];

    // Save and re-render everything
    saveData();
    renderAllTabs();
    renderPortfolio();  // make changes visible on the page
    alert("Portfolio reset successfully! Loaded from data.js defaults.");
  }
});

// ----- TAB SWITCH -----
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    setActiveTab(btn.dataset.section);
    renderForm(btn.dataset.section);
  });
});

function setActiveTab(section) {
  tabButtons.forEach(b => b.classList.remove("active"));
  const activeBtn = Array.from(tabButtons).find(b => b.dataset.section === section);
  if (activeBtn) activeBtn.classList.add("active");
}
// ===== RENDER FORM =====
function renderForm(section) {
  adminFormContainer.innerHTML = "";

  // ----- ABOUT TAB -----
  if (section === "about") {
    const div = document.createElement("div");
    div.className = "admin-item";
    div.innerHTML = `
      <label>About Me:</label>
      <textarea id="about-me-input" rows="5">${window.portfolioData.info.about || ""}</textarea>
      <label>Profile Picture:</label>
      <input type="file" id="profile-pic-input" accept="image/*">
      <img id="profile-pic-preview" src="${window.portfolioData.info.profilePicture || ''}" 
           alt="Profile Preview" style="margin-top:10px; width:150px; height:150px; border-radius:50%; object-fit:cover; border:2px solid #ff7f00;">
    `;
    adminFormContainer.appendChild(div);

    const aboutInput = document.getElementById("about-me-input");
    aboutInput.addEventListener("input", () => {
      window.portfolioData.info.about = aboutInput.value;
      saveData();
      window.renderHero && window.renderHero();
    });

    const profileInput = document.getElementById("profile-pic-input");
    const previewImg = document.getElementById("profile-pic-preview");
    profileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          window.portfolioData.info.profilePicture = reader.result;
          previewImg.src = reader.result;
          saveData();
          window.renderHero && window.renderHero();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ----- SKILLS TAB -----
  else if (section === "skills") {
    window.portfolioData.skills.forEach((s, i) => adminFormContainer.appendChild(createSkillForm(s, i)));
    adminFormContainer.appendChild(createAddSkillBtn());
  }

  // ----- EDUCATION TAB -----
  else if (section === "education") {
    window.portfolioData.education.forEach((e, i) => adminFormContainer.appendChild(createEducationForm(e, i)));
    adminFormContainer.appendChild(createAddEducationBtn());
  }

  // ----- PROJECTS TAB -----
  else if (section === "projects") {
    window.portfolioData.projects.forEach((p, i) => adminFormContainer.appendChild(createProjectForm(p, i)));
    adminFormContainer.appendChild(createAddProjectBtn());
  }

  // ----- CERTIFICATES TAB -----
  else if (section === "certificates") {
    window.portfolioData.certificates.forEach((c, i) => adminFormContainer.appendChild(createCertificateForm(c, i)));
    adminFormContainer.appendChild(createAddCertificateBtn());
  }
}

// ===== CREATE FORM ELEMENTS =====
function createSkillForm(skill, i) {
  const div = document.createElement("div");
  div.className = "admin-item";
  div.innerHTML = `
    <label>Name:</label><input type="text" value="${skill.name || ""}" onchange="updateSkill(${i}, 'name', this.value)">
    <label>Icon URL:</label><input type="text" value="${skill.icon || ""}" onchange="updateSkill(${i}, 'icon', this.value)">
    <button class="delete-btn" onclick="deleteSkill(${i})">Delete</button>
  `;
  return div;
}
function createAddSkillBtn() {
  const btn = document.createElement("button");
  btn.textContent = "Add Skill"; btn.className = "btn";
  btn.onclick = () => {
    window.portfolioData.skills.push({ name: "", icon: "" });
    saveData(); renderForm("skills"); window.renderSkills && window.renderSkills();
  };
  return btn;
}

function createEducationForm(edu, i) {
  const div = document.createElement("div");
  div.className = "admin-item";
  div.innerHTML = `
    <label>Degree:</label><input type="text" value="${edu.degree || ""}" onchange="updateEducation(${i}, 'degree', this.value)">
    <label>Org:</label><input type="text" value="${edu.org || ""}" onchange="updateEducation(${i}, 'org', this.value)">
    <label>Year:</label><input type="text" value="${edu.year || ""}" onchange="updateEducation(${i}, 'year', this.value)">
    <label>CGPA:</label><input type="text" value="${edu.cgpa || ""}" onchange="updateEducation(${i}, 'cgpa', this.value)">
    <label>Logo URL:</label><input type="text" value="${edu.logo || ""}" onchange="updateEducation(${i}, 'logo', this.value)">
    <button class="delete-btn" onclick="deleteEducation(${i})">Delete</button>
  `;
  return div;
}
function createAddEducationBtn() {
  const btn = document.createElement("button");
  btn.textContent = "Add Education"; btn.className = "btn";
  btn.onclick = () => {
    window.portfolioData.education.push({ degree: "", org: "", year: "", cgpa: "", logo: "" });
    saveData(); renderForm("education"); window.renderEducation && window.renderEducation();
  };
  return btn;
}

function createProjectForm(proj, i) {
  const div = document.createElement("div");
  div.className = "admin-item";
  div.innerHTML = `
    <label>Title:</label><input type="text" value="${proj.title || ""}" onchange="updateProject(${i}, 'title', this.value)">
    <label>Description:</label><input type="text" value="${proj.desc || ""}" onchange="updateProject(${i}, 'desc', this.value)">
    <label>Tags (comma):</label><input type="text" value="${proj.tags || ""}" onchange="updateProject(${i}, 'tags', this.value)">
    <label>Image URL:</label><input type="text" value="${proj.image || ""}" onchange="updateProject(${i}, 'image', this.value)">
    <button class="delete-btn" onclick="deleteProject(${i})">Delete</button>
  `;
  return div;
}
function createAddProjectBtn() {
  const btn = document.createElement("button");
  btn.textContent = "Add Project"; btn.className = "btn";
  btn.onclick = () => {
    window.portfolioData.projects.push({ title: "", desc: "", tags: "", image: "" });
    saveData(); renderForm("projects"); window.renderProjects && window.renderProjects();
  };
  return btn;
}

// ===== CERTIFICATES PREVIEW -----
function showCertificatePreview(fileUrl) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.7)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  const container = document.createElement("div");
  container.style.background = "#fff";
  container.style.borderRadius = "12px";
  container.style.padding = "20px";
  container.style.maxWidth = "90%";
  container.style.maxHeight = "90%";
  container.style.overflow = "auto";
  container.style.position = "relative";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "15px";
  closeBtn.style.background = "#ff5a5a";
  closeBtn.style.color = "#fff";
  closeBtn.style.border = "none";
  closeBtn.style.fontSize = "20px";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => document.body.removeChild(overlay);

  let content;
  if (fileUrl.includes("pdf")) {
    content = document.createElement("iframe");
    content.src = fileUrl;
    content.style.width = "800px";
    content.style.height = "600px";
    content.style.border = "none";
  } else {
    content = document.createElement("img");
    content.src = fileUrl;
    content.style.maxWidth = "100%";
    content.style.maxHeight = "80vh";
    content.style.borderRadius = "10px";
  }

  container.appendChild(closeBtn);
  container.appendChild(content);
  overlay.appendChild(container);
  document.body.appendChild(overlay);
}

// ----- CERTIFICATES TAB -----
function createCertificateForm(cert, i) {
  const div = document.createElement("div");
  div.className = "admin-item";
  div.innerHTML = `
    <label>Title:</label>
    <input type="text" value="${cert.title || ""}" onchange="updateCertificate(${i}, 'title', this.value)">
    
    <label>Organization:</label>
    <input type="text" value="${cert.org || ""}" onchange="updateCertificate(${i}, 'org', this.value)">
    
    <label>Year:</label>
    <input type="text" value="${cert.year || ""}" onchange="updateCertificate(${i}, 'year', this.value)">
    
    <label>Logo URL:</label>
    <input type="text" value="${cert.logo || ""}" onchange="updateCertificate(${i}, 'logo', this.value)">
    
    <label>Upload Certificate:</label>
    <input type="file" accept="image/*,application/pdf" onchange="handleCertificateFileUpload(event, ${i})">
    
    <div class="cert-preview">
      ${cert.file
        ? `<button class="btn" onclick="showCertificatePreview('${cert.file}')">View Certificate</button>`
        : `<small>No file uploaded</small>`}
    </div>

    <button class="delete-btn" onclick="deleteCertificate(${i})">Delete</button>
  `;
  return div;
}

function createAddCertificateBtn() {
  const btn = document.createElement("button");
  btn.textContent = "Add Certificate";
  btn.className = "btn";
  btn.onclick = () => {
    window.portfolioData.certificates.push({
      title: "",
      org: "",
      year: "",
      logo: "",
      file: ""
    });
    saveData();
    renderForm("certificates");
    window.renderCertificates && window.renderCertificates();
  };
  return btn;
}

// ----- HANDLE CERTIFICATE UPLOAD -----
function handleCertificateFileUpload(event, index) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      window.portfolioData.certificates[index].file = reader.result;
      saveData();
      renderForm("certificates");
      window.renderCertificates && window.renderCertificates();
    };
    reader.readAsDataURL(file);
  }
}

// ===== UPDATE FUNCTIONS =====
function updateSkill(i, key, value) { window.portfolioData.skills[i][key] = value; saveData(); window.renderSkills && window.renderSkills(); }
function updateEducation(i, key, value) { window.portfolioData.education[i][key] = value; saveData(); window.renderEducation && window.renderEducation(); }
function updateProject(i, key, value) { window.portfolioData.projects[i][key] = value; saveData(); window.renderProjects && window.renderProjects(); }
function updateCertificate(i, key, value) { window.portfolioData.certificates[i][key] = value; saveData(); window.renderCertificates && window.renderCertificates(); }

// ===== DELETE FUNCTIONS =====
function deleteSkill(i) { window.portfolioData.skills.splice(i, 1); saveData(); renderForm("skills"); window.renderSkills && window.renderSkills(); }
function deleteEducation(i) { window.portfolioData.education.splice(i, 1); saveData(); renderForm("education"); window.renderEducation && window.renderEducation(); }
function deleteProject(i) { window.portfolioData.projects.splice(i, 1); saveData(); renderForm("projects"); window.renderProjects && window.renderProjects(); }
function deleteCertificate(i) { window.portfolioData.certificates.splice(i, 1); saveData(); renderForm("certificates"); window.renderCertificates && window.renderCertificates(); }

// ===== INIT ADMIN -----
initAdmin();



