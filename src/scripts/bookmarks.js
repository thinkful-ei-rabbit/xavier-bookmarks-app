import $ from 'jquery';
import store from './store';
import api from './api';

// see a list of my bookmarks when I first open the app
const generateBookmarkElements = function () {
    let url = "";
    let name = ""

    return `<div class="row">
    <div class="column odd">
        <a href="${url}" class="bookmark-name-link"><p>${name}</p></a>
    </div>
    <div class="column even">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <button class="edit-btn-dropdown"><i class="fas fa-caret-down"></i></button>
    </div>
    </div>`
}

// can add bookmarks to my bookmark list
const createNewBookmark = function (bookmark) {
    $('.buttons').on('click', '#add-new-btn', )
}

//needs attention
const render = function () {
    renderError();
    // Filter item list if store prop is true by item.checked === false
    let bookmarks = [...store.bookmarks];
    if (store.hideCheckedItems) {
      bookmark = bookmarks.filter(item => !item.checked);
    }
  
    // render the bookmarks list in the DOM
    const bookmarkItemString = generateBookmarkElements(bookmarks);
  
    // insert that HTML into the DOM
    $('bookmarks-list').html(bookmarkItemString);
  };

// click on a bookmark to display the "detailed" view, needs attn
const handleToggleBookmarkDetails = function () {
    $('.row').on('click', '.edit-btn-dropdown', )
}

// remove bookmarks from my bookmark list, needs attn
const handleDeleteBookmark = function () {
    $('.description-edit-button-container').on('click', '#delete-btn', event => {
        // get the index of the item in store.items
        const id = getItemIdFromElement(event.currentTarget);
        // delete the item
        api.deleteBookmark(id)
          .then(() => {
            store.findAndDelete(id);
            render();
          })
          .catch((error) => {
            store.setError(error.message);
            renderError();
          });
      });
}

// receive appropriate feedback when I cannot submit a bookmark
const generateError = function (message) {}

// render error message to UI
const renderError = function () {}

// filter bookmark list from a dropdown menu selection 
const handleDropdownMenuSelection = function () {}

// edit the rating and description of a bookmark in my list
const handleEditBookmark = function () {}

//



export default {
    generateBookmarkElements,
    createNewBookmark,
    render,
    handleToggleBookmarkDetails,
    handleDeleteBookmark,
    generateError,
    renderError,
    handleDropdownMenuSelection,
    handleEditBookmark
};























