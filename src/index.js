import getData from './modules/getData';
import renderCards from './modules/renderCards';
import renderCatalog from './modules/renderCatalog';
import toggleCheckbox from './modules/toggleCheckbox';
import toggleCart from './modules/toggleCart';
import addCart from './modules/addCart';
import actionPage from './modules/actionPage';
import search from './modules/search';



(async function() {
  const db = await getData();
  renderCards(db);
  renderCatalog();
  toggleCheckbox();
  toggleCart();
  addCart();
  actionPage();
  search();
}());