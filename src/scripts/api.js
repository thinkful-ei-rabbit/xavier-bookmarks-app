const BASE_URL = "https://thinkful-list-api.herokuapp.com/xavier/bookmarks";

//FETCHES A BOOKMARK
const getBookmarks = () => fetch(BASE_URL);

//takes in bookmark param data and de-structures it
//makes fetch request with data from bookmark
//handles errors and rejected promises
//returns fetch data
const listApiFetch = (...args) => {
  let error;
  return fetch(...args)
    .then((request) => {
      if (!request.ok) {
        error = { code: request.status };

        // if response is not JSON type, place statusText in error object and
        // immediately reject promise
        if (!request.headers.get("content-type").includes("json")) {
          error.message = request.statusText;
          return Promise.reject(error);
        }
      }
      return request.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      // if all is well, return data
      return data;
    });
};

//CREATE BOOKMARK
const createBookmark = (bookmark) => {
  // const newBookmarkValues = generateRequestBody(bookmark);
  return listApiFetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookmark),
  });
};

//UPDATE BOOKMARK
const updateBookmark = (id, obj) => {
  const newData = JSON.stringify({ obj });
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
