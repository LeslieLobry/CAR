const targetDate = new Date("2025-06-16T21:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").textContent = "Le site est maintenant en ligne ! 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").textContent =
    `${days}j ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Gestion du formulaire

const form = document.getElementById('emailForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = 'Envoi en cours...';

  const email = form.email.value;

  try {
    const response = await fetch('/api/inscription-ouverture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      message.textContent = "Merci ! votre email a été enregistré.";
      form.reset();
    } else {
      const data = await response.json();
      message.textContent = `Erreur : ${data.error || 'Impossible d\'enregistrer votre email.'}`;
    }
  } catch (error) {
    message.textContent = "Erreur réseau, merci de réessayer.";
  }
});
