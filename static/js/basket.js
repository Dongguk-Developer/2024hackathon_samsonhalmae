document.addEventListener('DOMContentLoaded', () => {
    fetch('/basket')
        .then(response => response.json())
        .then(data => {
            const basketItemsDiv = document.getElementById('basket-items');
            data.basket.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('basket-item');
                itemDiv.innerHTML = `
                    <h2>${item.store}</h2>
                    <p>상품: ${item.item}</p>
                    <p>그람당 가격: ${item.price_per_gram}</p>
                    <p>재고: ${item.stock}</p>
                    <p>수량: ${item.quantity}</p>
                    <p>총 무게: ${item.total_weight}g</p>
                    <p>총 가격: ${item.total_price}원</p>
                `;
                basketItemsDiv.appendChild(itemDiv);
            });
        })
        .catch(error => console.error('Error fetching basket data:', error));
});