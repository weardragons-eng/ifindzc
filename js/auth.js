// ─── iFindz Authentication System ───────────────────────────────────
// Client-side auth with localStorage (simulates backend)
// Verification statuses: 'not_verified' | 'pending' | 'verified'

const AUTH_KEY = 'ifindz_auth';
const USERS_KEY = 'ifindz_users';

// ─── User Schema ───────────────────────────────────────────────────
// { id, fullName, email, phone, password, wilaya, joinDate,
//   verificationStatus: 'not_verified'|'pending'|'verified',
//   idDocumentName: null|string, initials: 'XX' }

// ─── Init default users (seed) ────────────────────────────────────
function seedUsers() {
  const existing = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (existing.length > 0) return;
  const seeds = [
    { id: 'u1', fullName: 'Yacine Bouzid', email: 'yacine@ifindz.dz', phone: '+213 555 12 34 56', password: 'yacine123', wilaya: 'Alger', joinDate: 'Jan 2023', verificationStatus: 'verified', idDocumentName: 'carte_nationale_yb.jpg', initials: 'YB' },
    { id: 'u2', fullName: 'Amira Touati', email: 'amira@ifindz.dz', phone: '+213 550 98 76 54', password: 'amira123', wilaya: 'Oran', joinDate: 'Mar 2023', verificationStatus: 'verified', idDocumentName: 'carte_nationale_at.jpg', initials: 'AT' },
    { id: 'u3', fullName: 'Karim Merabet', email: 'karim@ifindz.dz', phone: '+213 540 55 44 33', password: 'karim123', wilaya: 'Constantine', joinDate: 'Jul 2023', verificationStatus: 'pending', idDocumentName: 'carte_nationale_km.jpg', initials: 'KM' },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(seeds));
}

// ─── Auth Core ────────────────────────────────────────────────────
function getAllUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  const { userId } = JSON.parse(authData);
  const users = getAllUsers();
  return users.find(u => u.id === userId) || null;
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function getVerificationStatus() {
  const user = getCurrentUser();
  if (!user) return null;
  return user.verificationStatus;
}

function isVerified() {
  return getVerificationStatus() === 'verified';
}

function isPending() {
  return getVerificationStatus() === 'pending';
}

// ─── Login ─────────────────────────────────────────────────────────
function loginUser(email, password) {
  const users = getAllUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) return { success: false, error: 'Email ou mot de passe incorrect.' };
  localStorage.setItem(AUTH_KEY, JSON.stringify({ userId: user.id, loggedInAt: Date.now() }));
  return { success: true, user };
}

// ─── Register ──────────────────────────────────────────────────────
function registerUser({ fullName, email, phone, password, wilaya }) {
  const users = getAllUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'Cet email est déjà utilisé.' };
  }
  const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const months = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'];
  const now = new Date();
  const newUser = {
    id: 'u' + Date.now(),
    fullName,
    email: email.toLowerCase(),
    phone,
    password,
    wilaya,
    joinDate: months[now.getMonth()] + ' ' + now.getFullYear(),
    verificationStatus: 'not_verified',
    idDocumentName: null,
    initials
  };
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(AUTH_KEY, JSON.stringify({ userId: newUser.id, loggedInAt: Date.now() }));
  return { success: true, user: newUser };
}

// ─── Logout ────────────────────────────────────────────────────────
function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}

// ─── Verification ──────────────────────────────────────────────────
function submitVerification(documentName) {
  const user = getCurrentUser();
  if (!user) return false;
  const users = getAllUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx === -1) return false;
  users[idx].verificationStatus = 'pending';
  users[idx].idDocumentName = documentName;
  saveUsers(users);
  // Simulate auto-approval after 5 seconds for demo
  setTimeout(() => {
    const freshUsers = getAllUsers();
    const freshIdx = freshUsers.findIndex(u => u.id === user.id);
    if (freshIdx !== -1 && freshUsers[freshIdx].verificationStatus === 'pending') {
      freshUsers[freshIdx].verificationStatus = 'verified';
      saveUsers(freshUsers);
    }
  }, 5000);
  return true;
}

// ─── Verification Badge HTML ───────────────────────────────────────
function getVerificationBadgeHTML(status) {
  if (!status) return '';
  const map = {
    'not_verified': '<span class="badge badge-not-verified">🔒 Non vérifié</span>',
    'pending': '<span class="badge badge-pending">⏳ En attente</span>',
    'verified': '<span class="badge badge-id-verified">✅ Identité vérifiée</span>'
  };
  return map[status] || '';
}

// ─── Auth Guard ────────────────────────────────────────────────────
// Redirects unauthenticated users to login
function requireAuth(redirectUrl) {
  if (!isLoggedIn()) {
    const returnTo = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `login.html?redirect=${returnTo}`;
    return false;
  }
  return true;
}

// Requires verified status (for selling)
function requireVerification() {
  if (!isLoggedIn()) {
    const returnTo = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `login.html?redirect=${returnTo}`;
    return false;
  }
  const status = getVerificationStatus();
  if (status !== 'verified') {
    window.location.href = 'verification.html';
    return false;
  }
  return true;
}

// ─── Dynamic Navbar Auth State ─────────────────────────────────────
function updateNavbarAuth() {
  const user = getCurrentUser();
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;

  // Theme toggle button
  const currentTheme = localStorage.getItem('ifindz_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
  themeToggle.title = currentTheme === 'dark' ? 'Mode Clair' : 'Mode Sombre';
  themeToggle.onclick = () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ifindz_theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.title = newTheme === 'dark' ? 'Mode Clair' : 'Mode Sombre';
  };

  const hamburgerBtn = navActions.querySelector('.nav-hamburger');

  if (user) {
    // Build the Sell button with proper auth gating
    const sellBtn = document.createElement('a');
    sellBtn.href = '#';
    sellBtn.className = 'btn btn-gold btn-sm';
    sellBtn.textContent = '📱 Vendre';
    sellBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (user.verificationStatus === 'verified') {
        window.location.href = 'sell.html';
      } else {
        window.location.href = 'verification.html';
      }
    });

    // User dropdown trigger
    const userBtn = document.createElement('div');
    userBtn.className = 'nav-user-btn';
    userBtn.id = 'nav-user-btn';
    userBtn.innerHTML = `
      <div class="nav-user-avatar">${user.initials}</div>
      <span class="nav-user-name">${user.fullName.split(' ')[0]}</span>
      ${user.verificationStatus === 'verified' ? '<span class="nav-verified-dot">✓</span>' : ''}
    `;
    
    // Dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'nav-user-dropdown';
    dropdown.id = 'nav-user-dropdown';
    dropdown.innerHTML = `
      <div class="nav-dropdown-header">
        <div class="nav-dropdown-avatar">${user.initials}</div>
        <div>
          <div class="nav-dropdown-name">${user.fullName}</div>
          <div class="nav-dropdown-email">${user.email}</div>
        </div>
      </div>
      <div class="nav-dropdown-divider"></div>
      <div class="nav-dropdown-status">
        ${getVerificationBadgeHTML(user.verificationStatus)}
      </div>
      <a href="profile.html" class="nav-dropdown-item">👤 Mon Profil</a>
      <a href="chat.html" class="nav-dropdown-item">💬 Messages</a>
      ${user.verificationStatus !== 'verified' ? '<a href="verification.html" class="nav-dropdown-item nav-dropdown-item-highlight">🛡️ Vérifier mon identité</a>' : ''}
      <div class="nav-dropdown-divider"></div>
      <button class="nav-dropdown-item nav-dropdown-logout" id="nav-logout-btn">🚪 Se déconnecter</button>
    `;

    // Clear existing buttons (keep hamburger if it exists in DOM or create new)
    navActions.innerHTML = '';
    navActions.appendChild(themeToggle);
    navActions.appendChild(sellBtn);
    navActions.appendChild(userBtn);
    navActions.appendChild(dropdown);
    if (hamburgerBtn) navActions.appendChild(hamburgerBtn);

    // Toggle dropdown
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    // Logout
    dropdown.querySelector('#nav-logout-btn')?.addEventListener('click', () => {
      logoutUser();
      window.location.href = 'index.html';
    });

    // Close on outside click
    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });
    dropdown.addEventListener('click', (e) => e.stopPropagation());

  } else {
    // Guest state
    navActions.innerHTML = '';
    navActions.appendChild(themeToggle);

    const loginBtnNode = document.createElement('a');
    loginBtnNode.href = 'login.html';
    loginBtnNode.className = 'btn btn-secondary btn-sm';
    loginBtnNode.textContent = '🔑 Connexion';

    const signupBtnNode = document.createElement('a');
    signupBtnNode.href = 'signup.html';
    signupBtnNode.className = 'btn btn-primary btn-sm';
    signupBtnNode.textContent = '✨ Inscription';

    navActions.appendChild(loginBtnNode);
    navActions.appendChild(signupBtnNode);
    if (hamburgerBtn) navActions.appendChild(hamburgerBtn);
  }

  // Update mobile menu too
  updateMobileMenuAuth(user);
}

function updateMobileMenuAuth(user) {
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) return;

  // Remove any existing auth section
  const existingAuth = mobileMenu.querySelector('.mobile-auth-section');
  if (existingAuth) existingAuth.remove();

  const authSection = document.createElement('div');
  authSection.className = 'mobile-auth-section';

  if (user) {
    authSection.innerHTML = `
      <div class="mobile-auth-user">
        <div class="nav-user-avatar">${user.initials}</div>
        <div>
          <div class="font-semibold">${user.fullName}</div>
          <div class="text-sm text-muted">${user.email}</div>
          ${getVerificationBadgeHTML(user.verificationStatus)}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px">
        <button class="btn btn-secondary btn-lg w-full mobile-theme-toggle">
          ${localStorage.getItem('ifindz_theme') === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
        </button>
        ${user.verificationStatus === 'verified'
          ? '<a href="sell.html" class="btn btn-gold btn-lg w-full">📱 Publier une annonce</a>'
          : '<a href="verification.html" class="btn btn-gold btn-lg w-full">🛡️ Vérifier mon identité</a>'
        }
        <button class="btn btn-ghost btn-lg w-full" onclick="logoutUser();window.location.href='index.html'">🚪 Se déconnecter</button>
      </div>
    `;
  } else {
    authSection.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px">
        <button class="btn btn-secondary btn-lg w-full mobile-theme-toggle">
          ${localStorage.getItem('ifindz_theme') === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
        </button>
        <a href="login.html" class="btn btn-primary btn-lg w-full">🔑 Connexion</a>
        <a href="signup.html" class="btn btn-gold btn-lg w-full">✨ Créer un compte</a>
      </div>
    `;
  }

  mobileMenu.appendChild(authSection);

  // Sync theme toggle in mobile
  const mobileToggle = authSection.querySelector('.mobile-theme-toggle');
  if (mobileToggle) {
    mobileToggle.onclick = () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ifindz_theme', newTheme);
      mobileToggle.innerHTML = newTheme === 'light' ? '🌙 Mode Sombre' : '☀️ Mode Clair';
      // Sync desktop toggle if visible
      const deskToggle = document.querySelector('.theme-toggle');
      if (deskToggle) {
        deskToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        deskToggle.title = newTheme === 'dark' ? 'Mode Clair' : 'Mode Sombre';
      }
    };
  }
}

// ─── Init ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  seedUsers();
  updateNavbarAuth();
});
