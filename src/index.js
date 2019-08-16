'use strict';



// чекбокс

function toggleCheckbox() {
  const checkbox = document.querySelectorAll('.filter-check_checkbox');
  checkbox.forEach((e) => {
    e.addEventListener('change', function () {
      if (this.checked) {
        this.nextElementSibling.classList.add('checked');
      } else {
        this.nextElementSibling.classList.remove('checked');
      }
    });
  });
}

// end чекбокс

// корзина

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

// end корзина

// работа с товаром

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

// end работа с товаром

// фильтр акции

function actionPage() {
  const cards = document.querySelectorAll('.goods .card');
  const discountCheckbox = document.querySelector('#discount-checkbox');
  const goods = document.querySelector('.goods');
  const min = document.getElementById('min');
  const max = document.getElementById('max');

  function filter() {
    cards.forEach((e) => {
      const cardPrice = e.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);
      const discount = e.querySelector('.card-sale');
      if ((min.value && price < min.value) || (max.value && price > max.value)) {
        e.parentNode.style.display = 'none';
      } else if (discountCheckbox.checked && !discount) {
        e.parentNode.style.display = 'none';
      } else {
        e.parentNode.style.display = '';
      }
    }); 
  }
  min.addEventListener('change', filter);
  max.addEventListener('change', filter);
  discountCheckbox.addEventListener('click', filter);
}

// поиск

function search ()  {
  const cards = document.querySelectorAll('.goods .card');
  const search = document.querySelector('.search-wrapper_input');
  const searchBtn = document.querySelector('.search-btn');
  searchBtn.addEventListener('click', () => {
    const searchText = new RegExp(search.value.trim(), 'i');
    cards.forEach((e) => {
      const title = e.querySelector('.card-title');
      if (!searchText.test(title.textContent)) {
        e.parentNode.style.display = 'none';
      } else {
        e.parentNode.style.display = '';
      }
    });
  });
}

// end поиск

// get data from server

function getData() {
  const goodsWrapper = document.querySelector('.goods');
  return fetch('../db/db.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error ('Данные не были получены: ' + response.status);
      }
  })
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.warn(err);
    goodsWrapper.innerHTML = '<div class="alert alert-warning">Упс что-то пошло не так</div>';
  });
}

// render product cards

function renderCards(data) {
  const goodsWrapper = document.querySelector('.goods');

  data.goods.forEach((good) => {
    const card = document.createElement('div');

    card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
    card.innerHTML = `
      <div class="card" data-category="${good.category}">
        ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
        <div class="card-img-wrapper">
          <span class="card-img-top" style="background-image: url('${good.img}')"></span>
        </div>
        <div class="card-body justify-content-between">
          <div class="card-price" style="${good.sale ? 'color: red' : ''}">${good.price} ₽</div>
          <h5 class="card-title">${good.title}</h5>
          <button class="btn btn-primary">В корзину</button>
        </div>
      </div>
    `;
    goodsWrapper.appendChild(card);
  });

}

function renderCatalog() {
  const cards = document.querySelectorAll('.goods .card');
  const catalogList = document.querySelector('.catalog-list');
  const catalogBtn = document.querySelector('.catalog-button');
  const catalogWrapper = document.querySelector('.catalog');
  const goods = document.querySelector('.goods');
  const categories = new Set();
  
  cards.forEach((card) => {
    categories.add(card.dataset.category);
  });

  categories.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    catalogList.appendChild(li);
  });

  catalogBtn.addEventListener('click', (event) => {
    if (catalogWrapper.style.display) {
      catalogWrapper.style.display = '';
    } else {
      catalogWrapper.style.display = 'block';
    }



    if (event.target.tagName === 'LI') {
      cards.forEach((card) => {
        if (card.dataset.category === event.target.textContent) {
          goods.appendChild(card.parentNode);
        } else {
          card.parentNode.remove();
        }
      });
    }
  });
  
}

// end get data 

getData().then((data) => {
  renderCards(data);
  renderCatalog();
  toggleCheckbox();
  toggleCart();
  addCart();
  actionPage();
  search();
});
