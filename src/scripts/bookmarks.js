import $ from "jquery";
import store from "./store";
import api from "./api";
import { library, icon } from "@fortawesome/fontawesome-svg-core";

// this generates bookmarks
const generateBookmarkElements = function (multi, bookmarkData) {
  if (multi) {
    let values = [];
    bookmarkData.forEach((bookmarks) => {
      let url = bookmarks.url;
      let name = bookmarks.title;
      let description = bookmarks.desc;
      let rating = bookmarks.rating;

      let star1;
      let star2;
      let star3;
      let star4;
      let star5;

      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          eval(`star${i} = "<i class='fas fa-star gold-star'></i>";`);
        } else {
          eval(`star${i} = "<i class='fas fa-star'></i>";`);
        }
      }
      let newBook = `<div class='row'><div class='accordion-head'>
            <div class='column odd'>
            <a href='${url}' class='bookmark-name-link'><p>${name}</p></a>
            </div>
            <div class='column even'>
                ${star1}
                ${star2}
                ${star3}
                ${star4}
                ${star5}
                <button class='edit-btn-dropdown'><i class='fas fa-caret-down'></i></button>
            </div>
            </div>
            <div class='description-toggle'></div>
            </div>`;
      values.push(newBook);
    });
    return values;
  } else {
    let url = bookmarkData.url;
    let name = bookmarkData.title;
    let description = bookmarkData.desc;
    let rating = bookmarkData.rating;

    let star1;
    let star2;
    let star3;
    let star4;
    let star5;

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        eval(`star${i} = '<i class="fas fa-star gold-star"></i>';`);
      } else {
        eval(`star${i} = '<i class="fas fa-star"></i>';`);
      }
    }

    return `<div class="row"><div class='accordion-head'>
    <div class="column odd">
        <a href="${url}" class="bookmark-name-link"><p>${name}</p></a>
    </div>
    <div class="column even">
        ${star1}
        ${star2}
        ${star3}
        ${star4}
        ${star5}
        <button class="edit-btn-dropdown"><i class="fas fa-caret-down"></i></button>
    </div>
    </div>
    <div class='description-toggle'></div>
    </div>`;
  }
};

//generates header and container
const generateHeaderAndMainContainer = function () {
  let main = `<header class="header">
    <i class="fas fa-user-circle"></i>
    <h1>My Bookmarks</h1>
</header>

<div class="container">
    <div class="buttons">
        <button id="add-new-btn">+ NEW <i class="fas fa-bookmark"></i></button>
        <label for="filter-menu"></label>
        <select id="filter-menu" name="filter-by">
            <option value="" selected>Filter By:</option>
            <option value="5-star">5 stars</option>
            <option value="4-star">4 stars</option>
            <option value="3-star">3 stars</option>
            <option value="2-star">2 stars</option>
            <option value="1-star">1 star</option>
        </select>
    </div>
    <div class="add-content"></div>
    <div class="bookmarks-list"></div>`;

  $("#root").html(main);
  handleAddNewBookmark();
};

//generate html for expanded toggle bookmark & editing
const generateBookmarkExpansionViewHTML = function () {
  return `<div class="edit-active">
    <form class="form">
        <div class="name-url-rating">
            <input type="text" placeholder="Name" id="name-input" aria-label="name" required>
            <input type="text" placeholder="Website URL" id="url-input" aria-label="website URL" required>
            <input type="number" id="rating-select" max="5" min="1" placeholder="Star Rating" aria-label="stars-rating" required>
        </div>
        <textarea name="" id="description-box" rows="5" placeholder="Description" aria-label="description"></textarea>
        <div class="description-edit-button-container">
            <button id="save-btn">save</button>
            <button id="delete-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
    </form>
</div>`;
};

// edit the rating and description of a bookmark in my list
const handleEditBookmark = function () {
  $(".row").on("click", ".edit-btn-dropdown", async function (event) {
    event.preventDefault();
    let editForm = await generateBookmarkExpansionViewHTML();
    $(".description-toggle > .edit-active").remove();
    $(".description-toggle").slideUp();
    $(this).parents(".row").find(".description-toggle").html(editForm);
    $(this).parents(".row").find(".description-toggle").slideDown();
    $(".edit-active").on("click", "#save-btn", (event) => {
      event.preventDefault();
      handleSaveBookmark();
    });
  });
};

// add bookmarks to my bookmark list by clicking NEW btn
const handleAddNewBookmark = function () {
  $(".buttons").on("click", "#add-new-btn", (event) => {
    event.preventDefault();
    $(".add-content").html(generateBookmarkExpansionViewHTML());
    $(".description-edit-button-container").on(
      "click",
      "#save-btn",
      (event) => {
        event.preventDefault();
        handleSaveBookmark();
      }
    );
  });
};

const handleSaveBookmark = async function () {
  let bookmark = {
    title: $("#name-input").val(),
    url: $("#url-input").val(),
    desc: $("#description-box").val(),
    rating: $("#rating-select").val(),
  };
  let response = await api.createBookmark(bookmark);
  let bookmarkHTML = await generateBookmarkElements(false, response);
  $(".bookmarks-list").prepend(bookmarkHTML);
  $(".edit-active").remove();
  $(".description-toggle").slideUp();
};

//needs attention
const render = function (bookmarkHTML) {
  $(".bookmarks-list").html(bookmarkHTML);
};

// click on a bookmark to display the "detailed" view, may delete this
const handleToggleBookmarkDetails = function () {
  $(".row").on("click", ".edit-btn-dropdown", (e) => {
    e.preventDefault();
  });
};

// remove bookmarks from my bookmark list, needs attn
const handleDeleteBookmark = function () {
  $(".description-edit-button-container").on(
    "click",
    "#delete-btn",
    (event) => {
      // get the index of the item in store.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      api
        .deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch((error) => {
          store.setError(error.message);
          renderError();
        });
    }
  );
};

// receive appropriate feedback when I cannot submit a bookmark
const generateError = function (message) {
  return ``;
};

// render error message to UI
const renderError = function () {
  if (store.error) {
    const element = generateError(store.error);
    $(".error-container").html(element);
  } else {
    $(".error-container").empty();
  }
};

const handleCloseError = function () {
  $(".error-container").on("click", "#cancel-error", () => {
    store.setError(null);
    renderError();
  });
};

// filter bookmark list from a dropdown menu selection
// const handleDropdownMenuClicked = function () {
//   $(".edit-btn-dropdown").click(() => {
//     store.toggleExpandedView();
//     render();
//   });
// };

export default {
  generateBookmarkElements,
  handleAddNewBookmark,
  handleToggleBookmarkDetails,
  handleDeleteBookmark,
  generateError,
  renderError,
  handleCloseError,
  handleEditBookmark,
  generateHeaderAndMainContainer,
  generateBookmarkExpansionViewHTML,
  render,
};
