const WORK_DURATION = 25 * 60; // 25 minutes
const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

// State
let mode = "work";
let timeLeft = WORK_DURATION;
let intervalId = null;

let totalWorkMinutes = 0;
let totalBreakMinutes = 0;

const productivityTimerDisplay = document.getElementById("productivity-timer");
const breakTimerDisplay = document.getElementById("break-timer");
const modeLabel = document.getElementById("mode-label");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");

const workTotalEl = document.getElementById("work-total");
const breakTotalEl = document.getElementById("break-total");

// Helper Functions

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateDisplay() {
    productivityTimerDisplay.textContent = formatTime(timeLeft);
    breakTimerDisplay.textContent = formatTime(timeLeft);
    // modeLabel.textContent = mode === "work" ? "Productivity" : "Break";
    workTotalEl.textContent = `Time Working: ${Math.floor(totalWorkMinutes / 60)}:${totalWorkMinutes % 60 < 10 ? '0' : ''}${totalWorkMinutes % 60}`;
    breakTotalEl.textContent = `Time on Break: ${Math.floor(totalBreakMinutes / 60)}:${totalBreakMinutes % 60 < 10 ? '0' : ''}${totalBreakMinutes % 60}`;
}

// Timer Logic

function startTimer() {
    console.log("Starting timer...");

    if (intervalId) return; // prevent double intervals

    intervalId = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
        handleSessionEnd();
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  console.log("Timer Paused");
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
    console.log("Timer Reset");
    pauseTimer();
  mode = "work";
    timeLeft = WORK_DURATION;
    updateDisplay();
    }

function handleSessionEnd() {
  pauseTimer();

  if (mode === "work") {
    totalWorkMinutes += WORK_DURATION / 60;
    mode = "break";
    timeLeft = BREAK_DURATION;
  } else {
    totalBreakMinutes += BREAK_DURATION / 60;
    mode = "work";
    timeLeft = WORK_DURATION;
  }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();