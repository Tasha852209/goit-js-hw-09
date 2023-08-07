const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = '';

stopBtn.disabled = true;
startBtn.addEventListener('click', onStartClick);

function onStartClick() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(
    () => (body.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

stopBtn.addEventListener('click', onStopClick);

function onStopClick() {
  stopBtn.disabled = true;
  startBtn.disabled = false;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
