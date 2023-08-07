import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');
const timerValueAll = document.querySelectorAll('.field');
const timerValue = [...timerValueAll];

timer.style.display = 'flex';
timer.style.columnGap = '40px';
timerValue.forEach(el => {
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  el.style.fontWeight = '600';
  el.style.textTransform = 'uppercase';
});

let formatDate = null;
let differences = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferences(selectedDates[0]);
  },
};

flatpickr(dateInput, options);

startBtn.disabled = true;

startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  startBtn.disabled = true;
  dateInput.disabled = true;
  timerId = setInterval(startTimer, 1000);
}

function startTimer() {
  differences -= 1000;
  if (
    formatDate.days <= 0 &&
    formatDate.hours <= 0 &&
    formatDate.minutes <= 0 &&
    formatDate.seconds <= 0
  ) {
    Notify.success('Time end!');
    clearInterval(timerId);
  } else {
    formatDate = convertMs(differences);
    render(formatDate);
  }
}

function currentDifferences(selectedDates) {
  console.log(selectedDates);
  const currentDay = Date.now();
  if (selectedDates <= currentDay) {
    startBtn.disabled = true;
    Notify.failure('Please choose a date in the future');
  } else {
    startBtn.disabled = false;
    differences = selectedDates.getTime() - currentDay;
    formatDate = convertMs(differences);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function render(formatDate) {
  days.textContent = addLeadingZero(formatDate.days);
  hours.textContent = addLeadingZero(formatDate.hours);
  minutes.textContent = addLeadingZero(formatDate.minutes);
  seconds.textContent = addLeadingZero(formatDate.seconds);
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
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
