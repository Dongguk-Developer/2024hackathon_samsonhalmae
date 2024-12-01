document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const messageElement = document.querySelector('#welcomeMessage');
    const loginLink = document.querySelector('a[href="./login.html"]');
    const loginSpan = loginLink.querySelector('span'); // <span> 요소 선택

    if (user) {
        messageElement.textContent = `${user.name} 님 반갑습니다!`;
        loginSpan.textContent = '로그아웃'; // <span>의 문구 변경
        loginLink.href = '#';
        loginLink.classList.add('logout'); // 로그아웃 버튼에 클래스 추가
        loginLink.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.reload();
        });
    } else {
        messageElement.textContent = '로그인을 하셔야합니다!';
    }

    const protectedLinks = document.querySelectorAll('a[href="./basket.html"], a[href="./buy_history.html"], a[href="./mypage.html"], a[href="./keep.html"]');
    protectedLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            if (!user) {
                event.preventDefault();
                alert('로그인이 필요한 기능입니다!');
                window.location.href = './login.html';
            }
        });
    });

    const searchForm = document.querySelector('form[action="./search.html"]');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = document.querySelector('#search').value;
        if (!query) {
            alert('검색어를 입력해주세요.');
            return;
        }
        fetch(`./search.html?query=${query}`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length === 0) {
                    alert('일치하는 결과가 없습니다.');
                } else {
                    // 검색 결과를 처리하는 코드
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
