<div align="center">

# ✦ Advanced AI Interface

**A zero-build, Apple-grade AI chat studio powered by 14 free OpenRouter models.**  
Live code sandbox · Multi-session history · Arena comparison · Voice dictation · Prompt vault

[![License: MIT](https://img.shields.io/badge/License-MIT-blueviolet.svg)](https://opensource.org/licenses/MIT)
[![No Build Required](https://img.shields.io/badge/Build-None%20Required-brightgreen.svg)](#)
[![OpenRouter](https://img.shields.io/badge/Powered%20By-OpenRouter-orange.svg)](https://openrouter.ai)
[![Zero Telemetry](https://img.shields.io/badge/Telemetry-Zero-blue.svg)](#)

</div>

---

## What Is This?

Advanced AI Interface is a fully client-side AI chat application that runs directly in your browser — no server, no build step, no subscription. Paste a free [OpenRouter](https://openrouter.ai) API key and you get instant access to 14 state-of-the-art models including NVIDIA Nemotron, Google Gemma 4, Poolside Laguna XS, and OpenAI's open-weight GPT model.

The standout feature is the **Multi-File Sandbox IDE**: when the AI generates HTML, CSS, JavaScript, or React code, a single click opens a live interactive preview — with a virtual file explorer, code editor, real-time console, and desktop / tablet / phone viewport modes.

---

## Features at a Glance

### 🤖 AI Chat Engine
- **14 free OpenRouter models** — NVIDIA Nemotron Ultra/Nano, Gemma 4 26B/31B, Laguna XS 2.1, GPT-OSS 20B, Fish Audio S2.1 Pro, and more
- **Auto-Pilot Smart Routing** — detects prompt intent (code, vision, analysis) and selects the best model automatically
- **Real-time streaming** — token-by-token response with live markdown and syntax-highlighted code rendering
- **Arena Mode** — split-screen comparison of two models responding to the same prompt simultaneously
- **AI Personas** — swap between Expert Coder, Business Consultant, or Default mode

### 🖥️ Live Code Sandbox IDE
- Parses multi-file AI output (HTML, CSS, JS, JSX) into a **virtual file system**
- **React 18 + Babel Standalone** auto-injected — React components run without any setup
- **Tailwind CSS auto-injection** for AI-generated UIs
- **Desktop / Tablet (768px) / Phone (375px)** viewport previews
- Real-time **console log capture** from inside the sandbox iframe
- **Download as ZIP** — exports the entire virtual project with one click

### 📁 Multi-Session History
- Persistent sessions saved to `localStorage` — survive browser refreshes
- **Pin, rename, and delete** sessions from a slide-out sidebar
- Auto-generates a title from the first message

### 🪄 Prompt Vault
- 20 expertly engineered templates across six categories: Web Code, Business, Content, Learning, Coding, and Lifestyle
- One-click execution directly into the chat input

### 🎤 Voice & Audio
- **Web Speech API** microphone dictation
- Spatial audio feedback — distinct sounds for click, send, and AI response completion
- Togglable from settings

### 🔒 Privacy First
- API key stored **100% locally** in the browser — never transmitted to any third-party server
- Zero telemetry, zero analytics, zero cloud data retention
- XSS protection via HTML escaping on all user and AI content

### 🎨 UI & Polish
- **5 color themes** — Purple, Cyan, Emerald, Amber, Rose
- Glassmorphism panel design system with spring-physics CSS transitions
- **Dynamic Island** status indicator (Ready / Thinking / Streaming)
- Ambient radial background glow that follows the active theme
- Fully responsive — touch-optimized mobile layout
- Toast notification system with slide-up animation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Core | HTML5, CSS3, Vanilla JavaScript (zero build) |
| Styling | Tailwind CSS via CDN |
| Icons | Phosphor Icons |
| Markdown Rendering | Marked.js |
| React in Sandbox | React 18 UMD + Babel Standalone |
| Project Export | JSZip (client-side) |
| AI Provider | OpenRouter API (free tier) |

---

## Getting Started

**1. Clone or download the repository**
```bash
git clone https://github.com/your-username/advanced-ai-interface.git
cd advanced-ai-interface
```

**2. Open `index.html` in any modern browser**

No `npm install`, no bundler, no server required. Chrome, Edge, Firefox, and Safari all work.

**3. Get a free OpenRouter API key**

Sign up at [openrouter.ai](https://openrouter.ai) — the free tier covers all 14 models in this project.

**4. Paste your key into Settings**

Click the ⚙️ gear icon (or press `Ctrl+S`), navigate to the Core tab, and paste your key. The connection badge turns green immediately.

**5. Start building**

Pick a model, choose a prompt from the Vault, or just start typing. When the AI returns code, hit **▶ Run in Sandbox** to see it live.

---

## Project Structure

```
advanced-ai-interface/
├── index.html       — Full application shell & all modal markup
├── app.js           — Core state, streaming engine, session management, audio synth
├── sandbox.js       — Virtual file system, multi-file parser, sandbox runtime & export
├── models.js        — Free model registry & settings UI renderer
├── prompts.js       — Prompt Vault templates & modal UI
├── features.js      — Feature catalog data & features modal
├── styles.css       — Theme variables, glassmorphism, animations, component styles
└── README.md
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Enter` | Send message |
| `Shift + Enter` | New line in input |
| `Ctrl / ⌘ + S` | Open / close Settings |
| `Escape` | Close any open modal or sidebar |

---

## Available Models (Free Tier)

| Model | Provider | Context | Specialty |
|---|---|---|---|
| Laguna XS 2.1 | Poolside | 262K | Top code agent |
| Nemotron 3 Ultra 550B | NVIDIA | 32K | Enterprise reasoning |
| Nemotron 3 Nano 30B | NVIDIA | 256K | Efficient MoE |
| Nemotron 3 Nano Omni 30B | NVIDIA | 256K | Multimodal reasoning |
| Nemotron Nano 9B V2 | NVIDIA | 128K | Unified reasoning trace |
| Nemotron Nano 12B VL | NVIDIA | 128K | Video & doc intelligence |
| Llama Nemotron Rerank VL | NVIDIA | 10K | Vision RAG reranker |
| Llama Nemotron Embed VL | NVIDIA | 131K | Multimodal embedder |
| Nemotron 3 Embed 1B | NVIDIA | 33K | High-throughput search |
| Nemotron Content Safety | NVIDIA | 128K | AI guardrail |
| Gemma 4 26B A4B | Google DeepMind | 262K | MoE multimodal |
| Gemma 4 31B | Google DeepMind | 262K | Dense multimodal |
| GPT-OSS 20B | OpenAI | 131K | Open-weight, Apache 2.0 |
| Fish Audio S2.1 Pro | Fish Audio | Standard | Speech synthesis |

---

## License

MIT — free to use, modify, and distribute.

---

<div align="center">
Built with ❤️ by Sanjay &nbsp;·&nbsp; Powered by <a href="https://openrouter.ai">OpenRouter</a>
</div>
