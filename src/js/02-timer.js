import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

import convertMs from './convert-ms';
import Timer from './timer';

import '../css/02-timer.css';

const startButtonRef = document.querySelector('[data-start]');
const stopButtonRef = document.querySelector('[data-stop]');
const daysFieldRef = document.querySelector('[data-days]');
const hoursFieldRef = document.querySelector('[data-hours]');
const minutesFieldRef = document.querySelector('[data-minutes]');
const secondsFieldRef = document.querySelector('[data-seconds]');

const datetimePickerElem = document.querySelector('#datetime-picker');
const datetimePickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  mode: 'single',
  onClose: onDatetimeSelect,
};

const datetimePicker = flatpickr(datetimePickerElem, datetimePickerOptions);

const timer = new Timer();
timer.on('update', setTimeLeft);
timer.on('expire', onTimerExpire);

startButtonRef.addEventListener('click', onStartButtonClick);
stopButtonRef.addEventListener('click', onStopButtonClick);

startButtonRef.disabled = true;
stopButtonRef.disabled = true;

function validateTime(time) {
  if (time <= Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return false;
  }

  return true;
}

function setTimeLeft(timeMs) {
  const { days, hours, minutes, seconds } = convertMs(timeMs);
  daysFieldRef.textContent = addLeadingZero(days);
  hoursFieldRef.textContent = addLeadingZero(hours);
  minutesFieldRef.textContent = addLeadingZero(minutes);
  secondsFieldRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onDatetimeSelect([selectedDate]) {
  startButtonRef.disabled = !validateTime(selectedDate.getTime());
}

function onStartButtonClick() {
  const time = datetimePicker.selectedDates[0].getTime();
  if (!validateTime(time)) {
    startButtonRef.disabled = true;
    return;
  }

  timer.start(time);
  stopButtonRef.disabled = !timer.isActive();
}

function onStopButtonClick() {
  timer.stop();
  setTimeLeft(0);
  stopButtonRef.disabled = true;
}

function onTimerExpire() {
  stopButtonRef.disabled = true;

  Notiflix.Notify.info("Time's up!");
}
