let delerSum = 0;
let mySum = 0;

let dealerAce = 0;
let myAce = 0;

let hiddenCard;
let deck;

let canHit = true;

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
  
    deck = []; 
  
    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < values.length; j++) {
        deck.push(values[j] + "-" + types[i]);
      }
    }
  };
  
  buildDeck();
  
  function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * deck.length); 
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    };
  };
  
  shuffleDeck();

  function gameInit () {
    hiddenCard = deck.pop();
    delerSum += getValue(hiddenCard);
    dealerAce += checkAce(hiddenCard);
    console.log(hiddenCard);
    console.log(delerSum);
  };

  gameInit()

  function getValue (card) {
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)) {
        if(value === "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
 };

 function checkAce (card) {
    if (card[0] === "A") {
        return 1;
    };
    return 0;
 }