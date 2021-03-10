//CPUDeck = Reset button = Shuffles deck in half to start game
//PlayerDeck = Draw button = Draws card from each players deck
//DRAW = Player w/ > cardValue = +2cards else -1cards 
//DrawTieWin = +6 else -3

/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();

/*----- app's state (variables) -----*/

let player1Deck;
let cpuDeck;
let shuffledDeck;

/*----- cached element references -----*/

const playerDeckEl = document.querySelector(".Player1-stats")
const cpuDeckEl = document.querySelector(".HAL9000-stats")

/*----- event listeners -----*/
//draw button to draw cards from both players for values to be compared.
// document.querySelector("button")
// .addEventListener("click,");

// document.querySelector("button")
// .addEventListener("click, ");
/*----- functions -----*/

function init() {  
  shuffledDeck = renderShuffledDeck()
  player1Deck = shuffledDeck.splice(0, 26)
  cpuDeck = shuffledDeck
  render()
}

init();

function render() {
  let playerFaceUp = player1Deck[0];
  let cpuFaceUp = cpuDeck[0]; 
  playerDeckEl.innerHTML = `<div class ="card ${playerFaceUp.face}"></div>`
  cpuDeckEl.innerHTML = `<div class ="card ${cpuFaceUp.face}"></div>`
  console.log(player1Deck)
  console.log(cpuDeck)
}

function cardDraw() {
  let playerCard = player1Deck.shift()
  let cpuCard = cpuDeck.shift()
  if (playerCard.value > cpuCard.value) {
    player1Deck.push(playerCard, cpuCard) 
  } else if (playerCard.value < cpuCard.value) {
    cpuDeck.push(playerCard, cpuCard)
  } else {
    player1Deck.push(playerCard)
    cpuDeck.push(cpuCard)
  }
  render()
}

function renderShuffledDeck() {
    // Create a copy of the masterDeck (leave masterDeck untouched!)
    const tempDeck = [...masterDeck];
    shuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return shuffledDeck;
  }

  function buildMasterDeck() {
    const deck = [];
    // Use nested forEach to generate card objects
    suits.forEach(function(suit) {
      ranks.forEach(function(rank) {
        deck.push({
          // The 'face' property maps to the library's CSS classes for cards
          face: `${suit}${rank}`,
          // Setting the 'value' property for game of blackjack, not war
          value: Number(rank) || (rank === 'A' ? 11 : 10)
        });
      });
    });
    return deck;
  }
