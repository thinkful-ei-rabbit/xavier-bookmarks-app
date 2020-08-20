import $ from 'jquery';
import 'normalize.css';
import './index.css';
import api from './api';
import store from './scripts/store';
import bookmarks from './scripts/bookmarks';

const main = function () {
  console.log('DOM loaded');

  const bookPage = $('<p>Bookmarks!</p>');
  $('#root').html();
}

$(main);