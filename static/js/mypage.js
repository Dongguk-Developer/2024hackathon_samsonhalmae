document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutButton = document.getElementById('logoutButton');

    if (user) {
        welcomeMessage.textContent = `${user.name}님 반갑습니다!`;
        logoutButton.style.display = 'block';
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = './index.html';
        });
    } else {
        welcomeMessage.textContent = '로그인을 하셔야 합니다!';
        logoutButton.style.display = 'none';
    }
});
