function updateDigitalClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    
    const dateString = `${year}-${month}-${day}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
  
    document.getElementById("digital-clock").innerText = `${dateString} ${timeString}`;
  }
  
  // Update digital clock every second
  setInterval(updateDigitalClock, 1000);
  
  // Call the function once immediately to initialize the clock
  updateDigitalClock();  