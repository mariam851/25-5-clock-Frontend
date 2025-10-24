const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const breakInput = document.getElementById('break-input');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');
const sessionInput = document.getElementById('session-input');
const startStopButton = document.getElementById('start_stop');
const resetButton = document.getElementById('reset');
const timeLeftDisplay = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');

let timerInterval;
let isTimerRunning = false;
let isSession = true;
let timeRemaining = { minutes: parseInt(sessionInput.value, 10), seconds: 0 };

function updateDisplay(minutes, seconds) {
  timeLeftDisplay.textContent = `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}

function startTimer() {
  if (isTimerRunning) return;
  isTimerRunning = true;
  timerInterval = setInterval(() => {
    if (timeRemaining.seconds === 0) {
      if (timeRemaining.minutes === 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        if (isSession) {
          isSession = false;
          timerLabel.textContent = "Break";
          timeRemaining.minutes = parseInt(breakInput.value, 10);
        } else {
          isSession = true;
          timerLabel.textContent = "Session";
          timeRemaining.minutes = parseInt(sessionInput.value, 10);
        }
        timeRemaining.seconds = 0;
        updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
        startTimer();
      } else {
        timeRemaining.minutes -= 1;
        timeRemaining.seconds = 59;
      }
    } else {
      timeRemaining.seconds -= 1;
    }
    updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
}

function resetTimer() {
  stopTimer();
  sessionInput.value = 25;
  breakInput.value = 5;
  isSession = true;
  timerLabel.textContent = "Session";
  timeRemaining.minutes = 25;
  timeRemaining.seconds = 0;
  updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
}

startStopButton.addEventListener('click', () => {
  if (isTimerRunning) {
    stopTimer();
  } else {
    if (isSession) {
      timeRemaining.minutes = parseInt(sessionInput.value, 10);
    } else {
      timeRemaining.minutes = parseInt(breakInput.value, 10);
    }
    timeRemaining.seconds = 0;
    updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
    startTimer();
  }
});

resetButton.addEventListener('click', resetTimer);

sessionDecrement.addEventListener('click', () => {
  let val = parseInt(sessionInput.value, 10);
  if (val > 1) {
    sessionInput.value = val - 1;
    if (!isTimerRunning && isSession) {
      timeRemaining.minutes = val - 1;
      timeRemaining.seconds = 0;
      updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
    }
  }
});

sessionIncrement.addEventListener('click', () => {
  let val = parseInt(sessionInput.value, 10);
  if (val < 60) {
    sessionInput.value = val + 1;
    if (!isTimerRunning && isSession) {
      timeRemaining.minutes = val + 1;
      timeRemaining.seconds = 0;
      updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
    }
  }
});

breakDecrement.addEventListener('click', () => {
  let val = parseInt(breakInput.value, 10);
  if (val > 1) {
    breakInput.value = val - 1;
    if (!isTimerRunning && !isSession) {
      timeRemaining.minutes = val - 1;
      timeRemaining.seconds = 0;
      updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
    }
  }
});

breakIncrement.addEventListener('click', () => {
  let val = parseInt(breakInput.value, 10);
  if (val < 60) {
    breakInput.value = val + 1;
    if (!isTimerRunning && !isSession) {
      timeRemaining.minutes = val + 1;
      timeRemaining.seconds = 0;
      updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
    }
  }
});

updateDisplay(timeRemaining.minutes, timeRemaining.seconds);
