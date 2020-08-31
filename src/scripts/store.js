import bookmarks from "./bookmarks";
import $ from "jquery";

let bookmarkers = [];
let error = null;
let filter = 1;

const addBookmark = function (bookmark) {
  this.bookmarkers.push(bookmark);
};

const findAndUpdate = function (id, newData) {
  Object.assign(
    bookmarkers.find((item) => item.id === id),
    newData
  );
}

const find = function(id){
  return bookmarkers.find((item) => item.id === id);
}


const findAndDelete = function (id) {
  this.bookmarkers = this.bookmarkers.filter(item => {
    return item.id !== id;
  });
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
  findAndDelete,
  setError,
  find,
  toggleExpandedView,
};
