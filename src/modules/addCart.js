export default function addCart() {
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty'); 
    const countGoods = document.querySelector('.counter');
    
    
    cards.forEach((card) => {
      const btn = card.querySelector('button');
    
      btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
  
        cartWrapper.appendChild(cardClone);  
        cartEmpty.remove();
        showData();
    
        const removeBtn = cardClone.querySelector('.btn');
  
        removeBtn.textContent = 'Удалить из корзины';
        removeBtn.addEventListener('click', () => {
          cardClone.remove();
          showData();
        });
      });
    });
    
    function showData() {
      const cardsCart = cartWrapper.querySelectorAll('.card');
      const cardPrice = cartWrapper.querySelectorAll('.card-price');
      const cardTotal = document.querySelector('.cart-total span');
      let sum = 0;
  
      countGoods.textContent = cardsCart.length;
      cardPrice.forEach((e) => {
        let price = parseFloat(e.textContent);
  
        sum += price;
      });
      cardTotal.textContent = sum;
    
      if (cardsCart.length !== 0) {
        cartEmpty.remove();
      } else {
        cartWrapper.appendChild(cartEmpty);
      }
    }
  }