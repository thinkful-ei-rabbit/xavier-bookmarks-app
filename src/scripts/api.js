import store from './store'
import bookmarks from './bookmarks'

const BASE_URL = "https://thinkful-list-api.herokuapp.com/xavier/bookmarks";

//FETCHES A BOOKMARK
const getBookmarks = () => {
  fetch(`https://thinkful-list-api.herokuapp.com/xavier/bookmarks`)
  .then(res => {
    return res.json()
  })
  .then((response) => {
    response.forEach(bookmark => {
      store.addBookmark(bookmark)
    })
    bookmarks.render(bookmarks.generateBookmarksFromStore())
  })
};

//CREATE BOOKMARK
const createBookmark = (bookmark) => {
  return fetch(`https://thinkful-list-api.herokuapp.com/xavier/bookmarks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmark),
  });
};

//UPDATE BOOKMARK
const updateBookmark = (id, obj) => {
  console.log(obj)
  const newData = JSON.stringify(obj);
  return fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': "application/json",
    },
    body: newData,
  });
};

//DELETE BOOKMARK
const deleteBookmark = (id) => {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
};

const generateRequestBody = (bookmark) => {
  return {
    title: bookmark.title,
    url: bookmark.url,
    desc: bookmark.desc,
    rating: bookmark.rating,
  };
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
  updateBookmark,
  generateRequestBody,
};
