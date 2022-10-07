import getRandomHexColor from './get-random-hex-color';

const bodyElem = document.body;
const startButtonElem = document.querySelector('[data-start]');
const stopButtonElem = document.querySelector('[data-stop]');

const BACKGROUND_CHANGE_PERIOD = 1000;
let backgroundChangeIntervalId = null;

stopButtonElem.disabled = true;

startButtonElem.addEventListener('click', onStartButtonClick);
stopButtonElem.addEventListener('click', onStopButtonClick);

function changeBackgroundColor() {
  bodyElem.style.backgroundColor = getRandomHexColor();
}

function onStartButtonClick() {
  changeBackgroundColor();

  backgroundChangeIntervalId = setInterval(
    changeBackgroundColor,
    BACKGROUND_CHANGE_PERIOD
  );

  startButtonElem.disabled = true;
  stopButtonElem.disabled = false;
}

function onStopButtonClick() {
  clearInterval(backgroundChangeIntervalId);

  startButtonElem.disabled = false;
  stopButtonElem.disabled = true;
}
