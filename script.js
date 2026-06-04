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

const featuredVideo = document.getElementById("featured-video");
const featuredLabel = document.getElementById("featured-label");

document.querySelectorAll(".demo-card").forEach((button, index) => {
  if (index === 0) button.classList.add("active");

  button.addEventListener("click", () => {
    document.querySelectorAll(".demo-card").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const videoId = button.dataset.video;
    const title = button.dataset.title;
    const label = button.dataset.label;

    featuredVideo.src = `https://www.youtube.com/embed/${videoId}`;
    featuredVideo.title = `${title} firework demo`;
    featuredLabel.textContent = label;
  });
});
