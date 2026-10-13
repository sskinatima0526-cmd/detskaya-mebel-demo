// ростомер слева заполняется по прокрутке
const ruler=document.querySelector('.ruler');
const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;ruler.style.setProperty('--p',max>0?scrollY/max:0)};
addEventListener('scroll',onScroll,{passive:true});onScroll();

// подбор парты: группы роста по ГОСТ 11015/11016 (стол / стул, см)
const groups=[[115,46,26,'в 4–6 лет'],[130,52,30,'в 7–8 лет'],[145,58,34,'в 9–11 лет'],[160,64,38,'в 11–13 лет'],[999,70,42,'в 13–14 лет и старше']];
const $=id=>document.getElementById(id);
const range=$('h'),kid=$('kid'),desk=$('desk');
function draw(){
  const h=+range.value,g=groups.find(g=>h<g[0]);
  $('hOut').textContent=h+' см';$('tOut').textContent=g[1]+' см';$('cOut').textContent=g[2]+' см';$('aOut').textContent=g[3];
  const k=1.25,floor=250,t=floor-g[1]*k*1.4,c=floor-g[2]*k*1.4;
  // стол и стул
  desk.innerHTML=`<rect x="200" y="${t-8}" width="170" height="10" rx="4" fill="#E9D6B8" stroke="#22303F" stroke-width="2"/>
  <path d="M215 ${t+2}V250M355 ${t+2}V250" stroke="#22303F" stroke-width="2"/>
  <rect x="80" y="${c-7}" width="70" height="8" rx="3" fill="#D9A520" stroke="#22303F" stroke-width="2"/>
  <path d="M88 ${c+1}V250M142 ${c+1}V250M88 ${c-7}V${c-70}" stroke="#22303F" stroke-width="2"/>`;
  // ребёнок сидит: размеры от роста
  const s=h/122,thigh=34*s,trunk=58*s,head=15*s,shin=g[2]*k*1.4-4;
  const hipX=128,hipY=c-9,kneeX=hipX+thigh*1.6;
  kid.innerHTML=`<path d="M${hipX} ${hipY}L${kneeX} ${hipY}L${kneeX} ${hipY+shin}" fill="none" stroke-width="16" stroke-linecap="round" stroke="#56626E"/>
  <path d="M${hipX} ${hipY}L${hipX+4} ${hipY-trunk}" fill="none" stroke-width="26" stroke-linecap="round" stroke="#A9C6DA"/>
  <path d="M${hipX+6} ${hipY-trunk+12}L${hipX+38*s} ${hipY-trunk*.45}L${Math.max(hipX+60*s,212)} ${t-12}" fill="none" stroke-width="10" stroke-linecap="round" stroke="#A9C6DA"/>
  <circle cx="${hipX+6}" cy="${hipY-trunk-head-4}" r="${head}" fill="#E9D6B8"/>`;
}
range.addEventListener('input',draw);draw();
