let activeStartTime, idleStartTime;
let totalActiveTime = 0, totalIdleTime = 0;
let logData = JSON.parse(localStorage.getItem('logData')) || [];
let activeInterval, idleInterval;

// Function to start the active timer
function startActiveTimer() {
    if (idleStartTime) {
        clearInterval(idleInterval);
        const elapsedTime = new Date() - idleStartTime;
        totalIdleTime += elapsedTime;
        idleStartTime = null;
        updateIdleTime();
        saveData();
    }
    activeStartTime = new Date();
    activeInterval = setInterval(updateActiveTime, 1000);
    document.getElementById('start-active').setAttribute('disabled', 'disabled');
    document.getElementById('start-idle').removeAttribute('disabled');
}

// Function to start the idle timer
function startIdleTimer() {
    if (activeStartTime) {
        clearInterval(activeInterval);
        const elapsedTime = new Date() - activeStartTime;
        totalActiveTime += elapsedTime;
        activeStartTime = null;
        updateActiveTime();
        saveData();
    }
    idleStartTime = new Date();
    idleInterval = setInterval(updateIdleTime, 1000);
    document.getElementById('start-idle').setAttribute('disabled', 'disabled');
    document.getElementById('start-active').removeAttribute('disabled');
}

// Event listener for starting Active timer
document.getElementById('start-active').addEventListener('click', startActiveTimer);

// Event listener for starting Idle timer
document.getElementById('start-idle').addEventListener('click', startIdleTimer);

// Event listener for resetting timers
document.getElementById('reset-timers').addEventListener('click', () => {
    clearInterval(activeInterval);
    clearInterval(idleInterval);
    totalActiveTime = 0;
    totalIdleTime = 0;
    activeStartTime = null;
    idleStartTime = null;
    updateActiveTime();
    updateIdleTime();
    document.getElementById('start-active').removeAttribute('disabled');
    document.getElementById('start-idle').setAttribute('disabled', 'disabled');
});

// Update active timer display
function updateActiveTime() {
    const elapsedTime = activeStartTime ? (new Date() - activeStartTime) + totalActiveTime : totalActiveTime;
    document.getElementById('active-time').innerText = `Active Time: ${formatTime(elapsedTime)}`;
}

// Update idle timer display
function updateIdleTime() {
    const elapsedTime = idleStartTime ? (new Date() - idleStartTime) + totalIdleTime : totalIdleTime;
    document.getElementById('idle-time').innerText = `Idle Time: ${formatTime(elapsedTime)}`;
}

// Format time in HH:mm:ss format
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Save timer data to localStorage
function saveData() {
    const data = {
        id: Date.now(),
        activeTime: totalActiveTime,
        idleTime: totalIdleTime
    };
    logData.push(data);
    localStorage.setItem('logData', JSON.stringify(logData));
    renderLogTable();
}

// Delete entry from log data and update localStorage
function deleteData(id) {
    logData = logData.filter(entry => entry.id !== id);
    localStorage.setItem('logData', JSON.stringify(logData));
    renderLogTable();
}

// Render log table with stored data
function renderLogTable() {
    const tbody = document.getElementById('log-table').querySelector('tbody');
    tbody.innerHTML = '';
    logData.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.id}</td>
            <td>${formatTime(entry.activeTime)}</td>
            <td>${formatTime(entry.idleTime)}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteData(${entry.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Initialize log table on page load
renderLogTable();