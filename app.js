const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#00FFFF', '#9400D3', '#FFD700', '#FF0000', '#5a62ff', '#9ef3f1', '#7FFF00', '#fa2dd7'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();  //удаляем # на ссылке, когда нажимаем на кнопку
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {         //проверяет кликаем ли мы по кнопке с классом time-btn
        time = parseInt(event.target.getAttribute('data-time')); //когда кликаем по кнопкам получаем число
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});


function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
    // timeEl.innerHTML = `00:${time}`
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
        // timeEl.innerHTML = `00:${current}`
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;
    board.append(circle);
    circle.style.background = `${color}`;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

