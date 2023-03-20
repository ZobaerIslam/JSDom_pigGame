'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1')

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')


const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
    
        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = 'dice-' + dice + '.png';
    
        // Check for rolled 1: if true, switch to next player
        if(dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById('current--' + activePlayer).textContent = currentScore;
        }
        // Switch to next player
        else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. Add current score to active players score;
        scores[activePlayer] += currentScore;
        document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
    
        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 30) {
            // finish the game  
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
        }
        // Switch to the next player
        else {
            switchPlayer();
        }
    }

})
