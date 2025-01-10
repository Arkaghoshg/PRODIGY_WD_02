let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.querySelector('.laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 1);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00:0000';
    startStopBtn.textContent = 'Start';
    difference = 0;
    running = false;
    laps.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        laps.appendChild(lapTime);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % (1000)) / 1);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function padMilliseconds(number) {
    if (number < 10) {
        return '000' + number;
    } else if (number < 100) {
        return '00' + number;
    } else if (number < 1000) {
        return '0' + number;
    } else {
        return number;
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);