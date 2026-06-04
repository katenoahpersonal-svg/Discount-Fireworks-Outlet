const targetDate = new Date("July 4, 2026 00:00:00").getTime();

const ids = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = Math.max(targetDate - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  ids.days.textContent = days;
  ids.hours.textContent = pad(hours);
  ids.minutes.textContent = pad(minutes);
  ids.seconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll(".demo-selector button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".demo-selector button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});
