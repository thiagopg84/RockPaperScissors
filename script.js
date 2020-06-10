let jogadas = 0;
let scoreUser = 0;
let scoreAi = 0;

const plays = [
    {id: 0, name: 'rock', src: 'img/rock.svg'},
    {id: 1, name: 'paper', src: 'img/paper.svg'},
    {id: 2 , name: 'scissors', src: 'img/scissors.svg'}
];

let user = document.querySelector('#user');
let ai = document.querySelector('#ai');

const btns = document.querySelectorAll('.buttons');
const h1 = document.querySelector('#h2');
const scoreUserHtml = document.querySelector('#scoreUser');
const scoreAiHtml = document.querySelector('#scoreAi');
const userImg = document.querySelector('#myImg');
const aiImg = document.querySelector('#aiImg');

btns.forEach((e, index) => {
    e.addEventListener('click', () => {
        play(plays[index]);
    })
});

function disableBtns() {
    btns.forEach(e => {
        e.disabled = true;
        e.classList.add('btns-endgame');
        e.classList.remove('buttons');
    });
};

function enableBtns() {
    btns.forEach(e => {
        e.disabled = false;
        e.classList.remove('btns-endgame');
        e.classList.add('buttons');
    });
};

function resetGame() {
    const resetDiv = document.querySelector('#resetDiv');
    const resetBtn = document.createElement('button');
    resetDiv.append(resetBtn);
    resetBtn.setAttribute('id', 'resetGame');
    const resetGame = document.querySelector('#resetGame');
    resetGame.classList.add('buttons', 'float');
    resetGame.innerText = 'Play again!'
    resetGame.addEventListener('click', () => {
        jogadas = 0;
        scoreUser = 0;
        scoreAi = 0;
        h1.innerText = 'Let\'s play!';
        scoreUserHtml.innerText = scoreUser;
        scoreAiHtml.innerText = scoreAi;
        userImg.setAttribute('src', plays[0].src);
        aiImg.setAttribute('src', plays[0].src);
        enableBtns();
        resetBtn.remove();
    });
}

let play = choice => {
    userImg.setAttribute('src', plays[0].src);
    aiImg.setAttribute('src', plays[0].src);
    userImg.classList.add('animation');
    aiImg.classList.add('animationAi');

    jogadas++
    let randNum = Math.floor(Math.random() * plays.length);
    // console.log(randNum)
    disableBtns();

    const changeUserImg = () => {
        userImg.setAttribute('src', choice.src);
        return choice.id;
    };
    
    const changeAiImg = () => {
        aiImg.setAttribute('src', plays[randNum].src);
        return plays[randNum].id;
    };

    const phrases = ['Rock!', 'Paper!', 'Scissors!', 'GO!'];
    let c = 0;
    const interval = setInterval(function() {
        h1.innerText = phrases[c++];
        if(c === 4) {
            clearInterval(interval);

            const waitForIt = setTimeout(() => {
                console.log(choice.id);
                console.log(plays[randNum].id);
                
                changeUserImg();
                changeAiImg();

                const userWins = () => {
                    h1.innerText = 'You win!';
                    scoreUser++;
                };

                const aiWins = () => {
                    h1.innerText = 'You lose!';
                    scoreAi++;
                };

                if(choice.id == plays[randNum].id) {
                    h1.innerText = 'It\'s a tie!';
                } else {
                    if (choice.id === 0) {
                        if (plays[randNum].id === 1) {
                            aiWins();
                        } else {
                            userWins();
                        }
                    } else if (choice.id === 1) {
                        if (plays[randNum].id === 0) {
                            userWins();
                        } else {
                            aiWins();
                        }
                    } else if (choice.id === 2) {
                        if (plays[randNum].id === 0) {
                            aiWins();
                        } else {
                            userWins();
                        }
                    };
                };
                scoreUserHtml.innerText = scoreUser;
                scoreAiHtml.innerText = scoreAi;
                userImg.classList.remove('animation');
                aiImg.classList.remove('animationAi');

                if (jogadas === 5) {
                    disableBtns();
                    if (scoreAi > scoreUser) {
                        h1.innerText = `Final score: ${scoreUser} x ${scoreAi} - You lose!`;
                    } else if (scoreAi === scoreUser) {
                        h1.innerText = `Final score: ${scoreUser} x ${scoreAi} - It's a tie!`;
                    } else {
                        h1.innerText = `Final score: ${scoreUser} x ${scoreAi} - You win!`;
                    } 
                    resetGame();
                } else {
                   enableBtns();
                };
            }, 500);
        }
    }, 350);
};