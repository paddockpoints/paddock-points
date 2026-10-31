
const BAN=12;
const $=s=>document.querySelector(s);
const todayISO=()=>{const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10)};
const fmt=iso=>new Date(iso+"T12:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
const days=(a,b)=>Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/864e5);
const open=new Set();

function state(asof){
  return DRIVERS.map(d=>{
    const live=d.o.filter(x=>x.exp>asof);
    const pts=live.reduce((s,x)=>s+x.p,0);
    const next=live.map(x=>x.exp).sort()[0]||null;
    const status=pts>=BAN?"risk":pts>=8?"risk":pts>=4?"watch":"clear";
    return {...d,pts,bal:Math.max(0,BAN-pts),next,status};
  });
}
function sortRows(rows,by){
  const r=[...rows];
  if(by==="pts")r.sort((a,b)=>b.pts-a.pts||(a.next||"9").localeCompare(b.next||"9")||a.n.localeCompare(b.n));
  if(by==="next")r.sort((a,b)=>(a.next||"9").localeCompare(b.next||"9")||b.pts-a.pts);
  if(by==="name")r.sort((a,b)=>a.n.split(" ").pop().localeCompare(b.n.split(" ").pop()));
  if(by==="team")r.sort((a,b)=>a.t.localeCompare(b.t)||b.pts-a.pts);
  return r;
}
function render(){
  const asof=$("#asof").value||todayISO();
  const rows=sortRows(state(asof),$("#sort").value);
  const carrying=rows.filter(r=>r.pts>0).length;
  const total=rows.reduce((s,r)=>s+r.pts,0);
  const top=Math.max(...rows.map(r=>r.pts));
  $("#summary").innerHTML=`
    <div><b>${carrying}</b><span>drivers carrying points</span></div>
    <div><b>${total}</b><span>live points on the grid</span></div>
    <div><b>${BAN-top}</b><span>closest driver's balance to a ban</span></div>`;
  $("#list").innerHTML=rows.map(r=>{
    const c=r.status==="clear"?"var(--ok)":r.status==="watch"?"var(--warn)":"var(--bad)";
    const cells=Array.from({length:BAN},(_,i)=>`<i style="${i<r.pts?`background:${c}`:""}"></i>`).join("");
    const label={clear:"Clear",watch:"Watch",risk:"At risk"}[r.status];
    const nextTxt=r.next?`Next drop <strong>${fmt(r.next)}</strong> (${days(asof,r.next)} days)`:"Clean licence";
    const isOpen=open.has(r.n);
    const log=isOpen?`<div class="log">${r.o.length?r.o.slice().sort((a,b)=>a.exp.localeCompare(b.exp)).map(x=>`
        <div class="off ${x.exp<=asof?"gone":""}"><span class="p">+${x.p}</span><span>${x.ev}<br><span style="color:var(--muted)">${x.why}</span></span><span class="exp">${x.exp<=asof?"Expired":"Expires"}<br>${fmt(x.exp)}</span></div>`).join(""):`<div class="off"><span class="p">0</span><span>No penalty points in the last 12 months</span><span></span></div>`}</div>`:"";
    return `<button class="row" type="button" data-n="${r.n}" aria-expanded="${isOpen}">
      <span class="who"><span class="chip" style="background:${TEAMS[r.t]}"></span><span class="name">${r.n}<span class="team">${r.t}</span></span></span>
      <span class="tally"><span class="pts">${r.pts}</span><span class="of"> / ${BAN}</span></span>
      <span class="meter" aria-label="${r.pts} of ${BAN} points">${cells}</span>
      <span class="meta"><span class="pill s-${r.status}">${label}</span><span>Balance <strong>${r.bal} pts</strong> to a ban</span><span>${nextTxt}</span></span>
      ${log}
    </button>`;
  }).join("");
}
$("#list").addEventListener("click",e=>{
  const b=e.target.closest(".row"); if(!b)return;
  const n=b.dataset.n; open.has(n)?open.delete(n):open.add(n); render();
});
/* ---------- Road to F1 ---------- */
let series="F2";
function renderRoad(){
  const s=SERIES[series];
  $("#seriesStatus").textContent=s.status;
  const rows=s.rows.map((r,i)=>{const earn=SL[series][i]||0;return {pos:i+1,n:r[0],t:r[1],cp:r[2],bank:r[3],earn,sum:earn+r[3],note:r[4]}});
  const clear=rows.filter(r=>r.sum>=40).length;
  $("#rsummary").innerHTML=`
    <div><b>${clear}</b><span>${series==="F3"?"on 40+ points":"on course for 40+"}</span></div>
    <div><b>${rows[0].earn}</b><span>points for the ${series} title</span></div>
    <div><b>${rows.filter(r=>r.earn>0).length}</b><span>drivers scoring licence points</span></div>`;
  $("#rlist").innerHTML=rows.map(r=>{
    const ok=r.sum>=40, c=ok?"var(--ok)":r.sum>=20?"var(--warn)":"var(--accent)";
    const filled=Math.min(40,r.sum);
    const cells=Array.from({length:40},(_,i)=>`<i style="${i<Math.min(r.bank,filled)?"background:var(--muted)":i<filled?`background:${c}`:""}"></i>`).join("");
    const label=ok?(series==="F3"?"Eligible":"On course"):r.sum>0?"Building":"Outside top 10";
    const cls=ok?"s-clear":r.sum>0?"s-watch":"s-risk";
    return `<div class="rk">
      <span class="pos">${r.pos}</span>
      <span class="who"><span class="name">${r.n}<span class="team">${r.t} · ${r.cp} championship pts</span></span></span>
      <span class="sl"><b>${r.sum}</b><span class="of"> / 40</span></span>
      <span class="meter" aria-label="${r.sum} of 40 licence points">${cells}</span>
      <span class="meta"><span class="pill ${cls}">${label}</span><span>2026 position worth <strong>${r.earn} pts</strong></span>${r.bank?`<span>Banked <strong>${r.bank}</strong></span>`:""}${r.note?`<span class="tag">${r.note}</span>`:""}</span>
    </div>`}).join("");
}
document.querySelectorAll(".seg button").forEach(b=>b.addEventListener("click",()=>{
  series=b.dataset.s;
  document.querySelectorAll(".seg button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
  renderRoad();
}));
function route(){
  const tab=location.hash==="#road-to-f1"?"road-to-f1":"penalties";
  $("#v-road").hidden=tab!=="road-to-f1";
  $("#v-pen").hidden=tab!=="penalties";
  document.querySelectorAll(".tabs a").forEach(a=>{a.dataset.tab===tab?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current")});
}
window.addEventListener("hashchange",route);
renderRoad(); route();

$("#asof").value=todayISO();
$("#asof").addEventListener("change",render);
$("#sort").addEventListener("change",render);
$("#today").addEventListener("click",()=>{$("#asof").value=todayISO();render()});
render();

document.getElementById("updated").textContent="Updated "+fmt(UPDATED)+" · "+UPDATED_NOTE;
