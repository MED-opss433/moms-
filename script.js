document.addEventListener('DOMContentLoaded', function () {
    // === DAILY BIBLE VERSES & PRAYERS ===
    const dailyContent = [
        {
            verse: "\"He sent his word and healed them, and delivered them from their destructions.\"",
            reference: "Psalm 107:20",
            prayer: "Heavenly Father, thank You for Your healing word. I claim Your promise of wholeness for Mom’s body today. Renew her strength and guide her steps in health. In Jesus’ name, Amen."
        },
        {
            verse: "\"The Lord will sustain him on his sickbed and restore him from his bed of illness.\"",
            reference: "Psalm 41:3",
            prayer: "Lord, sustain Mom through every moment. Restore her energy, balance her blood sugar, and fill her with peace. Let Your healing presence be her constant companion. Amen."
        },
        {
            verse: "\"By His wounds we are healed.\"",
            reference: "Isaiah 53:5",
            prayer: "Jesus, by Your stripes, Mom is healed. I declare health over her body, clarity over her choices, and joy in her journey. Thank You for walking with her. Amen."
        },
        {
            verse: "\"I will restore you to health and heal your wounds, declares the Lord.\"",
            reference: "Jeremiah 30:17",
            prayer: "Father, You promise restoration! Heal Mom’s body, mind, and spirit. Give her wisdom to manage her diabetes and faith to trust You daily. Amen."
        },
        {
            verse: "\"The Lord is my strength and my shield; my heart trusts in Him, and I am helped.\"",
            reference: "Psalm 28:7",
            prayer: "Lord, be Mom’s strength when she feels weak, her shield against complications, and her help in every decision. Thank You for never leaving her. Amen."
        },
        {
            verse: "\"He restores my soul.\"",
            reference: "Psalm 23:3",
            prayer: "Good Shepherd, restore Mom’s soul and body. Lead her in paths of wellness, calm her worries, and let Your goodness follow her all her days. Amen."
        },
        {
            verse: "\"Do not fear, for I am with you; do not be dismayed, for I am your God.\"",
            reference: "Isaiah 41:10",
            prayer: "God, remind Mom she is not alone. When numbers worry her, remind her of Your presence. Fill her with courage, peace, and unwavering trust. Amen."
        }
    ];

    // Get today's index based on day of year (so it rotates predictably)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const contentIndex = dayOfYear % dailyContent.length;

    const { verse, reference, prayer } = dailyContent[contentIndex];

    const bibleSection = document.getElementById('daily-bible-section');
    bibleSection.innerHTML = `
        <p>${verse} — <strong>${reference}</strong></p>
        <p class="daily-prayer">${prayer}</p>
    `;

    // === BLOOD SUGAR TRACKER ===
    const addEntryBtn = document.getElementById('add-entry');
    const bloodSugarInput = document.getElementById('blood-sugar-input');
    const entriesContainer = document.getElementById('entries-container');

    // Add today's date to header
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.createElement('div');
    dateElement.style.marginTop = '10px';
    dateElement.style.fontSize = '0.9rem';
    dateElement.style.opacity = '0.9';
    dateElement.textContent = `Today: ${now.toLocaleDateString('en-US', options)}`;
    document.querySelector('header').appendChild(dateElement);

    // Load saved entries from localStorage (optional enhancement)
    loadSavedEntries();

    addEntryBtn.addEventListener('click', function () {
        const value = bloodSugarInput.value.trim();
        if (value && !isNaN(value) && value > 0) {
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString('en-US');

            const entry = {
                date: dateString,
                time: timeString,
                value: value
            };

            saveEntry(entry);
            renderEntry(entry);

            bloodSugarInput.value = '';
            bloodSugarInput.focus();
        } else {
            alert('Please enter a valid blood sugar reading (a positive number).');
        }
    });

    // === LOCAL STORAGE FUNCTIONS (keeps entries between sessions) ===
    function saveEntry(entry) {
        const entries = getEntries();
        entries.push(entry);
        localStorage.setItem('bloodSugarEntries', JSON.stringify(entries));
    }

    function getEntries() {
        const stored = localStorage.getItem('bloodSugarEntries');
        return stored ? JSON.parse(stored) : [];
    }

    function loadSavedEntries() {
        const entries = getEntries();
        entries.forEach(renderEntry);
    }

    function renderEntry(entry) {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `<span>${entry.date} – ${entry.time}</span><span>${entry.value} mg/dL</span>`;
        entriesContainer.insertBefore(div, entriesContainer.firstChild);
    }
});
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show the selected one
  document.getElementById(sectionId).classList.add('active');
}