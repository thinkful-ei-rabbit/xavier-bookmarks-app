import $ from "jquery";
import "normalize.css";
import "../index.css";
import api from "./api";
import store from "./store";
import bookmarks from "./bookmarks";
import { library, icon } from "@fortawesome/fontawesome-svg-core";

const main = function () {

  api
    .getBookmarks()
    .then((response) => response.json())
    .then(data => {
      store.addBookmark(data);
      console.log(store.bookmarkers)
      let bookmarkers = bookmarks.generateBookmarkElements(true, data);
      let init = bookmarks.generateHeaderAndMainContainer();
      bookmarkers.forEach((item) => {
        $(".bookmarks-list").prepend(item);
      });
      bookmarks.handleEditBookmark();
    });
};

$(main);
