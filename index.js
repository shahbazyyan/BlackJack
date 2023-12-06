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
  shuffleDeck();
  gameInit();
  
  function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
      let j = Math.floor(Math.random() * deck.length); 
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    };
  };
  

  function gameInit () {
    hiddenCard = deck.pop();
    delerSum += getValue(hiddenCard);
    dealerAce += checkAce(hiddenCard);
    // console.log(hiddenCard);
    // console.log(delerSum);

    while (delerSum <= 16) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = './cards/' + card + '.png';
        delerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    };
    
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = './cards/' + card + '.png';
        mySum+= getValue(card);
        myAce += checkAce(card);
        document.getElementById("my-cards").append(cardImg);
    };
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
  };

  function hit () {
    if(!canHit) {
        return;
    };
    let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = './cards/' + card + '.png';
        mySum+= getValue(card);
        myAce += checkAce(card);
        document.getElementById("my-cards").append(cardImg);

        if (reduceAce(mySum, myAce) > 21 ) {
            canHit = false;
        };
  };

  function stay () {
    delerSum = reduceAce(delerSum, dealerAce);
    mySum = reduceAce(mySum, myAce);

    canHit = false;
    document.getElementById("back-card").src = './cards/' + hiddenCard + '.png';

    let winCondition = '';
    if(mySum > 21) {
        winCondition = "You lose";
    } else if (delerSum > 21) {
        winCondition = "You win!";
    } else if (mySum === delerSum) {
        winCondition = 'Draw!';
    } else if (mySum > delerSum) {
        winCondition = 'You win!';
    } else if (mySum < delerSum) {
        winCondition = 'You lose!'
    };

    document.getElementById("dealer-sum").innerText = delerSum;
    document.getElementById("my-sum").innerText = mySum;
    document.getElementById("result").innerText = winCondition;
  };



  function getValue (card) {
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)) {
        if(value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
 };

 function checkAce (card) {
    if (card[0] == "A") {
        return 1;
    };
    return 0;
 }

 function reduceAce (playerSum, playerAce) {
    while ( playerSum > 21 && playerAce > 0) {
        playerSum -= 10;
        playerAce -= 1;
    };
    return playerSum;
 };

 function restartGame () {
   window.location.reload();
 };

 document.getElementById("restart").addEventListener("click", restartGame);

