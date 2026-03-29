// ─── Chat UI Logic ────────────────────────────────────────────────

const CONVERSATIONS = [
  {
    id: 1, sellerId: 1, listingId: 4,
    listingTitle: 'iPhone 16 Pro 512GB',
    messages: [
      { from:'them', text:"Bonjour, l'iPhone est encore disponible ?", time:"10:23" },
      { from:'me',   text:"Oui toujours disponible ! Il est en parfait état.", time:"10:25" },
      { from:'them', text:"Possible de descendre à 290 000 DA ?", time:"10:26" },
      { from:'me',   text:"Je peux faire 295 000 DA, c'est mon dernier prix 🙏", time:"10:28" },
      { from:'them', text:"D'accord ! On se retrouve où pour l'échange ?", time:"10:30" },
    ]
  },
  {
    id: 2, sellerId: 6, listingId: 6,
    listingTitle: 'iPhone 14 256GB',
    messages: [
      { from:'them', text:"Salam, c'est toujours dispo le 14 ?", time:"09:12" },
      { from:'me',   text:"Oui disponible, je peux livrer à Béjaïa centre.", time:"09:15" },
      { from:'them', text:"Super ! Vous avez la boîte originale ?", time:"09:18" },
    ]
  },
  {
    id: 3, sellerId: 4, listingId: 16,
    listingTitle: 'iPhone 16 Pro Max 1TB',
    messages: [
      { from:'me',   text:"Bonjour ! L'iPhone 16 Pro Max est bien neuf scellé ?", time:"Hier" },
      { from:'them', text:"100% scellé usine, importé directement d'Europe avec facture.", time:"Hier" },
      { from:'me',   text:"Parfait. Vous livrez sur Alger ?", time:"Hier" },
      { from:'them', text:"Oui livraison express sur Alger disponible !", time:"Hier" },
    ]
  }
];

const QUICK_REPLIES = [
  "C'est encore disponible ?",
  "Vous pouvez faire un rabais ?",
  "Livraison possible sur ma wilaya ?",
  "Vous avez la boîte originale ?",
  "On peut se voir où ?",
  "IMEI vérifié ?",
];

let activeConvId = 1;

function renderConvList() {
  const list = document.getElementById('conv-list');
  if(!list) return;
  list.innerHTML = CONVERSATIONS.map(conv => {
    const seller = getSellerById(conv.sellerId);
    const last = conv.messages[conv.messages.length-1];
    const isActive = conv.id === activeConvId;
    return `<div class="chat-item ${isActive?'active':''}" onclick="selectConv(${conv.id})" id="conv-${conv.id}">
      <div class="chat-avatar">${seller?.initials||'?'}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:600;font-size:0.9rem">${seller?.name||'?'}</div>
          <div style="font-size:0.72rem;color:var(--text-muted)">${last.time}</div>
        </div>
        <div style="font-size:0.78rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${conv.listingTitle}</div>
        <div style="font-size:0.8rem;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${last.from==='me'?'Vous: ':''}${last.text}</div>
      </div>
    </div>`;
  }).join('');
}

function renderMessages(convId) {
  const conv = CONVERSATIONS.find(c=>c.id===convId);
  if(!conv) return;
  const container = document.getElementById('messages-container');
  const headerName = document.getElementById('chat-header-name');
  const headerListing = document.getElementById('chat-header-listing');
  const seller = getSellerById(conv.sellerId);
  
  if(headerName) headerName.textContent = seller?.name || '?';
  if(headerListing) headerListing.textContent = conv.listingTitle;

  if(!container) return;
  container.innerHTML = conv.messages.map(m=>`
    <div style="display:flex;flex-direction:column;align-items:${m.from==='me'?'flex-end':'flex-start'}">
      <div class="message-bubble ${m.from==='me'?'sent':'received'}">${m.text}</div>
      <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;padding:0 4px">${m.time}</div>
    </div>`).join('');
  container.scrollTop = container.scrollHeight;
}

function selectConv(id) {
  activeConvId = id;
  document.querySelectorAll('.chat-item').forEach(el=>el.classList.remove('active'));
  const el = document.getElementById(`conv-${id}`);
  if(el) el.classList.add('active');
  renderMessages(id);
}

function sendMessage(text) {
  if(!text.trim()) return;
  const conv = CONVERSATIONS.find(c=>c.id===activeConvId);
  if(!conv) return;
  const now = new Date();
  conv.messages.push({ from:'me', text: text.trim(), time: `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}` });
  renderMessages(activeConvId);
  renderConvList();

  // Simulate reply after 1.5s
  setTimeout(()=>{
    const replies = [
      "D'accord, je vous recontacte bientôt.",
      "C'est noté, merci !",
      "Je vous envoie ma localisation.",
      "Parfait ! On fixe un rendez-vous ?",
      "Oui je confirme la disponibilité.",
    ];
    conv.messages.push({ from:'them', text:replies[Math.floor(Math.random()*replies.length)], time:`${now.getHours()}:${String(now.getMinutes()+1).padStart(2,'0')}` });
    renderMessages(activeConvId);
    renderConvList();
  }, 1500);
}

function initChat() {
  if(!document.getElementById('conv-list')) return;
  renderConvList();
  renderMessages(activeConvId);

  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');

  if(sendBtn) sendBtn.addEventListener('click', ()=>{
    if(input){ sendMessage(input.value); input.value=''; }
  });

  if(input) input.addEventListener('keydown', e=>{
    if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sendMessage(input.value); input.value=''; }
  });

  // Quick replies
  const qrContainer = document.getElementById('quick-replies');
  if(qrContainer) {
    qrContainer.innerHTML = QUICK_REPLIES.map(r=>`<button class="filter-chip" onclick="useQuickReply(this,'${r.replace(/'/g,"\\'")}')">${r}</button>`).join('');
  }
}

function useQuickReply(btn, text) {
  const input = document.getElementById('chat-input');
  if(input) { input.value = text; input.focus(); }
}

document.addEventListener('DOMContentLoaded', initChat);
