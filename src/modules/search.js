export default function search() {
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