async function loginUser() {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const credentials = {
        phone: phone,
        password: password
    };

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        // alert('로그인에 성공했습니다.');
        window.location.href = './index.html';
        return true;
    } else {
        alert('로그인에 실패했습니다.');
        return false;
    }
}
