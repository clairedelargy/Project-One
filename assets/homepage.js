var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#pokeName');
var pokeSearchName = document.querySelector('#poke-search');
var username = nameInputEl.value = '';
var imgBox = document.querySelector('#searchedImage');

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
          let pokeCard = data.data[0].images
          imgBox.src = pokeCard.small
        });
      } else {
        alert('Error: Pokemon was not found, please try again!' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect');
    });
};


// var displayPokename = function([0], searchTerm) {
//   // check if api returned any repos
//   if (length === 0) {
//     pokeContainerE1.textContent = 'No Pokemon found! Please try again!';
//     return;
//   }

//   pokeSearchName.textContent = searchTerm;


//TO DO--- RESEARCH TEMPLATE LITERALS FOR ALL YOUR TEMPLATING NEEDS
//   let html = `<div class="container">
//   <div class="row">
//     <!-- pokemon evolution info -->
//     <div class="col-md-6" id="evolution-container">
//       <ol>
//         <li>${pokemonData[0].name}</li>
//         <li>${pokemonData[1].name}</li>
//         <li>${pokemonData[2].name}</li>
//       </ol>
//     </div>
//     <!-- pokemon card prices -->
//     <div class="col-md-6" id="price-container">
//       <ol>
//       ${getPokePrices(pokemonSearchedFor)}
//         <li>$150</li>
//       </ol>
//     </div>
//   </div>
// </div>`
// document.getElementById('poke-container').textContent = html;
//   // loop over repos
//   for (var i = 0; i < data.length; i++) {
//     // format repo name
//     var pokeName = [''];

//     // create a container for each repo
//     var pokeEl = document.createElement('div');
//     pokeEl.classList = 'list-item flex-row justify-space-between align-center';

//     // create a span element to hold repository name
//     var titleEl = document.createElement('span');
//     titleEl.textContent = pokeName;

//     // append to container
//     pokeEl.appendChild(titleEl);

//     // create a status element
//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     // WE NEED TO EDIT THIS TO MAKE SENSE FOR WHAT WE ARE PULLING
//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     // append to container
//     pokeEl.appendChild(statusEl);

//     // append container to the dom
//     pokeContainerE1.appendChild(pokeEl);
//   }

// };


// add event listeners to forms
userFormEl.addEventListener('submit', formSubmitHandler);
