const targetDate=new Date("July 4, 2026 00:00:00").getTime();
const ids=["days","hours","minutes","seconds","days2","hours2","minutes2","seconds2"].reduce((acc,id)=>{acc[id]=document.getElementById(id);return acc},{});
function pad(v){return String(v).padStart(2,"0")}
function updateCountdown(){
  const d=Math.max(targetDate-new Date().getTime(),0);
  const vals={days:Math.floor(d/(1000*60*60*24)),hours:pad(Math.floor(d/(1000*60*60)%24)),minutes:pad(Math.floor(d/(1000*60)%60)),seconds:pad(Math.floor(d/1000%60))};
  ["","2"].forEach(s=>{ids["days"+s].textContent=vals.days;ids["hours"+s].textContent=vals.hours;ids["minutes"+s].textContent=vals.minutes;ids["seconds"+s].textContent=vals.seconds;});
}
updateCountdown();
setInterval(updateCountdown,1000);

const video=document.getElementById("featured-video");
document.querySelectorAll(".demo-list button").forEach(btn=>{
  btn.addEventListener("click",()=>{video.src=`https://www.youtube.com/embed/${btn.dataset.video}`;});
});
