/* ---------------------------------------------------
- click event listener on deck
- if li,
  • start timer
  • flip card-add 'open show' and 'disabled'
  • add to open cards array
- if card array > 0, check if current card matches card in open array
- if it matches,
  • increment move counter
  • add both cards to pairs array,
  • change 'open, show' classes to 'match'
  • deactivate so you can no longer click on matched
  • if number of pairs = 8 (16 cards)
    + display modal with congrats, play again button
- if it doesn't match,
  • increment move counter
  • add noMatch class to both cards in open card array
  • setTimeout for a couple seconds
    • disable other cards
    • close both cards (remove show, open, noMatch)
    • enable cards
    • reset open cards array = [];
    • add +1 to wrong number count
      • if wrong number count > 6, remove one star

- event listener for restart button
-------------------------------------------------------------------*/


// 1. create an array that holds all of your cards
const stars = document.querySelector('.stars');
const resetButton = document.querySelector('.restart');
const counter = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const cardList = document.querySelectorAll(".card");
const cards = [...cardList];
let openCards = [];
let matches = [];
let moves = 0;
let incorrectGuess = 0;


window.onload = newGame();

deck.addEventListener('click', flipCard);

resetButton.addEventListener('click', newGame);


function newGame() {
  // 1. reset cards to face down
  for (const card of cards) {
    card.classList.remove('open', 'show', 'match');
  }
  // 2. shuffle cards
  let shuffledCards = shuffle(cards);

  // 3. append cards to board
  shuffledCards.forEach(function(card) {
    deck.appendChild(card);
  });

  // 4. reset move move move counter
  moves = 0;
  counter.innerHTML = moves;
}




function flipCard(e) {
  const thisCard = e.target;
    if (thisCard.className === 'card') {
      thisCard.classList.add('open', 'show');
      // TO DO: start timer
      checkForMatch(e);
    }
}


function checkForMatch(e) {
  openCards.push(e.target);
  if (openCards.length === 2) {
    moveCounter();
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      // TO DO:
      // • check for winner
      // • empty openCards array

      openCards[0].classList.add('match');
      openCards[1].classList.add('match');

      //add current match to matches array
      matches = [...matches, ...openCards];

      emptyOpenCards();
      countMatches();
    } else {
      notMatch();
    }
  }
}

function emptyOpenCards() {
  //empty openCards array;
  openCards = [];
}



function moveCounter() {
  moves++;
  counter.innerHTML = moves;
}


function notMatch() {
  disableCards();

  openCards[0].classList.add('incorrect');
  openCards[1].classList.add('incorrect');

  setTimeout(function() {
    openCards[0].classList.remove('open', 'show', 'incorrect');
    openCards[1].classList.remove('open', 'show', 'incorrect');
    enableCards();
    emptyOpenCards();
  }, 1000);

  starRating();
}


function starRating() {
  incorrectGuess++;

  if (incorrectGuess === 5 || incorrectGuess === 10) {
    stars.firstElementChild.remove(1);
  }
}

function disableCards() {
  deck.removeEventListener('click', flipCard);
  for (const card of cards) {
    card.classList.add('disabled');
  }
}


function enableCards() {
  deck.addEventListener('click', flipCard);
  for (const card of cards) {
    card.classList.remove('disabled');
  }
}

function countMatches() {
  if (matches.length === 16) {
    console.log('you win!');
  }
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
