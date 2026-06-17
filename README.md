README.md
# Advanced AI | Premium Neural Interface (Neural Core v3)

Welcome to the **Advanced AI Neural Interface**, an ultra-premium, feature-rich, single-page conversational application built using modern web standards. It is engineered with premium frosted glassmorphism visuals, smooth hardware-accelerated animations, and robust developer utility controls.

This project is ready to be opened instantly in **Visual Studio Code** and previewed live using any standard web hosting extension (e.g., *Live Server*).

---

## 🚀 Key Architectural Features

### 1. Multi-Persona Specialization Core
Toggle between distinct operational modes, each with tailored UI color schemes, background gradient flow, custom thinking messages, and system instructions:
*   **General Assistant:** Balanced, elegant, and professional response structures.
*   **Deep Learning Chat:** Technical net-visualization style, featuring math parsing and structural breakdown explanations.
*   **Code Generation:** Flawless programmer mode. Generates clean, robust, untruncated scripts inside standard Markdown styling.
*   **Image Studio:** Rich prompt engine. Local prompt requests automatically route via Pollinations AI open endpoints, generating scenic assets with a customized download utility.

### 2. Live Interactive Execution Sandbox
A dual-mode sandbox built inside an absolute-positioned glass container:
*   **Web Sandbox:** Runs HTML, CSS, JavaScript, and React files natively using the iframe's `srcdoc` engine with high-contrast, independent color backing to prevent dark background overlaps.
*   **Virtual Terminal Emulator:** Executes backend languages (Python, Java, C++, C, Go, Rust, Ruby, and Bash) using the EMKC Piston API v2, writing runtime outputs and compilation errors on a simulated dark-viewport console block.
*   **Sandbox Editor:** Supports standard in-app editing. Swap from Preview to Edit mode to modify, refactor, and rerun generated code instantly.

### 3. Smart Dictation & Voice Synthesis
*   **Speech-to-Text Dictation:** Hands-free voice interface featuring automatic continuous recording. Analyzes voice activity and triggers silence-based submission 2 seconds after the user stops speaking.
*   **Speech Synthesis Output:** Uses HTML5 Web Speech engines to parse a unique `<voice-summary>` tag produced by the model, reading a short overview aloud while pulsing the AI avatar in-sync.

### 4. Interactive File Upload & Document Context
*   **Context Attachment System:** Upload images or code documents up to 5MB. 
*   **Chunked Upload Simulation:** Displays smooth progress bar overlays and file metadata chips. 
*   **Inline Injector:** Text files are appended cleanly inside document boundaries in the prompt envelope, while images are serialized to Base64 data chunks for Gemini multi-modal processing.

### 5. Dynamic CSS Theme Compiler
*   **Theme Config Parser:** Models can output specialized JSON config payloads wrapped inside `<theme-config>...</theme-config>`.
*   **Fluid Transitions:** The main thread catches theme-configs to dynamically update CSS root variables, load fonts from Google Fonts APIs on-the-fly, and animate full-screen radial color transitions.

---

## 🛠️ Project Structure

The project has been kept clean, unified, and highly portable.

```text
├── index.html        # Unified SPA containing all markup, Tailwind styles, and state scripts.
└── README.md         # This documentation file.
```

---

## ⚡ Quick Start Instructions

1.  **Open in Editor:** Open this directory folder inside VS Code.
2.  **Launch Server:** Right-click `index.html` and select **Open with Live Server** (or run `npx serve .` in your terminal).
3.  **Configure API Key:**
    *   Click the **Gear Icon** in the top right header to open the *System Settings* panel.
    *   Input your **Google Gemini API Key** (from [Google AI Studio](https://aistudio.google.com/app/apikey)).
    *   Alternatively, click **Auto-Configure** to apply a default premium key configuration.
4.  **Special Modes:** Click the **Sliders Icon** in the bottom input tray to toggle advanced personas or activate the **Reasoning Chain-of-Thought Engine**.
5.  **Run Code:** When the AI generates python or web app code, hover over the code snippet box and click the cyan **Run** button to open the Live Execution Sandbox!

---

## 🔒 Security & Local Caching
All memory indexes, session records, and active styles are stored client-side inside standard `localStorage` wrapper structures (`veltrix_sessions` and `veltrix_theme`). To wipe all context memory, open *System Settings* and select the red **Wipe Context Memory** button.

---

*Advanced AI is an independent, single-page luxury interface. Ensure generated code and strategic facts are reviewed prior to production deployment.*
