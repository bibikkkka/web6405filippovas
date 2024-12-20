function handleSubmit(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usernameValid = validateUsername(username);
    const passwordValid = validatePassword(password);

    const data = {
        username: username,
        password: password
    };

    if (!usernameValid) {
        alert("Имя пользователя должно содержать только буквы и цифры.");
        return;
    }

    if (!passwordValid) {
        alert("Пароль должен содержать хотя бы одну букву и одну цифру.");
        return;
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                console.log('Успешный вход');

                addToHistory(username);

                //window.location.href = 'index.html';
            } else {
                console.error('Ошибка при входе');
                alert("Ошибка. Проверьте ваши учетные данные.");
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert("Произошла ошибка. Пожалуйста, попробуйте позже.");
        });
}

function addToHistory(username) {
    const tableBody = document.getElementById('historyTableBody');

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${username}</td>
    `;

    tableBody.appendChild(newRow);
}

function loadHistory() {
    fetch('http://localhost:3000/login')
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не в порядке');
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById('historyTableBody');
            tableBody.innerHTML = '';

            data.forEach(entry => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.username}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось загрузить историю посещений. Пожалуйста, попробуйте позже.');
        });
}

document.addEventListener('DOMContentLoaded', loadHistory);

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/;
    return usernameRegex.test(username);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{2,}$/;
    return passwordRegex.test(password);
}
