// C:/Users/sanja/OneDrive/Desktop/WEB REDESIGN/app.js

const safeStorage = {
    get: (k, d) => { try { return localStorage.getItem(k) || d; } catch(e) { return d; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch(e) {} },
    remove: (k) => { try { localStorage.removeItem(k); } catch(e) {} }
};

const state = {
    apiKey: safeStorage.get('adv_ai_key', ''),
    currentModel: safeStorage.get('adv_ai_model', 'auto'),
    arenaMode: false,
    currentPersona: safeStorage.get('adv_ai_persona', 'default'),
    soundEnabled: safeStorage.get('adv_ai_sound', 'true') === 'true',
    sessions: [],
    activeSessionId: null,
    isStreaming: false
};

const synth = {
    ctx: null,
    init() {
        if (!this.ctx) {
            try {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.warn('AudioContext not supported');
            }
        }
    },
    playBeep(freq, duration, type) {
        if (!state.soundEnabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },
    playClick() {
        this.playBeep(650, 0.04, 'sine');
    },
    playSend() {
        this.playBeep(880, 0.12, 'triangle');
    },
    playChime() {
        if (!state.soundEnabled || !this.ctx) return;
        this.playBeep(523.25, 0.1, 'sine'); // C5
        setTimeout(() => this.playBeep(659.25, 0.2, 'sine'), 90); // E5
    }
};

function showToast(message, duration = 2500) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('active'), 10);
    setTimeout(() => {
        toast.classList.remove('active');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    safeStorage.set('adv_ai_sound', state.soundEnabled.toString());
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
        btn.textContent = state.soundEnabled ? 'ON' : 'OFF';
        btn.className = state.soundEnabled
            ? 'px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-xs font-black text-emerald-400 transition'
            : 'px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-xs font-black text-gray-400 transition';
    }
    showToast(state.soundEnabled ? 'Sound ON' : 'Sound OFF');
}

document.addEventListener('DOMContentLoaded', () => {
    synth.init();
    initTheme();
    loadSessions();
    setupInputEvents();
    setupShortcuts();
    updateHeaderModelBadge();
    updateApiKeyStatusBadge();
    if (typeof renderModelSelectorCards === 'function') renderModelSelectorCards();
    if (typeof renderPromptModalContent === 'function') renderPromptModalContent();
    renderHistorySidebar();
});

function setupInputEvents() {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-button');
    const fileUpload = document.getElementById('file-upload');
    const fileNameLabel = document.getElementById('file-name-label');

    if (chatInput) {
        chatInput.addEventListener('input', () => {
            chatInput.style.height = 'auto';
            chatInput.style.height = Math.min(chatInput.scrollHeight, 180) + 'px';
            updateSendButtonState();
        });

        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    if (fileUpload) {
        fileUpload.addEventListener('change', () => {
            if (fileUpload.files.length > 0) {
                if (fileNameLabel) {
                    fileNameLabel.style.display = 'inline-flex';
                    const span = fileNameLabel.querySelector('span');
                    if (span) span.textContent = fileUpload.files[0].name;
                }
                updateSendButtonState();
            } else {
                if (fileNameLabel) fileNameLabel.style.display = 'none';
                updateSendButtonState();
            }
        });
    }

    function updateSendButtonState() {
        if (!chatInput || !sendBtn) return;
        const hasText = chatInput.value.trim().length > 0;
        const hasFile = fileUpload && fileUpload.files.length > 0;
        
        if (hasText || hasFile) {
            sendBtn.classList.remove('idle');
            sendBtn.classList.add('active');
        } else {
            sendBtn.classList.add('idle');
            sendBtn.classList.remove('active');
        }
    }
}

async function sendMessage() {
    if (state.isStreaming) return;
    
    const chatInput = document.getElementById('chat-input');
    const fileUpload = document.getElementById('file-upload');
    
    const text = chatInput ? chatInput.value.trim() : '';
    const file = fileUpload && fileUpload.files.length > 0 ? fileUpload.files[0] : null;
    
    if (!text && !file) return;
    
    if (!state.apiKey) {
        openSettings('tab-core');
        showToast('Please set your API key first');
        return;
    }
    
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) welcomeScreen.style.display = 'none';
    
    if (!state.activeSessionId) {
        startNewSessionInternal();
        if (welcomeScreen) welcomeScreen.style.display = 'none';
    }
    
    let imageBase64 = null;
    let fileHtml = '';
    if (file && file.type.startsWith('image/')) {
        imageBase64 = await toBase64(file);
        fileHtml = `<img src="${imageBase64}" class="max-w-xs rounded mb-2 border border-white/20">`;
    }
    
    const messagesContainer = document.getElementById('messages-container');
    const userBubble = document.createElement('div');
    userBubble.className = 'msg-container user';
    userBubble.innerHTML = `<div class="msg-bubble-user">${fileHtml}${escapeHtml(text)}</div>`;
    if (messagesContainer) messagesContainer.appendChild(userBubble);
    
    if (chatInput) {
        chatInput.value = '';
        chatInput.style.height = 'auto';
    }
    if (fileUpload) fileUpload.value = '';
    const fileNameLabel = document.getElementById('file-name-label');
    if (fileNameLabel) fileNameLabel.style.display = 'none';
    
    const sendBtn = document.getElementById('send-button');
    if (sendBtn) {
        sendBtn.classList.add('idle');
        sendBtn.classList.remove('active');
    }
    
    synth.playSend();
    state.isStreaming = true;
    updateIslandStatus('Thinking...', 'amber', true);
    scrollToBottom();
    
    let modelId = state.currentModel;
    if (modelId === 'auto') {
        modelId = 'poolside/laguna-xs-2.1:free'; // Fallback for cached localstorage state
    }
    
    await executeSingleModelStreaming(text, modelId, imageBase64);
    
    state.isStreaming = false;
    updateIslandStatus('Ready', 'green', false);
    saveCurrentSessionToHistory(text || 'Image Upload');
}

async function executeSingleModelStreaming(userPrompt, modelId, imageBase64) {
    const messagesContainer = document.getElementById('messages-container');
    const aiContainer = document.createElement('div');
    aiContainer.className = 'msg-container ai';
    
    const bubbleId = 'ai-bubble-' + Date.now();
    
    aiContainer.innerHTML = `
        <div class="w-9 h-9 rounded-2xl bg-gradient-to-br from-[var(--theme-from)] to-cyan-500 flex items-center justify-center text-white shadow-lg shrink-0 mt-1">
            <i class="ph-bold ph-aperture text-xl animate-spin-slow"></i>
        </div>
        <div class="flex-1 max-w-[85%]">
            <div class="msg-bubble-ai" id="${bubbleId}">
                <span class="inline-block w-2.5 h-4 bg-[var(--theme-from)] animate-pulse rounded-sm"></span>
            </div>
            <div id="toolbar-${bubbleId}" class="flex items-center gap-3 mt-2 px-1 text-gray-400 text-xs font-bold"></div>
        </div>
    `;
    if (messagesContainer) messagesContainer.appendChild(aiContainer);
    scrollToBottom();
    
    const bubbleEl = document.getElementById(bubbleId);
    const toolbarEl = document.getElementById('toolbar-' + bubbleId);
    
    let messages = [
        { role: 'system', content: getPersonaSystemPrompt(state.currentPersona) + '\nIf writing code for a project, you may output multiple files. Format each file by prefixing it with its filename like `### filename.ext` followed by the code block.' }
    ];
    
    // Extract full conversation history from the DOM
    const messageContainers = document.querySelectorAll('#messages-container .msg-container');
    const msgArray = Array.from(messageContainers);
    
    msgArray.forEach((container, index) => {
        if (container.querySelector(`#${bubbleId}`)) return; // Skip the pending AI bubble
        
        const isLastUser = (index === msgArray.length - 2);
        
        if (container.classList.contains('user')) {
            const userBubble = container.querySelector('.msg-bubble-user');
            if (userBubble) {
                const textContent = userBubble.textContent || '';
                if (isLastUser && imageBase64) {
                    messages.push({
                        role: 'user',
                        content: [
                            { type: 'text', text: textContent || 'Describe this image.' },
                            { type: 'image_url', image_url: { url: imageBase64 } }
                        ]
                    });
                } else {
                    messages.push({ role: 'user', content: textContent });
                }
            }
        } else if (container.classList.contains('ai')) {
            const aiBubble = container.querySelector('.msg-bubble-ai');
            if (aiBubble) {
                const rawMarkdown = window['__chat_text_' + aiBubble.id];
                const content = rawMarkdown || aiBubble.innerText || '';
                if (content.trim()) {
                    messages.push({ role: 'assistant', content: content });
                }
            }
        }
    });
    
    // Fallback if DOM traversal was empty
    if (messages.length === 1) {
        if (imageBase64) {
            messages.push({
                role: 'user',
                content: [
                    { type: 'text', text: userPrompt || 'Describe this image.' },
                    { type: 'image_url', image_url: { url: imageBase64 } }
                ]
            });
        } else {
            messages.push({ role: 'user', content: userPrompt });
        }
    }
    
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${state.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.href,
                'X-Title': 'Advanced AI'
            },
            body: JSON.stringify({
                model: modelId,
                messages: messages,
                stream: true
            })
        });
        
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Rate limit exceeded. The free models are currently very busy. Please wait a few moments and try again.");
            } else if (response.status === 401) {
                throw new Error("Invalid or missing API key. Please verify your OpenRouter API key in settings.");
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            
            for (const line of lines) {
                if (line === 'data: [DONE]') continue;
                if (line.startsWith('data: ')) {
                    try {
                        const data = JSON.parse(line.slice(6));
                        if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
                            fullText += data.choices[0].delta.content;
                            if (window.marked) {
                                bubbleEl.innerHTML = marked.parse(fullText);
                            } else {
                                bubbleEl.innerHTML = escapeHtml(fullText).replace(/\n/g, '<br>');
                            }
                            scrollToBottom();
                        }
                    } catch (e) {
                        console.error('Error parsing stream:', e);
                    }
                }
            }
        }
        
        attachPostStreamingToolbar(bubbleEl, toolbarEl, fullText);
        synth.playChime();
        
    } catch (error) {
        console.error('Chat error:', error);
        if (bubbleEl) {
            bubbleEl.innerHTML = `<div class="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm"><i class="ph-bold ph-warning mr-2"></i>${error.message}</div>`;
        }
    }
}

function attachPostStreamingToolbar(bubbleEl, toolbarEl, text) {
    if (!bubbleEl || !toolbarEl) return;
    
    window['__chat_text_' + bubbleEl.id] = text;
    
    const hasCode = text.includes('```html') || text.includes('```css') || text.includes('```jsx') || text.includes('```javascript') || text.includes('```js') || text.includes('<!DOCTYPE');
    let sandboxHtml = '';
    
    if (hasCode) {
        // Pass the entire text to the sandbox so it can extract multiple files
        window['__sandbox_code_' + bubbleEl.id] = text;
        sandboxHtml = `<button onclick="if(typeof openSandbox==='function') openSandbox(window['__sandbox_code_${bubbleEl.id}'])" class="px-3 py-1.5 rounded-lg bg-[var(--theme-from)] hover:brightness-110 text-white font-black text-[10px] uppercase tracking-wide transition shadow flex items-center gap-1.5"><i class="ph-bold ph-play text-xs"></i> Run Sandbox</button>`;
    }
    
    toolbarEl.innerHTML = `
        ${sandboxHtml}
        <button onclick="copyTextById('${bubbleEl.id}')" class="hover:text-white transition flex items-center gap-1" title="Copy"><i class="ph-bold ph-copy"></i> Copy</button>
        <span class="text-gray-600 ml-auto text-[10px]">● ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    `;
}

function copyTextById(bubbleId) {
    const text = window['__chat_text_' + bubbleId] || '';
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied!');
        synth.playClick();
    }).catch(err => {
        console.error('Copy failed:', err);
        showToast('Failed to copy');
    });
}

function toggleMicrophoneDictation() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showToast('Speech recognition not supported in this browser.');
        return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    
    const chatInput = document.getElementById('chat-input');
    if (!chatInput) return;
    
    const micBtn = document.getElementById('mic-dictation-btn');
    if (micBtn) micBtn.classList.add('text-red-500', 'animate-pulse');
    
    let finalTranscript = chatInput.value;
    
    recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        chatInput.value = finalTranscript + interimTranscript;
    };
    
    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (micBtn) micBtn.classList.remove('text-red-500', 'animate-pulse');
    };
    
    recognition.onend = () => {
        if (micBtn) micBtn.classList.remove('text-red-500', 'animate-pulse');
        chatInput.dispatchEvent(new Event('input'));
    };
    
    recognition.start();
}

function getPersonaSystemPrompt(persona) {
    switch (persona) {
        case 'coder':
            return 'You are an expert software developer. Provide concise, clean, and well-documented code.';
        case 'consultant':
            return 'You are a professional business consultant. Provide strategic, actionable advice.';
        case 'default':
        default:
            return 'You are Advanced AI, a helpful, respectful, and honest assistant.';
    }
}

function initTheme() {
    const theme = safeStorage.get('adv_ai_theme', 'purple');
    setTheme(theme);
}

function setTheme(name) {
    const baseClasses = 'text-gray-100 flex flex-col h-screen overflow-hidden selection:bg-[var(--theme-from)]';
    document.body.className = `theme-${name} ${baseClasses}`;
    safeStorage.set('adv_ai_theme', name);
}

function setPersona(name) {
    state.currentPersona = name;
    safeStorage.set('adv_ai_persona', name);
}

function selectAndRunPrompt(promptText) {
    const decoded = decodeURIComponent(promptText);
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = decoded;
        chatInput.dispatchEvent(new Event('input'));
        chatInput.focus();
        setTimeout(sendMessage, 100);
    }
    const modal = document.getElementById('prompt-matrix-modal');
    if (modal) modal.classList.remove('active');
}

function openSettings(tabId) {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('active');
    
    const keyInput = document.getElementById('set-api-key');
    if (keyInput) keyInput.value = state.apiKey;
    
    if (tabId) switchTab(null, tabId);
}

function closeSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('active');
}

function switchTab(evt, tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => c.style.display = 'none');
    
    const targetContent = document.getElementById(tabId);
    if (targetContent) targetContent.style.display = 'block';
    
    const buttons = document.querySelectorAll('.tab-btn');
    const activeClass = 'tab-btn active px-4 py-3 text-xs font-black text-white border-b-2 border-[var(--theme-from)] transition whitespace-nowrap';
    const inactiveClass = 'tab-btn px-4 py-3 text-xs font-bold text-gray-400 border-b-2 border-transparent transition whitespace-nowrap';
    
    buttons.forEach(b => { b.className = inactiveClass; });
    
    if (evt && evt.currentTarget) {
        evt.currentTarget.className = activeClass;
    } else {
        // Programmatic call: find button whose onclick contains the tabId
        buttons.forEach(b => {
            const onclickAttr = b.getAttribute('onclick') || '';
            if (onclickAttr.includes(tabId)) {
                b.className = activeClass;
            }
        });
    }
}

function saveKeyFromSettings() {
    const keyInput = document.getElementById('set-api-key');
    if (!keyInput) return;
    const key = keyInput.value.trim();
    state.apiKey = key;
    safeStorage.set('adv_ai_key', key);
    
    const successMsg = document.getElementById('key-save-success');
    if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 3000);
    }
    
    updateApiKeyStatusBadge();
    showToast('API Key saved successfully');
    synth.playChime();
}

function updateApiKeyStatusBadge() {
    const btn = document.getElementById('header-key-btn');
    const text = document.getElementById('header-key-text');
    const icon = document.getElementById('header-key-icon');
    
    if (!btn || !text || !icon) return;
    
    if (state.apiKey && state.apiKey.length > 8) {
        btn.className = 'hidden sm:flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs font-medium cursor-pointer hover:bg-emerald-500/30 transition-colors';
        text.textContent = 'Connected';
        icon.className = 'w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]';
    } else {
        btn.className = 'flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full border border-amber-500/30 text-xs font-medium cursor-pointer hover:bg-amber-500/30 transition-colors';
        text.textContent = 'API Key Needed';
        icon.className = 'w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse';
    }
}

function updateHeaderModelBadge() {
    const badge = document.getElementById('header-active-model');
    if (badge) {
        let name = state.currentModel;
        if (typeof getModelDisplayName === 'function') {
            name = getModelDisplayName(state.currentModel);
        }
        badge.textContent = name;
    }
}

function selectModel(modelId) {
    state.currentModel = modelId;
    safeStorage.set('adv_ai_model', modelId);
    updateHeaderModelBadge();
    synth.playClick();
    
    if (typeof renderModelSelectorCards === 'function') {
        renderModelSelectorCards();
    }
    
    const selector = document.getElementById('chat-mode-selector');
    if (selector) {
        selector.value = modelId;
    }
}

function toggleArenaMode() {
    state.arenaMode = !state.arenaMode;
    const btn = document.getElementById('arena-toggle-btn');
    if (btn) {
        btn.textContent = state.arenaMode ? 'Arena Mode: ON' : 'Arena Mode: OFF';
        btn.classList.toggle('bg-purple-600', state.arenaMode);
        btn.classList.toggle('bg-white/5', !state.arenaMode);
    }
    showToast(`Arena mode ${state.arenaMode ? 'enabled' : 'disabled'}`);
}

function updateIslandStatus(text, color, expand) {
    const island = document.getElementById('dynamic-island') || document.querySelector('.dynamic-island');
    const textEl = document.getElementById('di-text');
    const dotEl = document.getElementById('di-dot');
    
    if (textEl) textEl.textContent = text;
    if (dotEl) dotEl.className = 'island-dot ' + color;
    
    if (island) {
        if (expand) island.classList.add('expanded');
        else island.classList.remove('expanded');
    }
}

function scrollToBottom() {
    const container = document.getElementById('chat-container');
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function loadSessions() {
    try {
        const stored = localStorage.getItem('adv_ai_sessions');
        if (stored) {
            state.sessions = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading sessions', e);
        state.sessions = [];
    }
}

function saveSessions() {
    try {
        localStorage.setItem('adv_ai_sessions', JSON.stringify(state.sessions));
    } catch (e) {
        console.error('Error saving sessions', e);
    }
}

function saveCurrentSessionToHistory(firstMessageText) {
    const msgContainer = document.getElementById('messages-container');
    if (!msgContainer) return;
    
    if (!state.activeSessionId) {
        const newSession = {
            id: 'sess_' + Date.now(),
            title: firstMessageText.substring(0, 30) + (firstMessageText.length > 30 ? '...' : ''),
            timestamp: Date.now(),
            pinned: false,
            messagesHtml: msgContainer.innerHTML
        };
        state.sessions.push(newSession);
        state.activeSessionId = newSession.id;
    } else {
        const session = state.sessions.find(s => s.id === state.activeSessionId);
        if (session) {
            session.messagesHtml = msgContainer.innerHTML;
            session.timestamp = Date.now();
        }
    }
    saveSessions();
    renderHistorySidebar();
}

function startNewSessionInternal() {
    state.activeSessionId = null;
    const msgContainer = document.getElementById('messages-container');
    if (msgContainer) msgContainer.innerHTML = '';
    
    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = 'flex';
}

function startNewSession() {
    startNewSessionInternal();
    synth.playClick();
    
    const sidebar = document.getElementById('history-sidebar');
    const overlay = document.getElementById('history-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function loadSession(id) {
    const session = state.sessions.find(s => s.id === id);
    if (!session) return;
    
    state.activeSessionId = id;
    
    const welcome = document.getElementById('welcome-screen');
    if (welcome) welcome.style.display = 'none';
    
    const msgContainer = document.getElementById('messages-container');
    if (msgContainer) {
        msgContainer.innerHTML = session.messagesHtml;
        
        const banner = document.createElement('div');
        banner.className = 'text-center text-xs text-gray-500 my-4';
        banner.textContent = `Loaded session: ${session.title}`;
        msgContainer.prepend(banner);
    }
    
    const sidebar = document.getElementById('history-sidebar');
    const overlay = document.getElementById('history-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    scrollToBottom();
}

function toggleHistorySidebar() {
    const sidebar = document.getElementById('history-sidebar');
    const overlay = document.getElementById('history-overlay');
    
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    } else if (sidebar) {
        sidebar.classList.add('active');
        if (overlay) overlay.classList.add('active');
    }
}

function renderHistorySidebar() {
    const list = document.getElementById('history-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    const sorted = [...state.sessions].sort((a, b) => {
        if (a.pinned === b.pinned) return b.timestamp - a.timestamp;
        return a.pinned ? -1 : 1;
    });
    
    sorted.forEach(session => {
        const div = document.createElement('div');
        div.className = 'group relative flex items-center justify-between p-3 mb-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer border border-transparent hover:border-white/10 transition-colors';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'flex-1 overflow-hidden';
        contentDiv.innerHTML = `
            <div class="text-sm font-medium text-gray-200 truncate pr-2 flex items-center gap-2">
                ${session.pinned ? '<svg class="w-3 h-3 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>' : ''}
                ${escapeHtml(session.title)}
            </div>
            <div class="text-xs text-gray-500 mt-1">${new Date(session.timestamp).toLocaleDateString()}</div>
        `;
        contentDiv.onclick = () => loadSession(session.id);
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'hidden group-hover:flex items-center gap-1 absolute right-2 bg-gray-800 rounded px-1';
        
        const pinBtn = document.createElement('button');
        pinBtn.className = 'p-1 hover:text-amber-400 text-gray-400 transition-colors';
        pinBtn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>';
        pinBtn.onclick = (e) => { e.stopPropagation(); pinSession(session.id); };
        
        const renameBtn = document.createElement('button');
        renameBtn.className = 'p-1 hover:text-blue-400 text-gray-400 transition-colors';
        renameBtn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>';
        renameBtn.onclick = (e) => { e.stopPropagation(); renameSession(session.id); };
        
        const delBtn = document.createElement('button');
        delBtn.className = 'p-1 hover:text-red-400 text-gray-400 transition-colors';
        delBtn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>';
        delBtn.onclick = (e) => { e.stopPropagation(); deleteSession(session.id); };
        
        actionsDiv.appendChild(pinBtn);
        actionsDiv.appendChild(renameBtn);
        actionsDiv.appendChild(delBtn);
        
        div.appendChild(contentDiv);
        div.appendChild(actionsDiv);
        list.appendChild(div);
    });
}

function pinSession(id) {
    const session = state.sessions.find(s => s.id === id);
    if (session) {
        session.pinned = !session.pinned;
        saveSessions();
        renderHistorySidebar();
    }
}

function renameSession(id) {
    const session = state.sessions.find(s => s.id === id);
    if (session) {
        const newName = prompt('Enter new session name:', session.title);
        if (newName && newName.trim()) {
            session.title = newName.trim();
            saveSessions();
            renderHistorySidebar();
        }
    }
}

function deleteSession(id) {
    if (confirm('Are you sure you want to delete this session?')) {
        state.sessions = state.sessions.filter(s => s.id !== id);
        if (state.activeSessionId === id) {
            startNewSessionInternal();
        }
        saveSessions();
        renderHistorySidebar();
    }
}

function setupShortcuts() {
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            const modal = document.getElementById('settings-modal');
            if (modal && modal.classList.contains('active')) {
                closeSettings();
            } else {
                openSettings('tab-core');
            }
        }
        
        if (e.key === 'Escape') {
            closeSettings();
            const promptModal = document.getElementById('prompt-matrix-modal');
            if (promptModal) promptModal.classList.remove('active');
            
            const sandboxModal = document.getElementById('sandbox-modal');
            if (sandboxModal) sandboxModal.classList.remove('active');
            
            const sidebar = document.getElementById('history-sidebar');
            const overlay = document.getElementById('history-overlay');
            if (sidebar && sidebar.classList.contains('active')) {
                toggleHistorySidebar();
            }
        }
    });
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
