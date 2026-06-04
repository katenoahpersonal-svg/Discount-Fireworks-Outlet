const targetDate=new Date("July 4, 2026 00:00:00").getTime();
const ids=["days","hours","minutes","seconds","days2","hours2","minutes2","seconds2"].reduce((acc,id)=>{acc[id]=document.getElementById(id);return acc},{});
function pad(v){return String(v).padStart(2,"0")}
function updateCountdown(){
  const d=Math.max(targetDate-new Date().getTime(),0);
  const vals={days:Math.floor(d/(1000*60*60*24)),hours:pad(Math.floor(d/(1000*60*60)%24)),minutes:pad(Math.floor(d/(1000*60)%60)),seconds:pad(Math.floor(d/1000%60))};
  ["","2"].forEach(s=>{ids["days"+s].textContent=vals.days;ids["hours"+s].textContent=vals.hours;ids["minutes"+s].textContent=vals.minutes;ids["seconds"+s].textContent=vals.seconds;});
}
updateCountdown();setInterval(updateCountdown,1000);

const positions=["panel-far-left","panel-left","panel-main","panel-right","panel-far-right"];
const panels=[...document.querySelectorAll(".carousel .panel")];
let active=2;

function render(){
  panels.forEach((panel,i)=>{
    panel.classList.remove("panel-far-left","panel-left","panel-main","panel-right","panel-far-right","active");
    const offset=(i-active+panels.length)%panels.length;
    const mapped=offset===0?2:offset===1?3:offset===2?4:offset===3?0:1;
    panel.classList.add(positions[mapped]);
    if(mapped===2) panel.classList.add("active");
  });
}
document.querySelector(".arrow-right").addEventListener("click",()=>{active=(active+1)%panels.length;render();});
document.querySelector(".arrow-left").addEventListener("click",()=>{active=(active-1+panels.length)%panels.length;render();});

let startX=null;
document.querySelector(".carousel").addEventListener("pointerdown",e=>{startX=e.clientX;});
document.querySelector(".carousel").addEventListener("pointerup",e=>{
  if(startX===null)return;
  const diff=e.clientX-startX;
  if(Math.abs(diff)>40){
    active=diff<0?(active+1)%panels.length:(active-1+panels.length)%panels.length;
    render();
  }
  startX=null;
});
render();

const video=document.getElementById("featured-video");
document.querySelectorAll(".demo-list button").forEach(btn=>{
  btn.addEventListener("click",()=>{video.src=`https://www.youtube.com/embed/${btn.dataset.video}`;});
});
