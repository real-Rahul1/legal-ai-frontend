'use strict';

// Backend API URL
const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3000';


// State
let currentChatId = null;
let currentUser = null;
let isLoading = false;

// DOM refs
const welcomeScreen = document.getElementById('welcomeScreen');
const messagesContainer = document.getElementById('messagesContainer');
const messagesList = document.getElementById('messagesList');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const charCount = document.getElementById('charCount');
const historyList = document.getElementById('historyList');
const newChatBtn = document.getElementById('newChatBtn');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

// Category metadata
const CATEGORIES = {
  traffic: { label: '🏍️ Traffic Law', color: '#60A5FA' },
  criminal: { label: '🚔 Criminal Law', color: '#F87171' },
  consumer: { label: '🛒 Consumer Rights', color: '#34D399' },
  labour: { label: '👷 Labour Law', color: '#FBBF24' },
  property: { label: '🏠 Property Law', color: '#A78BFA' },
  family: { label: '👨‍👩‍👧 Family Law', color: '#F472B6' },
  constitutional: { label: '📜 Constitutional', color: '#FB923C' },
  general: { label: '⚖️ General Legal', color: '#94A3B8' }
};

// ====== INIT ======
async function init() {
  // Init language first
  LangManager.init();
  buildLangSwitcher('langSwitcherContainer');
  applyTranslations();
  wireWelcomeChips();
  loadHistory();
}

function wireWelcomeChips() {
  const chips = [
    { id: 'chip1', key: 'chip1text' },
    { id: 'chip2', key: 'chip2text' },
    { id: 'chip3', key: 'chip3text' },
    { id: 'chip4', key: 'chip4text' },
  ];
  chips.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    if (el) {
      el.onclick = () => sendQuickMsg(LangManager.t(key));
    }
  });
}

// ====== HISTORY (localStorage) ======
function loadHistory() {
  const chats = getStoredChats();
  renderHistory(chats);
}

function renderHistory(chats) {
  if (!chats.length) {
    historyList.innerHTML = `<div class="history-loading">${LangManager.t('noChats')}</div>`;
    return;
  }
  historyList.innerHTML = chats.map(chat => `
    <div class="history-item ${chat._id === currentChatId ? 'active' : ''}" data-id="${chat._id}" onclick="loadChat('${chat._id}')">
      <div class="history-dot ${chat.category || 'general'}"></div>
      <span class="history-title">${escapeHtml(chat.title || 'Legal Query')}</span>
      <button class="history-delete" onclick="deleteChat(event, '${chat._id}')" title="Delete">×</button>
    </div>
  `).join('');
}

function updateActiveHistory() {
  document.querySelectorAll('.history-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === currentChatId);
  });
}

// ====== STORED CHATS (localStorage) ======
function getStoredChats() {
  try { return JSON.parse(localStorage.getItem('nyayMitraChats') || '[]'); } catch { return []; }
}
function saveStoredChats(chats) {
  localStorage.setItem('nyayMitraChats', JSON.stringify(chats));
}
function getChat(chatId) {
  return getStoredChats().find(c => c._id === chatId) || null;
}
function saveChat(chat) {
  const chats = getStoredChats();
  const idx = chats.findIndex(c => c._id === chat._id);
  if (idx >= 0) chats[idx] = chat; else chats.unshift(chat);
  saveStoredChats(chats);
}
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
function generateTitle(message) {
  return message.trim().split(' ').slice(0, 6).join(' ') + '...';
}

// ====== LOAD CHAT ======
async function loadChat(chatId) {
  if (chatId === currentChatId) return;
  currentChatId = chatId;
  updateActiveHistory();
  closeSidebar();

  const chat = getChat(chatId);
  if (!chat) return;

  messagesList.innerHTML = '';
  showMessages();
  chat.messages.forEach(msg => {
    appendMessage(msg.role, msg.content, new Date(msg.timestamp), false);
  });
  scrollToBottom();
}

// ====== DELETE CHAT ======
async function deleteChat(e, chatId) {
  e.stopPropagation();
  if (!confirm(LangManager.t('deleteConfirm'))) return;
  const chats = getStoredChats().filter(c => c._id !== chatId);
  saveStoredChats(chats);
  if (currentChatId === chatId) {
    currentChatId = null;
    showWelcome();
  }
  loadHistory();
}

// ====== SEND MESSAGE ======
async function sendMessage(text) {
  const msg = (text || messageInput.value).trim();
  if (!msg || isLoading) return;

  isLoading = true;
  sendBtn.disabled = true;
  messageInput.value = '';
  updateCharCount();
  adjustTextarea();

  showMessages();
  appendMessage('user', msg, new Date(), true);
  const typingEl = showTyping();
  scrollToBottom();

  try {
    // Get or create chat in localStorage
    let chat;
    if (currentChatId) {
      chat = getChat(currentChatId);
    }
    if (!chat) {
      chat = { _id: generateId(), title: generateTitle(msg), messages: [], category: 'general' };
    }

    // Add user message
    chat.messages.push({ role: 'user', content: msg, timestamp: new Date().toISOString() });

    const res = await fetch(`${API_BASE_URL}/api/chats/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, history: chat.messages.slice(-10), lang: LangManager.current })
    });
    const data = await res.json();

    removeTyping(typingEl);

    if (!data.success) throw new Error(data.message);

    // Save assistant reply
    chat.messages.push({ role: 'assistant', content: data.reply, timestamp: new Date().toISOString() });
    currentChatId = chat._id;
    saveChat(chat);

    appendMessage('assistant', data.reply, new Date(), true);
    scrollToBottom();
    loadHistory();

  } catch (err) {
    removeTyping(typingEl);
    appendMessage('assistant', `${LangManager.t('errorMsg')}\n\n*Error: ${err.message}*`, new Date(), true);
  } finally {
    isLoading = false;
    sendBtn.disabled = messageInput.value.trim().length === 0;
  }
}

// ====== RENDER MESSAGES ======
function appendMessage(role, content, timestamp, animate) {
  const msgEl = document.createElement('div');
  msgEl.className = `message ${role}`;
  if (!animate) msgEl.style.animation = 'none';

  const avatarHtml = role === 'assistant'
    ? `<div class="msg-avatar">⚖️</div>`
    : `<div class="msg-avatar">👤</div>`;

  const formattedContent = role === 'assistant' ? formatAIResponse(content) : `<p>${escapeHtml(content)}</p>`;
  const timeStr = timestamp ? formatTime(timestamp) : '';

  msgEl.innerHTML = `
    ${avatarHtml}
    <div>
      <div class="msg-bubble">${formattedContent}</div>
      ${timeStr ? `<div class="msg-time">${timeStr}</div>` : ''}
    </div>
  `;

  messagesList.appendChild(msgEl);
}

function formatAIResponse(text) {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^(#{1,3} .+)$/gm, (match) => {
    const heading = match.replace(/^#{1,3} /, '');
    return `<h3>${heading}</h3>`;
  });
  html = html.replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(🚨|⚖️|📋|💡|ℹ️|✅|❌|🔴|🟡|🟢|📞|🏛️|📝)([^\n]+)/g, '<strong>$1$2</strong>');
  html = html.replace(/Section (\d+[A-Z]?)/g, '<span class="law-cite">§ $1</span>');
  html = html.replace(/Article (\d+[A-Z]?)/g, '<span class="law-cite">Art. $1</span>');
  html = html.replace(/IPC|CrPC|MVA|RTI|CPA|RERA|EPF|ESI/g, match => `<span class="law-cite">${match}</span>`);
  html = html.split(/\n\n+/).map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h3>') || p.startsWith('<ul>') || p.startsWith('<ol>')) return p;
    return `<p>${p}</p>`;
  }).join('');
  html = html.replace(/<p>(<(?:h3|ul|ol|li)[^>]*>)/g, '$1');
  html = html.replace(/(<\/(?:h3|ul|ol|li)>)<\/p>/g, '$1');
  return html;
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'typing-indicator';
  el.id = 'typingIndicator';
  el.innerHTML = `
    <div class="msg-avatar" style="background:#0D1B2A;color:#FF8C42;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;">⚖️</div>
    <div class="typing-bubble">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  messagesList.appendChild(el);
  return el;
}

function removeTyping(el) {
  if (el && el.parentNode) el.remove();
}

// ====== UI HELPERS ======
function showWelcome() {
  welcomeScreen.style.display = 'flex';
  messagesContainer.style.display = 'none';
  messagesList.innerHTML = '';
}

function showMessages() {
  welcomeScreen.style.display = 'none';
  messagesContainer.style.display = 'block';
}

function scrollToBottom() {
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 50);
}

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function updateCharCount() {
  const len = messageInput.value.length;
  charCount.textContent = `${len}/2000`;
  charCount.style.color = len > 1800 ? '#F87171' : '';
}

function adjustTextarea() {
  messageInput.style.height = 'auto';
  messageInput.style.height = Math.min(messageInput.scrollHeight, 160) + 'px';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarToggle.classList.remove('hidden');
}

function sendQuickMsg(text) {
  sendMessage(text);
}

// ====== EVENT LISTENERS ======
messageInput.addEventListener('input', () => {
  updateCharCount();
  adjustTextarea();
  sendBtn.disabled = messageInput.value.trim().length === 0 || isLoading;
});

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

sendBtn.addEventListener('click', () => sendMessage());

newChatBtn.addEventListener('click', () => {
  currentChatId = null;
  showWelcome();
  updateActiveHistory();
  closeSidebar();
});
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  sidebarToggle.classList.toggle('hidden', sidebar.classList.contains('open'));
});

// Quick questions in sidebar — use translated data-q
document.querySelectorAll('.quick-item').forEach(btn => {
  btn.addEventListener('click', () => {
    sendMessage(btn.dataset.q);
    closeSidebar();
  });
});

// Close sidebar on outside click (mobile)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
      sidebarToggle.classList.remove('hidden');
    }
  }
});

// Re-wire chips when language changes
const _origSwitchLang = window.switchLanguage;
window.switchLanguage = function(lang) {
  _origSwitchLang(lang);
  wireWelcomeChips();
  // update quick-item data-q values
  document.querySelectorAll('.quick-item').forEach(btn => {
    const key = btn.dataset.i18nDataQ;
    if (key) btn.dataset.q = LangManager.t(key);
  });
};

// ====== START ======
init();