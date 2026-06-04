const targetDate=new Date("July 4, 2026 00:00:00").getTime();
const ids=["days","hours","minutes","seconds","days2","hours2","minutes2","seconds2"].reduce((acc,id)=>{acc[id]=document.getElementById(id);return acc},{});
function pad(v){return String(v).padStart(2,"0")}
function updateCountdown(){
  const d=Math.max(targetDate-new Date().getTime(),0);
  const vals={days:Math.floor(d/(1000*60*60*24)),hours:pad(Math.floor(d/(1000*60*60)%24)),minutes:pad(Math.floor(d/(1000*60)%60)),seconds:pad(Math.floor(d/1000%60))};
  ["","2"].forEach(s=>{ids["days"+s].textContent=vals.days;ids["hours"+s].textContent=vals.hours;ids["minutes"+s].textContent=vals.minutes;ids["seconds"+s].textContent=vals.seconds;});
}
updateCountdown();setInterval(updateCountdown,1000);

const positions=["card-1","card-2","card-3","card-4","card-5"];
const cards=[...document.querySelectorAll(".carousel-stage .show-card")];
let active=2;

function render(){
  cards.forEach((card,i)=>{
    card.classList.remove("card-1","card-2","card-3","card-4","card-5","hero-card","side-card","slim-card","active");
    const offset=(i-active+cards.length)%cards.length;
    const mapped=offset===0?2:offset===1?3:offset===2?4:offset===3?0:1;
    card.classList.add(positions[mapped]);
    if(mapped===2){card.classList.add("hero-card","active")}
    else if(mapped===1 || mapped===3){card.classList.add("side-card")}
    else{card.classList.add("slim-card")}
  });
}
document.querySelector(".arrow-right").addEventListener("click",()=>{active=(active+1)%cards.length;render();});
document.querySelector(".arrow-left").addEventListener("click",()=>{active=(active-1+cards.length)%cards.length;render();});
let startX=null;
document.querySelector(".carousel-stage").addEventListener("pointerdown",e=>{startX=e.clientX});
document.querySelector(".carousel-stage").addEventListener("pointerup",e=>{
  if(startX===null)return;
  const diff=e.clientX-startX;
  if(Math.abs(diff)>40){active=diff<0?(active+1)%cards.length:(active-1+cards.length)%cards.length;render();}
  startX=null;
});
render();

const video=document.getElementById("featured-video");
document.querySelectorAll(".demo-list button").forEach(btn=>{
  btn.addEventListener("click",()=>{video.src=`https://www.youtube.com/embed/${btn.dataset.video}`;});
});
