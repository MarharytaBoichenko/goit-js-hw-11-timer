import './sass/main.scss';

import createMarkup from './js/markup';

class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.intervalId = null;
        this.selector = selector;
        this.targetDate = targetDate;
       
        document.body.insertAdjacentHTML('afterbegin', createMarkup(selector));
        this.container = document.getElementById(selector);
        console.log(this.container)
        this.start();
        this.addListenersBtns();            
    };
  
      start(){
        this.intervalId = setInterval(() => {
            const currentDate = Date.now();
            const deltaTime = this.targetDate - currentDate;
            const time = this.getTimeComponents(deltaTime);
            console.log(`start`);
    
            this.updateInterface(time)
        }, 1000); 
    }; 

     addListenersBtns() {
        const stopBtn = this.container.querySelector('[data-action-stop]');
        const continueBtn = this.container.querySelector('[data-action-continue]');
        stopBtn.addEventListener('click', this.stop.bind(this));
        continueBtn.addEventListener('click', this.start.bind(this));
    };

    updateInterface({ days, hours, mins, secs }) {
            this.container.querySelector('[data-value="days"]').textContent = days;
            this.container.querySelector('[data-value="hours"]').textContent = hours;
            this.container.querySelector('[data-value="mins"]').textContent = mins;
            this.container.querySelector('[data-value="secs"]').textContent = secs;
    };

    stop() {
        clearInterval(this.intervalId);
        console.log("Остановить");
        const timeToCount = this.getTimeComponents(0);
        this.updateInterface(this.getTimeComponents(0));    
    };
    
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
}

const timer = new CountdownTimer({
  selector: '#timer-1',
    targetDate: new Date('Oct 26, 2021'),
});

const timerOne = new CountdownTimer({
     selector: '#timer-2',
    targetDate: new Date('Nov 26, 2021'),
})
