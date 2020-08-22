import bookmarks from "./bookmarks";
import $ from "jquery";

let bookmarkers = [];
let error = null;
let filter = 1;

const addBookmark = function (bookmark) {
  this.bookmarkers.push(bookmark);
};

function findAndUpdate(id, newData) {
  Object.assign(
    this.items.find((item) => item.id === id),
    newData
  );
}

const setError = function (error) {
  this.error = error;
};

const toggleExpandedView = function () {
  this.expanded = !this.expanded;
};

addBookmark;

export default {
  bookmarkers,
  error,
  filter,
  addBookmark,
  findAndUpdate,
  setError,
  toggleExpandedView,
};
