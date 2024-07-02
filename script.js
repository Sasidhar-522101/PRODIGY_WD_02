let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startButton.innerHTML = "Running...";
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.innerHTML = "Start";
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.innerHTML = "00:00:00";
    startButton.innerHTML = "Start";
    laps.innerHTML = "";
}

function lap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = lapTime;
        laps.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.innerHTML = hours + ":" + minutes + ":" + seconds;
}
