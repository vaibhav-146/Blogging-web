// ============================
// MOBILE NAVIGATION TOGGLE
// ============================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  // Close the mobile menu automatically when a link inside it is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

// ============================
// BLOG CATEGORY FILTER (blog.html only)
// ============================
const filterBar = document.getElementById("filterBar");
const postCards = document.querySelectorAll("#postGrid .post-card");
const noResults = document.getElementById("noResults");

if (filterBar && postCards.length) {
  const filterButtons = filterBar.querySelectorAll("button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      // Update which button looks active
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      let visibleCount = 0;

      postCards.forEach((card) => {
        const matches = selected === "all" || card.dataset.category === selected;
        card.style.display = matches ? "" : "none";
        if (matches) visibleCount++;
      });

      if (noResults) {
        noResults.classList.toggle("visible", visibleCount === 0);
      }
    });
  });
}

// ============================
// BLOG SEARCH (blog.html only)
// ============================
const blogSearchForm = document.getElementById("blogSearchForm");
const blogSearchInput = document.getElementById("blogSearch");

if (blogSearchForm && blogSearchInput && postCards.length) {
  blogSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = blogSearchInput.value.trim().toLowerCase();

    let visibleCount = 0;

    postCards.forEach((card) => {
      const title = (card.dataset.title || card.textContent).toLowerCase();
      const matches = !query || title.includes(query);
      card.style.display = matches ? "" : "none";
      if (matches) visibleCount++;
    });

    if (noResults) {
      noResults.classList.toggle("visible", visibleCount === 0);
    }
  });
}

// ============================
// NEWSLETTER FORM (index.html & about.html)
// ============================
const newsletterForm = document.getElementById("newsletterForm");
const newsletterNote = document.getElementById("newsletterNote");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = document.getElementById("newsletterEmail");

    if (emailInput && emailInput.validity.valid) {
      newsletterNote.textContent = `Subscribed! We'll send updates to ${emailInput.value}.`;
      newsletterNote.className = "form-note success";
      newsletterForm.reset();
    } else {
      newsletterNote.textContent = "Please enter a valid email address.";
      newsletterNote.className = "form-note error";
    }
  });
}

// ============================
// CONTACT FORM VALIDATION (contact.html)
// ============================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const messageInput = document.getElementById("contactMessage");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const contactStatus = document.getElementById("contactStatus");

  function validateField(input, errorEl, message) {
    if (!input || !input.validity.valid) {
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.className = "form-note error";
      }
      if (input) input.classList.add("invalid");
      return false;
    }
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.className = "form-note";
    }
    input.classList.remove("invalid");
    return true;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const isNameValid = validateField(
      nameInput,
      nameError,
      "Please enter your name (at least 2 characters)."
    );
    const isEmailValid = validateField(
      emailInput,
      emailError,
      "Please enter a valid email address."
    );
    const isMessageValid = validateField(
      messageInput,
      messageError,
      "Message must be at least 10 characters long."
    );

    if (isNameValid && isEmailValid && isMessageValid) {
      if (contactStatus) {
        contactStatus.textContent = "Message sent — we'll get back to you soon.";
        contactStatus.className = "form-note success";
      }
      contactForm.reset();
    } else {
      if (contactStatus) {
        contactStatus.textContent = "Please fix the errors above and try again.";
        contactStatus.className = "form-note error";
      }
    }
  });
}

// ============================
// BACK TO TOP BUTTON
// ============================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}