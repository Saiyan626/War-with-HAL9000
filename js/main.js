/*----- constants -----*/

const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMainDeck();

/*----- app's state (variables) -----*/

let player1Deck;
let cpuDeck;
let shuffledDeck;
let winner;

/*----- cached element references -----*/

const playerDeckEl = document.querySelector(".Player1-stats")
const cpuDeckEl = document.querySelector(".HAL9000-stats")
const msgEl = document.querySelector("#msg")
const HalScoreEl = document.querySelector(".HAL9000-score")
const player1ScoreEl = document.querySelector(".Player1-score")


/*----- event listeners -----*/

document.querySelector(".USER1").addEventListener("click",cardDraw)

document.querySelector(".HAL9000").addEventListener("click",init)

/*----- functions -----*/

function init() {  
  shuffledDeck = renderShuffledDeck()
  player1Deck = shuffledDeck.splice(0, 26)
  cpuDeck = shuffledDeck
  msgEl.textContent = ""
  render()
}

init();

function render() {
  if (winner) {
   return msgEl.textContent = "USER1-WINS"
  } else if (winner === false){ 
   return msgEl.textContent = "HAL9000-WINS"
  }
  let playerFaceUp = player1Deck[0];
  let cpuFaceUp = cpuDeck[0]; 
  playerDeckEl.innerHTML = `<div class ="card ${playerFaceUp.face}"></div>`
  cpuDeckEl.innerHTML = `<div class ="card ${cpuFaceUp.face}"></div>`
  HalScoreEl.textContent = `${cpuDeck.length}`
  player1ScoreEl.textContent = `${player1Deck.length}`
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
  winner = checkWinner()
  render()
}

function checkWinner() {
  if (player1Deck.length === 52) {
    winner = true
  } else if(cpuDeck.length === 52){
    winner = false
  }
  return winner;
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

  function buildMainDeck() {
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
