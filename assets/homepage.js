// JS file to add functionality to our webpage

// List of global variables
var pokeForm = document.querySelector('#user-form');
var nameInput = document.querySelector('#pokeName');
var pokeSearchName = document.querySelector('#poke-search');
var imgBox = document.querySelector('#searchedImage');
var priceList = document.querySelector('#poke-prices');
var spriteBox = document.querySelector('#searchedSprite');
var loading=document.querySelector('#loading');

// Function to catch user input
var submitName = function (event) {
  event.preventDefault();

  var pokemonName = nameInput.value.trim();

  if (pokemonName) {
    loadPokemon (pokemonName)

     // Calls modal used if user did not enter in any information
  } else {
    $('#myModal').modal('toggle');
  }
};

// First API call - gathers name, Pokemon card Image, and value of card selected
var getPokeCardAndValue = function (pokemonName) {
  //shows pokedex once function is called
  loading.classList.remove("hidden")
  var apiUrl = 'https://api.pokemontcg.io/v2/cards?q=name:' + pokemonName;
  fetch(apiUrl)
    .then(function (response) {
      //hides pokedex once value is loaded
      loading.classList.add("hidden")
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          // Chooses first pokemone in array of search pokemon name, narrows down the specific information we want to use (image, price)
          console.log(data.data[0].images);
          console.log(data.data[0].cardmarket.prices);
          // Assigns items to variables
          let pokeCard = data.data[0].images;
          let pokePrice = data.data[0].cardmarket.prices;
          let pokeName = data.data[0].name;
          // Displays variables on the webpage
          imgBox.src = pokeCard.small
          pokeSearchName.textContent = pokeName
          priceList.textContent = "$" + pokePrice.averageSellPrice
         
        // Store user input data to local storage
        var storedHistory = window.localStorage.getItem("history")
        var history = []
        if (storedHistory !== null) {
          history = JSON.parse(storedHistory)
        }
        history.push(pokeName)
        window.localStorage.setItem("history", JSON.stringify(history))

        loadHistory();

        //clear old content
        pokeSearchName.textContent = '';
        nameInputEl.value = ''

        });
        // Calls modal used if user did not enter in any information
      } else {
        $('#myModal').modal('toggle');
      }
    })
    // Calls modal is server is not loading correctly
    .catch(function (error) {
      $('#brokenModal').modal('toggle');
    });
};

// Load user data from local storage and add a button for user to access
var loadHistory = function () {
  var historyEl = document.getElementById("history")
  historyEl.innerHTML = ""
  var storedHistory = window.localStorage.getItem("history")
  var history = []
  if (storedHistory !== null) {
    history = JSON.parse(storedHistory)
  }
  console.log(history)
  for (var item of history) {
    const historyButtonEl = document.createElement("button")
    historyButtonEl.classList.add("btn")
    historyButtonEl.classList.add("btn-block")
    historyButtonEl.classList.add("btn-secondary")
    historyButtonEl.innerText = item
    historyButtonEl.setAttribute("onclick", "loadPokemon('" + item + "')")

    historyEl.appendChild(historyButtonEl)
  };
};

// Second API call 
var getPokeSprite = function(pokemonName) {
  // allows name to be in lowercase or uppercase
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase();
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          // Chooses just the sprite image data from server
          console.log(data.sprites.front_default);
          let pokeSprite = data.sprites.front_default
          spriteBox.src = pokeSprite
        });
        // Calls modal used if user did not enter in any information
      } else {
        $('#myModal').modal('toggle');
      }
    })
    // Calls modal is server is not loading correctly
    .catch(function(error) {
      alert('Unable to connect');
    });
  };
// created var to pull from both API
var loadPokemon = function (pokemonName) {
  getPokeCardAndValue(pokemonName);
  getPokeSprite(pokemonName)
}
// Adds functionality so the function runs when the submit button is clicked
pokeForm.addEventListener('submit', submitName);
// Function to pull data from local storage
loadHistory();
