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
                window.location.href = 'index.html';
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


function validateUsername(username) {
    const usernameRegex = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/; // Могут быть только буквы и цифры
    return usernameRegex.test(username);
}


function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{2,}$/; // Должен содержать хотя бы 1 букву и 1 цифру
    return passwordRegex.test(password);
}
