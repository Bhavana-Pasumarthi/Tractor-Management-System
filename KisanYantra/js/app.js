const ACCESSORIES_LIST = [
  {id:'rotavator', label:'Rotavator', icon:'🔄'},
  {id:'cultivator', label:'Cultivator', icon:'🌾'},
  {id:'harrow', label:'Harrow', icon:'🪓'},
  {id:'plough', label:'Plough', icon:'⚡'},
  {id:'trailer', label:'Trailer', icon:'🚛'},
  {id:'sprayer', label:'Sprayer', icon:'💧'},
  {id:'seeder', label:'Seeder', icon:'🌱'},
  {id:'loader', label:'Loader', icon:'🏗️'},
  {id:'leveller', label:'Leveller', icon:'📏'},
];

function getDB() {
  const raw = localStorage.getItem('kisanyantra_db');
  if (raw) {
    const db = JSON.parse(raw);
    // Migration: older saved DBs may not have support tickets yet
    let dirty = false;
    if (!db.supportTickets) { db.supportTickets = []; dirty = true; }
    if (!db.nextTicketId) { db.nextTicketId = 1; dirty = true; }
    if (dirty) saveDB(db);
    return db;
  }
  // Seed initial data
  const db = {
    users: [
      {id:1, username:'admin', password:'admin', role:'ADMIN', joined:'2025-01-01'},
      {id:2, username:'owner1', password:'pass', role:'OWNER', joined:'2025-01-15'},
      {id:3, username:'owner2', password:'pass', role:'OWNER', joined:'2025-02-01'},
      {id:4, username:'user1', password:'pass', role:'USER', joined:'2025-03-01'},
      {id:5, username:'user2', password:'pass', role:'USER', joined:'2025-03-15'},
    ],
    tractors: [
      {id:1, registrationNumber:'AP01AB1234', tractorType:'Mahindra 575', location:'Vijayawada', rentPerHour:600, available:true, reservedSlot:null, ownerUsername:'owner1', accessories:['rotavator','plough']},
      {id:2, registrationNumber:'AP02CD5678', tractorType:'John Deere 5050', location:'Guntur', rentPerHour:800, available:false, reservedSlot:'Morning (5AM - 9AM)', ownerUsername:'owner1', accessories:['rotavator','harrow','trailer']},
      {id:3, registrationNumber:'AP03EF9012', tractorType:'TAFE 7502', location:'Vijayawada', rentPerHour:500, available:true, reservedSlot:null, ownerUsername:'owner2', accessories:['cultivator','seeder']},
      {id:4, registrationNumber:'AP04GH3456', tractorType:'Sonalika DI 60', location:'Krishna', rentPerHour:700, available:true, reservedSlot:null, ownerUsername:'owner2', accessories:['sprayer','loader']},
    ],
    bookings: [
      {id:1, tractorId:2, customerName:'user1', bookingDate:'2026-05-20', slot:'Morning (5AM - 9AM)', hours:3, totalAmount:2400, paymentMethod:'UPI', status:'Completed', accessories:['rotavator']},
      {id:2, tractorId:4, customerName:'user1', bookingDate:'2026-05-28', slot:'Afternoon (1PM - 4PM)', hours:2, totalAmount:1400, paymentMethod:'Cash', status:'Upcoming', accessories:['sprayer']},
    ],
    supportTickets: [],
    nextTractorId: 5,
    nextBookingId: 3,
    nextUserId: 6,
    nextTicketId: 1,
  };
  saveDB(db); return db;
}
// suppressStorageEcho: while true, the storage-event listener ignores the next
// broadcast — used so a tab doesn't "react" to its own write in edge cases.
function saveDB(db) { localStorage.setItem('kisanyantra_db', JSON.stringify(db)); }

// i18n (TRANSLATIONS, t(), setLanguage(), applyTranslations(), refreshCurrentView(), etc.)
// now lives in js/i18n.js — loaded before this file. See that file to add/edit language strings.


// ═══════════════════════════════════════════════════
//  CURRENT SESSION
// ═══════════════════════════════════════════════════
let currentUser = JSON.parse(sessionStorage.getItem('kisan_user') || 'null');

// ═══════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `show ${type}`;
  setTimeout(() => t.className = '', 3200);
}

// ═══════════════════════════════════════════════════
//  AUTH PAGE
// ═══════════════════════════════════════════════════
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((b,i)=>b.classList.toggle('active',i===(tab==='login'?0:1)));
  document.getElementById('loginForm').classList.toggle('active', tab==='login');
  document.getElementById('registerForm').classList.toggle('active', tab==='register');
}
let selectedRegRole = 'USER';
function selectRole(role, el) {
  selectedRegRole = role;
  document.getElementById('regRole').value = role;
  document.querySelectorAll('.role-option').forEach(r=>r.classList.remove('selected'));
  el.classList.add('selected');
}
function handleLogin(e) {
  e.preventDefault();

  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value;

  const db = getDB();

  const user = db.users.find(
    x => x.username === u && x.password === p
  );

  if (!user) {
    showToast(t('toast_invalid_login'), 'error');
    return;
  }

  currentUser = user;

  sessionStorage.setItem(
    'kisan_user',
    JSON.stringify(user)
  );

  showToast(t('toast_welcome', {name: user.username}));

  setTimeout(() => {
    routeToPage(user.role);
    window.scrollTo(0, 0);
  }, 600);
}
function handleRegister(e) {
  e.preventDefault();

  const u = document.getElementById('regUsername').value.trim();
  const p = document.getElementById('regPassword').value;
  const role = selectedRegRole;

  if (!u || !p) {
    showToast(t('toast_fill_fields'), 'error');
    return;
  }

  const db = getDB();

  if (db.users.find(x => x.username === u)) {
    showToast(t('toast_username_taken'), 'error');
    return;
  }

  const newUser = {
    id: db.nextUserId++,
    username: u,
    password: p,
    role,
    joined: new Date().toISOString().split('T')[0]
  };

  db.users.push(newUser);

  saveDB(db);

  currentUser = newUser;

  sessionStorage.setItem(
    'kisan_user',
    JSON.stringify(newUser)
  );

  showToast(t('toast_account_created', {name: u}));

  setTimeout(() => {
    routeToPage(role);
    window.scrollTo(0, 0);
  }, 600);
}
function routeToPage(role) {

  document.querySelectorAll('.page')
    .forEach(page => page.classList.remove('active'));

  if (role === 'ADMIN') {

    document
      .getElementById('page-admin')
      .classList.add('active');

    initAdmin();
  }

  else if (role === 'OWNER') {

    document
      .getElementById('page-owner')
      .classList.add('active');

    initOwner();
  }

  else {

    document
      .getElementById('page-user')
      .classList.add('active');

    initUser();
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function logout() {
  currentUser = null;
  sessionStorage.removeItem('kisan_user');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-auth').classList.add('active');
  updateHeroStats();
}

// ═══════════════════════════════════════════════════
//  ACCESSORIES GRID BUILDER
// ═══════════════════════════════════════════════════
function buildAccGrid(containerId, selectedIds=[]) {
  const el = document.getElementById(containerId);
  el.innerHTML = ACCESSORIES_LIST.map(a=>`
    <label class="accessory-chip ${selectedIds.includes(a.id)?'selected':''}" onclick="toggleAccChip(this)">
      <input type="checkbox" value="${a.id}" ${selectedIds.includes(a.id)?'checked':''}>
      ${a.icon} ${a.label}
    </label>
  `).join('');
}
function toggleAccChip(el) {
  setTimeout(()=>{
    const cb = el.querySelector('input');
    el.classList.toggle('selected', cb.checked);
    if (document.getElementById('bk-hours')) calcBookingTotal();
  }, 0);
}
function getSelectedAccs(containerId) {
  return [...document.querySelectorAll(`#${containerId} input[type=checkbox]:checked`)].map(c=>c.value);
}

// ═══════════════════════════════════════════════════
//  MODAL HELPERS
// ═══════════════════════════════════════════════════
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));

// ═══════════════════════════════════════════════════
//  HERO STATS
// ═══════════════════════════════════════════════════
function updateHeroStats() {
  const db = getDB();
  document.getElementById('hero-tractors').textContent = db.tractors.length;
  document.getElementById('hero-bookings').textContent = db.bookings.length;
  document.getElementById('hero-users').textContent = db.users.length;
}

// ═══════════════════════════════════════════════════
//  ADMIN DASHBOARD
// ═══════════════════════════════════════════════════
function initAdmin() {
  document.getElementById('admin-user-name').textContent = currentUser.username;
  buildAccGrid('admin-acc-grid');
  renderAdminStats();
  renderAdminTractors();
  renderAdminBookings();
  renderAdminUsers();
  renderAdminTickets();
  populateOwnerDropdown();
}
function renderAdminStats() {
  const db = getDB();
  document.getElementById('a-total-tractors').textContent = db.tractors.length;
  document.getElementById('a-available').textContent = db.tractors.filter(t=>t.available).length;
  document.getElementById('a-reserved').textContent = db.tractors.filter(t=>!t.available).length;
  document.getElementById('a-bookings').textContent = db.bookings.length;
}
function populateOwnerDropdown() {
  const db = getDB();
  const owners = db.users.filter(u=>u.role==='OWNER');
  document.getElementById('a-owner').innerHTML = '<option value="">Select Owner</option>' +
    owners.map(o=>`<option value="${o.username}">${o.username}</option>`).join('');
}
function adminAddTractor() {
  const reg = document.getElementById('a-regNum').value.trim();
  const type = document.getElementById('a-tractorType').value.trim();
  const loc = document.getElementById('a-location').value.trim();
  const rent = parseInt(document.getElementById('a-rent').value);
  const owner = document.getElementById('a-owner').value;
  if (!reg||!type||!loc||!rent||!owner) { showToast(t('toast_fill_all'),'error'); return; }
  const db = getDB();
  db.tractors.push({id:db.nextTractorId++, registrationNumber:reg, tractorType:type, location:loc, rentPerHour:rent, available:true, reservedSlot:null, ownerUsername:owner, accessories:getSelectedAccs('admin-acc-grid')});
  saveDB(db);
  showToast(t('toast_tractor_added'));
  ['a-regNum','a-tractorType','a-location','a-rent'].forEach(id=>document.getElementById(id).value='');
  buildAccGrid('admin-acc-grid');
  renderAdminStats(); renderAdminTractors();
}
function renderAdminTractors() {
  const db = getDB();
  const q = (document.getElementById('a-search').value||'').toLowerCase();
  const rows = db.tractors.filter(t=>!q||t.registrationNumber.toLowerCase().includes(q)||t.tractorType.toLowerCase().includes(q)||t.location.toLowerCase().includes(q));
  const tbody = document.getElementById('a-tractors-table');
  if (!rows.length) { tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><span class="empty-icon">🔍</span>${t('empty_no_tractors')}</div></td></tr>`; return; }
  tbody.innerHTML = rows.map(tr=>`
    <tr>
      <td><code style="font-size:12px;">#${tr.id}</code></td>
      <td><strong>${tr.registrationNumber}</strong></td>
      <td>${tr.tractorType}</td>
      <td><span style="background:rgba(230,126,34,0.15);color:#c0392b;padding:2px 8px;border-radius:12px;font-size:12px;">${tr.ownerUsername||'-'}</span></td>
      <td>📍 ${tr.location}</td>
      <td><span class="badge ${tr.available?'badge-available':'badge-reserved'}">${tr.available?t('status_available'):t('status_reserved_lock')}</span></td>
      <td><strong>₹${tr.rentPerHour}</strong></td>
      <td style="max-width:160px;">${(tr.accessories||[]).map(a=>{const x=ACCESSORIES_LIST.find(l=>l.id===a);return x?`<span class="acc-tag">${x.icon} ${t('acc_'+x.id)}</span>`:''}).join('')||'-'}</td>
      <td>
        <div class="btn-group">
          <button class="btn btn-amber btn-sm" onclick="openEditTractor(${tr.id})">${t('btn_edit')}</button>
          <button class="btn btn-red btn-sm" onclick="deleteTractor(${tr.id})">${t('btn_del')}</button>
        </div>
      </td>
    </tr>
  `).join('');
}
function renderAdminBookings() {
  const db = getDB();
  const tbody = document.getElementById('a-bookings-table');
  if (!db.bookings.length) { tbody.innerHTML = `<tr><td colspan="10"><div class="empty-state"><span class="empty-icon">📋</span>${t('empty_no_bookings')}</div></td></tr>`; return; }
  tbody.innerHTML = db.bookings.map(b=>{
    const bt = db.tractors.find(x=>x.id===b.tractorId);
    return `<tr>
      <td><code>#${b.id}</code></td>
      <td>${bt?bt.registrationNumber:'-'}</td>
      <td>${b.customerName}</td>
      <td>${b.bookingDate}</td>
      <td style="font-size:12px;">${slotLabel(b.slot)}</td>
      <td>${b.hours}h</td>
      <td><strong>₹${b.totalAmount}</strong></td>
      <td><span style="font-size:12px;background:rgba(0,0,0,0.07);padding:2px 8px;border-radius:8px;">${b.paymentMethod}</span></td>
      <td><span class="badge badge-${b.status.toLowerCase()}">${statusBadgeLabel(b.status)}</span></td>
      <td>
        ${b.status==='Upcoming'?`<button class="btn btn-green btn-sm" onclick="adminCompleteBooking(${b.id})">${t('btn_complete')}</button>`:''}
        <button class="btn btn-red btn-sm" onclick="adminDeleteBooking(${b.id})">${t('btn_del')}</button>
      </td>
    </tr>`;
  }).join('');
}
function renderAdminUsers() {
  const db = getDB();
  const ROLE_COLORS = {ADMIN:'role-admin',OWNER:'role-owner',USER:'role-user'};
  document.getElementById('a-users-table').innerHTML = db.users.map(u=>`
    <tr>
      <td><code>#${u.id}</code></td>
      <td><strong>${u.username}</strong></td>
      <td><span class="nav-role-badge ${ROLE_COLORS[u.role]||'role-user'}">${u.role}</span></td>
      <td style="font-size:12px;color:#888;">${u.joined||'-'}</td>
      <td>${u.role!=='ADMIN'?`<button class="btn btn-red btn-sm" onclick="adminDeleteUser(${u.id})">${t('btn_remove')}</button>`:'-'}</td>
    </tr>
  `).join('');
}
function adminCompleteBooking(id) {
  const db = getDB();
  const b = db.bookings.find(x=>x.id===id);
  if (!b) return;
  b.status = 'Completed';
  const tt = db.tractors.find(x=>x.id===b.tractorId);
  if (tt) { tt.available=true; tt.reservedSlot=null; }
  saveDB(db); renderAdminBookings(); renderAdminStats(); renderAdminTractors();
  showToast(t('toast_booking_completed_admin'));
}
function adminDeleteBooking(id) {
  if (!confirm('Delete this booking?')) return;
  const db = getDB();
  const b = db.bookings.find(x=>x.id===id);
  if (b && b.status==='Upcoming') {
    const tt = db.tractors.find(x=>x.id===b.tractorId);
    if (tt) { tt.available=true; tt.reservedSlot=null; }
  }
  db.bookings = db.bookings.filter(x=>x.id!==id);
  saveDB(db); renderAdminBookings(); renderAdminStats(); renderAdminTractors();
  showToast(t('toast_booking_deleted'));
}
function adminDeleteUser(id) {
  if (!confirm('Remove this user?')) return;
  const db = getDB();
  db.users = db.users.filter(u=>u.id!==id);
  saveDB(db); renderAdminUsers(); populateOwnerDropdown();
  showToast(t('toast_user_removed'));
}

// ═══════════════════════════════════════════════════
//  EDIT TRACTOR (shared admin + owner)
// ═══════════════════════════════════════════════════
function openEditTractor(id) {
  const db = getDB();
  const t = db.tractors.find(x=>x.id===id);
  if (!t) return;
  document.getElementById('et-id').value = id;
  document.getElementById('et-regNum').value = t.registrationNumber;
  document.getElementById('et-type').value = t.tractorType;
  document.getElementById('et-location').value = t.location;
  document.getElementById('et-rent').value = t.rentPerHour;
  buildAccGrid('et-acc-grid', t.accessories||[]);
  openModal('editTractorModalOverlay');
}
function saveTractorEdit() {
  const id = parseInt(document.getElementById('et-id').value);
  const db = getDB();
  const et = db.tractors.find(x=>x.id===id);
  if (!et) return;
  et.registrationNumber = document.getElementById('et-regNum').value.trim();
  et.tractorType = document.getElementById('et-type').value.trim();
  et.location = document.getElementById('et-location').value.trim();
  et.rentPerHour = parseInt(document.getElementById('et-rent').value);
  et.accessories = getSelectedAccs('et-acc-grid');
  saveDB(db);
  closeModal('editTractorModalOverlay');
  showToast(t('toast_tractor_updated'));
  if (currentUser.role==='ADMIN') { renderAdminTractors(); }
  else { renderOwnerTractors(); }
}
function deleteTractor(id) {
  if (!confirm('Delete this tractor? All its bookings will also be removed.')) return;
  const db = getDB();
  db.tractors = db.tractors.filter(t=>t.id!==id);
  db.bookings = db.bookings.filter(b=>b.tractorId!==id);
  saveDB(db); showToast(t('toast_tractor_deleted'));
  if (currentUser.role==='ADMIN') { renderAdminStats(); renderAdminTractors(); renderAdminBookings(); }
  else { renderOwnerStats(); renderOwnerTractors(); renderOwnerBookings(); }
}

// ═══════════════════════════════════════════════════
//  OWNER DASHBOARD
// ═══════════════════════════════════════════════════
function initOwner() {
  document.getElementById('owner-user-name').textContent = currentUser.username;
  document.getElementById('owner-welcome').textContent = `Welcome, ${currentUser.username}`;
  buildAccGrid('owner-acc-grid');
  renderOwnerStats();
  renderOwnerBookings();
  renderOwnerTractors();
}
function renderOwnerStats() {
  const db = getDB();
  const myTractors = db.tractors.filter(t=>t.ownerUsername===currentUser.username);
  const myBookings = db.bookings.filter(b=>myTractors.find(t=>t.id===b.tractorId));
  const revenue = myBookings.filter(b=>b.status==='Completed').reduce((s,b)=>s+b.totalAmount,0);
  document.getElementById('o-total-bookings').textContent = myBookings.length;
  document.getElementById('o-revenue').textContent = '₹'+revenue.toLocaleString();
  document.getElementById('o-my-tractors').textContent = myTractors.length;
}
function renderOwnerBookings() {
  const db = getDB();
  const myTractors = db.tractors.filter(t=>t.ownerUsername===currentUser.username);
  const myBookings = db.bookings.filter(b=>myTractors.find(t=>t.id===b.tractorId));
  const tbody = document.getElementById('o-bookings-table');
  if (!myBookings.length) { tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><span class="empty-icon">📋</span>${t('empty_no_bookings')}</div></td></tr>`; return; }
  tbody.innerHTML = myBookings.map(b=>{
    const t = myTractors.find(x=>x.id===b.tractorId);
    return `<tr>
      <td>${t?t.registrationNumber:'-'}</td>
      <td>${b.customerName}</td>
      <td>${b.bookingDate}</td>
      <td style="font-size:12px;">${slotLabel(b.slot)}</td>
      <td>${b.hours}h</td>
      <td><strong>₹${b.totalAmount}</strong></td>
      <td><span style="font-size:12px;background:rgba(0,0,0,0.07);padding:2px 8px;border-radius:8px;">${b.paymentMethod}</span></td>
      <td><span class="badge badge-${b.status.toLowerCase()}">${statusBadgeLabel(b.status)}</span></td>
      <td>${b.status==='Upcoming'?`<button class="btn btn-green btn-sm" onclick="ownerCompleteBooking(${b.id})">${t('btn_complete')}</button>`:'-'}</td>
    </tr>`;
  }).join('');
}
function renderOwnerTractors() {
  const db = getDB();
  const myTractors = db.tractors.filter(t=>t.ownerUsername===currentUser.username);
  const tbody = document.getElementById('o-tractors-table');
  if (!myTractors.length) { tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><span class="empty-icon">🚜</span>${t('empty_no_tractors_add')}</div></td></tr>`; return; }
  tbody.innerHTML = myTractors.map(tr=>`
    <tr>
      <td><strong>${tr.registrationNumber}</strong></td>
      <td>${tr.tractorType}</td>
      <td>📍 ${tr.location}</td>
      <td>₹${tr.rentPerHour}/hr</td>
      <td><span class="badge ${tr.available?'badge-available':'badge-reserved'}">${tr.available?t('status_available'):t('status_reserved_lock')}</span></td>
      <td>${(tr.accessories||[]).map(a=>{const x=ACCESSORIES_LIST.find(l=>l.id===a);return x?`<span class="acc-tag">${x.icon}</span>`:''}).join('')||'-'}</td>
      <td>
        <div class="btn-group">
          <button class="btn btn-amber btn-sm" onclick="openEditTractor(${tr.id})">${t('btn_edit')}</button>
          <button class="btn btn-red btn-sm" onclick="deleteTractor(${tr.id})">${t('btn_del')}</button>
        </div>
      </td>
    </tr>
  `).join('');
}
function ownerAddTractor() {
  const reg = document.getElementById('o-regNum').value.trim();
  const type = document.getElementById('o-tractorType').value.trim();
  const loc = document.getElementById('o-location').value.trim();
  const rent = parseInt(document.getElementById('o-rent').value);
  if (!reg||!type||!loc||!rent) { showToast(t('toast_fill_all'),'error'); return; }
  const db = getDB();
  db.tractors.push({id:db.nextTractorId++, registrationNumber:reg, tractorType:type, location:loc, rentPerHour:rent, available:true, reservedSlot:null, ownerUsername:currentUser.username, accessories:getSelectedAccs('owner-acc-grid')});
  saveDB(db);
  showToast(t('toast_tractor_added2'));
  ['o-regNum','o-tractorType','o-location','o-rent'].forEach(id=>document.getElementById(id).value='');
  buildAccGrid('owner-acc-grid');
  renderOwnerStats(); renderOwnerTractors();
  switchOwnerTab('my-tractors', document.querySelectorAll('.tab-btn')[1]);
}
function ownerCompleteBooking(id) {
  const db = getDB();
  const b = db.bookings.find(x=>x.id===id);
  if (!b) return;
  b.status = 'Completed';
  const t = db.tractors.find(x=>x.id===b.tractorId);
  if (t) { t.available=true; t.reservedSlot=null; }
  saveDB(db); renderOwnerBookings(); renderOwnerStats(); renderOwnerTractors();
  showToast(t('toast_booking_completed'));
}
function switchOwnerTab(tab, btn) {
  document.querySelectorAll('#page-owner .tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('#page-owner .tab-panel').forEach(p=>p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById(`owner-tab-${tab}`).classList.add('active');
}

// ═══════════════════════════════════════════════════
//  USER DASHBOARD
// ═══════════════════════════════════════════════════
function initUser() {
  document.getElementById('user-user-name').textContent = currentUser.username;
  renderUserStats();
  renderUserTractors();
  renderUserHistory();
  populateAccFilter();
}
function renderUserStats() {
  const db = getDB();
  const avail = db.tractors.filter(t=>t.available).length;
  const myB = db.bookings.filter(b=>b.customerName===currentUser.username);
  const spent = myB.reduce((s,b)=>s+b.totalAmount,0);
  document.getElementById('u-available').textContent = avail;
  document.getElementById('u-my-bookings').textContent = myB.length;
  document.getElementById('u-spent').textContent = '₹'+spent.toLocaleString();
}
function populateAccFilter() {
  const sel = document.getElementById('u-acc-filter');
  sel.innerHTML = '<option value="">All Accessories</option>' +
    ACCESSORIES_LIST.map(a=>`<option value="${a.id}">${a.icon} ${a.label}</option>`).join('');
}
function renderUserTractors() {
  const db = getDB();
  const q = (document.getElementById('u-search').value||'').toLowerCase();
  const locQ = (document.getElementById('u-location-search').value||'').toLowerCase();
  const accQ = document.getElementById('u-acc-filter').value;
  const tractors = db.tractors.filter(t=>{
    if (!q && !locQ && !accQ) return true;
    const matchQ = !q || t.registrationNumber.toLowerCase().includes(q) || t.tractorType.toLowerCase().includes(q);
    const matchLoc = !locQ || t.location.toLowerCase().includes(locQ);
    const matchAcc = !accQ || (t.accessories||[]).includes(accQ);
    return matchQ && matchLoc && matchAcc;
  });
  const grid = document.getElementById('u-tractor-grid');
  if (!tractors.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;"><span style="font-size:48px;display:block;margin-bottom:12px;">🔍</span>${t('no_match_search')}</div>`;
    return;
  }
  grid.innerHTML = tractors.map(tr=>{
    const accs = (tr.accessories||[]).map(a=>{const x=ACCESSORIES_LIST.find(l=>l.id===a);return x?`<span class="acc-tag">${x.icon} ${t('acc_'+x.id)}</span>`:''}).join('');
    return `
    <div class="tractor-card">
      <div class="tractor-card-header">
        <div class="tractor-card-reg">${tr.registrationNumber}</div>
        <div class="tractor-card-type">${tr.tractorType}</div>
        <div class="tractor-card-status">
          <span class="badge ${tr.available?'badge-available':'badge-reserved'}">${tr.available?t('status_available'):t('status_reserved_lock')}</span>
        </div>
      </div>
      <div class="tractor-card-body">
        <div class="tractor-info-row">
          <span class="tractor-info-icon">📍</span>
          <span class="tractor-info-label">${t('label_location')}</span>
          <span class="tractor-info-value">${tr.location}</span>
        </div>
        <div class="tractor-info-row">
          <span class="tractor-info-icon">👤</span>
          <span class="tractor-info-label">${t('th_owner')}</span>
          <span class="tractor-info-value">${tr.ownerUsername||'—'}</span>
        </div>
        ${tr.reservedSlot?`<div class="tractor-info-row"><span class="tractor-info-icon">🕐</span><span class="tractor-info-label">${t('lbl_booked_slot')}</span><span class="tractor-info-value" style="font-size:12px;">${slotLabel(tr.reservedSlot)}</span></div>`:''}
        ${accs?`<div class="tractor-accessories">${accs}</div>`:''}
      </div>
      <div class="tractor-card-footer">
        <div class="rent-display">
          <div class="rent-amount">₹${tr.rentPerHour}</div>
          <div class="rent-unit">${t('per_hour')}</div>
        </div>
        <button class="btn btn-green" ${!tr.available?'disabled':''} onclick="openBookingModal(${tr.id})">
          ${tr.available?t('btn_book_now'):t('btn_reserved')}
        </button>
      </div>
    </div>`;
  }).join('');
}
function renderUserHistory() {
  const db = getDB();
  const myB = db.bookings.filter(b=>b.customerName===currentUser.username);
  const tbody = document.getElementById('u-history-table');
  if (!myB.length) { tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><span class="empty-icon">📋</span>${t('empty_no_bookings_browse')}</div></td></tr>`; return; }
  tbody.innerHTML = myB.map(b=>{
    const t = db.tractors.find(x=>x.id===b.tractorId);
    const accs = (b.accessories||[]).map(a=>{const x=ACCESSORIES_LIST.find(l=>l.id===a);return x?`<span class="acc-tag">${x.icon}</span>`:''}).join('');
    return `<tr>
      <td>${t?`<strong>${t.registrationNumber}</strong><br><span style="font-size:11px;color:#888;">${t.tractorType}</span>`:'-'}</td>
      <td>${b.bookingDate}</td>
      <td style="font-size:12px;">${slotLabel(b.slot)}</td>
      <td>${b.hours}h</td>
      <td>${accs||'-'}</td>
      <td><strong>₹${b.totalAmount}</strong></td>
      <td>${b.paymentMethod}</td>
      <td><span class="badge badge-${b.status.toLowerCase()}">${statusBadgeLabel(b.status)}</span></td>
      <td>${b.status==='Upcoming'?`<button class="btn btn-red btn-sm" onclick="cancelBooking(${b.id})">${t('btn_cancel')}</button>`:'-'}</td>
    </tr>`;
  }).join('');
}
function switchUserTab(tab, btn) {
  document.querySelectorAll('#page-user .tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('#page-user .tab-panel').forEach(p=>p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById(`user-tab-${tab}`).classList.add('active');
  if (tab==='history') renderUserHistory();
}
function cancelBooking(id) {
  if (!confirm('Cancel this booking?')) return;
  const db = getDB();
  const b = db.bookings.find(x=>x.id===id);
  if (!b) return;
  b.status = 'Cancelled';
  const t = db.tractors.find(x=>x.id===b.tractorId);
  if (t) { t.available=true; t.reservedSlot=null; }
  saveDB(db); showToast(t('toast_booking_cancelled'));
  renderUserStats(); renderUserHistory(); renderUserTractors();
}

// ═══════════════════════════════════════════════════
//  BOOKING MODAL
// ═══════════════════════════════════════════════════
function openBookingModal(tractorId) {
  const db = getDB();
  const t = db.tractors.find(x=>x.id===tractorId);
  if (!t) return;
  document.getElementById('bk-tractorId').value = tractorId;
  document.getElementById('bk-rentPerHour').value = t.rentPerHour;
  document.getElementById('bk-tractorDisplay').value = `${t.registrationNumber} — ${t.tractorType}`;
  document.getElementById('bk-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('bk-hours').value = 2;
  document.querySelectorAll('.slot-chip').forEach((c,i)=>c.classList.toggle('selected',i===0));
  document.querySelectorAll('.slot-chip input').forEach((r,i)=>{r.checked=i===0;});
  buildAccGrid('bk-acc-grid', t.accessories||[]);
  calcBookingTotal();
  openModal('bookingModalOverlay');
}
function selectSlot(el, val) {
  document.querySelectorAll('.slot-chip').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
}
function calcBookingTotal() {
  const rent = parseInt(document.getElementById('bk-rentPerHour').value)||0;
  const hours = parseInt(document.getElementById('bk-hours').value)||0;
  const total = rent * hours;
  document.getElementById('bk-total').textContent = '₹' + total.toLocaleString();
  document.getElementById('bk-calc-hint').textContent = `${hours} hr${hours!==1?'s':''} × ₹${rent}/hr`;
}
function confirmBooking() {
  const tractorId = parseInt(document.getElementById('bk-tractorId').value);
  const date = document.getElementById('bk-date').value;
  const hours = parseInt(document.getElementById('bk-hours').value);
  const payment = document.getElementById('bk-payment').value;
  const rent = parseInt(document.getElementById('bk-rentPerHour').value);
  const slot = document.querySelector('.slot-chip.selected input')?.value || 'Morning (5AM - 9AM)';
  const accs = getSelectedAccs('bk-acc-grid');
  if (!date||!hours||hours<1) { showToast(t('toast_fill_booking'),'error'); return; }
  const db = getDB();
  const booking = {
    id: db.nextBookingId++,
    tractorId, customerName: currentUser.username,
    bookingDate: date, slot, hours,
    totalAmount: rent*hours,
    paymentMethod: payment,
    status: 'Upcoming',
    accessories: accs,
  };
  db.bookings.push(booking);
  const t = db.tractors.find(x=>x.id===tractorId);
  if (t) { t.available=false; t.reservedSlot=slot; }
  saveDB(db);
  closeModal('bookingModalOverlay');
  showToast(t('toast_booked', {amt: booking.totalAmount.toLocaleString(), payment}));
  renderUserStats(); renderUserTractors(); renderUserHistory();
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
updateHeroStats();

if (currentUser) {

  setTimeout(() => {

    routeToPage(currentUser.role);

    window.scrollTo(0, 0);

  }, 100);
}