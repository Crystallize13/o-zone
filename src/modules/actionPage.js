export default function actionPage() {
    const cards = document.querySelectorAll('.goods .card');
    const discountCheckbox = document.querySelector('#discount-checkbox');
    const goods = document.querySelector('.goods');
    const min = document.getElementById('min');
    const max = document.getElementById('max');
  
    function filter() {
      cards.forEach((item) => {
        const cardPrice = item.querySelector('.card-price');
        const price = parseFloat(cardPrice.textContent);
        const discount = item.querySelector('.card-sale');
  
        if ((min.value && price < min.value) || (max.value && price > max.value)) {
          item.parentNode.style.display = 'none';
        } else if (discountCheckbox.checked && !discount) {
          item.parentNode.style.display = 'none';
        } else {
          item.parentNode.style.display = '';
        }
      }); 
    }
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);
    discountCheckbox.addEventListener('click', filter);
  }