var pokeForm = document.querySelector('#user-form');
var nameInput = document.querySelector('#pokeName');
var pokeSearchName = document.querySelector('#poke-search');
var imgBox = document.querySelector('#searchedImage');
var priceList = document.querySelector('#poke-prices');
var spriteBox = document.querySelector('#searchedSprite');

var submitName = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var pokemonName = nameInput.value.trim();

  if (pokemonName) {
    getPokeName(pokemonName);

  } else {
    alert('Please enter a Pokemon name!');
  }
};

var getPokeName = function (user) {
  // format the github api url
  var apiUrl = 'https://api.pokemontcg.io/v2/cards?q=name:' + user;
  // make a get request to url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data.data[0].images);
          console.log(data.data[0].cardmarket.prices);
          let pokeCard = data.data[0].images;
          let pokePrice = data.data[0].cardmarket.prices;
          let pokeName = data.data[0].name;
          imgBox.src = pokeCard.small
          pokeSearchName.textContent = pokeName
          priceList.textContent = pokePrice.averageSellPrice


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

      } else {
        alert('Error: Pokemon was not found, please try again!' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect');
    });
};

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
    historyButtonEl.setAttribute("onclick", "getPokeName('" + item + "')")

    historyEl.appendChild(historyButtonEl)
  };
};
// This is the API call from the other website - not sure how to get both show up
// var getPokeSprite = function(user) {
//   // format the github api url
//   var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + user;
//   // make a get request to url
//   fetch(apiUrl)
//     .then(function(response) {
//       // request was successful
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function(data) {
//           console.log(data.sprites.front_default);
//           let pokeSprite = data.sprites.front_default
//           spriteBox.src = pokeSprite
//         });
//       } else {
//         alert('Error: Pokemon was not found, please try again!' + response.statusText);
//       }
//     })
//     .catch(function(error) {
//       alert('Unable to connect');
//     });
//   };
pokeForm.addEventListener('submit', submitName)
