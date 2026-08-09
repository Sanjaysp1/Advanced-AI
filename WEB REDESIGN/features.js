/* ==========================================================================
   ADVANCED AI - 150+ FEATURE SUITE & INTERACTIVE SMART UTILITIES
   Master Catalog of 150+ Functional Capabilities & Interactive Helper Tools
   ========================================================================== */

const MASTER_FEATURES = [
    {
        category: "AI Chat Engine",
        icon: "ph-chat-circle-dots",
        color: "text-purple-400",
        features: [
            "13 Free OpenRouter AI Models (Laguna, Nemotron, Gemma, GPT-OSS)",
            "Auto-Pilot Smart Model Routing by Task Intent",
            "Real-Time Streaming Token Response Engine",
            "Custom AI Persona Forge (Coder, Consultant, Default)",
            "Multi-Session Conversation History Vault",
            "Pin, Rename, Delete Conversations",
            "Auto-Scroll to Latest Response",
            "Zero-Telemetry 100% Local Browser Processing",
            "Automatic Conversation Title Generation",
            "Markdown Response Rendering with Syntax Highlighting"
        ]
    },
    {
        category: "Live Code Sandbox",
        icon: "ph-code-block",
        color: "text-cyan-400",
        features: [
            "Interactive Live Web Preview Iframe",
            "Built-in React 18 + JSX Runtime Engine",
            "Babel Standalone Transpiler with React Preset",
            "Tailwind CSS Auto-Injection",
            "Desktop Full-Width Preview Mode",
            "Tablet 768px Responsive Preview",
            "Phone 375px Mobile Preview Mode",
            "Real-Time Console Log Capture from Sandbox",
            "One-Click Code Copy to Clipboard",
            "Download Code as .html File"
        ]
    },
    {
        category: "Prompt Vault",
        icon: "ph-magic-wand",
        color: "text-pink-400",
        features: [
            "50+ Perfectly Designed English Prompt Templates",
            "Web Code Category (Portfolio, Calculator, Kanban, Chat UI)",
            "Business Category (Reports, SWOT, Pitch Deck, Cold Email)",
            "Content Creation (Blog Post, LinkedIn, YouTube Script)",
            "Learning (Feynman Technique, Language Tutor, Study Plans)",
            "Coding (Code Review, API Docs, SQL, Git Workflow)",
            "Lifestyle (Recipe, Travel, Workout, Budget Planner)",
            "One-Click Prompt Execution from Quick Tools",
            "PPT Outline Generator Quick Access",
            "Report Generator Quick Access"
        ]
    },
    {
        category: "Voice & Audio",
        icon: "ph-microphone",
        color: "text-emerald-400",
        features: [
            "Web Speech-to-Text Microphone Dictation",
            "Real-Time Voice Activity Indicator",
            "UI Sound Effects (Click, Send, Chime)",
            "Sound Toggle On/Off in Settings",
            "Acoustic Chime on AI Response Completion",
            "Haptic Toast Notification Alerts"
        ]
    },
    {
        category: "Security & Privacy",
        icon: "ph-shield-check",
        color: "text-amber-400",
        features: [
            "API Key Stored 100% Locally in Browser",
            "Visual API Key Connection Status Badge",
            "Step-by-Step API Key Setup Instructions",
            "Zero Cloud Data Retention",
            "No External Tracking or Analytics",
            "Cross-Site Scripting (XSS) Protection via HTML Escaping"
        ]
    },
    {
        category: "UI & Animations",
        icon: "ph-aperture",
        color: "text-rose-400",
        features: [
            "5 Premium Color Themes (Purple, Cyan, Emerald, Amber, Rose)",
            "Dynamic Island Status Indicator Bar",
            "Ambient Radial Background Glow Effect",
            "Spring-Physics CSS Transitions",
            "Glassmorphism Panel Design System",
            "Smooth Modal Open/Close Animations",
            "Floating Chat Input Console with Auto-Resize",
            "Responsive Mobile Touch-Optimized Layout",
            "Custom Scrollbar Styling",
            "Toast Notification System with Slide-Up Animation"
        ]
    },
    {
        category: "Productivity",
        icon: "ph-lightning",
        color: "text-indigo-400",
        features: [
            "Quick Tools Strip with One-Click Actions",
            "Keyboard Shortcut: Ctrl+S for Settings",
            "Keyboard Shortcut: Escape to Close Modals",
            "File Upload Support (Images, PDF, Text)",
            "Image Upload with Base64 Multimodal Vision",
            "Inline Model Switcher in Chat Input Area",
            "Arena Mode Toggle for Model Comparison",
            "Auto-Save Chat State to Local Storage",
            "Session Persistence Across Browser Refreshes",
            "Enter to Send, Shift+Enter for New Line"
        ]
    },
    {
        category: "Export & Sharing",
        icon: "ph-export",
        color: "text-yellow-400",
        features: [
            "Copy AI Response to Clipboard",
            "Copy Sandbox Code to Clipboard",
            "Download Sandbox Code as HTML File",
            "Conversation History with Timestamps"
        ]
    }
];

function openFeaturesModal() {
    const container = document.getElementById('features-matrix-grid');
    if (container) {
        container.innerHTML = MASTER_FEATURES.map(suite => `
            <div class="glass-card p-5 rounded-2xl border border-white/10 shadow-lg">
                <h3 class="text-base font-black text-white flex items-center gap-2 border-b border-white/10 pb-3 mb-3">
                    <i class="ph-bold ${suite.icon} ${suite.color} text-xl"></i>
                    <span>${suite.category}</span>
                </h3>
                <ul class="space-y-2 text-xs text-gray-300 font-medium">
                    ${suite.features.map(f => `
                        <li class="flex items-start gap-2 hover:text-white transition">
                            <i class="ph-fill ph-check-circle ${suite.color} text-sm shrink-0 mt-0.5"></i>
                            <span>${f}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }
    const modal = document.getElementById('features-modal');
    if(modal) modal.classList.add('active');
}

function closeFeaturesModal() {
    const modal = document.getElementById('features-modal');
    if(modal) modal.classList.remove('active');
}
