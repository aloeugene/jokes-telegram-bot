const fetch = require('node-fetch');

module.exports = {
  fetchJokeCategories: () =>
    fetch("https://jokeapi.p.rapidapi.com/categories?format=json", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "jokeapi.p.rapidapi.com",
        "x-rapidapi-key": "89ba60eb07msh2a43b5e6291e3bep11282ajsnb97194ec57d7"
      }
    }),

    fetchJoke: (category = '') =>
      fetch(`https://jokeapi.p.rapidapi.com/category/${category}?format=json`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "jokeapi.p.rapidapi.com",
          "x-rapidapi-key": "89ba60eb07msh2a43b5e6291e3bep11282ajsnb97194ec57d7"
        }
      })
}
