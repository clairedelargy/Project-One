var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#pokeName');
var pokeContainerE1 = document.querySelector('#poke-container');
var pokeSearchName = document.querySelector('#poke-search');
var username = nameInputEl.value = '';

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getPokeName(username);

    // clear old content
    pokeContainerE1.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a Pokemon name!');
  }
};

var getPokeName = function(user) {
  // format the github api url
  var apiUrl = 'https://api.pokemontcg.io/v2/cards';

  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayPokename(data, user);
        });
      } else {
        alert('Error: Pokemon was not found, please try again!' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect');
    });
};

var displayPokename = function(repos, searchTerm) {
  // check if api returned any repos
  if (repos.length === 0) {
    pokeContainerE1.textContent = 'No Pokemon found! Please try again!';
    return;
  }

  pokeSearchName.textContent = searchTerm;

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var pokeName = [''];

    // create a container for each repo
    var pokeEl = document.createElement('div');
    pokeEl.classList = 'list-item flex-row justify-space-between align-center';

    // create a span element to hold repository name
    var titleEl = document.createElement('span');
    titleEl.textContent = pokeName;

    // append to container
    pokeEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    // append to container
    pokeEl.appendChild(statusEl);

    // append container to the dom
    pokeContainerE1.appendChild(pokeEl);
  }
};

// add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);
