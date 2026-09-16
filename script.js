// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

// Typing effect
const typedText = document.getElementById("typedText");
const roles = ["Web Developer", "Frontend Developer", "JavaScript Developer"];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typedText) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 100);
}

// Start typing effect
typeEffect();

// Current year
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Contact form: sends through Vercel API
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const formMessage = document.getElementById("formMessage");
    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    if (!name || !email || !message) {
      formMessage.textContent = "Please fill in all fields.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formMessage.textContent = "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to send message."
        );
      }

      formMessage.textContent =
        "Message sent successfully! Thank you.";

      contactForm.reset();

    } catch (error) {
  console.error(error);
  formMessage.textContent = error.message || "Message could not be sent.";
} finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    }
  });
}

// QR code
if (typeof QRCode !== "undefined") {
  const qrElement = document.getElementById("qrcode");

  if (qrElement) {
    new QRCode(qrElement, {
      text: window.location.href,
      width: 128,
      height: 128
    });
  }
}
