let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
}

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {

// };
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);    
    isAutoPlaying = true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  
}

document.querySelector('.js-rock-button').addEventListener('click',() => {
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click',() => {
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click',() => {
  playGame('scissors');
});

document.body.addEventListener('keydown',(event) => {
  if (event.key === 'r') {
    playGame('rock');
  }else if(event.key === 'p') {
    playGame('paper');
  }else if(event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove)
{
  let computerMove = pickComputerMove();
  let rezult = '';
  
  if(playerMove === 'rock'){
    if(computerMove === 'rock')
    {
      rezult = 'tie';
    }
    else if(computerMove === 'paper')
    {
      rezult = 'lose';
    }
    else
    {
      rezult = 'win';
    }

  }else if(playerMove === 'paper') {
    if(computerMove === 'rock')
    {
      rezult = 'win';
    }
    else if(computerMove === 'paper')
    {
      rezult = 'tie';
    }
    else
    {
      rezult = 'lose';
    }
    
  }else {
    if(computerMove === 'rock')
    {
      rezult = 'lose';
    }
    else if(computerMove === 'paper')
    {
      rezult = 'win';
    }
    else
    {
      rezult = 'tie';
    }
  }

  if(rezult === 'win') {
    score.wins++;
  }else if(rezult === 'tie') {
    score.ties++;
  }else {
    score.losses++;
  }

  localStorage.setItem('score',JSON.stringify(score));
  updateScoreElement();

  if(rezult === 'tie')
    document.querySelector('.js-result').innerHTML = 'Tie.';
  else
    document.querySelector('.js-result').innerHTML = `You ${rezult}`;

  document.querySelector('.js-moves').innerHTML = `You
    <img class="move-icon" src="Images/${playerMove}-emoji.png">
    <img class="move-icon" src="Images/${computerMove}-emoji.png">
    Computer`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber < 1/3){
    computerMove = 'rock';
  }else if(randomNumber < 2/3) {
    computerMove = 'paper';
  }else {
    computerMove = 'scissors';
  }

  return computerMove;
}
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
