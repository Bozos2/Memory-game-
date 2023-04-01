"use strict";
const Game = document.querySelector(".game");
const cards = document.querySelectorAll(".card");
const OnePlayer = document.getElementById("player1-stats");
const TwoPlayers = document.querySelector(".twoplayers-stats");
const time = document.getElementById("time");
const flips = document.getElementById("flips");
const TwoPlayersScore1 = document.getElementById("score--0");
const TwoPlayersScore2 = document.getElementById("score--1");
const TwoPlayersPlayer1 = document.getElementById("player1");
const TwoPlayersPlayer2 = document.getElementById("player2");
const ControlContainer = document.querySelector(".controls-container");
const GameContainer = document.querySelector(".wrapper");

const btnOneplayer = document.getElementById("start-1");
const btnTwoplayers = document.getElementById("start-2");
const btnEndGame = document.getElementById("end");

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0;
let interval;
let activePlayer, scores;
let gameMode;

window.addEventListener("load", (elements) => {
  Game.classList.add("hidden");
});

//Function for flip card
function flipCard(e) {
  let clickedCard = e.target;

  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;

    disableDeck = true;

    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    scores[activePlayer] += 1;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (matchedCard == 8) {
      if (gameMode == "oneplayer") {
        alert(
          `Congratulations! ${time.textContent} ${flips.textContent} ✨✨🎊🎉🎉 `
        );
      } else if (gameMode == "twoplayers") {
        if (activePlayer === 0) {
          alert(`Congratulations  Player 1! You Won!✨✨🎊🎉🎉`);
        } else {
          alert(`Congratulations  Player 2! You Won!✨✨🎊🎉🎉`);
        }
      }
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    FlipsCounter();
    return (disableDeck = false);
  } else {
    setTimeout(() => {
      // if two card not matched
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = ""; //setting both card value to blank

      disableDeck = false;
    }, 1200);
    FlipsCounter();
    switchPlayer();
  }
}

//Function to shuffle cards on start
function shuffle() {
  matchedCard = 0;
  cardOne = cardTwo = "";

  let Arrofcards = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  Arrofcards.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);

    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${Arrofcards[index]}.png`;
  });
}
shuffle();

let seconds = 0,
  minutes = 0;
let flipsCount = 0;

//For convert and display seconds in minutes
const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  time.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const FlipsCounter = () => {
  flipsCount += 1;
  flips.innerHTML = `<span>Flips:</span>${flipsCount}`;
};

//default values at start
const init2 = function () {
  scores = [0, 0];
  activePlayer = 0;
  flipsCount = 0;
  seconds = 0;
  minutes = 0;
  matchedCard = 0;
};

//For switching active players
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("active");
  player2.classList.toggle("active");
}

//adding event to click on card
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

//Click event on 1 player mode
btnOneplayer.addEventListener("click", function () {
  init2();
  gameMode = "oneplayer";
  TwoPlayers.style.display = "none";
  time.textContent = 0;
  flips.textContent = 0;
  //Start timer
  interval = setInterval(timeGenerator, 1000);

  ControlContainer.classList.add("hidden");
  Game.classList.remove("hidden");
});

//Click event on 2 players mode
btnTwoplayers.addEventListener("click", function () {
  init2();
  gameMode = "twoplayers";
  OnePlayer.style.display = "none";
  TwoPlayersScore1.textContent = 0;
  TwoPlayersScore2.textContent = 0;

  ControlContainer.classList.add("hidden");
  Game.classList.remove("hidden");
});

//Click event to stop game and reset
btnEndGame.addEventListener("click", function () {
  location.reload();
});
