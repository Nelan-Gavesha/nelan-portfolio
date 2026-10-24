document.addEventListener("DOMContentLoaded", () => {
  // --- Theme Toggle with LocalStorage ---
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme');
  
  if (currentTheme === 'light') {
    document.body.classList.add('light');
    if (themeToggle) themeToggle.textContent = '🌙';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      themeToggle.textContent = isLight ? '🌙' : '☀️';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // --- Mobile Menu ---
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }

  // --- Set Current Year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --- Typing Animation (Home page only) ---
  const typedText = document.getElementById("typed-text");
  if (typedText) {
    const textArray = ["IT Undergraduate", "Aspiring System Analyst", "Problem Solver", "Business & Tech Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textIndex].length) {
        typedText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(erase, 2000);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
      } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
      }
    }
    type();
  }

  // --- Accordion for Education (About page only) ---
  const accordions = document.querySelectorAll('.accordion-btn');
  if (accordions.length > 0) {
    accordions.forEach(btn => {
      btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        content.classList.toggle('active');
        btn.textContent = content.classList.contains('active') ? 'Hide Details' : 'View Details';
      });
    });
  }

  // =========================================
  // CV BUILDER LOGIC (Resume page only)
  // =========================================
  const cvCheckboxes = document.querySelectorAll('.cv-checkbox');
  const formatRadios = document.querySelectorAll('.format-radio');
  const resumePreview = document.getElementById('resume-preview');
  const downloadBtn = document.getElementById('downloadPdf');

  // Toggle Sections
  if (cvCheckboxes.length > 0) {
    cvCheckboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const sectionId = e.target.getAttribute('data-target');
        const sectionEl = document.querySelector(`.cv-section[data-cv-section="${sectionId}"]`);
        if (sectionEl) {
          sectionEl.style.display = e.target.checked ? 'block' : 'none';
        }
      });
    });
  }

  // Toggle Format (General vs ATS)
  if (formatRadios.length > 0) {
    formatRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'ats') {
          resumePreview.classList.remove('preview-general');
          resumePreview.classList.add('preview-ats');
        } else {
          resumePreview.classList.remove('preview-ats');
          resumePreview.classList.add('preview-general');
        }
      });
    });
  }

  // Download PDF
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const element = document.getElementById('resume-preview');
      const opt = {
        margin:       0,
        filename:     'Nelan_Gavesha_CV.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      // Temporarily hide the border-radius for a clean PDF
      element.style.borderRadius = '0';
      
      html2pdf().set(opt).from(element).save().then(() => {
        element.style.borderRadius = '8px'; // Restore after download
      });
    });
  }
});