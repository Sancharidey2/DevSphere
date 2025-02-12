let is24Hour = true;
let isDarkTheme = true;
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const formatToggle = document.getElementById('formatToggle');
const themeToggle = document.getElementById('themeToggle');
const timezoneSelect = document.getElementById('timezoneSelect');

// Using the provided time as base
const baseTime = new Date('2025-01-08T02:37:05+05:30');
let timeOffset = 0;

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDate(date) {
    const weekday = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${weekday}, ${month} ${day}`;
}

function updateTime() {
    // Calculate current time based on base time and time offset
    const now = new Date(baseTime.getTime() + timeOffset);

    // Update date
    dateElement.textContent = formatDate(now);

    // Update time
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    if (!is24Hour) {
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
        timeElement.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${period}`;
    } else {
        timeElement.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('light-theme', !isDarkTheme);
    themeToggle.innerHTML = isDarkTheme 
        ? '<i class="fas fa-moon"></i><span>Theme</span>' 
        : '<i class="fas fa-sun"></i><span>Theme</span>';
}

function updateTimezone() {
    const selectedZone = timezoneSelect.value;
    const targetDate = new Date(baseTime.toLocaleString('en-US', { timeZone: selectedZone }));
    timeOffset = targetDate.getTime() - baseTime.getTime();
    updateTime();
}

// Event Listeners
formatToggle.addEventListener('click', () => {
    is24Hour = !is24Hour;
    updateTime();
});

themeToggle.addEventListener('click', toggleTheme);

timezoneSelect.addEventListener('change', updateTimezone);

// Initial update
updateTimezone();

// Update every second
setInterval(() => {
    timeOffset += 1000; // Increment by 1 second
    updateTime();
}, 1000);
