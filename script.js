const $=id=>document.getElementById(id);
const num=id=>parseFloat($(id).value)||0;
const money=n=>(n<0?"-":"")+Math.abs(n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
const pct=n=>isFinite(n)?n.toFixed(2)+"%":"–";
function set(id,t,neg){const e=$(id);e.textContent=t;e.classList.toggle("neg",!!neg)}
function calc(){
  const rev=num("rev"),cogs=num("cogs"),opex=num("opex"),tax=num("tax");
  if(!rev){["nm","gp","gm","op","np","mk"].forEach(i=>set(i,"–"));$("bar").style.width="0";return}
  const gp=rev-cogs,op=gp-opex,np=op-(op>0?op*tax/100:0);
  const nm=np/rev*100;
  set("gp",money(gp),gp<0);set("gm",pct(gp/rev*100),gp<0);
  set("op",money(op),op<0);set("np",money(np),np<0);
  set("mk",cogs?pct(gp/cogs*100):"–",gp<0);
  set("nm",pct(nm),nm<0);
  $("bar").style.width=Math.max(0,Math.min(100,nm))+"%";
}
["rev","cogs","opex","tax"].forEach(i=>$(i).addEventListener("input",calc));
$("clear").onclick=()=>{["rev","cogs","opex","tax"].forEach(i=>$(i).value="");calc()};
calc();
