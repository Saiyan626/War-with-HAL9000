//CPUDeck = Reset button = Shuffles deck in half to start game
//PlayerDeck = Draw button = Draws card from each players deck
//DRAW = Player w/ > cardValue = +2cards else -1cards 
//DrawTieWin = +6 else -3

/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

const players = {
    player1 = {
        cardsInDeck: 26,
        cardDrawn: 0 
    },
    computer = {
        cardsInDeck: 26,
        cardDrawn: 0
    }
};
const points = "";

/*----- app's state (variables) -----*/
const cards, players, points;

let shuffledDeck;

/*----- cached element references -----*/



/*----- event listeners -----*/
//draw button to draw cards from both players for values to be compared.
document.querySelector("button")
.addEventListener("click, renderShuffledDeck");

document.querySelector("button")
.addEventListener("click, ");
/*----- functions -----*/

init();
 {

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
    renderDeckInContainer(shuffledDeck, shuffledContainer);
  }


  //what happens when players draw face cards
  if(isFaceCard(card1) && isFaceCard(card2)) {
      playerValue = getFaceCardValue(card1);
      cpuValue = getFaceCardValue(card2);
      if (cpuValue > playerValue) {cpuScore++;}
    else if (playerValue > cpuValue) {playerScore++;}
  }