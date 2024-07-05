// Define variables to track active and idle times
let activeStartTime = null;
let idleStartTime = null;
let activeTime = 0;
let idleTime = 0;

// Function to update active timer display
function updateActiveTimerDisplay() {
  const now = Date.now();
  const elapsedTime =
    activeTime + (activeStartTime !== null ? now - activeStartTime : 0);
  document.getElementById(
    "active-time"
  ).textContent = `Active Time: ${formatTime(elapsedTime)}`;
}

// Function to update idle timer display
function updateIdleTimerDisplay() {
  const now = Date.now();
  const elapsedTime =
    idleTime + (idleStartTime !== null ? now - idleStartTime : 0);
  document.getElementById("idle-time").textContent = `Idle Time: ${formatTime(
    elapsedTime
  )}`;
}

// Function to start active timer
function startActiveTimer() {
  if (activeStartTime === null) {
    activeStartTime = Date.now();
    document.getElementById("start-active").setAttribute("disabled", "true");
    document.getElementById("start-idle").removeAttribute("disabled");
    document.getElementById("pause-timer").removeAttribute("disabled");

    // Pause idle timer if running
    if (idleStartTime !== null) {
      idleTime += Date.now() - idleStartTime;
      idleStartTime = null;
      updateIdleTimerDisplay();
    }

    // Log entry for starting active timer
    logAction("Started Active Timer");
  }
}

// Function to start idle timer
function startIdleTimer() {
  if (idleStartTime === null) {
    idleStartTime = Date.now();
    document.getElementById("start-idle").setAttribute("disabled", "true");
    document.getElementById("start-active").removeAttribute("disabled");

    // Pause active timer if running
    if (activeStartTime !== null) {
      activeTime += Date.now() - activeStartTime;
      activeStartTime = null;
      updateActiveTimerDisplay();
    }

    // Log entry for starting idle timer
    logAction("Started Idle Timer");
  }
}

// Function to pause timers
function pauseTimers() {
  const now = Date.now();
  if (activeStartTime !== null) {
    activeTime += now - activeStartTime;
    activeStartTime = null;
  }
  if (idleStartTime !== null) {
    idleTime += now - idleStartTime;
    idleStartTime = null;
  }
  updateActiveTimerDisplay();
  updateIdleTimerDisplay();
  document.getElementById("start-active").removeAttribute("disabled");
  document.getElementById("start-idle").removeAttribute("disabled");
  document.getElementById("pause-timer").setAttribute("disabled", "true");

  // Log entry for pausing timers
  logAction("Paused Timers");
}

// Function to reset timers
function resetTimers() {
  activeStartTime = null;
  idleStartTime = null;
  activeTime = 0;
  idleTime = 0;
  updateActiveTimerDisplay();
  updateIdleTimerDisplay();
  document.getElementById("start-active").removeAttribute("disabled");
  document.getElementById("start-idle").setAttribute("disabled", "true");
  document.getElementById("pause-timer").setAttribute("disabled", "true");

  // Log entry for resetting timers
  logAction("Reset Timers");
}

// Function to format time as HH:MM:SS
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Function to log actions with timestamp
function logAction(action) {
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const logEntry = {
    timestamp: timestamp,
    action: action,
  };

  // Append log entry to table
  appendLogEntry(logEntry);
}

// Function to append log entry to table
function appendLogEntry(logEntry) {
  const tableBody = document
    .getElementById("log-table")
    .getElementsByTagName("tbody")[0];
  const row = tableBody.insertRow();
  const id = new Date().getTime(); // Unique ID based on timestamp
  row.innerHTML = `
      <td>${id}</td>
      <td>${logEntry.timestamp}</td>
      <td>${formatTime(activeTime)}</td>
      <td>${formatTime(idleTime)}</td>
      <td>${logEntry.action}</td>
      <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
    `;

  // Add event listener to delete button
  const deleteButton = row.querySelector(".delete-btn");
  deleteButton.addEventListener("click", () => {
    row.remove(); // Remove the row from the table
  });
}

// Event listeners for buttons
document.getElementById("start-active").addEventListener("click", () => {
  startActiveTimer();
});

document.getElementById("start-idle").addEventListener("click", () => {
  startIdleTimer();
});

document.getElementById("pause-timer").addEventListener("click", () => {
  pauseTimers();
});

document.getElementById("reset-timers").addEventListener("click", () => {
  resetTimers();
});

// Update timers display every second
setInterval(() => {
  updateActiveTimerDisplay();
  updateIdleTimerDisplay();
}, 1000);

// Initialize digital clock
updateDigitalClock();
