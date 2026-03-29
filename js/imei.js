// ─── IMEI Checker (client-side simulation) ───────────────────────

// Luhn algorithm - real validation
function luhnCheck(imei) {
  if(!/^\d{15}$/.test(imei)) return false;
  let sum = 0;
  for(let i=0; i<15; i++){
    let d = parseInt(imei[i]);
    if(i%2===1){ d*=2; if(d>9) d-=9; }
    sum+=d;
  }
  return sum%10===0;
}

// Parse TAC (first 8 digits) to get manufacturer/model hint
function parseIMEI(imei) {
  const tac = imei.substring(0,8);
  const appleRanges = ['35299', '35380', '35383', '35399', '35466', '35921', '35984','35332','35334','35310'];
  const isApple = appleRanges.some(pfx => tac.startsWith(pfx));

  // Simulate known stolen devices (random based on last digit)
  const lastDigit = parseInt(imei[14]);
  const isStolen = lastDigit === 7; // ~10% chance
  const isBlacklisted = lastDigit === 3;

  // Map TAC prefix to phone models
  const modelHints = {
    '35299': 'iPhone 14 Pro', '35380': 'iPhone 15', '35383': 'iPhone 13 Pro Max',
    '35399': 'iPhone 12', '35466': 'iPhone 16 Pro', '35921': 'iPhone 14',
    '35984': 'iPhone 15 Pro Max', '35332': 'iPhone 13', '35334': 'iPhone 16', '35310': 'iPhone 11'
  };
  const matchedModel = Object.keys(modelHints).find(pfx=>tac.startsWith(pfx));

  return {
    tac,
    manufacturer: isApple ? 'Apple Inc.' : 'Inconnu',
    modelHint: matchedModel ? modelHints[matchedModel] : (isApple ? 'iPhone (modèle indéterminé)' : 'Appareil non Apple'),
    isApple,
    isStolen,
    isBlacklisted,
    activationLock: lastDigit === 2, // 10% chance
    country: 'UE / Monde',
    simLock: 'Débloqué'
  };
}

async function checkIMEI(imei) {
  return new Promise(resolve => setTimeout(() => resolve(parseIMEI(imei)), 2200));
}

function renderIMEIResult(imei, result, valid) {
  const container = document.getElementById('imei-result');
  if(!container) return;

  if(!valid) {
    container.innerHTML = `<div class="imei-result-card flagged animate-slide-up">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <div style="font-size:2.5rem">❌</div>
        <div><div class="heading-3" style="color:var(--accent-red)">IMEI invalide</div>
        <div class="text-sm text-muted">Le numéro IMEI doit contenir exactement 15 chiffres et passer la validation Luhn.</div></div>
      </div>
    </div>`;
    return;
  }

  const isClean = !result.isStolen && !result.isBlacklisted;

  container.innerHTML = `
    <div class="imei-result-card ${isClean ? 'clean' : 'flagged'} animate-slide-up">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
        <div style="font-size:3rem">${isClean ? '✅' : '🚨'}</div>
        <div>
          <div class="heading-3" style="color:${isClean?'var(--accent-green)':'var(--accent-red)'}">
            ${isClean ? 'Appareil Propre' : 'Appareil Signalé'}
          </div>
          <div class="text-sm text-muted">IMEI: ${imei.match(/.{1,5}/g).join(' ')}</div>
        </div>
        <div style="margin-left:auto">
          <span class="badge ${isClean?'badge-imei-clean':'badge-imei-flagged'}">
            ${isClean ? '✓ Vérifié' : '✗ Alerte'}
          </span>
        </div>
      </div>
      <div>
        <div class="imei-row"><span class="imei-row-label">Fabricant</span><span class="imei-row-value">${result.manufacturer}</span></div>
        <div class="imei-row"><span class="imei-row-label">Modèle détecté</span><span class="imei-row-value">${result.modelHint}</span></div>
        <div class="imei-row"><span class="imei-row-label">Apple ${result.isApple?'✓':'✗'}</span><span class="imei-row-value" style="color:${result.isApple?'var(--accent-green)':'var(--accent-red)'}">Appareil ${result.isApple?'Apple authentique':'Non Apple'}</span></div>
        <div class="imei-row"><span class="imei-row-label">Liste noire</span><span class="imei-row-value" style="color:${!result.isBlacklisted?'var(--accent-green)':'var(--accent-red)'}">${result.isBlacklisted?'⚠️ Blacklisté':'✓ Propre'}</span></div>
        <div class="imei-row"><span class="imei-row-label">Statut vol</span><span class="imei-row-value" style="color:${!result.isStolen?'var(--accent-green)':'var(--accent-red)'}">${result.isStolen?'🚨 Signalé volé':'✓ Non signalé'}</span></div>
        <div class="imei-row"><span class="imei-row-label">Activation Lock</span><span class="imei-row-value" style="color:${!result.activationLock?'var(--accent-green)':'var(--accent-red)'}">${result.activationLock?'🔒 Verrouillé (iCloud)':'✓ Débloqué'}</span></div>
        <div class="imei-row"><span class="imei-row-label">Réseau</span><span class="imei-row-value">${result.simLock}</span></div>
        <div class="imei-row"><span class="imei-row-label">Région</span><span class="imei-row-value">${result.country}</span></div>
      </div>
      ${isClean ? `<div style="margin-top:20px"><a href="sell.html" class="btn btn-primary w-full">📋 Lister cet appareil</a></div>` : 
      `<div style="margin-top:20px;padding:12px;background:rgba(239,68,68,0.1);border-radius:12px;border:1px solid rgba(239,68,68,0.2)">
        <div class="text-sm" style="color:var(--accent-red);font-weight:600">⚠️ Attention</div>
        <div class="text-sm text-muted mt-sm">Cet appareil présente des alertes. N'achetez pas sans vérification complémentaire.</div>
      </div>`}
    </div>`;
}

function initIMEIChecker() {
  const btn = document.getElementById('imei-check-btn');
  const input = document.getElementById('imei-input');
  const loader = document.getElementById('imei-loader');
  if(!btn || !input) return;

  async function runCheck() {
    const imei = input.value.replace(/\s/g,'');
    if(!imei) { showToast('Entrez un numéro IMEI','warning'); return; }
    
    if(loader) loader.classList.remove('hidden');
    btn.disabled = true;
    btn.textContent = 'Vérification…';
    
    const container = document.getElementById('imei-result');
    if(container) container.innerHTML = `
      <div style="text-align:center;padding:48px">
        <div style="font-size:3rem;margin-bottom:16px;animation:orb-float 1s ease-in-out infinite">🔍</div>
        <div class="heading-3">Consultation des bases de données…</div>
        <div class="text-sm text-muted mt-sm">GSMA · Apple · Bases algériennes</div>
        <div style="margin-top:24px;height:4px;background:var(--border-color);border-radius:2px;overflow:hidden">
          <div id="imei-progress" style="height:100%;background:var(--gradient-accent);border-radius:2px;width:0%;transition:width 2s ease"></div>
        </div>
      </div>`;
    setTimeout(()=>{ const p=document.getElementById('imei-progress'); if(p) p.style.width='90%'; },100);

    const valid = luhnCheck(imei);
    const result = valid ? await checkIMEI(imei) : null;
    
    if(loader) loader.classList.add('hidden');
    btn.disabled = false;
    btn.textContent = '🔍 Vérifier';
    renderIMEIResult(imei, result, valid);
  }

  btn.addEventListener('click', runCheck);
  input.addEventListener('keydown', e=>{ if(e.key==='Enter') runCheck(); });

  // Format input
  input.addEventListener('input', e=>{
    e.target.value = e.target.value.replace(/\D/g,'').substring(0,15);
  });
}

document.addEventListener('DOMContentLoaded', initIMEIChecker);
