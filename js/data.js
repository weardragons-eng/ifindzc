// ─── Algerian Wilayas ───────────────────────────────────────────
const WILAYAS = [
  "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar",
  "Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger",
  "Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma",
  "Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh",
  "Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued",
  "Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma","Aïn Témouchent",
  "Ghardaïa","Relizane","El M'Ghair","El Menia","Ouled Djellal","Bordj Badji Mokhtar",
  "Béni Abbès","Timimoun","Touggourt","Djanet","In Salah","In Guezzam"
];

// ─── Market Price Table (DZD) ────────────────────────────────────
const MARKET_PRICES = {
  "iPhone X":      { "64GB": 42000,  "256GB": 52000 },
  "iPhone XS":     { "64GB": 52000,  "256GB": 65000, "512GB": 80000 },
  "iPhone XS Max": { "64GB": 58000,  "256GB": 72000, "512GB": 90000 },
  "iPhone XR":     { "64GB": 48000,  "128GB": 58000 },
  "iPhone 11":     { "64GB": 65000,  "128GB": 75000, "256GB": 88000 },
  "iPhone 11 Pro": { "64GB": 78000,  "256GB": 95000, "512GB": 115000 },
  "iPhone 11 Pro Max": { "64GB": 85000, "256GB": 105000, "512GB": 130000 },
  "iPhone 12":     { "64GB": 88000,  "128GB": 98000,  "256GB": 115000 },
  "iPhone 12 Mini":{ "64GB": 78000,  "128GB": 88000,  "256GB": 102000 },
  "iPhone 12 Pro": { "128GB": 108000, "256GB": 125000, "512GB": 150000 },
  "iPhone 12 Pro Max": { "128GB": 120000, "256GB": 140000, "512GB": 165000 },
  "iPhone 13":     { "128GB": 108000, "256GB": 125000, "512GB": 148000 },
  "iPhone 13 Mini":{ "128GB": 95000,  "256GB": 112000, "512GB": 135000 },
  "iPhone 13 Pro": { "128GB": 135000, "256GB": 155000, "512GB": 178000, "1TB": 205000 },
  "iPhone 13 Pro Max": { "128GB": 150000, "256GB": 172000, "512GB": 198000, "1TB": 228000 },
  "iPhone 14":     { "128GB": 128000, "256GB": 148000, "512GB": 175000 },
  "iPhone 14 Plus":{ "128GB": 138000, "256GB": 158000, "512GB": 185000 },
  "iPhone 14 Pro": { "128GB": 165000, "256GB": 188000, "512GB": 215000, "1TB": 248000 },
  "iPhone 14 Pro Max": { "128GB": 178000, "256GB": 205000, "512GB": 232000, "1TB": 268000 },
  "iPhone 15":     { "128GB": 148000, "256GB": 172000, "512GB": 202000 },
  "iPhone 15 Plus":{ "128GB": 162000, "256GB": 188000, "512GB": 218000 },
  "iPhone 15 Pro": { "128GB": 195000, "256GB": 222000, "512GB": 252000, "1TB": 290000 },
  "iPhone 15 Pro Max": { "256GB": 245000, "512GB": 278000, "1TB": 320000 },
  "iPhone 16":     { "128GB": 172000, "256GB": 198000, "512GB": 232000 },
  "iPhone 16 Plus":{ "128GB": 185000, "256GB": 215000, "512GB": 248000 },
  "iPhone 16 Pro": { "128GB": 228000, "256GB": 258000, "512GB": 292000, "1TB": 338000 },
  "iPhone 16 Pro Max": { "256GB": 285000, "512GB": 322000, "1TB": 368000 }
};

// ─── Sellers ─────────────────────────────────────────────────────
const SELLERS = [
  { id: 1, name: "Yacine Bouzid", initials: "YB", rating: 4.9, reviews: 87, verified: true, trusted: true,  wilaya: "Alger",      joinDate: "Jan 2023", sales: 143, phone: "+213 555 12 34 56" },
  { id: 2, name: "Amira Touati",  initials: "AT", rating: 4.7, reviews: 42, verified: true, trusted: false, wilaya: "Oran",       joinDate: "Mar 2023", sales: 68,  phone: "+213 550 98 76 54" },
  { id: 3, name: "Karim Merabet", initials: "KM", rating: 4.5, reviews: 31, verified: true, trusted: false, wilaya: "Constantine",joinDate: "Jul 2023", sales: 49,  phone: "+213 540 55 44 33" },
  { id: 4, name: "Sofiane Hadj",  initials: "SH", rating: 5.0, reviews: 120,verified: true, trusted: true,  wilaya: "Alger",      joinDate: "Oct 2022", sales: 198, phone: "+213 555 77 88 99" },
  { id: 5, name: "Nadia Mansour", initials: "NM", rating: 4.6, reviews: 19, verified: false, trusted: false, wilaya: "Sétif",    joinDate: "Nov 2023", sales: 24,  phone: "+213 552 33 22 11" },
  { id: 6, name: "Riad Oukaci",   initials: "RO", rating: 4.8, reviews: 64, verified: true, trusted: true,  wilaya: "Béjaïa",    joinDate: "Feb 2023", sales: 112, phone: "+213 558 66 55 44" },
  { id: 7, name: "Lila Benamara", initials: "LB", rating: 4.4, reviews: 28, verified: true, trusted: false, wilaya: "Annaba",    joinDate: "Aug 2023", sales: 37,  phone: "+213 553 44 33 22" },
  { id: 8, name: "Djamel Ferhat", initials: "DF", rating: 4.9, reviews: 95, verified: true, trusted: true,  wilaya: "Tizi Ouzou",joinDate: "Dec 2022", sales: 167, phone: "+213 556 11 22 33" },
];

// ─── Listings ─────────────────────────────────────────────────────
const LISTINGS = [
  { id:1,  model:"iPhone 15 Pro Max", storage:"256GB", color:"Titane Naturel", condition:"Like New", battery:98, price:240000, wilaya:"Alger",       sellerId:1, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Acheté en novembre 2024, état impeccable. Complet avec boite et accessoires originaux. Aucune rayure.", postedAt:"2h" },
  { id:2,  model:"iPhone 14 Pro",     storage:"256GB", color:"Violet Intense", condition:"Used",     battery:82, price:195000, wilaya:"Oran",        sellerId:2, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Fonctionnel, petites traces d'usage. Batterie changée officiellement.", postedAt:"4h" },
  { id:3,  model:"iPhone 13",         storage:"128GB", color:"Starlight",      condition:"New",      battery:100,price:110000, wilaya:"Constantine", sellerId:3, available:"Delivery",  imeiVerified:true,  photos:["📱"], description:"Neuf, jamais utilisé. Scellé usine.", postedAt:"1h" },
  { id:4,  model:"iPhone 16 Pro",     storage:"512GB", color:"Titane Désert",  condition:"Like New", battery:99, price:298000, wilaya:"Alger",       sellerId:4, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"3 mois d'usage, protégé dès le premier jour. Includes Apple Care+.", postedAt:"30m" },
  { id:5,  model:"iPhone 12",         storage:"128GB", color:"Noir",           condition:"Used",     battery:76, price:88000,  wilaya:"Sétif",       sellerId:5, available:"Immediate", imeiVerified:false, photos:["📱"], description:"Bon état général. Quelques micro-rayures sur le dos.", postedAt:"6h" },
  { id:6,  model:"iPhone 14",         storage:"256GB", color:"Bleu",           condition:"Like New", battery:94, price:152000, wilaya:"Béjaïa",      sellerId:6, available:"Delivery",  imeiVerified:true,  photos:["📱"], description:"Acheté il y a 8 mois. Toujours sous garantie Apple.", postedAt:"3h" },
  { id:7,  model:"iPhone 11 Pro Max", storage:"256GB", color:"Vert Nuit",      condition:"Used",     battery:79, price:110000, wilaya:"Annaba",      sellerId:7, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Usado pero bien mantenido. Batería tiene vida media.", postedAt:"1j" },
  { id:8,  model:"iPhone 15",         storage:"128GB", color:"Rose",           condition:"New",      battery:100,price:150000, wilaya:"Tizi Ouzou",  sellerId:8, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Neuf, acheté il y a 2 semaines. Non ouvert.", postedAt:"45m" },
  { id:9,  model:"iPhone 13 Pro",     storage:"512GB", color:"Or",             condition:"Like New", battery:91, price:182000, wilaya:"Alger",       sellerId:1, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Excellent état. Coque protectrice depuis le premier jour.", postedAt:"2j" },
  { id:10, model:"iPhone XS Max",     storage:"256GB", color:"Or",             condition:"Used",     battery:71, price:68000,  wilaya:"Oran",        sellerId:2, available:"Delivery",  imeiVerified:false, photos:["📱"], description:"Quelques rayures sur les bords. Écran parfait.", postedAt:"3j" },
  { id:11, model:"iPhone 16",         storage:"256GB", color:"Blanc",          condition:"Like New", battery:97, price:202000, wilaya:"Constantine", sellerId:3, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"2 mois d'usage, état quasi neuf.", postedAt:"5h" },
  { id:12, model:"iPhone 14 Pro Max", storage:"512GB", color:"Argent",         condition:"Used",     battery:85, price:238000, wilaya:"Alger",       sellerId:4, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Utilisé 1 an, excellent entretien. Livré avec câble original.", postedAt:"8h" },
  { id:13, model:"iPhone 12 Pro",     storage:"256GB", color:"Bleu Pacifique", condition:"Used",     battery:77, price:122000, wilaya:"Sétif",       sellerId:5, available:"Delivery",  imeiVerified:true,  photos:["📱"], description:"Fonctionnel, chargeur inclus. Légère usure cosmétique.", postedAt:"4j" },
  { id:14, model:"iPhone 15 Pro",     storage:"128GB", color:"Titane Noir",    condition:"Like New", battery:96, price:198000, wilaya:"Béjaïa",      sellerId:6, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"5 mois d'utilisation. Propre, sans défaut.", postedAt:"1j" },
  { id:15, model:"iPhone 11",         storage:"64GB",  color:"Rouge",          condition:"Used",     battery:68, price:58000,  wilaya:"Annaba",      sellerId:7, available:"Immediate", imeiVerified:false, photos:["📱"], description:"Usage quotidien, fonctionne très bien. Prix négociable.", postedAt:"5j" },
  { id:16, model:"iPhone 16 Pro Max", storage:"1TB",   color:"Titane Résille", condition:"New",      battery:100,price:370000, wilaya:"Tizi Ouzou",  sellerId:8, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Scellé usine, importé via EU. Facture disponible.", postedAt:"2h" },
  { id:17, model:"iPhone 13 Mini",    storage:"256GB", color:"Lumière Stellaire",condition:"Used",   battery:83, price:108000, wilaya:"Alger",       sellerId:1, available:"Delivery",  imeiVerified:true,  photos:["📱"], description:"Compact et puissant. Écran sans rayure.", postedAt:"6h" },
  { id:18, model:"iPhone 14 Plus",    storage:"128GB", color:"Minuit",         condition:"Like New", battery:95, price:142000, wilaya:"Oran",        sellerId:2, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Grand écran, excellent état. Complet avec boite.", postedAt:"3h" },
  { id:19, model:"iPhone 12 Mini",    storage:"64GB",  color:"Bleu",           condition:"Used",     battery:72, price:72000,  wilaya:"Constantine", sellerId:3, available:"Immediate", imeiVerified:false, photos:["📱"], description:"Petit format, idéal pour une main. Fonctionnel.", postedAt:"7j" },
  { id:20, model:"iPhone 15 Plus",    storage:"512GB", color:"Jaune",          condition:"New",      battery:100,price:220000, wilaya:"Alger",       sellerId:4, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Tout neuf, jamais utilisé. Garantie 1 an.", postedAt:"1h" },
  { id:21, model:"iPhone X",          storage:"256GB", color:"Argent",         condition:"Used",     battery:65, price:48000,  wilaya:"Sétif",       sellerId:5, available:"Delivery",  imeiVerified:false, photos:["📱"], description:"Écran OLED parfait. Batterie réduite mais fonctionnel.", postedAt:"2w" },
  { id:22, model:"iPhone 13 Pro Max", storage:"1TB",   color:"Graphite",       condition:"Like New", battery:93, price:232000, wilaya:"Béjaïa",      sellerId:6, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"Version 1TB rare. Très peu utilisé.", postedAt:"4h" },
  { id:23, model:"iPhone 16 Plus",    storage:"256GB", color:"Bleu Ultra",     condition:"Like New", battery:99, price:218000, wilaya:"Annaba",      sellerId:7, available:"Immediate", imeiVerified:true,  photos:["📱"], description:"2 semaines d'usage, Parfait.", postedAt:"2h" },
  { id:24, model:"iPhone 14",         storage:"512GB", color:"Mauve",          condition:"New",      battery:100,price:178000, wilaya:"Tizi Ouzou",  sellerId:8, available:"Delivery",  imeiVerified:true,  photos:["📱"], description:"Neuf scellé, non activé.", postedAt:"3h" },
];

// ─── Model list ───────────────────────────────────────────────────
const IPHONE_MODELS = Object.keys(MARKET_PRICES);

// ─── Helpers ──────────────────────────────────────────────────────
function formatPrice(p) {
  return p.toLocaleString('fr-DZ') + ' DA';
}

function getMarketPrice(model, storage) {
  return MARKET_PRICES[model]?.[storage] || null;
}

function getPriceDelta(listing) {
  const market = getMarketPrice(listing.model, listing.storage);
  if (!market) return null;
  return Math.round(((listing.price - market) / market) * 100);
}

function getPriceStatus(delta) {
  if (delta === null) return 'unknown';
  if (delta <= -8) return 'great-deal';
  if (delta <= 5)  return 'fair';
  if (delta <= 20) return 'overpriced';
  return 'suspicious';
}

function getBatteryClass(pct) {
  if (pct >= 85) return 'high';
  if (pct >= 70) return 'mid';
  return 'low';
}

function getConditionBadge(condition) {
  const map = { 'New': 'badge-new', 'Like New': 'badge-like-new', 'Used': 'badge-used' };
  return map[condition] || 'badge-used';
}

function getSellerById(id) { return SELLERS.find(s => s.id === id); }

function renderStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let html = '<div class="stars">';
  for(let i=1;i<=5;i++){
    if(i<=full) html+=`<span class="star filled">★</span>`;
    else if(i===full+1&&hasHalf) html+=`<span class="star filled">★</span>`;
    else html+=`<span class="star">★</span>`;
  }
  html += '</div>';
  return html;
}

function renderBattery(pct) {
  const cls = getBatteryClass(pct);
  return `<div class="battery-health">
    <span style="font-size:0.8rem">🔋</span>
    <div class="battery-bar"><div class="battery-fill ${cls}" style="width:${pct}%"></div></div>
    <span class="battery-text ${cls}">${pct}%</span>
  </div>`;
}

// ─── Toast ────────────────────────────────────────────────────────
function showToast(message, type='info') {
  const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
  const container = document.getElementById('toast-container');
  if(!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(()=>{ toast.style.opacity='0'; toast.style.transition='opacity 0.4s'; setTimeout(()=>toast.remove(),400); }, 3500);
}

// ─── Wishlist ─────────────────────────────────────────────────────
function toggleWishlist(id, btn) {
  const ws = JSON.parse(localStorage.getItem('ifindz_wishlist') || '[]');
  const idx = ws.indexOf(id);
  const heart = btn.querySelector('.heart-icon') || btn;
  if (idx === -1) {
    ws.push(id);
    heart.textContent = '❤️';
    showToast('Ajouté aux favoris', 'success');
  } else {
    ws.splice(idx, 1);
    heart.textContent = '🤍';
    showToast('Retiré des favoris', 'info');
  }
  localStorage.setItem('ifindz_wishlist', JSON.stringify(ws));
}

// ─── Rendering Components ─────────────────────────────────────────
function renderListingCard(listing) {
  const seller = getSellerById(listing.sellerId);
  const delta = getPriceDelta(listing);
  const priceStatus = getPriceStatus(delta);
  const condBadge = getConditionBadge(listing.condition);
  const ws = JSON.parse(localStorage.getItem('ifindz_wishlist') || '[]');
  const isWishlisted = ws.includes(listing.id);

  let priceBadgeHtml = '';
  if (priceStatus === 'great-deal') priceBadgeHtml = `<span class="badge badge-good-deal">💎 Bonne Affaire</span>`;
  else if (priceStatus === 'overpriced') priceBadgeHtml = `<span class="badge badge-overpriced">⚠️ Cher</span>`;
  else if (priceStatus === 'suspicious') priceBadgeHtml = `<span class="badge badge-overpriced">🚨 Suspicieux</span>`;

  const imeiHtml = listing.imeiVerified
    ? `<span style="color:var(--accent-green);font-size:0.75rem">✅ IMEI Vérifié</span>`
    : `<span style="color:var(--text-muted);font-size:0.75rem">⬜ IMEI non vérifié</span>`;

  return `
    <div class="listing-card animate-slide-up" onclick="window.location.href='listing.html?id=${listing.id}'">
      <div class="listing-card-image-placeholder">
        📱
        <div class="listing-card-badges">
          <span class="badge ${condBadge}">${listing.condition}</span>
          ${listing.imeiVerified ? '<span class="badge badge-imei-clean">✓ IMEI</span>' : ''}
        </div>
        <button class="listing-card-wishlist" onclick="event.stopPropagation();toggleWishlist(${listing.id},this)" title="Ajouter aux favoris">
          <span class="heart-icon">${isWishlisted ? '❤️' : '🤍'}</span>
        </button>
        ${priceBadgeHtml ? `<div style="position:absolute;bottom:8px;left:8px">${priceBadgeHtml}</div>` : ''}
      </div>
      <div class="listing-card-body">
        <div class="listing-card-title">${listing.model} – ${listing.color}</div>
        <div class="listing-card-specs">
          <span class="spec-chip">💾 ${listing.storage}</span>
          <span class="spec-chip">📍 ${listing.wilaya}</span>
          <span class="spec-chip">${listing.available === 'Immediate' ? '⚡ Immédiat' : '🚚 Livraison'}</span>
        </div>
        ${renderBattery(listing.battery)}
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="listing-card-price">${formatPrice(listing.price)}</div>
          ${delta !== null ? `<div style="font-size:0.75rem;color:${priceStatus === 'great-deal' ? 'var(--accent-green)' : priceStatus === 'fair' ? 'var(--text-muted)' : 'var(--accent-red)'}">
            ${delta > 0 ? '+' : ''}${delta}% marché
          </div>` : ''}
        </div>
      </div>
      <div class="listing-card-footer">
        <div class="seller-mini">
          <div class="seller-avatar-sm">${seller ? seller.initials : '?'}</div>
          <div>
            <div style="font-weight:600;color:var(--text-primary)">${seller?.name || 'Inconnu'}
              ${seller?.trusted ? ' <span class="badge badge-trusted" style="padding:2px 6px;font-size:0.65rem">⭐ Pro</span>' : ''}
              ${seller?.verified ? ' <span class="badge badge-verified" style="padding:2px 10px;font-size:0.65rem">✓</span>' : ''}
            </div>
            <div style="color:var(--text-muted)">${listing.postedAt}</div>
          </div>
        </div>
        ${imeiHtml}
      </div>
    </div>`;
}

// ─── Mobile nav toggle ────────────────────────────────────────────
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if(!hamburger||!mobileMenu) return;
  hamburger.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
}

document.addEventListener('DOMContentLoaded', initMobileNav);
