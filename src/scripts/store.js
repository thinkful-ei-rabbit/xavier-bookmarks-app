let bookmarkers = [];
let error = null;
let filter = 0;


const getBookmarks = () => {
  return bookmarkers;
}

const addBookmark = (bookmark) => {
  bookmarkers.push(bookmark);
};

const findAndUpdate = (id, newData) => {
  Object.assign(bookmarkers.find((item) => item.id === id), newData); 
}

const find = (id) => {
  return bookmarkers.find((item) => item.id === id);
}

const findAndDelete = (id) => {
   return bookmarkers.filter(item => item.id !== id);
}

const setError = (message) => {
  return message
};

const filterBookmarks = (value) => {
  return bookmarkers.filter(item => item.rating >= Number(value));
}


export default {
  bookmarkers,
  error,
  filter,
  addBookmark,
  findAndUpdate,
  findAndDelete,
  setError,
  getBookmarks,
  find,
  filterBookmarks
};
