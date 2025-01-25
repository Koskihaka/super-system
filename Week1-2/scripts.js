document.addEventListener("DOMContentLoaded", () => {
  // Päivitä navigointilinkkien aktiivinen tila vierityksen mukaan
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  document.addEventListener("scroll", () => {
      sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 100) {
              navLinks.forEach(link => link.classList.remove("active"));
              navLinks[index].classList.add("active");
          }
      });
  });

  // Smooth scrolling navigointilinkkeihin
  navLinks.forEach(link => {
      link.addEventListener("click", event => {
          event.preventDefault();
          const target = document.querySelector(event.target.getAttribute("href"));
          target.scrollIntoView({ behavior: "smooth" });
      });
  });

  // Lomakkeen validointi
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  form.addEventListener("submit", (event) => {
      let isValid = true;

      // Tarkista nimi
      if (nameInput.value.trim() === "") {
          nameError.textContent = "Nimi ei saa olla tyhjä.";
          nameError.style.display = "block";
          isValid = false;
      } else {
          nameError.style.display = "none";
      }

      // Tarkista sähköpostin muoto
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
          emailError.textContent = "Anna kelvollinen sähköpostiosoite.";
          emailError.style.display = "block";
          isValid = false;
      } else {
          emailError.style.display = "none";
      }

      // Tarkista viestin pituus
      if (messageInput.value.trim().length < 10) {
          messageError.textContent = "Viestin tulee olla vähintään 10 merkkiä.";
          messageError.style.display = "block";
          isValid = false;
      } else {
          messageError.style.display = "none";
      }

      // Estä lomakkeen lähetys, jos validointi epäonnistui
      if (!isValid) {
          event.preventDefault();
      }
  });

  // Tarot-kortin haku
  fetch("https://tarotapi.dev/api/v1/cards")
      .then(response => response.json())
      .then(data => {
          const cards = data.cards;
          const randomCard = cards[Math.floor(Math.random() * cards.length)];

          const container = document.getElementById("tarotContainer");

          // Näytetään kortin tiedot
          container.innerHTML = `
              <h3>${randomCard.name}</h3>
              <p><strong>Kuvaus:</strong> ${randomCard.desc}</p>
              <p><strong>Positiivinen merkitys:</strong> ${randomCard.meaning_up}</p>
              <p><strong>Käänteinen merkitys:</strong> ${randomCard.meaning_rev}</p>
          `;
      })
      .catch(error => {
          console.error("Virhe korttien haussa:", error);
          const container = document.getElementById("tarotContainer");
          container.innerHTML = "<p>Valitettavasti korttia ei voitu ladata.</p>";
      });
});
