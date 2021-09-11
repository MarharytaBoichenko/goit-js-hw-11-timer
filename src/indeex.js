import './sass/main.scss';

import createMarkup from './js/markup';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.selector = selector;
    document.body.insertAdjacentHTML('beforeend', createMarkup(selector));
    this.container = document.getElementById(selector);
    this.addListeners();
  }

  addListeners = () => {
    this.container.querySelector('.start').addEventListener('click', this.start);
    this.container.querySelector('.stop').addEventListener('click', this.stop);
  };

  upageTimer = (days, hours, mins, secs) => {
    this.container.querySelector('[data-value="days"]').textContent = days;
    this.container.querySelector('[data-value="hours"]').textContent = hours;
    this.container.querySelector('[data-value="mins"]').textContent = mins;
    this.container.querySelector('[data-value="secs"]').textContent = secs;
  };

  makeCounter = () => {
    const currentDate = Date.now();
    const deltaTime = this.targetDate - currentDate;
    const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
    this.upageTimer(days, hours, mins, secs);
    // console.log(`start`);
  };

  start = () => {
    // this.intervalId = setInterval(() => {
    //   console.log(`start`);
    //   this.makeCounter()
    // }, 1000
    // )
    this.intervalId = setInterval(this.makeCounter, 1000);
  };

  stop = () => {
    clearInterval(this.intervalId);
    const timeToCount = this.getTimeComponents(0);
    console.log('Остановить');
  };

  getTimeComponents = time => {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  };

  pad = value => {
    return String(value).padStart(2, '0');
  };
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('2021 october 26 20:00'),
});
const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('2021 october 30 20:00'),
});
const timer3 = new CountdownTimer({
  selector: '#timer-3',
  targetDate: new Date('2021 october 19 20:00'),
});
