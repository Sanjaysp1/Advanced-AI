window.VirtualFS = {};
window.activeSandboxFile = '';
let activeViewportMode = 'desktop';

// ═══════════════════════════════════════════════════════════
// INITIALIZATION & PARSING
// ═══════════════════════════════════════════════════════════

function openSandbox(rawCode) {
    parseMultiFileCode(rawCode);
    
    const modal = document.getElementById('sandbox-modal');
    if (modal) modal.classList.add('active');
    
    const consoleOutput = document.getElementById('sandbox-console-output');
    if (consoleOutput) consoleOutput.innerHTML = '';
    
    renderFileExplorer();
    
    // Select the first file, or index.html if it exists
    const fileNames = Object.keys(window.VirtualFS);
    if (fileNames.length > 0) {
        const defaultFile = fileNames.includes('index.html') ? 'index.html' : fileNames[0];
        setActiveFile(defaultFile);
    }
    
    switchSandboxViewport('desktop');
    switchSandboxTab('preview');
    runSandboxCode();
}

function closeSandbox() {
    const modal = document.getElementById('sandbox-modal');
    if (modal) modal.classList.remove('active');
    
    const iframe = document.getElementById('sandbox-preview-iframe');
    if (iframe) iframe.srcdoc = '';
}

function parseMultiFileCode(text) {
    window.VirtualFS = {};
    
    // Regex to match markdown file markers like:
    // ### index.html
    // ```html
    // <code>
    // ```
    const fileRegex = /(?:###|\*\*|File:?)\s*([a-zA-Z0-9_\-\.]+)\s*(?:\*\*|)\s*\n*```[a-z]*\n([\s\S]*?)```/gi;
    
    let match;
    let foundFiles = false;
    
    while ((match = fileRegex.exec(text)) !== null) {
        const fileName = match[1].trim();
        const code = match[2].trim();
        window.VirtualFS[fileName] = code;
        foundFiles = true;
    }
    
    // Fallback if no specific multi-file markers were found, just extract the first code block
    if (!foundFiles) {
        const codeMatch = text.match(/```(?:html|jsx|javascript|js|css)[\s\n]([\s\S]*?)```/i);
        if (codeMatch) {
            window.VirtualFS['index.html'] = codeMatch[1].trim();
        } else {
            window.VirtualFS['index.html'] = text.trim();
        }
    }
}

// ═══════════════════════════════════════════════════════════
// FILE EXPLORER UI
// ═══════════════════════════════════════════════════════════

function renderFileExplorer() {
    const fileList = document.getElementById('sandbox-file-list');
    if (!fileList) return;
    
    let html = '';
    const files = Object.keys(window.VirtualFS).sort((a, b) => {
        if (a === 'index.html') return -1;
        if (b === 'index.html') return 1;
        return a.localeCompare(b);
    });
    
    files.forEach(fileName => {
        const isActive = fileName === window.activeSandboxFile;
        const icon = fileName.endsWith('.js') || fileName.endsWith('.jsx') ? 'ph-file-js text-yellow-400' :
                     fileName.endsWith('.css') ? 'ph-file-css text-blue-400' :
                     fileName.endsWith('.json') ? 'ph-file-json text-green-400' :
                     'ph-file-html text-orange-400';
                     
        const bgClass = isActive ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200';
        
        html += `
            <div onclick="setActiveFile('${fileName}')" class="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${bgClass} group">
                <i class="ph-fill ${icon}"></i>
                <span class="text-xs font-bold truncate flex-1">${fileName}</span>
            </div>
        `;
    });
    
    fileList.innerHTML = html;
}

function setActiveFile(fileName) {
    if (!window.VirtualFS.hasOwnProperty(fileName)) return;
    
    window.activeSandboxFile = fileName;
    renderFileExplorer();
    
    const editor = document.getElementById('sandbox-code-editor');
    const label = document.getElementById('active-file-name');
    const deleteBtn = document.getElementById('delete-file-btn');
    
    if (editor) {
        editor.value = window.VirtualFS[fileName];
    }
    
    if (label) {
        const icon = fileName.endsWith('.js') || fileName.endsWith('.jsx') ? 'ph-file-js text-yellow-400' :
                     fileName.endsWith('.css') ? 'ph-file-css text-blue-400' :
                     'ph-file-code text-[var(--theme-from)]';
        label.innerHTML = `<i class="ph-fill ${icon} mr-1"></i> <span>${fileName}</span>`;
    }
    
    if (deleteBtn) {
        if (fileName === 'index.html') {
            deleteBtn.style.display = 'none';
        } else {
            deleteBtn.style.display = 'block';
        }
    }
}

function updateFileContent(newCode) {
    if (window.activeSandboxFile) {
        window.VirtualFS[window.activeSandboxFile] = newCode;
    }
}

function createNewFile() {
    const fileName = prompt("Enter file name (e.g., styles.css, app.js):");
    if (fileName && fileName.trim() !== '') {
        const cleanName = fileName.trim();
        if (!window.VirtualFS[cleanName]) {
            window.VirtualFS[cleanName] = '';
            setActiveFile(cleanName);
            if (typeof showToast === 'function') showToast(`Created ${cleanName}`);
        } else {
            if (typeof showToast === 'function') showToast('File already exists!', 'error');
        }
    }
}

function deleteCurrentFile() {
    if (window.activeSandboxFile === 'index.html') {
        if (typeof showToast === 'function') showToast('Cannot delete index.html', 'error');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${window.activeSandboxFile}?`)) {
        delete window.VirtualFS[window.activeSandboxFile];
        setActiveFile('index.html');
        if (typeof showToast === 'function') showToast('File deleted');
    }
}

// ═══════════════════════════════════════════════════════════
// SANDBOX RUNTIME
// ═══════════════════════════════════════════════════════════

function runSandboxCode() {
    const iframe = document.getElementById('sandbox-preview-iframe');
    if (!iframe) return;
    
    let htmlContent = window.VirtualFS['index.html'] || '';
    
    // Basic wrapper injection if it's just a raw react component or missing basic HTML structure
    if (!htmlContent.toLowerCase().includes('<!doctype') && !htmlContent.toLowerCase().includes('<html')) {
        let injectedCss = '';
        let injectedJs = '';
        
        // Grab all CSS files
        Object.keys(window.VirtualFS).forEach(f => {
            if (f.endsWith('.css')) injectedCss += `\n/* --- ${f} --- */\n${window.VirtualFS[f]}\n`;
        });
        
        // Grab all JS files
        Object.keys(window.VirtualFS).forEach(f => {
            if ((f.endsWith('.js') || f.endsWith('.jsx')) && f !== 'index.html') {
                injectedJs += `\n/* --- ${f} --- */\n${window.VirtualFS[f]}\n`;
            }
        });
        
        // Fallback for purely plain code snippets
        if (htmlContent && !injectedJs) {
            injectedJs = htmlContent;
            htmlContent = '';
        }
        
        htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sandbox Preview</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { margin: 0; font-family: 'Inter', sans-serif; background-color: #030305; color: white; min-height: 100vh; }
        ${injectedCss}
    </style>
    <script>
        (function() {
            const originalLog = console.log;
            const originalWarn = console.warn;
            const originalError = console.error;
            
            console.log = function(...args) {
                window.parent.postMessage({ type: 'SANDBOX_LOG', level: 'log', message: args.join(' ') }, '*');
                originalLog.apply(console, args);
            };
            console.warn = function(...args) {
                window.parent.postMessage({ type: 'SANDBOX_LOG', level: 'warn', message: args.join(' ') }, '*');
                originalWarn.apply(console, args);
            };
            console.error = function(...args) {
                window.parent.postMessage({ type: 'SANDBOX_LOG', level: 'error', message: args.join(' ') }, '*');
                originalError.apply(console, args);
            };
            window.addEventListener('error', function(e) {
                window.parent.postMessage({ type: 'SANDBOX_LOG', level: 'error', message: e.message }, '*');
            });
        })();
    </script>
</head>
<body>
    <div id="root">${htmlContent}</div>
    <script type="text/babel" data-presets="react">
${injectedJs}

if (typeof App !== 'undefined') {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
} else if (typeof Portfolio !== 'undefined') {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Portfolio />);
}
    </script>
</body>
</html>`;
    } else {
        // If it's a full HTML document, we still need to inject CSS and JS if they exist
        let injectedCss = '';
        let injectedJs = '';
        
        Object.keys(window.VirtualFS).forEach(f => {
            if (f.endsWith('.css')) injectedCss += `\n/* --- ${f} --- */\n${window.VirtualFS[f]}\n`;
            if ((f.endsWith('.js') || f.endsWith('.jsx')) && f !== 'index.html') injectedJs += `\n/* --- ${f} --- */\n${window.VirtualFS[f]}\n`;
        });
        
        // Robust injection
        if (injectedCss) {
            if (htmlContent.includes('</head>')) {
                htmlContent = htmlContent.replace('</head>', `<style>${injectedCss}</style></head>`);
            } else if (htmlContent.includes('<body>')) {
                htmlContent = htmlContent.replace('<body>', `<style>${injectedCss}</style><body>`);
            } else {
                htmlContent = `<style>${injectedCss}</style>` + htmlContent;
            }
        }
        if (injectedJs) {
            if (htmlContent.includes('</body>')) {
                htmlContent = htmlContent.replace('</body>', `<script type="text/babel" data-presets="react">${injectedJs}</script></body>`);
            } else {
                htmlContent += `<script type="text/babel" data-presets="react">${injectedJs}</script>`;
            }
        }
        
        // Add log interceptor
        const logScript = `<script>
        (function() {
            const originalLog = console.log;
            const originalError = console.error;
            console.log = function(...args) {
                window.parent.postMessage({ type: 'SANDBOX_LOG', level: 'log', message: args.join(' ') }, '*');
                originalLog.apply(console, args);
            };
            console.error = function(...args) {
                window.parent.postMessage({ type: 'SANDBOX_LOG', level: 'error', message: args.join(' ') }, '*');
                originalError.apply(console, args);
            };
        })();
        </script>`;
        htmlContent = htmlContent.replace('<head>', '<head>' + logScript);
    }
    
    iframe.srcdoc = htmlContent;
}

window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SANDBOX_LOG') {
        const consoleOutput = document.getElementById('sandbox-console-output');
        if (consoleOutput) {
            const line = document.createElement('div');
            line.className = 'font-mono text-sm py-1 border-b border-white/5';
            line.style.color = event.data.level === 'error' ? '#ef4444' : event.data.level === 'warn' ? '#f59e0b' : '#e5e7eb';
            line.textContent = `[${event.data.level}] ${event.data.message}`;
            consoleOutput.appendChild(line);
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
    }
});

// ═══════════════════════════════════════════════════════════
// UI & EXPORT
// ═══════════════════════════════════════════════════════════

function switchSandboxViewport(mode) {
    activeViewportMode = mode;
    const container = document.getElementById('sandbox-viewport-container');
    if (container) {
        container.className = 'w-full h-full flex items-center justify-center';
        container.classList.add(`sandbox-viewport-${mode}`);
    }
    
    const activeBtn = 'px-3 py-1.5 rounded-lg text-[11px] font-bold text-white bg-[var(--theme-from)]/30 border border-[var(--theme-from)]';
    const inactiveBtn = 'px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-300 hover:text-white transition';
    
    ['desktop', 'tablet', 'phone'].forEach(m => {
        const btn = document.getElementById(`btn-view-${m}`);
        if (btn) btn.className = (m === mode) ? activeBtn : inactiveBtn;
    });
}

function switchSandboxTab(tabName) {
    ['preview', 'code', 'console'].forEach(tab => {
        const wrapper = document.getElementById(`sandbox-${tab}-wrapper`);
        const btn = document.getElementById(`tab-sb-${tab}`);
        if (wrapper) {
            if (tab === tabName) {
                if (tab === 'preview' || tab === 'console' || tab === 'code') {
                    wrapper.style.display = 'flex';
                }
            } else {
                wrapper.style.display = 'none';
            }
        }
        if (btn) {
            if (tab === tabName) {
                btn.className = 'px-4 py-2.5 text-xs font-black text-cyan-400 border-b-2 border-cyan-400 flex items-center gap-1';
            } else {
                btn.className = 'px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white transition border-b-2 border-transparent flex items-center gap-1';
            }
        }
    });
}

function copySandboxCode() {
    if (window.activeSandboxFile && window.VirtualFS[window.activeSandboxFile]) {
        navigator.clipboard.writeText(window.VirtualFS[window.activeSandboxFile]).then(() => {
            if (typeof showToast === 'function') {
                showToast(`${window.activeSandboxFile} copied to clipboard`);
            }
        });
    }
}

async function downloadSandboxZip() {
    if (typeof JSZip === 'undefined') {
        if (typeof showToast === 'function') showToast('JSZip library not loaded.', 'error');
        return;
    }
    
    if (typeof showToast === 'function') showToast('Generating ZIP...', 'info');
    
    const zip = new JSZip();
    Object.keys(window.VirtualFS).forEach(fileName => {
        zip.file(fileName, window.VirtualFS[fileName]);
    });
    
    try {
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'advanced-ai-project.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        if (typeof showToast === 'function') showToast('Project downloaded successfully!');
    } catch (e) {
        console.error('ZIP Error:', e);
        if (typeof showToast === 'function') showToast('Failed to create ZIP', 'error');
    }
}
