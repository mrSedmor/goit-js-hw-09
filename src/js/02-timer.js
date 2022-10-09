import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import '../css/02-timer.css';

const startButtonRef = document.querySelector('[data-start]');
const stopButtonRef = document.querySelector('[data-stop]');
const daysFieldRef = document.querySelector('[data-days]');
const hoursFieldRef = document.querySelector('[data-hours]');
const minutesFieldRef = document.querySelector('[data-minutes]');
const secondsFieldRef = document.querySelector('[data-seconds]');

let timerId = null;
let isTimerActive = false;

const datetimePickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  mode: 'single',
  onClose: ([date]) => {
    if (date.getTime() <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButtonRef.disabled = true;
      return;
    }

    startButtonRef.disabled = false;
  },
};

const datetimePicker = flatpickr('#datetime-picker', datetimePickerOptions);

startButtonRef.addEventListener('click', onStartButtonClick);
stopButtonRef.addEventListener('click', onStopButtonClick);

startButtonRef.disabled = true;
stopButtonRef.disabled = true;

function onStartButtonClick() {
  const expireTime = datetimePicker.selectedDates[0].getTime();

  startButtonRef.disabled = true;
  stopButtonRef.disabled = false;

  if (isTimerActive) {
    clearInterval(timerId);
  }

  timerId = setInterval(updateTimer, 1000);
  updateTimer();
  isTimerActive = true;

  function updateTimer() {
    let timeLeft = expireTime - Date.now();
    if (timeLeft < 1000) {
      timeLeft = 0;
      clearInterval(timerId);
      isTimerActive = false;
      stopButtonRef.disabled = true;
      Notiflix.Notify.info("Time's up!");
    }
    renderTimer(timeLeft);
  }
}

function onStopButtonClick() {
  clearInterval(timerId);
  isTimerActive = false;
  renderTimer(0);
  startButtonRef.disabled =
    datetimePicker.selectedDates[0].getTime() <= Date.now();
  stopButtonRef.disabled = true;
}

function renderTimer(timeMs) {
  const { days, hours, minutes, seconds } = convertMs(timeMs);
  daysFieldRef.textContent = addLeadingZero(days);
  hoursFieldRef.textContent = addLeadingZero(hours);
  minutesFieldRef.textContent = addLeadingZero(minutes);
  secondsFieldRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor((ms % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}
