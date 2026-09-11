function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

const HELP_TOPICS = [
  { id: 'login',    icon: '🔐', titleKey: 'help_topic_login',    descKey: 'help_topic_login_desc',    stepsKey: 'help_steps_login' },
  { id: 'find',     icon: '🔍', titleKey: 'help_topic_find',     descKey: 'help_topic_find_desc',     stepsKey: 'help_steps_find' },
  { id: 'booking',  icon: '📅', titleKey: 'help_topic_booking',  descKey: 'help_topic_booking_desc',  stepsKey: 'help_steps_booking' },
  { id: 'payment',  icon: '💳', titleKey: 'help_topic_payment',  descKey: 'help_topic_payment_desc',  stepsKey: 'help_steps_payment' },
  { id: 'status',   icon: '📦', titleKey: 'help_topic_status',   descKey: 'help_topic_status_desc',   stepsKey: 'help_steps_status' },
  { id: 'cancel',   icon: '❌', titleKey: 'help_topic_cancel',   descKey: 'help_topic_cancel_desc',   stepsKey: 'help_steps_cancel' },
  { id: 'account',  icon: '👤', titleKey: 'help_topic_account',  descKey: 'help_topic_account_desc',  stepsKey: 'help_steps_account' },
  { id: 'language', icon: '🌐', titleKey: 'help_topic_language', descKey: 'help_topic_language_desc', stepsKey: 'help_steps_language' },
  { id: 'other',    icon: '❓', titleKey: 'help_topic_other',    descKey: 'help_topic_other_desc' },
];

let helpChatHistory = [];

// ═══ SETTINGS MODAL ═══
function openSettings() {
  openModal('settingsModalOverlay');
  switchSettingsTab('language');
}

function switchSettingsTab(tab) {
  document.querySelectorAll('.settings-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`settings-tab-btn-${tab}`)?.classList.add('active');
  document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`settings-panel-${tab}`)?.classList.add('active');
  if (tab === 'help') renderHelpHome();
}

// ═══ HELP ASSISTANT — HOME (topic grid + free-text ask) ═══
function renderHelpHome() {
  helpChatHistory = [];
  const container = document.getElementById('help-content');
  if (!container) return;
  container.innerHTML = `
    <div class="help-intro">${t('help_intro')}</div>
    <div class="help-topic-grid">
      ${HELP_TOPICS.map(tp => `
        <div class="help-topic-card" onclick="selectHelpTopic('${tp.id}')">
          <span class="help-topic-icon">${tp.icon}</span>
          <div>
            <div class="help-topic-title">${t(tp.titleKey)}</div>
            <div class="help-topic-desc">${t(tp.descKey)}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <hr class="help-divider">
    <div class="help-intro" style="font-size:15px;">${t('help_ask_own')}</div>
    <div class="help-ask-row">
      <input type="text" id="help-ask-input" placeholder="${t('ph_ask_gemini')}"
             onkeydown="if(event.key==='Enter')startGeminiChat()">
      <button class="btn btn-green" onclick="startGeminiChat()">${t('btn_ask_send')}</button>
    </div>
    <div id="help-tickets-wrap"></div>
  `;
  renderMyTickets();
}

function renderMyTickets() {
  const wrap = document.getElementById('help-tickets-wrap');
  if (!wrap || !currentUser) return;
  const db = getDB();
  const mine = (db.supportTickets || [])
    .filter(tk => tk.customerName === currentUser.username)
    .slice().reverse();

  const heading = `<div class="help-intro" style="font-size:14px;margin-top:20px;">${t('my_tickets')}</div>`;

  if (!mine.length) {
    wrap.innerHTML = `${heading}<div class="empty-state" style="padding:20px;">
      <span class="empty-icon" style="font-size:32px;">🎫</span>${t('no_tickets_yet')}
    </div>`;
    return;
  }

  wrap.innerHTML = `${heading}<div class="my-tickets-list">
    ${mine.map(tk => `
      <div class="my-ticket-item">
        <div class="my-ticket-item-top">
          <strong>#${tk.id} — ${escapeHtml(tk.categoryLabel)}</strong>
          <span class="badge ${ticketBadgeClass(tk.status)}">${ticketStatusLabel(tk.status)}</span>
        </div>
        ${tk.description ? `<div style="font-size:12px;color:#888;">${escapeHtml(tk.description)}</div>` : ''}
        ${tk.adminReply ? `<div class="my-ticket-reply"><strong>${t('reply_from_care')}:</strong> ${escapeHtml(tk.adminReply)}</div>` : ''}
      </div>
    `).join('')}
  </div>`;
}

function ticketBadgeClass(status) {
  return status === 'Open' ? 'badge-open' : status === 'In Progress' ? 'badge-inprogress' : 'badge-resolved';
}
function ticketStatusLabel(status) {
  return status === 'Open' ? t('ticket_status_open') : status === 'In Progress' ? t('ticket_status_inprogress') : t('ticket_status_resolved');
}

// ═══ HELP ASSISTANT — TOPIC / STEPS / RESOLVED FLOW ═══
function selectHelpTopic(id) {
  const topic = HELP_TOPICS.find(x => x.id === id);
  if (!topic) return;
  if (id === 'other') { renderHelpGeminiChat(); return; }

  const steps = t(topic.stepsKey).split('||');
  document.getElementById('help-content').innerHTML = `
    <button class="btn btn-outline btn-sm" onclick="renderHelpHome()">${t('help_back')}</button>
    <div class="help-intro" style="margin-top:14px;">${t(topic.titleKey)}</div>
    <div style="font-size:13px;color:#888;margin-bottom:4px;">${t('help_guided_steps')}</div>
    <ul class="help-steps-list">
      ${steps.map((s, i) => `<li><span class="help-step-num">${i + 1}</span><span>${escapeHtml(s)}</span></li>`).join('')}
    </ul>
    <div style="font-weight:600;margin-bottom:8px;">${t('help_resolved_q')}</div>
    <div class="help-resolved-row">
      <button class="btn btn-green" onclick="helpMarkResolved()">${t('btn_yes_resolved')}</button>
      <button class="btn btn-outline" onclick="helpEscalate('${id}')">${t('btn_no_escalate')}</button>
    </div>
  `;
}

function helpMarkResolved() {
  document.getElementById('help-content').innerHTML = `
    <div class="ticket-confirm-box">
      <span class="ticket-emoji">🎉</span>
      <div class="help-intro">${t('help_thanks')}</div>
      <button class="btn btn-outline" style="margin-top:16px;" onclick="renderHelpHome()">${t('btn_back_to_help')}</button>
    </div>
  `;
}

// ═══ ESCALATE → SUPPORT TICKET ═══
function helpEscalate(topicId) {
  const topic = HELP_TOPICS.find(x => x.id === topicId);
  const label = topic ? t(topic.titleKey) : t('help_topic_other');
  document.getElementById('help-content').innerHTML = `
    <button class="btn btn-outline btn-sm" onclick="${topicId === 'other' ? 'renderHelpGeminiChat()' : `selectHelpTopic('${topicId}')`}">${t('help_back')}</button>
    <div class="help-intro" style="margin-top:14px;">${t('help_escalate_title')}</div>
    <div style="font-size:13px;color:#888;margin-bottom:12px;">${t('help_escalate_desc')}</div>
    <div class="input-group" style="margin-bottom:16px;">
      <label class="input-label">${label}</label>
      <textarea id="help-escalate-desc" rows="4" placeholder="${t('ph_describe_issue')}"></textarea>
    </div>
    <button class="btn btn-green" style="width:100%;" onclick="submitSupportTicket('${topicId}')">${t('btn_submit_ticket')}</button>
  `;
  // Pre-fill with the Gemini transcript so the customer support team has
  // context, if the user came here from a free-text chat.
  const ta = document.getElementById('help-escalate-desc');
  if (ta && helpChatHistory.length) {
    ta.value = helpChatHistory.map(m => `${m.role === 'user' ? 'Q' : 'A'}: ${m.text}`).join('\n');
  }
}

function submitSupportTicket(topicId) {
  const topic = HELP_TOPICS.find(x => x.id === topicId);
  const label = topic ? t(topic.titleKey) : t('help_topic_other');
  const desc = (document.getElementById('help-escalate-desc')?.value || '').trim();

  const db = getDB();
  const ticket = {
    id: db.nextTicketId++,
    category: topicId,
    categoryLabel: label,
    description: desc,
    customerName: currentUser.username,
    status: 'Open',
    createdAt: new Date().toISOString(),
    adminReply: '',
  };
  db.supportTickets.push(ticket);
  saveDB(db);
  showToast(t('toast_ticket_created', { id: ticket.id }));

  document.getElementById('help-content').innerHTML = `
    <div class="ticket-confirm-box">
      <span class="ticket-emoji">✅</span>
      <div class="help-intro">${t('ticket_confirm_title')}</div>
      <div style="font-size:13px;color:#888;">${t('ticket_confirm_desc')}</div>
      <div class="ticket-id-badge">#${ticket.id}</div>
      <div><button class="btn btn-outline" style="margin-top:16px;" onclick="renderHelpHome()">${t('btn_back_to_help')}</button></div>
    </div>
  `;

  // If an admin happens to have this ticket table open right now, refresh it.
  if (document.getElementById('page-admin')?.classList.contains('active')) renderAdminTickets();
}

// ═══ FREE-TEXT GEMINI CHAT ("Other Issue" + the home-screen ask box) ═══
function startGeminiChat() {
  const val = (document.getElementById('help-ask-input')?.value || '').trim();
  if (!val) return;
  renderHelpGeminiChat(val);
}

function renderHelpGeminiChat(prefillQuestion) {
  helpChatHistory = [];
  document.getElementById('help-content').innerHTML = `
    <button class="btn btn-outline btn-sm" onclick="renderHelpHome()">${t('help_back')}</button>
    <div class="help-intro" style="margin-top:14px;">${t('help_topic_other')}</div>
    <div id="help-chat-window" class="help-chat-window"></div>
    <div class="help-ask-row">
      <input type="text" id="help-chat-input" placeholder="${t('ph_ask_gemini')}"
             onkeydown="if(event.key==='Enter')sendHelpChatMessage()">
      <button class="btn btn-green" onclick="sendHelpChatMessage()">${t('btn_ask_send')}</button>
    </div>
    <div class="help-chat-disclaimer">${t('chat_disclaimer')}</div>
    <div class="help-resolved-row" style="margin-top:14px;">
      <button class="btn btn-green" onclick="helpMarkResolved()">${t('btn_yes_resolved')}</button>
      <button class="btn btn-outline" onclick="helpEscalate('other')">${t('btn_no_escalate')}</button>
    </div>
  `;
  if (prefillQuestion) {
    document.getElementById('help-chat-input').value = prefillQuestion;
    sendHelpChatMessage();
  }
}

function appendChatBubble(role, text, record = true) {
  const win = document.getElementById('help-chat-window');
  if (!win) return null;
  const bubble = document.createElement('div');
  bubble.className = `help-chat-bubble ${role}`;
  bubble.textContent = text; // textContent — never innerHTML — for user/AI text
  win.appendChild(bubble);
  win.scrollTop = win.scrollHeight;
  if (record) helpChatHistory.push({ role: role.split(' ')[0], text });
  return bubble;
}

async function sendHelpChatMessage() {
  const input = document.getElementById('help-chat-input');
  const val = (input?.value || '').trim();
  if (!val) return;
  input.value = '';
  appendChatBubble('user', val);

  const typingBubble = appendChatBubble('assistant typing', t('gemini_thinking'), false);
  const result = await askGeminiHelp(val);
  typingBubble?.remove();
  appendChatBubble('assistant', result.text);
}

// ═══ ADMIN — SUPPORT TICKETS TABLE ═══
// Fills the pre-existing #a-tickets-table on the Admin dashboard
// (see index.html "Support Tickets" card) — this was previously unwired.
function renderAdminTickets() {
  const db = getDB();
  const tbody = document.getElementById('a-tickets-table');
  if (!tbody) return;

  if (!db.supportTickets.length) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state"><span class="empty-icon">🎫</span>${t('no_tickets_yet')}</div></td></tr>`;
    return;
  }

  tbody.innerHTML = db.supportTickets.slice().reverse().map(tk => `
    <tr>
      <td><code>#${tk.id}</code></td>
      <td>${escapeHtml(tk.customerName)}</td>
      <td>${escapeHtml(tk.categoryLabel)}</td>
      <td style="max-width:220px;font-size:12px;">
        ${tk.description ? escapeHtml(tk.description) : '<span style="color:#aaa;">—</span>'}
        ${tk.adminReply ? `<div class="my-ticket-reply">${t('reply_from_care')}: ${escapeHtml(tk.adminReply)}</div>` : ''}
      </td>
      <td><span class="badge ${ticketBadgeClass(tk.status)}">${ticketStatusLabel(tk.status)}</span></td>
      <td>
        ${tk.status !== 'Resolved' ? `
          <div class="btn-group" style="flex-direction:column;align-items:stretch;">
            <input type="text" class="admin-ticket-reply-input" data-ticket="${tk.id}"
                   placeholder="${t('ph_admin_reply')}" style="margin-bottom:6px;font-size:12px;padding:6px 8px;">
            <button class="btn btn-amber btn-sm" onclick="adminReplyTicket(${tk.id})">${t('btn_send_reply')}</button>
            <button class="btn btn-green btn-sm" onclick="adminResolveTicket(${tk.id})">${t('btn_mark_resolved')}</button>
          </div>` : '—'}
      </td>
    </tr>
  `).join('');
}

function adminReplyTicket(id) {
  const input = document.querySelector(`.admin-ticket-reply-input[data-ticket="${id}"]`);
  const reply = (input?.value || '').trim();
  if (!reply) return;
  const db = getDB();
  const tk = db.supportTickets.find(x => x.id === id);
  if (!tk) return;
  tk.adminReply = reply;
  tk.status = 'In Progress';
  saveDB(db);
  showToast(t('toast_ticket_updated', { id }));
  renderAdminTickets();
}

function adminResolveTicket(id) {
  const db = getDB();
  const tk = db.supportTickets.find(x => x.id === id);
  if (!tk) return;
  tk.status = 'Resolved';
  saveDB(db);
  showToast(t('toast_ticket_updated', { id }));
  renderAdminTickets();
}
