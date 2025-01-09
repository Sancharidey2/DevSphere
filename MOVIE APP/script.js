// TMDB API Configuration
const API_KEY = 'give_your_api_key';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const BACKDROP_SIZE = 'w1280';
const POSTER_SIZE = 'w500';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const movieDetails = document.getElementById('movie-details');
const movieDetailsContent = document.querySelector('.movie-details-content');
const backButton = document.querySelector('.back-button');
const favoritesLink = document.getElementById('favorites-link');
const favoritesContainer = document.querySelector('.favorites-container');
const favoritesGrid = document.getElementById('favorites-grid');
const searchContainer = document.querySelector('.search-container');
const homeLink = document.getElementById('home-link');

// Event Listeners
searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMovies();
});
searchInput.addEventListener('input', debounce(handleSearchInput, 500));
backButton.addEventListener('click', showSearchResults);
favoritesLink.addEventListener('click', showFavorites);
homeLink.addEventListener('click', goHome);

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle search input
async function handleSearchInput(e) {
    const searchTerm = e.target.value.trim();
    
    // Clear results if search term is empty
    if (searchTerm.length === 0) {
        loadTrendingMovies();
        return;
    }
    
    // Only search if we have at least 2 characters
    if (searchTerm.length < 2) return;

    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=1`);
        const data = await response.json();

        if (data.results.length > 0) {
            // Add loading animation
            searchResults.innerHTML = '<div class="loading">Searching...</div>';
            
            // Display results with a slight delay for better UX
            setTimeout(() => {
                displayMovies(data.results);
                
                // Show "Showing results for..." message
                const resultsMessage = document.createElement('div');
                resultsMessage.className = 'results-message';
                resultsMessage.textContent = `Showing results for "${searchTerm}"`;
                searchResults.insertBefore(resultsMessage, searchResults.firstChild);
            }, 300);
        } else {
            searchResults.innerHTML = '<p class="error">No movies found. Try a different search term.</p>';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        searchResults.innerHTML = '<p class="error">Error fetching movies. Please try again.</p>';
    }
}

// Search Movies Function (now used for the search button click)
async function searchMovies() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm.length === 0) return;

    try {
        // Add loading animation
        searchResults.innerHTML = '<div class="loading">Searching...</div>';
        
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&page=1`);
        const data = await response.json();

        if (data.results.length > 0) {
            displayMovies(data.results);
            
            // Show "Showing results for..." message
            const resultsMessage = document.createElement('div');
            resultsMessage.className = 'results-message';
            resultsMessage.textContent = `Showing results for "${searchTerm}"`;
            searchResults.insertBefore(resultsMessage, searchResults.firstChild);
        } else {
            searchResults.innerHTML = '<p class="error">No movies found. Try a different search term.</p>';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        searchResults.innerHTML = '<p class="error">Error fetching movies. Please try again.</p>';
    }
}

// Get favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Display Movies in Grid
function displayMovies(movies) {
    searchResults.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        searchResults.appendChild(movieCard);
    });
}

// Create Movie Card
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    const posterPath = movie.poster_path 
        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
        : 'https://via.placeholder.com/300x450.png?text=No+Poster';
    
    card.innerHTML = `
        <img src="${posterPath}" alt="${movie.title}">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${new Date(movie.release_date).getFullYear()}</p>
            <p class="rating">⭐ ${movie.vote_average.toFixed(1)}/10</p>
        </div>
    `;
    card.addEventListener('click', () => getMovieDetails(movie.id));
    return card;
}

// Get Movie Details
async function getMovieDetails(id) {
    try {
        const [movieResponse, creditsResponse] = await Promise.all([
            fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
            fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
        ]);

        const movie = await movieResponse.json();
        const credits = await creditsResponse.json();
        
        displayMovieDetails(movie, credits);
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Display Movie Details
function displayMovieDetails(movie, credits) {
    const isFavorite = favorites.some(fav => fav.id === movie.id);
    const director = credits.crew.find(person => person.job === 'Director');
    const cast = credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    
    const backdropPath = movie.backdrop_path 
        ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`
        : null;
    
    const posterPath = movie.poster_path 
        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
        : 'https://via.placeholder.com/300x450.png?text=No+Poster';

    movieDetailsContent.innerHTML = `
        ${backdropPath ? `<div class="backdrop" style="background-image: url('${backdropPath}')"></div>` : ''}
        <div class="movie-poster">
            <img src="${posterPath}" alt="${movie.title}">
        </div>
        <div class="movie-info-detailed">
            <h2>${movie.title}</h2>
            <div class="movie-meta">
                <span>${new Date(movie.release_date).getFullYear()}</span>
                <span>${movie.runtime} min</span>
                <span>⭐ ${movie.vote_average.toFixed(1)}/10</span>
            </div>
            <p><strong>Genre:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
            ${director ? `<p><strong>Director:</strong> ${director.name}</p>` : ''}
            <p><strong>Cast:</strong> ${cast}</p>
            <p><strong>Overview:</strong> ${movie.overview}</p>
            <div class="additional-info">
                <p><strong>Budget:</strong> $${(movie.budget / 1000000).toFixed(1)}M</p>
                <p><strong>Revenue:</strong> $${(movie.revenue / 1000000).toFixed(1)}M</p>
            </div>
            <button class="favorite-button" onclick="toggleFavorite(${JSON.stringify(movie)})">
                ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    `;

    searchContainer.classList.add('hidden');
    favoritesContainer.classList.add('hidden');
    movieDetails.classList.remove('hidden');
}

// Toggle Favorite
function toggleFavorite(movie) {
    const index = favorites.findIndex(fav => fav.id === movie.id);
    
    if (index === -1) {
        favorites.push(movie);
        showNotification('Added to favorites!');
    } else {
        favorites.splice(index, 1);
        showNotification('Removed from favorites!');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayMovieDetails(movie); // Refresh the details view
}

// Show Favorites
function showFavorites() {
    searchContainer.classList.add('hidden');
    movieDetails.classList.add('hidden');
    favoritesContainer.classList.remove('hidden');
    
    displayFavorites();
}

// Display Favorites
function displayFavorites() {
    favoritesGrid.innerHTML = '';
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p class="error">No favorite movies added yet.</p>';
        return;
    }

    favorites.forEach(movie => {
        const movieCard = createMovieCard(movie);
        favoritesGrid.appendChild(movieCard);
    });
}

// Show Search Results
function showSearchResults() {
    movieDetails.classList.add('hidden');
    favoritesContainer.classList.add('hidden');
    searchContainer.classList.remove('hidden');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to go to home page
function goHome() {
    // Clear search input
    searchInput.value = '';
    
    // Hide other containers
    movieDetails.classList.add('hidden');
    favoritesContainer.classList.add('hidden');
    
    // Show search container
    searchContainer.classList.remove('hidden');
    
    // Load trending movies
    loadTrendingMovies();
    
    // Update active state in navigation
    document.querySelector('.nav-links a.active')?.classList.remove('active');
    document.querySelector('.nav-links a:first-child').classList.add('active');
}

// Load trending movies on page load
async function loadTrendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching trending movies:', error);
    }
}

// Load trending movies when the page loads
document.addEventListener('DOMContentLoaded', loadTrendingMovies);
