import $ from "jquery";
import store from "./store";
import api from "./api";

const generateBookmarksFromStore = (bookmarkList = store.bookmarkers) => {
  let bookmarksHtml = ""
  console.log(bookmarkList)
  bookmarkList.forEach((bookmark) => {
    let url = bookmark.url;
    let name = bookmark.title;
    let description = bookmark.desc;
    let rating = bookmark.rating;
    let id = bookmark.id;
    let starsHtml = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starsHtml += `<span><i class="fas fa-star gold-star"></i></span>`;
      } else {
        starsHtml += `<span><i class="fas fa-star"></i></span>`;
      }
    }
    bookmarksHtml += `<div class="row"><div class='accordion-head'>
    <div class="column odd">
        <a href="${url}" target='_blank' class="bookmark-name-link"><p>${name}</p></a>
    </div>
    <div class="column even">
        ${starsHtml}
        <button class="edit-btn-dropdown" id="${id}" type="button" aria-label="view/edit-button"><i class="fas fa-caret-down"></i></button>
    </div>
    </div>
    <div class='description-toggle'></div>
    </div>`;
  });
  return bookmarksHtml;
};

//generates header and container
const generateHeaderAndMainContainer = () => {
  let main = `<header class="header">
    <i class="fas fa-user-circle"></i>
    <h1>My Bookmarks</h1>
</header>

<div class="container">
    <div class="buttons">
        <button id="add-new-btn">+ NEW <i class="fas fa-bookmark"></i></button>
        <label for="filter-menu"></label>
        <select id="filter-menu" name="filter-by">
            <option value="all" selected>Filter By:</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
        </select>
    </div>
    <div class="error-container"></div>
    <div class="add-content"></div>
    <div class="bookmarks-list"></div>`;

  $("#root").html(main);
  handleAddNewBookmark();
};

//generate html for expanded toggle bookmark & editing
const generateBookmarkExpansionViewHTML = (bookmark) => {
  let url = bookmark.url;
  let name = bookmark.title;
  let description = bookmark.desc;
  let rating = bookmark.rating;
  let id = bookmark.id;

  return `<div class="edit-active">
    <form class="form">
        <div class="name-url-rating">
            <input type="text" placeholder="name" value="${name}" class="name-input" id="name-input" aria-label="name" maxlength="9" required>
            <input type="text" placeholder="Website URL" value="${url}"class="url-input" id="url-input" aria-label="website URL" required>
            <input type="number" class="rating-select" id="rating-select" max="5" min="1" placeholder="Star Rating"  value="${rating}" aria-label="stars-rating" required>
        </div>
        <textarea name="description" class="description-box" id="description-box" rows="5" placeholder="Description" aria-label="description">${description}</textarea>
        <div class="description-edit-button-container">
            <button class="save-btn update" data-id="${id}" type="submit" aria-label="save">update</button>
            <button class="cancel-update-btn" id="cancel-update-btn" type="button" aria-label="save">cancel</button>
            <button class="delete-btn" aria-label="delete" data-id="${id}"><i class="fas fa-trash-alt"></i></button>
        </div>
    </form>
</div>`;
};

const generateAddBookmarkForm = () => {
  return `<div class="edit-active">
    <form class="form">
        <div class="name-url-rating">
            <input type="text" placeholder="Name" class="name-input" id="name-input" aria-label="name" maxlength="9" required>
            <input type="text" placeholder="Website URL" class="url-input" id="url-input" aria-label="website URL" required>
            <input type="number" class="rating-select" id="rating-select" max="5" min="1" placeholder="Star Rating" aria-label="stars-rating" required>
        </div>
        <textarea name="description" class="description-box" id="add-description-box" rows="5" placeholder="Description" aria-label="description" required></textarea>
        <div class="description-edit-button-container">
            <button class="cancel-btn" id="" aria-label="cancel" type="button">cancel</i></button>
            <input class="save-btn" id="submit-btn" type="submit" aria-label="submit">
        </div>
    </form> 
</div>`;
};

const getIDFromElement = (item) => {
  return $(item).closest(".edit-btn-dropdown").attr('id');
};

// edit the rating and description of a bookmark in my list
const handleEditBookmarkClicked = () => {
  $("#root").on("click", ".edit-btn-dropdown", function (event) {
    event.preventDefault();
    let bookmarkID = event.currentTarget.id;
    let currentBookmark = store.find(bookmarkID);
    if(currentBookmark) {
      let editForm = generateBookmarkExpansionViewHTML(currentBookmark);
      $(".description-toggle > .edit-active").slideUp();
      $(".description-toggle").slideUp();
      $(this).parents(".row").find(".description-toggle").html(editForm);
      $(this).parents(".row").find(".description-toggle").slideDown();
    }
  });
};

//update button
const handleUpdateButtonClick = () => {
  $("#root").on("click", ".update", (event) => {
    event.preventDefault();
    let bookmarkID = $(event.target).data('id')
    let title = $(".name-input").val();
    let url = $(".url-input").val();
    let desc = $(".description-box").val();
    let rating = $(".rating-select").val();

    let patchBookmark = {title, url, desc, rating}

    
    if (title.length < 2) {
      generateError("Please Add A Valid Name");
    } else if (!url.includes("http") || url.length < 5) {
      generateError("Please Use A Valid Link With HTTP or HTTPS Protocol");
    } else if (desc.length < 1) {
      generateError(`Please Add A Description`);
    } else if (!rating || rating > 5) {
      generateError("Please Choose A Rating Between 1 and 5");
    } else { api
              .updateBookmark(bookmarkID, patchBookmark)
              .then(() => {
                store.findAndUpdate(bookmarkID, patchBookmark)
                render(generateBookmarksFromStore())
      })
      .catch(() => (store.error = true));
    }
  });
};

const handleAddNewButtonClicked = () => {
  $(".buttons").on("click", "#add-new-btn", (event) => {
    event.preventDefault();
    let addBookMarkForm = generateAddBookmarkForm();
    $(".add-content").html(addBookMarkForm);
  });
};

const handleCancelBtnClicked = () => {
  $("#root").on("click", ".cancel-btn", (event) => {
    event.preventDefault();
    $(".edit-active").slideUp();
  });
};

const handleCancelUpdateBtnClicked = () => {
  $("#root").on("click", "#cancel-update-btn", (event) => {
    event.preventDefault();
    $(".description-toggle").slideUp();
  });
};

// add bookmarks to my bookmark list by clicking NEW btn
//add new button
const handleAddNewBookmark = () => {
  $("#root").on("click", "#submit-btn", (event) => {
    event.preventDefault();

    let title = $(".name-input").val();
    let link = $(".url-input").val();
    let description = $(".description-box").val();
    let rating = $(".rating-select").val();



    if (title.length < 2) {
      generateError("Please Add A Valid Name");
    } else if (!link.includes("http") || link.length < 5) {
      generateError("Please Use A Valid Link With HTTP or HTTPS Protocol");
    } else if (description.length < 1) {
      generateError(`Please Add A Description`);
    } else if (!rating || rating > 5) {
      generateError("Please Choose A Rating Between 1 and 5");
    } 
    
    else {
      $(".edit-active").slideUp();
      handleCreateBookmark();
    }
  });
};

const handleCreateBookmark = () => {
  let bookmark = {
    title: $(".name-input").val(),
    url: $(".url-input").val(),
    desc: $(".description-box").val(),
    rating: $(".rating-select").val(),
  };

  api.createBookmark(bookmark)
    .then((res) => res.json())
    .then((data) => {
      store.addBookmark(data);
      let bookmarkHTML = generateBookmarksFromStore();
      render(bookmarkHTML);
    })
    .catch(() => (store.error = true));
};


const render = (bookmarkHTML) => {
  $(".bookmarks-list").html(bookmarkHTML);
  store.error = null;
};

// remove bookmarks from my bookmark list, 
const handleDeleteBookmark = () => {
  $("#root").on("click", ".delete-btn", (event) => {
    event.preventDefault();
    let bookmarkID = $(event.currentTarget).data('id');
    console.log(bookmarkID)
      api
      .deleteBookmark(bookmarkID)
      .then(() => {
        let newBookmarks = store.findAndDelete(bookmarkID)
        console.log(store.bookmarkers)
        render(generateBookmarksFromStore(newBookmarks))
      })
      .catch((error) => {
        store.setError(error.message)
        generateError(store.setError)
      });
  });
};

const handleFilter = () => {
  $(`#root`).on(`change`, `#filter-menu`, (event) => {
    event.preventDefault()
    let value = $(`#root #filter-menu`).val();
    console.log(value)
    let filteredList = value === 'all' ? store.bookmarkers 
      : store.filterBookmarks(value)
    console.log(filteredList)
    render(generateBookmarksFromStore(filteredList));
  });
};

// receive feedback when I cannot submit a bookmark
const generateError = (error) => {
  $(".error-container").html(error).slideDown();
    setTimeout(() => {
      $(".error-container").slideUp();
    }, 5000);
};


const bindEventListeners = function () {
  generateHeaderAndMainContainer();
  generateAddBookmarkForm();
  handleEditBookmarkClicked();
  handleUpdateButtonClick();
  handleAddNewButtonClicked();
  handleCancelBtnClicked();
  handleDeleteBookmark();
  handleFilter();
  getIDFromElement();
  handleCancelUpdateBtnClicked();
};

export default {
  generateBookmarksFromStore,
  handleAddNewBookmark,
  generateAddBookmarkForm,
  handleDeleteBookmark,
  generateError,
  handleEditBookmarkClicked,
  generateHeaderAndMainContainer,
  generateBookmarkExpansionViewHTML,
  handleUpdateButtonClick,
  render,
  handleFilter,
  handleCancelBtnClicked,
  handleCreateBookmark,
  bindEventListeners,
  getIDFromElement,
  handleCancelUpdateBtnClicked,
  handleAddNewButtonClicked
};
