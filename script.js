// Переключение вкладок
document.getElementById('btn-sw').addEventListener('click', function() { switchTab('sw', this); });
document.getElementById('btn-games').addEventListener('click', function() { switchTab('games', this); });

function switchTab(id, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

// Системный мониторинг (Часы и IP)
function updateClock() { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }
setInterval(updateClock, 1000);
updateClock();

async function fetchIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        document.getElementById('user-ip').innerText = "IP: " + data.ip;
    } catch { document.getElementById('user-ip').innerText = "IP: CLOUDFLARE_NODE"; }
}
fetchIP();
