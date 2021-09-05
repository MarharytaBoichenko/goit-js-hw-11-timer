import './sass/main.scss';
import createMarkup from "./js/markup.js";
// import { refs } from "./js/refs.js";
// const { day, hour, min, sec, stopBtn, continueBtn } = refs;
// console.log(refs.day);
const body = document.querySelector('body');

const markup = createMarkup();    
body.insertAdjacentHTML('afterbegin', markup);

const refs = {
    day: document.querySelector('[data-value="days"]'),
    hour: document.querySelector('[data-value="hours"]'),
    min: document.querySelector('[data-value="mins"]'),
    sec: document.querySelector('[data-value="secs"]'),
    stopBtn: document.querySelector('[data-action-stop]'),
    continueBtn: document.querySelector('[data-action-continue]'),
};

const { day, hour, min, sec, stopBtn, continueBtn } = refs;
console.log(day);

class CountdownTimer {
    constructor({ selector, targetDate, onTickTimer }) {
        this.intervalId = null;
        this.selector = selector;
        this.targetDate = targetDate;
        this.onTickTimer = onTickTimer;
    }
   
    start() {
        this.intervalId = setInterval(() => {
            const currentDate = Date.now();
            const deltaTime = - (currentDate - this.targetDate);
            const timeToCount = this.getTimeComponents(deltaTime);
            this.onTickTimer(timeToCount);
        }, 1000);  
    }

    stop() {
        clearInterval(this.intervalId);
        const timeToCount = this.getTimeComponents(0);
        this.onTickTimer(timeToCount);
        console.log("Остановить");
    }
    
    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { days, hours, mins, secs };
    };

    pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Oct 26, 2021'),
  onTickTimer: updateInterface,
});

timer.start();

function updateInterface({ days, hours, mins, secs }) {
day.textContent = days;
hour.textContent = hours;
min.textContent = mins;
sec.textContent = secs;
};

stopBtn.addEventListener('click', timer.stop.bind(timer));
continueBtn.addEventListener('click', timer.start.bind(timer));