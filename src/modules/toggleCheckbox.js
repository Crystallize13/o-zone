export default function toggleCheckbox() {
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