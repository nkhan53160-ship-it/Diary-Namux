window.onload = () => {
    const theme = localStorage.getItem('namux_theme') || '#FFD700';
    document.documentElement.style.setProperty('--theme-color', theme);
    setTimeout(() => {
        document.getElementById('splash').style.opacity = '0';
        setTimeout(() => { document.getElementById('splash').style.display = 'none'; document.getElementById('home').style.display = 'flex'; renderNotes(); }, 800);
    }, 1500);
};

function toggleSide(open) {
    document.getElementById('sidebar').style.left = open ? '0' : '-280px';
    document.getElementById('overlay').style.display = open ? 'block' : 'none';
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'flex';
    toggleSide(false);
}

function hideScreens() { document.querySelectorAll('.screen').forEach(s => s.style.display = 'none'); }

function changeTheme(color) {
    document.documentElement.style.setProperty('--theme-color', color);
    localStorage.setItem('namux_theme', color);
}

function saveNote() {
    const t = document.getElementById('title').value;
    const b = document.getElementById('body').value;
    if(!t || !b) return;
    let notes = JSON.parse(localStorage.getItem('namux_master') || '[]');
    notes.unshift({ id: Date.now(), title: t, body: b, date: new Date().toLocaleDateString() });
    localStorage.setItem('namux_master', JSON.stringify(notes));
    hideScreens(); renderNotes();
}

function renderNotes() {
    const notes = JSON.parse(localStorage.getItem('namux_master') || '[]');
    const container = document.getElementById('notes-display');
    container.innerHTML = '';
    notes.forEach(n => {
        const card = document.createElement('div');
        card.style.cssText = "background:#161616; padding:15px; border-radius:10px; border-left:3px solid var(--theme-color); margin-bottom:10px;";
        card.innerHTML = `<h3 style="color:var(--theme-color);margin:0;">${n.title}</h3><p style="opacity:0.6;font-size:13px;">${n.body.substring(0,50)}...</p>`;
        container.appendChild(card);
    });
}
