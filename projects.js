/* =========================================
   PROJECT DATA
   ========================================= */
const projectsData = [
    {
        slug: "be-fit",
        title: "BE.FIT",
        description: "BE.FIT — A curated collection of playlists designed to support your wellness journey—featuring meditation, yoga, workouts, sleep music, healthy recipes, and more.",
        url: "https://aditya-web-devloper.github.io/BE.FIT/",
        tech: ["HTML", "CSS", "JS"],
        category: "Web Apps",
        thumb: "assets/projects/BE.FIT.jpg"
    },
    {
        slug: "sudoku-zen",
        title: "Sudoku Zen 🧘",
        description: "Sudoku Zen is a minimalist, distraction-free Sudoku web application designed for relaxation and mental sharpness. Built with a focus on clean UI and smooth interactions.",
        url: "http://aditya-web-devloper.github.io/SUDOKU/",
        tech: ["JS", "HTML", "CSS"],
        category: "Games",
        thumb: "assets/projects/Sudoku-Zen.jpg"
    },
    {
        slug: "qr-code-generator",
        title: "QR-Code-Generator",
        description: "This QR Code Generator project allows users to create customized QR codes easily. Includes HTML, CSS, JavaScript to generate, display, and download QR codes for URLs and text.",
        url: "https://aditya-web-devloper.github.io/QR-Code-Hub/",
        tech: ["HTML", "JS"],
        category: "Tools",
        thumb: "assets/projects/QR-Code-Generator.jpg"
    },
    {
        slug: "flappy-boy",
        title: "FLAPPY-BOY",
        description: "Test your patience with Emoji Flappy BOY (Hard Mode). Featuring tighter gaps and faster gravity than the original.",
        url: "https://aditya-web-devloper.github.io/FLAPPY-BOY/",
        tech: ["JS", "Canvas"],
        category: "Games",
        thumb: "assets/projects/FLAPPY-BOY.jpg"
    },
    {
        slug: "word-puzzles-ultimate",
        title: "Word-Puzzles-Ultimate",
        description: "A fully responsive, browser-based word puzzle game featuring 65+ levels of Anagrams and procedurally generated Word Searches. Built with Vanilla JavaScript.",
        url: "https://aditya-web-devloper.github.io/Word-Puzzles-Ultimate/",
        tech: ["JS", "Tailwind", "Tone.js"],
        category: "Games",
        thumb: "assets/projects/Word-Puzzles-Ultimate.jpg"
    },
    {
        slug: "studentbazaar",
        title: "STUDENTBAZAAR",
        description: "StudentBazaar is a simple and student-friendly platform where learners can buy, sell, or exchange essential study items—calculators, books, lab equipment, and more.",
        url: "https://aditya-web-devloper.github.io/STUDENTBAZAAR/",
        tech: ["HTML", "CSS", "JS"],
        category: "Web Apps",
        thumb: "assets/projects/STUDENTBAZAAR.jpg"
    },
    {
        slug: "password-strength-analyzer",
        title: "Password-Strength-Analyzer",
        description: "A single-page web tool that checks how strong your password is using entropy metrics. Provides visual feedback and strength categorization.",
        url: "https://aditya-web-devloper.github.io/Password-Strength-Analyzer/",
        tech: ["HTML", "JS"],
        category: "Tools",
        thumb: "assets/projects/Password-Strength-Analyzer.jpg"
    }
];

/* =========================================
   DOM ELEMENTS
   ========================================= */
const listEl = document.getElementById("projects-list");
const searchInput = document.getElementById("project-search");
const filterChips = document.querySelectorAll(".filter-chip");

const spotlight = {
    image: document.getElementById("spotlight-image"),
    title: document.getElementById("spotlight-title"),
    description: document.getElementById("spotlight-description"),
    tech: document.getElementById("spotlight-tech"),
    visit: document.getElementById("spotlight-visit"),
    copyBtn: document.getElementById("spotlight-copy")
};

const printModal = document.getElementById("print-modal");
const printContent = document.getElementById("print-content");

/* =========================================
   STATE MANAGEMENT
   ========================================= */
let currentFilter = sessionStorage.getItem('projectFilter') || "All";
let currentSearch = sessionStorage.getItem('projectSearch') || "";

/* =========================================
   FUNCTIONS
   ========================================= */

function init() {
    // Restore state
    searchInput.value = currentSearch;
    updateActiveChip(currentFilter);
    
    // Initial Render
    filterAndRender();
}

function updateActiveChip(category) {
    filterChips.forEach(chip => {
        if (chip.dataset.filter === category) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });
}

function renderCards(projects) {
    listEl.innerHTML = "";
    
    if (projects.length === 0) {
        listEl.innerHTML = `<p style="color:#888; text-align:center;">No projects found matching criteria.</p>`;
        return;
    }

    projects.forEach(p => {
        const card = document.createElement("article");
        card.className = "project-card fade-in";
        card.tabIndex = 0; // Accessible focus
        card.dataset.slug = p.slug;

        // Fallback image handling could go here (onerror)
        card.innerHTML = `
            <img class="project-thumb" src="${p.thumb}" alt="${p.title} screenshot" onerror="this.src='assets/projects/placeholder.jpg'">
            <div class="project-content">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-meta">
                    <div class="tags">
                        ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        // Interactions
        const updateView = () => updateSpotlight(p);
        card.addEventListener("mouseenter", updateView);
        card.addEventListener("focus", updateView);
        
        // Enter key to "visit" logic or focus spotlight? 
        // Let's make Enter update spotlight and focus visit button for accessibility
        card.addEventListener("keydown", (e) => {
            if(e.key === 'Enter') {
                updateView();
                spotlight.visit.focus();
            }
        });

        listEl.appendChild(card);
    });

    // Default spotlight to first result
    if (projects.length > 0) {
        updateSpotlight(projects[0]);
    }
}

function updateSpotlight(p) {
    spotlight.image.src = p.thumb;
    spotlight.image.onerror = () => spotlight.image.src = 'assets/projects/placeholder.jpg';
    spotlight.image.alt = p.title + " preview";
    spotlight.title.textContent = p.title;
    spotlight.description.textContent = p.description;
    
    spotlight.tech.innerHTML = p.tech.map(t => `<span class="tag">${t}</span>`).join('');
    
    spotlight.visit.href = p.url;
    
    // Visit Analytics Stub
    spotlight.visit.onclick = () => {
        console.log(`[Analytics] Project visited: ${p.title}`);
    };

    // Copy Stub
    spotlight.copyBtn.onclick = () => {
        navigator.clipboard.writeText(p.url).then(() => {
            const original = spotlight.copyBtn.innerText;
            spotlight.copyBtn.innerText = "Copied!";
            setTimeout(() => spotlight.copyBtn.innerText = original, 2000);
        });
    };
}

function filterAndRender() {
    const term = currentSearch.toLowerCase();
    
    const filtered = projectsData.filter(p => {
        const matchesCategory = currentFilter === "All" || p.category === currentFilter;
        const matchesSearch = p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
    });

    renderCards(filtered);
}

/* =========================================
   EVENT LISTENERS
   ========================================= */

// Search
searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    sessionStorage.setItem('projectSearch', currentSearch);
    filterAndRender();
});

// Filters
filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
        currentFilter = chip.dataset.filter;
        sessionStorage.setItem('projectFilter', currentFilter);
        updateActiveChip(currentFilter);
        filterAndRender();
    });
});

// Print Modal Logic
const printBtn = document.getElementById("print-summary");
const closePrint = document.getElementById("close-print");
const printPageBtn = document.getElementById("print-page");

printBtn.addEventListener("click", () => {
    // Generate simple list
    const visibleProjects = Array.from(listEl.children)
        .map(card => {
            const slug = card.dataset.slug;
            return projectsData.find(p => p.slug === slug);
        })
        .filter(p => p !== undefined);

    let html = `<h2>Project Summary</h2><ul>`;
    visibleProjects.forEach(p => {
        html += `
            <li>
                <strong>${p.title}</strong> (${p.category})<br>
                ${p.url}<br>
                <small>${p.description}</small>
            </li>
        `;
    });
    html += `</ul>`;
    
    printContent.innerHTML = html;
    printModal.style.display = 'flex';
    printModal.setAttribute('aria-hidden', 'false');
});

const closeModal = () => {
    printModal.style.display = 'none';
    printModal.setAttribute('aria-hidden', 'true');
};

closePrint.addEventListener("click", closeModal);
printPageBtn.addEventListener("click", () => window.print());

// Close modal on outside click
window.onclick = (event) => {
    if (event.target == printModal) closeModal();
};

// Start
document.addEventListener('DOMContentLoaded', init);