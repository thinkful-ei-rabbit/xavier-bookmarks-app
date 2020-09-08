import $ from "jquery";
import "normalize.css";
import "../index.css";
import api from "./api";
import bookmarks from "./bookmarks";

const main = function () {
  bookmarks.bindEventListeners();
  api.getBookmarks()
};

$(main);


