document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = Array.from(document.querySelectorAll('.mood-button'));
    const intensitySlider = document.getElementById('intensity');
    const intensityValue = document.getElementById('intensity-value');
    const notesInput = document.getElementById('notes');
    const saveEntryButton = document.getElementById('save-entry');
    const entriesList = document.getElementById('entries-list');
    const entryDaysList = document.getElementById('entry-days-list');
    const moodSummary = document.getElementById('mood-summary');
    const moodChartCtx = document.getElementById('moodChart').getContext('2d');
    const toggleThemeButton = document.getElementById('toggle-theme');
    const themeIcon = document.getElementById('theme-icon');
    const moodMessage = document.createElement('p');

    let selectedMood = null;
    let moodData = [];
    let moodChart = null;

    // Insert mood message
    moodMessage.style.marginTop = '10px';
    document.querySelector('.container').insertBefore(moodMessage, document.querySelector('.intensity-slider'));

    // Request notification permission
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') setDailyReminder();
        });
    }

    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedMood = button.getAttribute('data-mood');
            moodButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            moodMessage.textContent = `You have selected: ${selectedMood}`;
        });
    });

    intensitySlider.addEventListener('input', () => {
        intensityValue.textContent = intensitySlider.value;
    });

    saveEntryButton.addEventListener('click', () => {
        if (!selectedMood) {
            alert("Please select a mood before saving.");
            return;
        }

        const entry = {
            mood: selectedMood,
            intensity: intensitySlider.value,
            notes: notesInput.value,
            date: new Date().toLocaleDateString()
        };

        moodData.push(entry);
        updateUI(entry);
    });

    toggleThemeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeIcon.className = document.body.classList.contains('dark-theme') ? 'fa-moon' : 'fa-sun';
    });

    function updateUI(entry) {
        removeDefaultMessages();
        addEntryToList(entry);
        addEntryDay(entry);
        updateMoodChart();
        updateMoodSummary();
        sendPositiveReinforcement();
    }

    function removeDefaultMessages() {
        document.querySelectorAll('.collection-item').forEach(item => {
            if (item.textContent.includes('No entries yet')) item.remove();
        });
    }

    function addEntryToList(entry) {
        const listItem = document.createElement('li');
        listItem.className = 'collection-item';
        listItem.innerHTML = `
            Date: ${entry.date}, Mood: ${entry.mood}, Intensity: ${entry.intensity}, Notes: ${entry.notes}
            <button class="delete-entry btn-small red right">Delete</button>
        `;
        entriesList.appendChild(listItem);
        listItem.querySelector('.delete-entry').addEventListener('click', () => removeEntry(entry, listItem));
    }

    function removeEntry(entry, listItem) {
        moodData = moodData.filter(e => e !== entry);
        listItem.remove();
        updateMoodChart();
        updateMoodSummary();
    }

    function addEntryDay(entry) {
        if (!Array.from(entryDaysList.children).some(day => day.textContent === entry.date)) {
            const dayItem = document.createElement('li');
            dayItem.className = 'collection-item';
            dayItem.textContent = entry.date;
            entryDaysList.appendChild(dayItem);
        }
    }

    function updateMoodChart() {
        if (moodChart) moodChart.destroy();

        if (moodData.length === 0) return;

        const labels = moodData.map(entry => entry.date);
        const data = moodData.map(entry => entry.intensity);
        const backgroundColors = moodData.map(entry => ({
            Happy: 'rgba(255, 255, 0, 0.5)',
            Sad: 'rgba(0, 0, 255, 0.5)',
            Angry: 'rgba(255, 0, 0, 0.5)',
            Calm: 'rgba(0, 255, 0, 0.5)',
            Excited: 'rgba(255, 165, 0, 0.5)'
        }[entry.mood] || 'rgba(200, 200, 200, 0.5)'));

        moodChart = new Chart(moodChartCtx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Mood Intensity',
                    data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: { scales: { y: { beginAtZero: true, max: 10 } } }
        });
    }

    function updateMoodSummary() {
        if (moodData.length === 0) return;
        const moodCounts = moodData.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
        }, {});
        moodSummary.textContent = `Most frequent mood: ${Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b, '')}`;
    }

    function setDailyReminder() {
        const now = new Date();
        const reminderTime = new Date();
        reminderTime.setHours(9, 0, 0, 0);
        if (now > reminderTime) reminderTime.setDate(reminderTime.getDate() + 1);

        setTimeout(() => {
            new Notification("Mood Tracker", { body: "How are you feeling today?", icon: "path/to/icon.png" });
            setInterval(() => {
                new Notification("Mood Tracker", { body: "How are you feeling today?", icon: "path/to/icon.png" });
            }, 24 * 60 * 60 * 1000);
        }, reminderTime - now);
    }

    function sendPositiveReinforcement() {
        const quotes = [
            "Keep smiling, you're doing great!",
            "Every day is a new beginning.",
            "Believe in yourself and all that you are.",
            "Stay positive, work hard, make it happen."
        ];
        if (Notification.permission === 'granted') {
            new Notification("Positive Vibes", { body: quotes[Math.floor(Math.random() * quotes.length)], icon: "path/to/icon.png" });
        }
    }
});
