export default function createMarkup(selector) {
  return `<div class="timer" id="${selector}">
  <div class="field">
    <span class="value" data-value="days">11</span>
    <span class="label">Days</span>
  </div>

  <div class="field">
    <span class="value" data-value="hours">11</span>
    <span class="label">Hours</span>
  </div>

  <div class="field">
    <span class="value" data-value="mins">11</span>
    <span class="label">Minutes</span>
  </div>

  <div class="field">
    <span class="value" data-value="secs">11</span>
    <span class="label">Seconds</span>
  </div>
  <button class="timer-btn stop " data-action-stop>Остановить отсчет</button>
    <button class="timer-btn start" data-action-continue>Продолжить отсчет</button>
</div>
`
}