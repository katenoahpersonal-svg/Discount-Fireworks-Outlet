const targetDate=new Date("July 4, 2026 00:00:00").getTime();
const ids={days:document.getElementById("days"),hours:document.getElementById("hours"),minutes:document.getElementById("minutes"),seconds:document.getElementById("seconds")};
function pad(v){return String(v).padStart(2,"0")}
function updateCountdown(){const now=new Date().getTime();const d=Math.max(targetDate-now,0);ids.days.textContent=Math.floor(d/(1000*60*60*24));ids.hours.textContent=pad(Math.floor(d/(1000*60*60)%24));ids.minutes.textContent=pad(Math.floor(d/(1000*60)%60));ids.seconds.textContent=pad(Math.floor(d/1000%60))}
updateCountdown();setInterval(updateCountdown,1000);

const featuredVideo=document.getElementById("featured-video");
const featuredLabel=document.getElementById("featured-label");
document.querySelectorAll(".demo-tile").forEach((button,index)=>{
  if(index===0)button.classList.add("active");
  button.addEventListener("click",()=>{
    document.querySelectorAll(".demo-tile").forEach(item=>item.classList.remove("active"));
    button.classList.add("active");
    featuredVideo.src=`https://www.youtube.com/embed/${button.dataset.video}`;
    featuredVideo.title=`${button.dataset.title} firework demo`;
    featuredLabel.textContent=button.dataset.label;
  });
});

document.querySelectorAll(".float-card,.theater,.location-sign,.contact-form").forEach((el)=>{
  el.addEventListener("mousemove",(e)=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    el.style.transform=`perspective(1200px) rotateX(${y*-3}deg) rotateY(${x*3}deg)`;
  });
  el.addEventListener("mouseleave",()=>{el.style.transform="";});
});
