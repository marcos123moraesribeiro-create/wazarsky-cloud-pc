const $=s=>document.querySelector(s), wins=$("#windows"), opened={};
const titles={files:"Explorador de arquivos",terminal:"Terminal Linux (demonstração)",browser:"Navegador",editor:"Editor de texto",about:"Sobre o sistema"};
function openApp(app){
  $("#startmenu").hidden=true;
  if(opened[app]){opened[app].style.zIndex=++z;return}
  const w=document.createElement("section");w.className="win";w.style.zIndex=++z;
  w.innerHTML=`<div class="win-head"><span>◈</span><span class="win-title">${titles[app]}</span><button class="min">−</button><button class="close">×</button></div><div class="win-body">${content(app)}</div>`;
  wins.append(w);opened[app]=w;
  w.querySelector(".close").onclick=()=>{w.remove();delete opened[app];const b=document.querySelector(`[data-task="${app}"]`);if(b)b.remove()};
  w.querySelector(".min").onclick=()=>w.hidden=true;
  w.addEventListener("pointerdown",()=>w.style.zIndex=++z);
  const tb=document.createElement("button");tb.textContent=({files:"📁",terminal:"⌘",browser:"🌐",editor:"📝",about:"⚙️"})[app];tb.dataset.task=app;tb.onclick=()=>{w.hidden=!w.hidden;if(!w.hidden)w.style.zIndex=++z};$("#taskapps").append(tb);
  if(app==="terminal")setupTerminal(w);
  if(app==="browser")w.querySelector("form").onsubmit=e=>{e.preventDefault();const u=w.querySelector("input").value; if(/^https?:\/\//i.test(u))window.open(u,"_blank","noopener");else alert("Digite um endereço iniciado por https://")};
}
let z=5;
function content(app){
 if(app==="files")return `<h3>Este dispositivo</h3><p>Área de arquivos de demonstração</p><div class="file-list"><div class="file-item">📁 Documentos</div><div class="file-item">📁 Downloads</div><div class="file-item">📁 Projetos</div><div class="file-item">📁 Imagens</div></div><p class="notice">Esta versão ainda não acessa o armazenamento real do Android. Isso será integrado numa etapa própria.</p>`;
 if(app==="terminal")return `<p>Terminal visual de demonstração — não executa comandos no Android.</p><div class="terminal-view" id="termout">WAZARSKY Linux shell [simulado]<br>Digite <b>help</b> para ver comandos disponíveis.<br><br><span id="prompt">user@wazarsky:~$ </span><input id="cmd" autocomplete="off" aria-label="Comando"></div>`;
 if(app==="browser")return `<h3>Navegador</h3><p>Abra um site em uma nova aba.</p><form><input style="width:100%;padding:11px;border-radius:8px;background:#0b111b;color:white;border:1px solid #43536b" placeholder="https://example.com"><button class="action">Abrir site</button></form><p class="notice">O navegador usa o navegador instalado no aparelho; não é uma sessão de PC na nuvem.</p>`;
 if(app==="editor")return `<h3>Bloco de notas</h3><textarea class="editor" placeholder="Escreva aqui..."></textarea><button class="action" id="saveNote">Baixar .txt</button>`;
 if(app==="about")return `<h3>WAZARSKY CLOUD PC</h3><p>Versão 0.1 — interface PWA experimental.</p><p><b>O que já funciona:</b> desktop, menu iniciar, janelas, atalhos e editor com exportação.</p><p><b>O que ainda não está conectado:</b> kernel Linux, Windows VM, armazenamento persistente remoto e Roblox Studio.</p><p class="notice">Não insira senhas ou dados sensíveis neste protótipo.</p>`;
}
function setupTerminal(w){const input=w.querySelector("#cmd"),out=w.querySelector("#termout");input.addEventListener("keydown",e=>{if(e.key!=="Enter")return;const c=input.value.trim();const line=document.createElement("div");line.textContent="user@wazarsky:~$ "+c;out.insertBefore(line,input.parentElement);let result="Comando não disponível nesta demonstração.";if(c==="help")result="Comandos: help, clear, date, whoami, uname";if(c==="whoami")result="user";if(c==="uname")result="WAZARSKY demo-shell (não é um kernel Linux)";if(c==="date")result=new Date().toString();if(c==="clear"){out.innerHTML='<span id="prompt">user@wazarsky:~$ </span>';input=out.querySelector("#cmd");setupTerminal(w);return;}const r=document.createElement("div");r.textContent=result;out.insertBefore(r,input.parentElement);input.value="";out.scrollTop=out.scrollHeight;});}
document.querySelectorAll("[data-app]").forEach(b=>b.onclick=()=>openApp(b.dataset.app));
$("#start").onclick=()=>$("#startmenu").hidden=!$("#startmenu").hidden;
$("#power").onclick=()=>{if(confirm("Reiniciar a interface?"))location.reload()};
$("#saveNote")?.addEventListener("click",()=>{});
document.addEventListener("click",e=>{if(e.target.id==="saveNote"){const blob=new Blob([e.target.parentElement.querySelector("textarea").value],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="anotacao.txt";a.click();URL.revokeObjectURL(a.href)}});
function tick(){const d=new Date();$("#clock").textContent=d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}setInterval(tick,1000);tick();
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{});
let bootTimer=setTimeout(()=>{$("#boot").hidden=true;$("#desktop").hidden=false},1600);
