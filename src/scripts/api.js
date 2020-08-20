const BASE_URL = 'https://thinkful-list-api.herokuapp.com/xavier/bookmarks';


//READ
const getBookmark = (() => fetch(BASE_URL));


//CREATE BOOKMARK
const createBookmark = (name => {
    const newBookmark = JSON.stringify({ name });
    console.log(newBookmark);
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newBookmark
    });
});


//UPDATE BOOKMARK
const updateBookmark = ((id, updateData) => {
    const newData = JSON.stringify({updateData});
    return fetch(BASE_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newData
    });
});



//DELETE BOOKMARK
const deleteBookmark = (id,) {
    return fetch(`${BASE_URL}, ${id}`, {method:'DELETE'});
}



export default {
    getBookmark,
    createBookmark,
    deleteBookmark,
    updateBookmark
}
