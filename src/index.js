'use strict';
/*Checkbox*/

function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    checkbox.forEach(elem => {
      elem.addEventListener('change', function () {
        if (this.checked) {
          this.nextElementSibling.classList.add('checked');
        } else {
          this.nextElementSibling.classList.remove('checked');
        }
      });
    });
  }
  
  
  /*Cart*/
  
  function toggleCart() {
    const btnCart = document.getElementById('cart');
    const modalCart = document.querySelector('.cart');
    const closeBtn = document.querySelector('.cart-close');
  
    btnCart.addEventListener('click', () => {
      modalCart.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  
    closeBtn.addEventListener('click', () => {
      modalCart.style.display = 'none';
      document.body.style.overflow = '';
    });
}
  
  
  /*Add product to cart*/
  
  function addCart() {
  
    const cards = document.querySelectorAll('.goods .card');
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartEmpty = document.getElementById('cart-empty');
    const countGoods = document.querySelector('.counter');
  
    cards.forEach((card) => {
      const btn = card.querySelector('button');
      btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        showData();
  
        const removeBtn = cardClone.querySelector('.btn');
        removeBtn.textContent = 'Удалить';
        removeBtn.addEventListener('click', () => {
          cardClone.remove();
          showData();
        });
      });
    });
  
    function showData() {
  
      const cardsCart = cartWrapper.querySelectorAll('.card');
      const cardsPrice = cartWrapper.querySelectorAll('.card-price');
      const cardTotal = document.querySelector('.cart-total span');
      countGoods.textContent = cardsCart.length;
  
      let sum = 0;
      cardsPrice.forEach((cardPrice) => {
        sum += parseFloat(cardPrice.textContent);
      });
      cardTotal.textContent = sum;
  
      if (cardsCart.length !== 0) {
        cartEmpty.remove();
      } else {
        cartWrapper.appendChild(cartEmpty);
      }
  
    }
  }
  
  
  /*FILTER FOR ACTIONS (FILTERING & SEARCH)*/
  
  function actionPage() {

    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.getElementById('discount-checkbox');
  
    discountCheckbox.addEventListener('click', () => {
      cards.forEach((card) => {
        card.setAttribute('discont-filter', 'yes');
        if (discountCheckbox.checked) {
          if (!card.querySelector('.card-sale') || card.getAttribute('price-filter') == 'no') {
            card.parentNode.style.display = 'none';
            card.setAttribute('discont-filter', 'no');
            console.log(card.getAttribute('discont-filter'));
          }
        } else {
          card.parentNode.style.display = 'flex';
          card.setAttribute('discont-filter', 'no');
          console.log(card.getAttribute('discont-filter'));
        }
      });
    });
  
    /*PRICE FILTER*/
  
    const min = document.getElementById('min');
    const max = document.getElementById('max');
  
    function filterPrice() {
      cards.forEach((card) => {
        card.setAttribute('price-filter', 'yes');
        const cardPrice = card.querySelector('.card-price');
        const price = parseFloat(cardPrice.textContent);
  
        if ((min.value && price < min.value) || (price > max.value && max.value) || card.getAttribute('discont-filter') == 'no') {
          card.parentNode.style.display = 'none';
          card.setAttribute('price-filter', 'no');
        } else {
          card.parentNode.style.display = 'flex';
        }
      });
    }
  
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);
  
    /*SEARCH*/
  
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-wrapper_input');
  
    searchBtn.addEventListener('click', () => {
      const searchText = new RegExp(searchInput.value.trim(), 'i');
      cards.forEach((card) => {
        const cardTitle = card.querySelector('.card-title');
        if (!searchText.test(cardTitle.textContent)) {
          card.parentNode.style.display = 'none';
        } else {
          card.parentNode.style.display = 'flex';
        }
      });
    });
  } 
  
  toggleCheckbox();
  toggleCart();
  addCart();
  actionPage();