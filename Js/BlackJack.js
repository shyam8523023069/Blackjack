var cash = 3000;// player full amount
var bet = 300;// initialize a minm bet amount

var faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];//deck of cards values
var suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];//deck of cards names

var deck = [];//empty array


// function displaying the prompt message
$(function () { //"self-invoking" expression is invoked automatically, without being called.
    var txt;
    var person = prompt("Please enter your name:", "Player Name");
    if (person == null || person == "") {
        txt = "User cancelled the prompt";
    } else {
        $('#txtPlayerName').text(person);
    }
});



// created function for shuffle deck of cards so that we can create multiple cards
function card(name, face, suit, value) {  
    this.name = name;
    this.face = face;
    this.suit = suit;
    this.value = value;
}

// shuffle deck to insert values in the deck[] array
function shuffleDeck() { 
    deck = [];
   
    for (var i = 0; i < faces.length; i++) {
        for (var j = 0; j < suits.length; j++) {

            if (i > 9) {
               var temp = new card(faces[i] + ' of ' + suits[j], faces[i], suits[j], 10);
            }
            else {
               var temp = new card(faces[i] + ' of ' + suits[j], faces[i], suits[j], i + 1);
            }
            deck.push(temp);
        }
    }
} shuffleDeck();



// created function for starting the game and object to get new cards all the time 
function hand() {
    this.player = 'none';
    this.cards = [];
    this.value = 0;
}

function startGame() {
    playerHand = new hand();//call from 52
    computerHand = new hand();
    playerHand.player = 'player'; // in line 53 "player" is writen
    computerHand.player = 'computer';// in line 53 "computer" is writen
    startingHand();// go to line 80
    showValue();// go to line 93

    if (playerHand.value == 21) {
        win();
        $('.buttons').addClass('hide'); //hide buttons 
        $('#reset').removeClass('hide'); // remove hide for play again


        if (deck.length < 10) {
            shuffleDeck();
        }
    }
}


//created functions for starting number of cards for players and dealer
function startingHand() {
    for (var i = 0; i < 2; i++) {
        hit(playerHand); // go to line 179 ....&.....2 card for player
    }
    computerHit();
}

function computerHit() {
    hit(computerHand); //go to line 179 ....&..... 1 card for delear
    showCompValue(); // go to line 105
}

// created functions for showing value of player and dealer
function showValue() {

    $('#gameBoardPlayer').append('<div class="player-value"> ' + playerHand.value.toString() + '  </div>');
    if (playerHand.value > 21) {
        $('#gameBoardPlayer').append('<div class="player-value">' + "You Bust..!" + '</div>');
        showCompValue(); 
        computerTurn();
        $('.buttons').addClass('hide');
    }
}


function showCompValue() {
    $('#gameBoardcomp').append('<div class="computer-value"> ' + computerHand.value.toString() + ' </div>');
    if (computerHand.value > 21) {
        $('#gameBoardcomp').append('<div class="computer-value"> ' + "Computer Bust..!" + ' </div>');
    }
}

// created function for "adding" a new card always and at what position
function addCards(addHand) {
    var total = 0;
    var list = [];

    for (var i = 0; i < addHand.cards.length; i++) {

        if (addHand.cards[i].face != 'A') {
            list.unshift(addHand.cards[i]);
        }
        else {
            list.push(addHand.cards[i]);
        }
    }



    for (var i = 0; i < list.length; i++) {

        if (list[i].face != 'A') {
            total += list[i].value;
        }
        else {

            if (total < 11) {
                total += 11;
            }
            else {
                total += 1;
            }
        }
    }

    return total;
}


// created a function for building a card features like color ,face and suit
function buildCard(buildPlayer, buildColor, buildFace, buildSuit, buildHand) {

    var str = '<div class="single-left ';
    str = str.concat(buildColor);
    str = str.concat('" style ="box-shadow: 0 10px 5px #777; border: none; font-size: 24px;"><div class="facevalue">');
    str = str.concat(buildFace);
    str = str.concat('</div><div class="facetype">');
    str = str.concat(buildSuit);
    str = str.concat('</div></div>');


    if (buildPlayer == 'player') {
        $('.player-section').append(str);

        if (buildHand.cards.length == 1) {
            $('.player-section .single-left').addClass('first');
        }
    }
    else {
        $('.computer-section').append(str);

        if (buildHand.cards.length == 1) {
            $('.computer-section .single-left').addClass('first');
        }
    }
}


// created a function called hit hand for calling events when you click the hit button
function hit(hitHand) {
    var num = Math.floor((Math.random() * (deck.length - 1)));
    var temp = deck[num];
    hitHand.cards.push(temp);
    hitHand.value = addCards(hitHand);// go to line 113
   


    if (deck[num].suit == "Diamonds") {

        if (hitHand.player == 'player') {
            buildCard('player', 'red', deck[num].face, '&diams;', hitHand);
        }
        else {
            buildCard('computer', 'red', deck[num].face, '&diams;', hitHand);
        }
    }


    if (deck[num].suit == "Clubs") {
        if (hitHand.player == 'player') {
            buildCard('player', 'black', deck[num].face, '&clubs;', hitHand);
        }
        else {
            buildCard('computer', 'black', deck[num].face, '&clubs;', hitHand);
        }
    }


    if (deck[num].suit == "Hearts") {
        if (hitHand.player == 'player') {
            buildCard('player', 'red', deck[num].face, '&hearts;', hitHand);
        }
        else {
            buildCard('computer', 'red', deck[num].face, '&hearts;', hitHand);
        }
    }

    if (deck[num].suit == "Spades") {
        if (hitHand.player == 'player') {
            buildCard('player', 'black', deck[num].face, '&spades;', hitHand);
        }
        else {
            buildCard('computer', 'black', deck[num].face, '&spades;', hitHand);
        }
    }
    deck.splice(num, 1); //At position "num", remove 1 item
}

// created a function for computer turn  what computer has to do after players turn
function computerTurn() {
    if (playerHand.value < 22) {
        if (computerHand.value < 17) {
            computerHit();
            computerTurn();
        }
        else {
            checkScore();
        }
    }
    else {
        checkScore();
    }
}


// function for updating the cash,win,draw and lose
function updateCashBet() {
    $('#cash').html('Cash: <b> $' + cash.toString() + '</b>');
    $('#bet').html('Bet: <b> $' + bet.toString() + '</b>');
}

function win() {
    $('#resultShow').text('');
    $('#resultShow').removeClass('hide');
    $('#resultShow').append('<div class="result">You win $' + bet.toString() + '!</div');
    cash += bet;
    updateCashBet();
    
}

function draw() {
    $('#resultShow').text('');
    $('#resultShow').removeClass('hide');
    $('#resultShow').append('<div class="result">Draw!</div');
  
}

function lose() {
    $('#resultShow').text('');
    $('#resultShow').removeClass('hide');
    $('#resultShow').append('<div class="result">You lose $' + bet.toString() + '!</div');
    cash -= bet;
    updateCashBet();

    if (cash < bet) {
        bet = 100;
    }
    
}

// created a function for checking the score
function checkScore() {
    if (playerHand.value < 22) {
        if (playerHand.value > computerHand.value) {
            win();
        }
        else {
            if (computerHand.value < 22) {
                if (computerHand.value == playerHand.value) {
                    draw();
                }
                else {
                    lose();
                }
            }
        }

        if (computerHand.value > 21) {
            win();
        }
    }
    else {
        lose();
    }
    if (cash > 0) {
        $('#reset').removeClass('hide');
    }
    else {
        $('#resultShow').text('');
        $('#resultShow').removeClass('hide');
        $('#resultShow').append('<div class="result">Game Over!</div>');
        $('#startover').removeClass('hide');
    }
    if (deck.length < 10) {
        shuffleDeck();
    }
}

//created a function for functioning the events when we click reset or refersh
function reset() {
    $('#gameBoard').text('');
    $('#score').text('');

    $('#score').append(' <div class  = "col-md-6" id = "gameBoardPlayer"></div>');
    $('#score').append(' <div class  = "col-md-6" id = "gameBoardcomp"></div>');


    // $('#gameBoard').append('<div class="col-md-1></div>');
    $('#gameBoard').append('<div class="col-md-6  player-section card-section" style = "border-right: 2px solid lightgray;"></div>');
    // $('#gameBoard').append('<div class="col-md-1></div>');
    $('#gameBoard').append('<div class="col-md-6 computer-section card-section"></div>');

    updateCashBet();
    $('.changeBet').removeClass('hide');
    $('#resultShow').addClass('hide');
}


$('#addBet').click(function () {//bet amount increse
    if (bet < cash) {
        bet += 100;
        updateCashBet(); // go to line 246
    }
});

$('#subBet').click(function () {// bet amouny decrese
    if (bet > 100) {
        bet -= 100;
        updateCashBet();//go to line 246
    }
});

$('#placeBet').click(function () {  //place bet and stars game
    $('.changeBet').addClass('hide');// here hide the 1st stage buttons of "-", "+", "placebet"
    $('.buttons').removeClass('hide'); // remove hide on "hit" and "stay"
    startGame(); // go to line 58
});


$('#playHit').click(function () {//add cards
    hit(playerHand);
    showValue();
});

$('#playStay').click(function () {// stays for player and dealer shows score
    computerHit();
    computerTurn();
    $('.buttons').addClass('hide');
});




$('#reset').click(function () { //plage again 
    $('#reset').addClass('hide');
    reset();
});

$('#startover').click(function () {// when no amount on player cash then again restars game from first
    $('#startover').addClass('hide');
    startover();
});

function startover() {
    cash = 3000;
    bet = 300;
    updateCashBet();
    shuffleDeck();
    reset();
}

