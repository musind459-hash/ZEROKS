// Вставь свои прямые ссылки сюда для проверки
const hook1 = "https://discord.com/api/webhooks/1500549991385534464/K3wL4_HUu4hcunlNAyvTi8ShRpgM5zDtyJ2cvmCTo5c7U-HOcp8vleShxQJa3mRDzS5";
const hook2 = "https://discord.com/api/webhooks/1500567079856898199/7D3WHQBXn4v1KeZkMIjUJkHKzg7dNZRacHqLAnbcD3HnGRQLVRgwcf16MiMPrXlUnqXE";

// Управление вкладками
document.getElementById('btn-sw').addEventListener('click', function() { switchTab('sw', this); });
document.getElementById('btn-order').addEventListener('click', function() { switchTab('order', this); });

function switchTab(id, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

// Часы и IP
function updateClock() { document.getElementById('clock').innerText = new Date().toLocaleTimeString(); }
setInterval(updateClock, 1000);
updateClock();

async function fetchIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        document.getElementById('user-ip').innerText = "IP: " + data.ip;
    } catch { document.getElementById('user-ip').innerText = "IP: " + (document.getElementById('user-ip').innerText || "HIDDEN"); }
}
fetchIP();

// Отправка данных
document.getElementById('submit-btn').addEventListener('click', async () => {
    const task = document.getElementById('task-input').value;
    const contact = document.getElementById('contact-input').value;
    const ip = document.getElementById('user-ip').innerText;
    const btn = document.getElementById('submit-btn');

    if (!task || !contact) return alert("Заполните ТЗ и контакт!");

    btn.innerText = "SENDING...";
    btn.disabled = true;

    const payload = {
        embeds: [{
            title: "🚀 NEW SIGNAL | ZEROKS Infrastructure",
            color: 5088767,
            fields: [
                {name: "📋 TASK", value: task},
                {name: "👤 CONTACT", value: contact},
                {name: "🌐 NODE", value: ip}
            ],
            footer: {text: "ZEROKS Systems by FortDen"}
        }]
    };

    try {
        // Пробуем отправить на оба хука
        const res1 = await fetch(hook1, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
        const res2 = await fetch(hook2, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });

        if (res1.ok || res2.ok) {
            alert("Сигнал успешно доставлен!");
            document.getElementById('task-input').value = "";
            document.getElementById('contact-input').value = "";
        } else {
            alert(`Ошибка! Статусы: ${res1.status} / ${res2.status}. Проверь вебхуки в Discord!`);
        }
    } catch (err) {
        alert("Сетевая ошибка! Проверь Amnezia VPN.");
    } finally {
        btn.innerText = "SUBMIT_ORDER";
        btn.disabled = false;
    }
});
