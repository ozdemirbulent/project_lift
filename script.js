(function () {
  const LS_KEY = "cookie_consent_v1";

  function saveConsent(val) {
    try {
      localStorage.setItem(LS_KEY, val);
    } catch (e) {}
  }
  function getConsent() {
    try {
      return localStorage.getItem(LS_KEY);
    } catch (e) {
      return null;
    }
  }

  const cookieBox = document.getElementById("cookieBox");
  const cookieAcceptBtn = document.getElementById("cookieAcceptBtn");
  const cookieRejectBtn = document.getElementById("cookieRejectBtn");
  const cookieSideBtn = document.getElementById("cookieSideBtn");
  const readPolicyBtn = document.getElementById("readPolicyBtn");
  const readKvkkBtn = document.getElementById("readKvkkBtn");

  function showBox() {
    if (cookieBox) cookieBox.classList.add("show");
  }
  function hideBox() {
    if (cookieBox) cookieBox.classList.remove("show");
  }

  // Karar verilmemişse sadece çerez bildirimi gösterilir; KVKK metni isteğe bağlı olarak açılır.
  if (!getConsent()) {
    setTimeout(() => {
      showBox();
    }, 800);
  }

  // Kabul / Reddet
  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener("click", () => {
      saveConsent("accepted");
      hideBox();
    });
  }
  if (cookieRejectBtn) {
    cookieRejectBtn.addEventListener("click", () => {
      saveConsent("rejected");
      hideBox();
    });
  }

  /* Modal Yardımcıları */
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;

    // Mobil menü açıksa kapat
    const navLinks = document.getElementById("navLinks");
    const navToggle = document.getElementById("navToggle");
    if (navLinks && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      if (navToggle) {
        navToggle.textContent = "☰";
        navToggle.setAttribute("aria-expanded", "false");
      }
    }

    m.classList.add("open");
    m.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove("open");
    m.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Çerez butonları
  if (cookieSideBtn) {
    cookieSideBtn.addEventListener("click", () => {
      hideBox();
      openModal("cookiePolicyModal");
    });
  }
  if (readPolicyBtn) {
    readPolicyBtn.addEventListener("click", () => {
      openModal("cookiePolicyModal");
    });
  }
  if (readKvkkBtn) {
    readKvkkBtn.addEventListener("click", () => {
      openModal("kvkkModal");
    });
  }

  // Modal iç butonları
  const cookiePolicyAccept = document.getElementById("cookiePolicyAccept");
  const cookiePolicyReject = document.getElementById("cookiePolicyReject");
  const closeCookiePolicy = document.getElementById("closeCookiePolicy");

  if (cookiePolicyAccept) {
    cookiePolicyAccept.addEventListener("click", () => {
      saveConsent("accepted");
      hideBox();
      closeModal("cookiePolicyModal");
    });
  }
  if (cookiePolicyReject) {
    cookiePolicyReject.addEventListener("click", () => {
      saveConsent("rejected");
      hideBox();
      closeModal("cookiePolicyModal");
    });
  }
  if (closeCookiePolicy) {
    closeCookiePolicy.addEventListener("click", () =>
      closeModal("cookiePolicyModal"),
    );
  }

  // KVKK Tetikleyicileri
  const footerKvkk = document.getElementById("footerKvkk");
  const footerCookiePolicy = document.getElementById("footerCookiePolicy");
  const closeKvkk = document.getElementById("closeKvkk");
  const closeKvkkBtn = document.getElementById("closeKvkkBtn");

  if (footerKvkk)
    footerKvkk.addEventListener("click", () => openModal("kvkkModal"));
  if (footerCookiePolicy)
    footerCookiePolicy.addEventListener("click", () =>
      openModal("cookiePolicyModal"),
    );
  if (closeKvkk)
    closeKvkk.addEventListener("click", () => closeModal("kvkkModal"));
  if (closeKvkkBtn)
    closeKvkkBtn.addEventListener("click", () => closeModal("kvkkModal"));

  // Dışarı tıklama ve ESC ile kapatma
  ["kvkkModal", "cookiePolicyModal"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", function (e) {
        if (e.target === this) closeModal(id);
      });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal("kvkkModal");
      closeModal("cookiePolicyModal");
    }
  });
})();

/* ── 1. SCROLL TOP BTN ──────────────────────────────────────*/
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = Math.max(
    1,
    document.documentElement.scrollHeight -
      document.documentElement.clientHeight,
  );
  const scrollPercent = scrollTop / docHeight;

  if (scrollTopBtn) {
    scrollTopBtn.style.setProperty("--scroll-value", `${scrollPercent * 100}%`);
    if (scrollTop > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ── 2. HERO SLIDER ─────────────────────────────────────────*/
const slideImages = [
  "./images/hero-1.webp",
  "./images/hero-2.webp",
  "./images/hero-3.webp",
];

function loadSlideImage(slide, src) {
  const img = new Image();
  img.onload = () => {
    slide.style.backgroundImage = `url('${src}')`;
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";
  };
  img.onerror = () => {
    slide.style.background = "linear-gradient(135deg, #111 0%, #1a1a1a 100%)";
  };
  img.src = src;
}



document
  .querySelectorAll(".slide")
  .forEach((slide, i) => loadSlideImage(slide, slideImages[i]));

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function goSlide(n) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove("active");
  if (dots[currentSlide]) {
    dots[currentSlide].classList.remove("active");
    dots[currentSlide].setAttribute("aria-selected", "false");
  }
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  if (dots[currentSlide]) {
    dots[currentSlide].classList.add("active");
    dots[currentSlide].setAttribute("aria-selected", "true");
  }
}

if (slides.length > 1) {
  setInterval(() => goSlide(currentSlide + 1), 5000);
}

/* ── 3. NAVBAR SCROLL ───────────────────────────────────────*/
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () =>
    navbar.classList.toggle("scrolled", window.scrollY > 60),
  );
}

/* ── 4. MOBİL MENÜ ──────────────────────────────────────────*/
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navClose = document.getElementById("navClose");

function closeMobileMenu() {
  if (!navLinks || !navToggle) return;
  navLinks.classList.remove("open");
  navToggle.textContent = "☰";
  navToggle.setAttribute("aria-expanded", "false");
  if (navClose) navClose.style.display = "none";
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    if (window.innerWidth > 900) return;
    const isOpen = navLinks.classList.toggle("open");
    navToggle.textContent = isOpen ? "✕" : "☰";
    navToggle.setAttribute("aria-expanded", String(isOpen));
    if (navClose) navClose.style.display = isOpen ? "flex" : "none";
  });

  if (navClose) {
    navClose.addEventListener("click", closeMobileMenu);
  }

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

/* ── 5. SMOOTH SCROLL ───────────────────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ── 6. SCROLL REVEAL ───────────────────────────────────────*/
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.1 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ── 7. SAYAÇ ANİMASYONU ────────────────────────────────────*/
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = Date.now();
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = target === 24 ? "7/24" : Math.floor(ease * target) + "+";
    if (progress < 1) requestAnimationFrame(tick);
  };
  tick();
}

const statsBar = document.querySelector(".stats-bar");
let counterStarted = false;
const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counterStarted) {
      counterStarted = true;
      document.querySelectorAll("[data-target]").forEach(animateCounter);
    }
  },
  { threshold: 0.5 },
);
if (statsBar) statsObserver.observe(statsBar);

/* ── 8. İLETİŞİM FORMU (WHATSAPP ENTEGRASYONU) ───────────────*/
const WHATSAPP_NUMBER = "905352681166";

const contactForm = document.getElementById("contactForm");
const warningMessage = document.querySelector(".warning");
const phoneInput = document.getElementById("f-tel");
const adInput = document.getElementById("f-ad");

if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}

if (adInput) {
  adInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[0-9]/g, "");
  });
}

if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = "";
    if (val.length > 0) formatted += val.substring(0, 3);
    if (val.length > 3) formatted += " " + val.substring(3, 6);
    if (val.length > 6) formatted += " " + val.substring(6, 8);
    if (val.length > 8) formatted += " " + val.substring(8, 10);
    e.target.value = formatted;
  });
}

let formMessageTimer = null;

function clearFormMessage() {
  if (!warningMessage) return;
  clearTimeout(formMessageTimer);
  formMessageTimer = null;
  warningMessage.hidden = true;
  warningMessage.textContent = "";
  warningMessage.removeAttribute("data-type");
}

function setFormMessage(message, type, autoHideMs) {
  if (!warningMessage) return;
  clearTimeout(formMessageTimer);
  formMessageTimer = null;

  if (!message) {
    clearFormMessage();
    return;
  }

  warningMessage.textContent = message;
  warningMessage.hidden = false;
  if (type) warningMessage.dataset.type = type;
  else warningMessage.removeAttribute("data-type");

  let ms = autoHideMs;
  if (ms === undefined) {
    ms = type === "error" || type === "success" ? 4500 : 0;
  }
  if (ms > 0) {
    formMessageTimer = setTimeout(clearFormMessage, ms);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const adSoyad = form.querySelector("#f-ad").value.trim();
  const telefon = form.querySelector("#f-tel").value.trim();
  const hizmet = form.querySelector("#f-hizmet").value;
  const mesaj = form.querySelector("#f-mesaj").value.trim();
  const btn = form.querySelector(".btn-submit");
  const consent = form.querySelector("#f-consent").checked;

  if (!adSoyad || !telefon || !hizmet || !mesaj) {
    setFormMessage("Lütfen tüm zorunlu alanları doldurunuz.", "error");
    return;
  }

  if (telefon.replace(/\D/g, "").length < 10) {
    setFormMessage("Telefon numarası en az 10 haneli olmalı.", "error");
    return;
  }

  if (!consent) {
    setFormMessage("Devam etmek için KVKK onay kutusunu işaretleyin.", "error");
    return;
  }

  const text = [
    "🔔 *27 İstanbul Asansör - Yeni Teklif Talebi*",
    "",
    `👤 *Ad Soyad:* ${adSoyad}`,
    `📞 *Telefon:* ${telefon}`,
    `🔧 *Hizmet:* ${hizmet}`,
    `💬 *Mesaj:* ${mesaj || "-"}`,
  ].join("\n");

  btn.disabled = true;
  btn.classList.add("loading");
  clearFormMessage();

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  const waWindow = window.open(waUrl, "_blank", "noopener,noreferrer");
  if (waWindow) waWindow.opener = null;

  btn.classList.remove("loading");
  btn.disabled = false;
  form.reset();
  setFormMessage(
    "Talebiniz alındı. WhatsApp penceresinden gönderimi tamamlayın. Fiyat ve şartlar ayrı değerlendirme ile netleşir.",
    "success",
    5500,
  );
}
