var boxes = document.querySelectorAll('.box');
var winningCombos = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];
var players = document.querySelectorAll('.players');

var player1 = document.querySelector('.players #player1');
var player1Moves = [];
var player1ScoreTextContent = document.querySelector('#player1 .score');
var player1ScoreCount = 0;

var player2Moves = [];
var player2 = document.querySelector('.players #player2');
var player2ScoreTextContent = document.querySelector('#player2 .score');
var player2ScoreCount = 0;

var activePlayer = '';
var boardSize = 3;

var winner = document.querySelector('.winner');
var newGameButton = document.querySelector('.new-game');

function makeMove(event, activePlayer) {
  if(!event.target.classList.contains('clicked')) {
    event.target.classList.toggle(activePlayer);
    event.target.classList.toggle('clicked');
    window[activePlayer + 'Moves'].push(Number(event.target.id));
    
    if(window[activePlayer + 'Moves'].length >= boardSize) {
      checkForWin(activePlayer);
    }
    alternatePlayers();
  }
}

function alternatePlayers() {
  if(activePlayer === 'player1') {
    player2.classList.add('active');
    player1.classList.remove('active');
    activePlayer = 'player2';
  } else {
    player1.classList.add('active');
    player2.classList.remove('active');
    activePlayer = 'player1';
  }
}

function checkForWin(activePlayer) {
  var winningMoveCounter = 0;
  var currentPlayerMoves = window[activePlayer + 'Moves'];
  for(var i = 0; i < winningCombos.length; i++) {
    for(var j = 0; j < currentPlayerMoves.length; j++) {
      if(winningCombos[i].includes(currentPlayerMoves[j])) {
        ++winningMoveCounter;
      }
    }
    if(winningMoveCounter === boardSize) {
      updateScore(activePlayer);
      break;
    }
    winningMoveCounter = 0;
  }
}

function updateScore(activePlayer) {
  window[activePlayer + 'ScoreCount'] += 1;
  window[activePlayer + 'ScoreTextContent'].textContent = window[activePlayer + 'ScoreCount'] + ' / ' + boardSize;
  if (window[activePlayer + 'ScoreCount'] === boardSize) {
    endGame(activePlayer);
  } else {
    player1Moves = [];
    player2Moves = [];
    boxes.forEach(function(box) {
      box.classList.remove('clicked');
      box.classList.remove('player1');
      box.classList.remove('player2');
    })
  }
}

function endGame(activePlayer) {
  if(activePlayer === 'player1') {
    winner.textContent = activePlayer + ' has won ' + player1ScoreCount + ' to ' + player2ScoreCount;
  } else {
    winner.textContent = activePlayer + ' has won ' + player2ScoreCount + ' to ' + player1ScoreCount;
  }
}

function startNewGame() {
  player1Moves = [];
  player2Moves = [];
  player1.classList.remove('active');
  player2.classList.remove('active');
  boxes.forEach(function(box) {
    box.classList.remove('clicked');
    box.classList.remove('player1');
    box.classList.remove('player2');
  })
  players.forEach(function(player) {
    player.classList.remove('active');
  })
  player1ScoreCount = 0;
  player1ScoreTextContent.textContent = '0 / ' + boardSize;
  player2ScoreCount = 0;
  player2ScoreTextContent.textContent = '0 / ' + boardSize;
  setStartingPlayerRandomly();
}

function setStartingPlayerRandomly() {
  var randomPlayer = Math.floor((Math.random() * 2) + 1);
  if (randomPlayer === 1) {
    activePlayer = 'player1';
  } else {
    activePlayer = 'player2';
  }
  window[activePlayer].classList.add('active');
}

boxes.forEach(function(box){
  box.addEventListener('click', function() {
    makeMove(event, activePlayer);
  });
})

newGameButton.addEventListener('click', startNewGame);

startNewGame();