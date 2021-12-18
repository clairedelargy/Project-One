var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#pokeName');
var pokeSearchName = document.querySelector('#poke-search');
var username = nameInputEl.value = '';
var imgBox = document.querySelector('#searchedImage');
var priceList = document.querySelector('#poke-prices');
var spriteBox = document.querySelector('#searchedSprite');

var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var username = nameInputEl.value.trim();

  if (username) {
    getPokeName(username);
  } else {
    alert('Please enter a Pokemon name!');
  }
};

var getPokeName = function(user) {
  // format the github api url
  var apiUrl = 'https://api.pokemontcg.io/v2/cards?q=name:' + user;
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data.data[0].images);
          console.log(data.data[0].cardmarket.prices);
          let pokeCard = data.data[0].images;
          let pokePrice = data.data[0].cardmarket.prices;
          let pokeName = data.data[0].name;
          imgBox.src = pokeCard.small
          pokeSearchName.textContent = pokeName
          priceList.textContent = pokePrice.averageSellPrice
        });
      } else {
        alert('Error: Pokemon was not found, please try again!' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect');
    });
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
userFormEl.addEventListener('submit', formSubmitHandler);
