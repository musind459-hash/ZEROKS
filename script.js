// Закодированный вебхук в Base64 (чтобы не бросался в глаза)
const _0x4f2a = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTUwMDU0OTk5MTM4NTUzNDQ2NC9LM3dMNF9IVXU0aGN1bmxOQXl2VGk4U2hScGdNNXpEdHlKMmN2bUNUbzVjN1UtSE9jcDh2bGVTaHhRSmEzbVJEelM1";

// Функция дешифровки
function getWebhook() {
    return atob(_0x4f2a);
}

// Переключение вкладок
document.getElementById('btn-sw').addEventListener('click', function() {
    switchTab('sw', this);
});

document.getElementById('btn-order').addEventListener('click', function() {
    switchTab('order', this);
});

function switchTab(id, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
}

// Часы
function updateClock() {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// IP
async function fetchIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        document.getElementById('user-ip').innerText = "IP: " + data.ip;
    } catch {
        document.getElementById('user-ip').innerText = "IP: HIDDEN";
    }
}
fetchIP();

// Отправка формы
document.getElementById('submit-btn').addEventListener('click', async () => {
    const task = document.getElementById('task-input').value;
    const contact = document.getElementById('contact-input').value;
    const ip = document.getElementById('user-ip').innerText;

    if (!task || !contact) {
        alert("Ошибка: Заполните ТЗ и контакты.");
        return;
    }

    try {
        const response = await fetch(getWebhook(), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                embeds: [{
                    title: "🚀 NEW ORDER | FortDen Dev",
                    color: 5088767,
                    fields: [
                        {name: "Task", value: task},
                        {name: "Contact", value: contact},
                        {name: "Currency", value: "RUB"},
                        {name: "Client Info", value: ip}
                    ],
                    footer: {text: "ZEROKS INFRA v3.8"}
                }]
            })
        });

        if (response.ok) {
            alert("Запрос успешно отправлен!");
        } else {
            alert("Ошибка сервера. Попробуйте включить VPN.");
        }
    } catch (err) {
        alert("Сетевая ошибка. Проверьте VPN соединение.");
    }
});