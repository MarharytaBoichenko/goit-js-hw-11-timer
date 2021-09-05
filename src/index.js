import './sass/main.scss';
import createMarkup from "./js/markup.js";

const body = document.querySelector('body');
console.log(body);

const markup = createMarkup();    
body.insertAdjacentHTML('afterbegin', markup);

const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
    stopBtn: document.querySelector('[data-action-stop]')
}

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
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
        return { days, hours, mins, secs };
    };
}

const timer = new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Oct 26, 2021'),
  onTickTimer: updateInterface,
});

timer.start();

function updateInterface({ days, hours, mins, secs }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
};

refs.stopBtn.addEventListener('click', timer.stop.bind(timer));