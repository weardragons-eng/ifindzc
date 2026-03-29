// ─── Marketplace Filter Engine ───────────────────────────────────

let activeFilters = {
  search: '',
  models: [],
  storages: [],
  conditions: [],
  batteryMin: 0,
  priceMin: 0,
  priceMax: 9999999,
  wilayas: [],
  availability: [],
  sortBy: 'newest'
};

let currentListings = [...LISTINGS];

function applyFilters() {
  let result = [...LISTINGS];

  // Search
  if(activeFilters.search) {
    const q = activeFilters.search.toLowerCase();
    result = result.filter(l =>
      l.model.toLowerCase().includes(q) ||
      l.color.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q) ||
      l.wilaya.toLowerCase().includes(q)
    );
  }

  // Model
  if(activeFilters.models.length) {
    result = result.filter(l => activeFilters.models.includes(l.model));
  }

  // Storage
  if(activeFilters.storages.length) {
    result = result.filter(l => activeFilters.storages.includes(l.storage));
  }

  // Condition
  if(activeFilters.conditions.length) {
    result = result.filter(l => activeFilters.conditions.includes(l.condition));
  }

  // Battery
  result = result.filter(l => l.battery >= activeFilters.batteryMin);

  // Price
  result = result.filter(l => l.price >= activeFilters.priceMin && l.price <= activeFilters.priceMax);

  // Wilaya
  if(activeFilters.wilayas.length) {
    result = result.filter(l => activeFilters.wilayas.includes(l.wilaya));
  }

  // Availability
  if(activeFilters.availability.length) {
    result = result.filter(l => activeFilters.availability.includes(l.available));
  }

  // Sort
  switch(activeFilters.sortBy) {
    case 'newest': break; // keep original order (already by time)
    case 'price-asc': result.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': result.sort((a,b)=>b.price-a.price); break;
    case 'battery': result.sort((a,b)=>b.battery-a.battery); break;
    case 'trust': result.sort((a,b)=>{
      const sa=SELLERS.find(s=>s.id===a.sellerId)||{rating:0};
      const sb=SELLERS.find(s=>s.id===b.sellerId)||{rating:0};
      return sb.rating-sa.rating;
    }); break;
  }

  currentListings = result;
  return result;
}

function renderListings(container, listings) {
  if(!listings.length) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:64px 0;color:var(--text-muted)">
      <div style="font-size:3rem;margin-bottom:16px">🔍</div>
      <div class="heading-3">Aucun résultat</div>
      <div class="mt-sm">Essayez d'ajuster vos filtres</div>
    </div>`;
    return;
  }
  container.innerHTML = listings.map(renderListingCard).join('');
}

function toggleFilterChip(chip, filterKey, value) {
  const arr = activeFilters[filterKey];
  const idx = arr.indexOf(value);
  if(idx === -1) { arr.push(value); chip.classList.add('active'); }
  else { arr.splice(idx,1); chip.classList.remove('active'); }
  refreshListings();
}

function refreshListings() {
  const results = applyFilters();
  const container = document.getElementById('listings-grid');
  const countEl = document.getElementById('listing-count');
  if(container) renderListings(container, results);
  if(countEl) countEl.textContent = `${results.length} annonce${results.length!==1?'s':''} trouvée${results.length!==1?'s':''}`;
  renderActiveFilterChips();
}

function renderActiveFilterChips() {
  const container = document.getElementById('active-filters');
  if(!container) return;
  let chips = [];
  if(activeFilters.search) chips.push({ label:`"${activeFilters.search}"`, clear:()=>{ activeFilters.search=''; const sb=document.getElementById('search-input'); if(sb) sb.value=''; } });
  activeFilters.models.forEach(m=>chips.push({ label:m, clear:()=>{ activeFilters.models=activeFilters.models.filter(x=>x!==m); document.querySelectorAll('.chip-model').forEach(c=>{ if(c.dataset.val===m) c.classList.remove('active'); }); } }));
  activeFilters.conditions.forEach(c=>chips.push({ label:c, clear:()=>{ activeFilters.conditions=activeFilters.conditions.filter(x=>x!==c); document.querySelectorAll('.chip-condition').forEach(ch=>{ if(ch.dataset.val===c) ch.classList.remove('active'); }); } }));
  activeFilters.storages.forEach(s=>chips.push({ label:s, clear:()=>{ activeFilters.storages=activeFilters.storages.filter(x=>x!==s); document.querySelectorAll('.chip-storage').forEach(ch=>{ if(ch.dataset.val===s) ch.classList.remove('active'); }); } }));
  activeFilters.wilayas.forEach(w=>chips.push({ label:w, clear:()=>{ activeFilters.wilayas=activeFilters.wilayas.filter(x=>x!==w); } }));

  if(!chips.length) { container.innerHTML=''; return; }
  container.innerHTML = chips.map((c,i)=>`
    <div class="active-filter-chip">${c.label}
      <button onclick="clearChip(${i})" title="Retirer">✕</button>
    </div>`).join('') +
    `<button class="btn btn-sm btn-ghost" onclick="clearAllFilters()">Tout effacer</button>`;

  window._chipClears = chips.map(c=>c.clear);
}

function clearChip(i) { window._chipClears[i](); refreshListings(); }
function clearAllFilters() {
  activeFilters = { search:'', models:[], storages:[], conditions:[], batteryMin:0, priceMin:0, priceMax:9999999, wilayas:[], availability:[], sortBy: activeFilters.sortBy };
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  const sb = document.getElementById('search-input');
  if(sb) sb.value='';
  refreshListings();
}

function initMarketplace() {
  const container = document.getElementById('listings-grid');
  if(!container) return;

  // Init search
  const searchInput = document.getElementById('search-input');
  if(searchInput) {
    searchInput.addEventListener('input', e=>{ activeFilters.search=e.target.value; refreshListings(); });
  }

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if(sortSelect) {
    sortSelect.addEventListener('change', e=>{ activeFilters.sortBy=e.target.value; refreshListings(); });
  }

  // Battery slider
  const batterySlider = document.getElementById('battery-slider');
  const batteryLabel = document.getElementById('battery-label');
  if(batterySlider) {
    batterySlider.addEventListener('input', e=>{
      activeFilters.batteryMin = parseInt(e.target.value);
      if(batteryLabel) batteryLabel.textContent = `≥ ${e.target.value}%`;
      refreshListings();
    });
  }

  // Price sliders
  const priceMax = document.getElementById('price-max');
  const priceMaxLabel = document.getElementById('price-max-label');
  if(priceMax) {
    priceMax.addEventListener('input', e=>{
      activeFilters.priceMax = parseInt(e.target.value);
      if(priceMaxLabel) priceMaxLabel.textContent = formatPrice(parseInt(e.target.value));
      refreshListings();
    });
  }

  // Condition chips
  document.querySelectorAll('.chip-condition').forEach(chip=>{
    chip.addEventListener('click', ()=>toggleFilterChip(chip, 'conditions', chip.dataset.val));
  });

  // Storage chips
  document.querySelectorAll('.chip-storage').forEach(chip=>{
    chip.addEventListener('click', ()=>toggleFilterChip(chip, 'storages', chip.dataset.val));
  });

  // Availability chips
  document.querySelectorAll('.chip-availability').forEach(chip=>{
    chip.addEventListener('click', ()=>toggleFilterChip(chip, 'availability', chip.dataset.val));
  });

  // Model chips
  document.querySelectorAll('.chip-model').forEach(chip=>{
    chip.addEventListener('click', ()=>toggleFilterChip(chip, 'models', chip.dataset.val));
  });

  // Wilaya select
  const wilayaSelect = document.getElementById('wilaya-select');
  if(wilayaSelect) {
    wilayaSelect.innerHTML = '<option value="">Toutes les wilayas</option>' +
      WILAYAS.map(w=>`<option value="${w}">${w}</option>`).join('');
    wilayaSelect.addEventListener('change', e=>{
      const v = e.target.value;
      activeFilters.wilayas = v ? [v] : [];
      refreshListings();
    });
  }

  // Mobile filter toggle
  const filterToggle = document.getElementById('filter-toggle');
  const filterPanel = document.getElementById('filter-panel');
  if(filterToggle && filterPanel) {
    filterToggle.addEventListener('click', ()=>filterPanel.classList.toggle('show'));
  }

  // Handle URL Params (from Footer / Home)
  const params = new URLSearchParams(location.search);
  const m = params.get('model');
  const w = params.get('wilaya');
  const s = params.get('storage');

  if(m) {
    activeFilters.models = [m];
    document.querySelectorAll(`.chip-model[data-val="${m}"]`).forEach(c=>c.classList.add('active'));
  }
  if(w) {
    activeFilters.wilayas = [w];
    if(wilayaSelect) wilayaSelect.value = w;
  }
  if(s) {
    activeFilters.storages = [s];
    document.querySelectorAll(`.chip-storage[data-val="${s}"]`).forEach(c=>c.classList.add('active'));
  }

  refreshListings();
}

document.addEventListener('DOMContentLoaded', initMarketplace);
