import $ from 'jquery';
import 'normalize.css';
import './index.css';
import api from './api';
import store from './store';
import bookmarks from './bookmarks';
import { library, icon } from '@fortawesome/fontawesome-svg-core'

const main = function () {
  console.log('DOM loaded');

  const bookPage = $('<p>Bookmarks!</p>');
  $('#root').html();
}

$(main);