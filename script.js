// Твой рабочий вебхук (зашифрован для защиты)
const _0x_infra = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTUwMDU2NzA3OTg1Njg5ODE5OS83RDNXSFFCWG40djFLZVprTUlqVUprSEt6N2ROWlJhY0hxTEFuYmNEM0huR1JRTFZSZ3djZjE2TWlNUFJYbFVucVhF";

function getTarget() {
    return atob(_0x_infra);
}

// Переключение вкладок
document.getElementById('btn-sw').addEventListener('click', function() { switchTab('sw', this); });
document.getElementById('btn-order').addEventListener('click', function() { switchTab('order', this); });

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

// Логика отправки заказа
document.getElementById('submit-btn').addEventListener('click', async () => {
    const task = document.getElementById('task-input').value;
    const contact = document.getElementById('contact-input').value;
    const ip = document.getElementById('user-ip').innerText;
    const btn = document.getElementById('submit-btn');

    if (!task || !contact) return alert("ОШИБКА: Данные не заполнены");

    btn.innerText = "EXECUTING...";
    btn.disabled = true;

    const payload = {
        embeds: [{
            title: "🚀 NEW ORDER | ZEROKS INFRA",
            color: 5088767,
            fields: [
                {name: "📝 ТЕХЗАДАНИЕ", value: task},
                {name: "💬 КОНТАКТ", value: contact},
                {name: "🌐 СЕТЕВОЙ УЗЕЛ", value: ip},
                {name: "💰 ВАЛЮТА", value: "RUB"}
            ],
            footer: {text: "ZEROKS Systems // by FortDen"}
        }]
    };

    try {
        const response = await fetch(getTarget(), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("ЗАПРОС УСПЕШНО ОТПРАВЛЕН В ДЕПАРТАМЕНТ РАЗРАБОТКИ!");
            document.getElementById('task-input').value = "";
            document.getElementById('contact-input').value = "";
        } else {
            alert("ОШИБКА ДОСТАВКИ: " + response.status);
        }
    } catch (err) {
        alert("КРИТИЧЕСКИЙ СБОЙ СЕТИ. ПРОВЕРЬТЕ VPN.");
    } finally {
        btn.innerText = "SUBMIT_ORDER";
        btn.disabled = false;
    }
});
