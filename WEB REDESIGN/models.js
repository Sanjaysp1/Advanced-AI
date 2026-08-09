/* ==========================================================================
   ADVANCED AI - FREE MODELS REGISTRY & HUMAN-READABLE FEATURE GLOSSARY
   Strictly Curated Free OpenRouter Models (Poolside, NVIDIA Nemotron, Gemma 4, OpenAI GPT-OSS, Fish Audio)
   ========================================================================== */

const FREE_AI_MODELS = [
    {
        id: 'poolside/laguna-xs-2.1:free',
        name: 'Laguna XS 2.1 (Free)',
        provider: 'Poolside',
        badge: 'Top Code Agent',
        contextWindow: '262K context',
        desc: 'Latest coding agent model in the 33B-A3B category. Combines advanced tool calling and reasoning with a massive 262K context window and up to 32K output tokens.'
    },
    {
        id: 'nvidia/nemotron-3-ultra-550b-a55b:free',
        name: 'Nemotron 3 Ultra 550B (Free)',
        provider: 'NVIDIA',
        badge: 'Enterprise Intelligence',
        contextWindow: '32K context',
        desc: 'Massive 550B parameter MoE model tuned for complex enterprise reasoning, deep analysis, and highly structured logic tasks.'
    },
    {
        id: 'nvidia/nemotron-3-nano-30b-a3b:free',
        name: 'Nemotron 3 Nano 30B (Free)',
        provider: 'NVIDIA',
        badge: 'Compute Efficient MoE',
        contextWindow: '256K context',
        desc: 'Small language MoE model with highest compute efficiency and accuracy for developers building specialized agentic AI systems.'
    },
    {
        id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
        name: 'Nemotron 3 Nano Omni (Free)',
        provider: 'NVIDIA',
        badge: 'Multimodal Reasoning',
        contextWindow: '256K context',
        desc: '30B-A3B open multimodal model functioning as a perception and context sub-agent. Hybrid MoE Transformer-Mamba architecture with deep video & vision comprehension.'
    },
    {
        id: 'nvidia/llama-nemotron-rerank-vl-1b-v2:free',
        name: 'Llama Nemotron Rerank VL (Free)',
        provider: 'NVIDIA',
        badge: 'Vision RAG Reranker',
        contextWindow: '10K context',
        desc: '1.7B multimodal reranking cross-encoder model designed for vision RAG pipelines handling charts, tables, infographics, and mixed-media documents.'
    },
    {
        id: 'nvidia/nemotron-nano-9b-v2:free',
        name: 'Nemotron Nano 9B V2 (Free)',
        provider: 'NVIDIA',
        badge: 'Unified Reasoning Trace',
        contextWindow: '128K context',
        desc: 'Trained from scratch as a unified model for reasoning and non-reasoning tasks. Generates intermediate reasoning traces before providing definitive answers.'
    },
    {
        id: 'google/gemma-4-26b-a4b-it:free',
        name: 'Gemma 4 26B A4B (Free)',
        provider: 'Google DeepMind',
        badge: 'MoE Multimodal',
        contextWindow: '262K context',
        desc: 'Instruction-tuned MoE model activating only 3.8B parameters per token during inference for near-31B quality at low compute cost. Supports text, image, and video.'
    },
    {
        id: 'openai/gpt-oss-20b:free',
        name: 'OpenAI gpt-oss-20b (Free)',
        provider: 'OpenAI',
        badge: 'OpenAI Apache 2.0',
        contextWindow: '131K context',
        desc: 'Open-weight 21B parameter MoE model released under Apache 2.0. Optimized for low-latency inference with function calling, tool use, and structured outputs.'
    },
    {
        id: 'nvidia/nemotron-nano-12b-v2-vl:free',
        name: 'Nemotron Nano 12B 2 VL (Free)',
        provider: 'NVIDIA',
        badge: 'Video & Doc Intel',
        contextWindow: '128K context',
        desc: '12B open multimodal reasoning model for video understanding and document intelligence (OCR, charts, MathVista) using hybrid Transformer-Mamba architecture.'
    },
    {
        id: 'nvidia/llama-nemotron-embed-vl-1b-v2:free',
        name: 'Llama Nemotron Embed VL (Free)',
        provider: 'NVIDIA',
        badge: 'Multimodal Embedder',
        contextWindow: '131K context',
        desc: 'Optimized for multimodal question-answering retrieval. Embeds documents in the form of image, text, or image-text combined.'
    },
    {
        id: 'nvidia/nemotron-3-embed-1b:free',
        name: 'Nemotron 3 Embed 1B (Free)',
        provider: 'NVIDIA',
        badge: 'High-Throughput Search',
        contextWindow: '33K context',
        desc: 'Open text embedding model optimized for high-throughput, low-latency enterprise search, RAG, and agentic retrieval workflows.'
    },
    {
        id: 'google/gemma-4-31b-it:free',
        name: 'Gemma 4 31B (Free)',
        provider: 'Google DeepMind',
        badge: 'Dense Multimodal',
        contextWindow: '262K context',
        desc: '30.7B dense multimodal model with 256K context window, native function calling, configurable reasoning mode, and 140+ language support.'
    },
    {
        id: 'nvidia/nemotron-3.5-content-safety:free',
        name: 'Nemotron Content Safety (Free)',
        provider: 'NVIDIA',
        badge: 'AI Guardrail & Safety',
        contextWindow: '128K context',
        desc: 'Compact 4B multimodal guardrail model fine-tuned from Gemma-3-4B. Moderates prompts and responses, classifying safety categories with reasoning traces.'
    },
    {
        id: 'fish-audio/s2.1-pro-free:free',
        name: 'Fish Audio S2.1 Pro (Free)',
        provider: 'Fish Audio',
        badge: 'Audio Synthesis',
        contextWindow: 'Standard context',
        desc: 'No-cost variant of Fish Audio S2.1 Pro for high-quality speech synthesis testing, vocal prototyping, and interactive audio applications.'
    }
];

// Plain-English Explanations for All AI Concepts & Features
const ADVANCED_AI_EXPLANATIONS = [
    {
        title: "⚙️ What is Auto-Pilot Mode?",
        category: "AI Routing",
        summary: "The AI automatically selects the best model for your question.",
        detail: "When Auto-Pilot is enabled, Advanced AI analyzes your prompt. If you ask for code, it routes to Laguna XS. If you upload an image, it uses Nemotron Omni. This guarantees the highest quality result without you needing to change settings."
    },
    {
        title: "⚔️ What is Arena Comparison?",
        category: "AI Comparison",
        summary: "Compare two AI models simultaneously on your screen.",
        detail: "When you activate Arena Mode, your chat window splits into two columns. Whenever you send a message, two different models will answer side-by-side at the same exact time."
    },
    {
        title: "💻 What is Live Code Sandbox & Phone Mode?",
        category: "Web Development",
        summary: "Test and interact with AI-generated web applications directly inside your browser.",
        detail: "Whenever the AI generates HTML, CSS, JavaScript, or React code, a green '▶ Run in Sandbox' button will automatically appear. Clicking this opens an interactive visual preview where you can use the working application in real time!"
    },
    {
        title: "🧠 What is Context & Memory?",
        category: "Conversation Memory",
        summary: "How much of your previous discussion the AI keeps in mind.",
        detail: "As you chat, the AI reads recent messages so it understands follow-up questions. Models like Laguna XS 2.1 and Gemma 4 feature a massive 256K+ token context window."
    },
    {
        title: "🎭 What is Custom Persona?",
        category: "AI Behavior",
        summary: "Customize the tone and style in which the AI replies to you.",
        detail: "You can switch personas anytime so the AI behaves as an Expert Software Architect, an Executive Business Consultant, a Cyber Security Analyst, or an inspiring Patient Teacher."
    },
    {
        title: "🔑 Why do I need an OpenRouter API Key?",
        category: "Security & Access",
        summary: "Connects your browser directly to enterprise AI model servers for free.",
        detail: "Advanced AI operates entirely on your personal device without intermediate servers or subscription fees. By pasting your free OpenRouter API key into Settings, your browser securely talks directly to AI providers."
    }
];

// Helper to get model name by ID
function getModelDisplayName(modelId) {
    const found = FREE_AI_MODELS.find(m => m.id === modelId);
    return found ? found.name : 'Auto-Pilot Mode';
}

// Render all free models dynamically into Settings Modal
function renderModelSelectorCards() {
    const container = document.getElementById('models-selection-grid');
    if (!container) return;
    
    const activeModelId = typeof state !== 'undefined' ? state.currentModel : 'auto';
    
    container.innerHTML = FREE_AI_MODELS.map(model => {
        const isSelected = model.id === activeModelId;
        const borderStyle = isSelected ? 'border-[var(--theme-from)] ring-2 ring-[var(--theme-from)] shadow-lg bg-white/10' : 'border-white/15 hover:border-white/40 bg-black/40';
        
        return `
            <div class="glass-card p-4 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${borderStyle}" 
                 onclick="selectModel('${model.id}')">
                <div>
                    <div class="flex justify-between items-start gap-2 mb-1.5">
                        <span class="font-extrabold text-white text-sm sm:text-base leading-snug">${model.name}</span>
                        <span class="text-[10px] shrink-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">${model.badge}</span>
                    </div>
                    <div class="flex items-center gap-2 mb-2 text-[11px] font-mono text-gray-400">
                        <span class="text-amber-400 font-extrabold">● ${model.provider}</span>
                        <span>|</span>
                        <span>${model.contextWindow}</span>
                        <span>|</span>
                        <span class="text-emerald-400 font-bold">$0/M</span>
                    </div>
                    <p class="text-xs text-gray-300 font-medium leading-relaxed">${model.desc}</p>
                </div>
                <div class="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-bold">
                    <span class="${isSelected ? 'text-emerald-400 flex items-center gap-1 font-extrabold' : 'text-gray-500'}">
                        ${isSelected ? '<i class="ph-fill ph-check-circle text-sm"></i> Active Engine' : 'Click to activate engine'}
                    </span>
                    <span class="text-[10px] text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded">${model.id === 'auto' ? 'System' : model.id.split('/')[1]}</span>
                </div>
            </div>
        `;
    }).join('');
}
