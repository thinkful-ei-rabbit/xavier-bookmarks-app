const store = {
    bookmarks: [
      {
        id: '',
        title: 'Google',
        rating: 4,
        url: 'http://www.Google.com',
        description: 'the search engine that changed everything',
        expanded: false
      },
      {
        id: '',
        title: 'Github',
        rating: 5,
        url: 'http://www.Github.com',
        description: 'cloud based version-control file system',
        expanded: false
      },
      {
        id: '',
        title: 'Youtube',
        rating: 5,
        url: 'http://www.Youtube.com',
        description: 'Online videos',
        expanded: true
      }
      
    ],
    adding: false,
    error: null,
    filter: 0
  };

  export default store;