import { HomePage } from '@src/pages';
import './scss/main.scss';

document.body.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
});

const HP = new HomePage();
HP.load();
