const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("open");
});

document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("open"));
});

const words = ["AI/ML projects.", "web experiences.", "useful solutions.", "my portfolio."];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typing = document.getElementById("typing");

function typeEffect() {
  const word = words[wordIndex];

  if (!deleting) {
    typing.textContent = word.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === word.length) {
      deleting = true;
      setTimeout(typeEffect, 1300);
      return;
    }
  } else {
    typing.textContent = word.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();

document.getElementById("year").textContent = new Date().getFullYear();

/*
  Demo QR on the home page.
  IMPORTANT: after deploying, change the text below to your real GitHub Pages URL.
*/
const portfolioURL = "https://YOUR-USERNAME.github.io/roshan-portfolio/";

if (typeof QRCode !== "undefined") {
  new QRCode(document.getElementById("qrHome"), {
    text: portfolioURL,
    width: 220,
    height: 220,
    colorDark: "#111111",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  /*
    This demo does not send email by itself.
    To make it actually send messages, connect the form to a backend
    or a form service later.
  */
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(
    "Name: " + name + "\nEmail: " + email + "\n\n" + message
  );

  window.location.href =
    "mailto:your-email@example.com?subject=" + subject + "&body=" + body;

  formMessage.textContent = "Opening your email app...";
});
