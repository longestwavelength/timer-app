const resetBtn = document.querySelector('#reset');
const playBtn = document.querySelector('#play');
const timerEl = document.querySelector('#timer');
const root = document.querySelector(':root');
let hand = document.querySelector('.hand');

// Initial setup
const totalSeconds = 60;
let playing = false;
let currentSeconds = totalSeconds;

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(run, 1000); // Create the interval
}
  
  // Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval); // Clear the interval
}
  
  //Event listeners
playBtn.addEventListener('click', () => {
    playing = !playing;
    //playBtn.classList.toggle('play');
    playBtn.classList.toggle('bg-blue-300')
    playBtn.classList.toggle('bg-green-300'); // Toggle the color class
    const playIcon = playBtn.querySelector('i');
    playIcon.classList.toggle('fa-play'); // Toggle the play icon
    playIcon.classList.toggle('fa-pause'); // Toggle the pause icon
    
    // Check if the timer is currently running
    if (playing) {
      startTimer(); // Start the timer if it's not running
    } else {
      stopTimer(); // Stop the timer if it's running
    }
});
  
resetBtn.addEventListener('click', resetAll);
  
  // Run the timer
function run() {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerInterval);
      resetAll();
    }
  
    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty('--degrees', calcDeg());
    moveHand()
}
  
  // Format the time
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const newSeconds = seconds % 60;
  
    return `${minutes.toString().padStart(2, '0')}:${newSeconds
      .toString()
      .padStart(2, '0')}`;
  }
  
  // Calculate the degrees
  function calcDeg() {
    return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
  }

// Move the hand around the circle
function moveHand() {
    const degrees = calcDeg();
    hand.style.transform = `rotate(${degrees})`; // Rotate and adjust translateY translateY(-50%)
}
  
  // Reset all the values
  function resetAll() {
    playing = false;
    //playBtn.classList.remove('play');
    playBtn.classList.remove('bg-green-300'); // Remove the color class
    playBtn.classList.add('bg-blue-300')
    const playIcon = playBtn.querySelector('i');
    playIcon.classList.remove('fa-pause'); // Remove the pause icon
    playIcon.classList.add('fa-play'); // Add the play icon
    currentSeconds = totalSeconds;
    timerEl.innerText = formatTime(totalSeconds);
    root.style.setProperty('--degrees', '0deg');
    stopTimer(); // Stop the timer
    hand.style.transform = `rotate(0deg)`
  }


const timerDisplay = document.querySelector('#timer');

timerDisplay.addEventListener('click', () => {
    const newTime = prompt('Enter the time in MM:SS format (e.g., 05:30):');
    if (newTime) {
        const [minutes, seconds] = newTime.split(':').map(num => parseInt(num));
        if (!isNaN(minutes) && !isNaN(seconds) && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
            const totalSeconds = minutes * 60 + seconds;
            currentSeconds = totalSeconds;
            timerEl.innerText = formatTime(totalSeconds);
            moveHand();
        } else {
            alert('Invalid input. Please enter the time in MM:SS format (e.g., 05:30) and ensure it does not exceed 59 minutes and 59 seconds.');
        }
    }
});


