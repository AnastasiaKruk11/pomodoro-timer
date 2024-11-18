const pomodoroBtn = document.querySelector('#pomodoro');
const breakBtn = document.querySelector('#break');
const timer = document.querySelector('#pomodoro-time');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');

const timerClock = timer.innerText.split(':');

let minutes = timerClock[0];
let seconds = timerClock[1];
let pomodoroTimer;
let mode = 'pomodoro';
let activity = 'stop';

startBtn.addEventListener('click', function() {

    if (activity === 'stop') {
        activity = 'run';
        pomodoroTimer = setInterval(() => {

                startBtn.innerText = 'stop';

                seconds--;

                if (minutes <= 0 && seconds <= 0) {
                    clearInterval(pomodoroTimer);
                    if (mode === 'pomodoro') {
                        minutes = 25;
                    } else {
                        minutes = 5;
                    };
                    seconds = 0;
                    startBtn.innerText = 'start';

                } else if (seconds < 0) {
                    minutes--;
                    seconds = 59;
                };

                if (seconds < 10) {
                    seconds = '0' + seconds;
                };

                timer.innerText = `${minutes}:${seconds}`;

                if (minutes < 10) {
                    timer.innerText = `0${minutes}:${seconds}`;
                };
            },
            10);

    } else {
        activity = 'stop';
        clearInterval(pomodoroTimer);
        startBtn.innerText = 'start';
    };
});

function clearTimer() {
    clearInterval(pomodoroTimer);
    startBtn.innerText = 'start';
    if (mode === 'pomodoro') {
        minutes = 25;
    } else {
        minutes = 5;
    }
    seconds = 0;
    if (minutes < 10) {
        timer.innerText = `0${minutes}:0${seconds}`;
    } else {
        timer.innerText = `${minutes}:0${seconds}`;
    }
}

resetBtn.addEventListener('click', clearTimer);

pomodoroBtn.addEventListener('click', function() {

    clearTimer();
    mode = 'pomodoro';
    minutes = 25;
    seconds = 0;
    timer.innerText = `${minutes}:0${seconds}`;
    breakBtn.classList.remove('active');
    pomodoroBtn.classList.add('active');

});

breakBtn.addEventListener('click', function() {

    clearTimer();
    mode = 'rest';
    breakBtn.classList.add('active');
    pomodoroBtn.classList.remove('active');
    minutes = 5;
    seconds = 0;
    timer.innerText = `0${minutes}:0${seconds}`;

});