async function registerUser() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const birth = document.getElementById('birth').value;
    const address = document.getElementById('address').value;

    const user = {
        [name]: {
            PhoneNumber: phone,
            password: password,
            birth: birth,
            address: address
        }
    };

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (response.ok) {
        alert('회원가입이 완료되었습니다.');
        window.location.href = './login.html';
        return true;
    } else {
        alert('회원가입에 실패했습니다.');
        return false;
    }
}
