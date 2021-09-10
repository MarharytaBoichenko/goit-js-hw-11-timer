import './sass/main.scss';
// import createMarkup from "./js/markup.js";

import markup from "../templates/markup.hbs";

// import { refs } from "./js/refs.js";
// const { day, hour, min, sec, stopBtn, continueBtn } = refs;
// console.log(refs.day);
const body = document.querySelector('body');
const counterEl = document.querySelector('.counter');
console.log(counterEl);

// const markup = createMarkup();    


// const markupOne = createMarkup();    
// body.insertAdjacentHTML('afterbegin', markupOne);

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.intervalId = null;
        this.selector = selector;
        this.targetDate = targetDate;
        this.markup = markup;
        this.makeCounter()
        this.start();
    };

    // getRefs() {
    //       return {
    //         day: document.querySelector(`${this.selector} [data-value="days"]`),
    //         hour: document.querySelector(`${this.selector} [data-value="hours"]`),
    //         min: document.querySelector(`${this.selector} [data-value="mins"]`),
    //         sec: document.querySelector(`${this.selector} [data-value="secs"]`),
    //     //     stopBtn: document.querySelector(`${this.selector} [data-action-stop]`),
    //     //     continueBtn: document.querySelector(`${this.selector} [data-action-continue]`),
    //     }
    // };
   

    makeCounter(date, id) {
        const currentDate = Date.now();
        const deltaTime = - (currentDate - this.targetDate);
        const timeToCount = this.getTimeComponents(deltaTime);
        console.log(timeToCount);
        // const markupOne = this.markup(
        //     this.getTimeComponents(deltaTime), this.selector);
        // console.log(markupOne);
        // body.insertAdjacentHTML('afterbegin', markupOne);
        counterEl.innerHTML = `${this.markup(
            timeToCount, this.selector
        )}`;
        
    };

    start() {
        // const markupTimer = markup(this.getTimeComponents(deltaTime));   
        // console.log(markupTimer);
        // body.insertAdjacentHTML('afterbegin', markupTimer);

        this.intervalId = setInterval(this.makeCounter, 1000, this.targetDate, this.selector);  
    }

    stop() {
        clearInterval(this.intervalId);
        const timeToCount = this.getTimeComponents(0);
        // this.updateInterface(timeToCount);
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
    };

    // updateInterface({ days, hours, mins, secs }) {
    //     const values = this.getRefs();
    //     console.log(values);
  
    // values.day.textContent = days;
    // values.hour.textContent = hours;
    // values.min.textContent = mins;
    // values.sec.textContent = secs;
    // };

}

const timer = new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Oct 26, 2021'),
});

// const timerOne = new CountdownTimer({
//      selector: '#timer-2',
//     targetDate: new Date('Nov 26, 2021'),
// })

const stopBtn = document.querySelector( '[data-action-stop]');
const continueBtn = document.querySelector('[data-action-continue]');
console.log(stopBtn);

stopBtn.addEventListener('click', timer.stop.bind(timer));
continueBtn.addEventListener('click', timer.start.bind(timer));