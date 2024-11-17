const pomodoroBtn = document.querySelector('#pomodoro');
const breakBtn = document.querySelector('#break');
const timer = document.querySelector('#pomodoro-time');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');

const timerClock = timer.innerText.split(':');

let minutes = timerClock[0];
let seconds = timerClock[1];

function startCount(defaultTime) {

    startBtn.addEventListener('click', function() {

        let pomodoroTimer = setInterval(() => {

                startBtn.innerText = 'stop';

                seconds--;

                if (minutes <= 0 && seconds <= 0) {
                    clearInterval(pomodoroTimer);
                    minutes = defaultTime;
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


                function clearTimer() {
                    clearInterval(pomodoroTimer);
                    startBtn.innerText = 'start';
                    minutes = defaultTime;
                    seconds = 0;
                    if (minutes < 10) {
                        timer.innerText = `0${minutes}:0${seconds}`;
                    } else {
                        timer.innerText = `${minutes}:0${seconds}`;
                    }
                }

                resetBtn.addEventListener('click', clearTimer);
                startBtn.addEventListener('click', clearTimer);

            },
            1000);
    });
}

startBtn.addEventListener('click', startCount(25));

pomodoroBtn.onclick = function() {

    clearInterval(pomodoroTimer);
    minutes = 25;
    seconds = 0;
    timer.innerText = `${minutes}:0${seconds}`;
    breakBtn.classList.remove('active');
    pomodoroBtn.classList.add('active');

    startCount(25);

};

breakBtn.onclick = function() {

    breakBtn.classList.add('active');
    pomodoroBtn.classList.remove('active');
    minutes = 5;
    seconds = 0;
    timer.innerText = `0${minutes}:0${seconds}`;

    startCount(5);
};