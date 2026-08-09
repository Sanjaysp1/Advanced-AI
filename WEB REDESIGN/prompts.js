/* ==========================================================================
   ADVANCED AI - PROMPT VAULT & QUICK TOOLS
   20 Perfectly Designed, High-Quality English Prompts
   ========================================================================== */

const PROMPT_TEMPLATES = [
    // ═══════════════════════════════════════════════
    // WEB DEVELOPMENT & SANDBOX CODE
    // ═══════════════════════════════════════════════
    {
        title: "React Portfolio App",
        category: "Web Code",
        icon: "ph-code-block",
        prompt: "Write a fully functioning, beautiful personal portfolio web application using React and Tailwind CSS. Use clean HTML structure. Provide all runnable code in a single HTML file with React CDN and Babel included so I can run it live in the Sandbox."
    },
    {
        title: "To-Do Task Manager",
        category: "Web Code",
        icon: "ph-check-square-offset",
        prompt: "Create an interactive To-Do List application using HTML, JavaScript, and Tailwind CSS. Include features to add, delete, and mark tasks as complete. Ensure the UI is modern and responsive. Output ONLY the raw HTML code so I can test it immediately in the Sandbox."
    },
    {
        title: "Weather Dashboard UI",
        category: "Web Code",
        icon: "ph-cloud-sun",
        prompt: "Design a visually stunning Weather Dashboard UI using HTML, CSS with Tailwind, and mock JavaScript data. Include a 7-day forecast layout, current temperature display, and glassmorphism styling. Output the combined HTML file ready for live preview."
    },

    // ═══════════════════════════════════════════════
    // BUSINESS & REPORTS
    // ═══════════════════════════════════════════════
    {
        title: "PowerPoint Slide Outline",
        category: "Business",
        icon: "ph-presentation-chart",
        prompt: "Generate a highly detailed, professional PowerPoint presentation outline covering the future of Artificial Intelligence in Enterprise. Structure it with exactly 10 slides. For each slide, provide a Title, 3 bullet points, and speaker notes."
    },
    {
        title: "Executive Summary Report",
        category: "Business",
        icon: "ph-file-text",
        prompt: "Act as an Executive Consultant. Write a comprehensive Executive Summary Report on the impact of Remote Work on global productivity. Include a clear introduction, 3 key findings backed by theoretical data, and a strategic conclusion."
    },
    {
        title: "SWOT Analysis Matrix",
        category: "Business",
        icon: "ph-table",
        prompt: "Conduct a detailed SWOT Analysis for an upcoming startup. Format the response strictly as a clean, highly readable Markdown table with Strengths, Weaknesses, Opportunities, and Threats."
    },

    // ═══════════════════════════════════════════════
    // CONTENT CREATION
    // ═══════════════════════════════════════════════
    {
        title: "Viral LinkedIn Post",
        category: "Content",
        icon: "ph-linkedin-logo",
        prompt: "Write a highly engaging, professional LinkedIn post about the importance of continuous learning in the tech industry. Use a compelling hook, format with short paragraphs, include relevant emojis, and end with an interactive question."
    },
    {
        title: "YouTube Video Script",
        category: "Content",
        icon: "ph-youtube-logo",
        prompt: "Draft a 5-minute YouTube video script explaining Quantum Computing to beginners. Include an exciting intro, visual cues (b-roll suggestions), 3 main learning points, and an outro with a call to action."
    },
    {
        title: "SEO Blog Post",
        category: "Content",
        icon: "ph-article",
        prompt: "Write a 800-word SEO-optimized blog post titled 'Top 5 Productivity Hacks for 2026'. Include H1, H2, and H3 headers, a meta description, and format the content to be highly readable."
    },

    // ═══════════════════════════════════════════════
    // LEARNING & EDUCATION
    // ═══════════════════════════════════════════════
    {
        title: "Feynman Technique",
        category: "Learning",
        icon: "ph-student",
        prompt: "Explain the concept of Blockchain technology using the Feynman Technique. Break it down into simple, easy-to-understand terms as if you were teaching it to a 10-year-old. Avoid complex jargon."
    },
    {
        title: "Language Conversation Tutor",
        category: "Learning",
        icon: "ph-translate",
        prompt: "Act as a native Spanish language tutor. Start a basic conversation with me about ordering food in a restaurant. Correct any grammatical mistakes I make and explain the correction clearly."
    },
    {
        title: "Study Plan Generator",
        category: "Learning",
        icon: "ph-calendar-check",
        prompt: "Create a rigorous 4-week study plan for passing the AWS Solutions Architect Associate exam. Break down the topics week by week, and include daily study hours and review days."
    },

    // ═══════════════════════════════════════════════
    // CODING & DEVELOPMENT
    // ═══════════════════════════════════════════════
    {
        title: "Code Review Assistant",
        category: "Coding",
        icon: "ph-magnifying-glass",
        prompt: "Act as a Senior Software Engineer. I will provide a snippet of code. Please review it for security vulnerabilities, performance optimizations, and adherence to clean code principles. Suggest improvements."
    },
    {
        title: "API Documentation",
        category: "Coding",
        icon: "ph-file-code",
        prompt: "Generate comprehensive API documentation in Markdown format for a REST API user authentication endpoint (POST /api/login). Include request parameters, response schemas, and curl examples."
    },
    {
        title: "SQL Query Optimizer",
        category: "Coding",
        icon: "ph-database",
        prompt: "I need help optimizing complex SQL queries. Explain the best practices for indexing, avoiding N+1 query problems, and using execution plans to speed up database performance."
    },

    // ═══════════════════════════════════════════════
    // LIFESTYLE & PRODUCTIVITY
    // ═══════════════════════════════════════════════
    {
        title: "Weekly Meal Planner",
        category: "Lifestyle",
        icon: "ph-cooking-pot",
        prompt: "Create a 7-day healthy meal plan focused on a high-protein diet. Include breakfast, lunch, dinner, and a snack for each day. Also provide a categorized grocery shopping list for all the ingredients."
    },
    {
        title: "Home Workout Routine",
        category: "Lifestyle",
        icon: "ph-barbell",
        prompt: "Design a 45-minute home workout routine that requires zero equipment. Include a warm-up, a high-intensity interval training (HIIT) circuit, and a cool-down stretching sequence."
    },
    {
        title: "Travel Itinerary",
        category: "Lifestyle",
        icon: "ph-airplane",
        prompt: "Create a detailed 3-day travel itinerary for a weekend trip to Tokyo. Include must-see cultural sites, recommended restaurants for local cuisine, and transit instructions between locations."
    },

    // ═══════════════════════════════════════════════
    // MISCELLANEOUS
    // ═══════════════════════════════════════════════
    {
        title: "Mock Interviewer",
        category: "Miscellaneous",
        icon: "ph-users-three",
        prompt: "Act as a technical hiring manager for a Senior Frontend Developer role. Ask me one technical interview question at a time. Wait for my response, evaluate it, and then proceed to the next question."
    },
    {
        title: "Creative Story Generator",
        category: "Miscellaneous",
        icon: "ph-book-open",
        prompt: "Write a short, engaging science fiction story about a time traveler who accidentally alters a minor event in the past, leading to massive, unexpected consequences in the present day."
    }
];

// ═══════════════════════════════════════════════════════════
// PROMPT VAULT UI LOGIC
// ═══════════════════════════════════════════════════════════

function renderPromptModalContent() {
    const grid = document.getElementById('prompt-matrix-grid');
    if (!grid) return;
    
    let html = '';
    
    // Group prompts by category
    const categories = [...new Set(PROMPT_TEMPLATES.map(p => p.category))];
    
    categories.forEach(category => {
        const promptsInCategory = PROMPT_TEMPLATES.filter(p => p.category === category);
        
        html += `<div class="col-span-full mt-4 mb-2">
                    <h4 class="text-xs font-black text-gray-400 uppercase tracking-wider">${category}</h4>
                 </div>`;
                 
        promptsInCategory.forEach(prompt => {
            // Pre-encode the prompt text so we can pass it safely via onclick
            const safePromptText = encodeURIComponent(prompt.prompt);
            
            html += `
                <div class="glass-card rounded-2xl p-4 border border-white/10 hover:border-[var(--theme-from)]/50 transition cursor-pointer group"
                     onclick="selectAndRunPrompt('${safePromptText}')">
                    <div class="flex items-center gap-3 mb-2">
                        <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[var(--theme-from)]/20 transition">
                            <i class="ph-fill ${prompt.icon} text-xl text-gray-300 group-hover:text-[var(--theme-from)] transition"></i>
                        </div>
                        <h4 class="font-bold text-gray-200 group-hover:text-white transition">${prompt.title}</h4>
                    </div>
                    <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-2 group-hover:text-gray-300 transition">
                        ${prompt.prompt}
                    </p>
                </div>
            `;
        });
    });
    
    grid.innerHTML = html;
}
