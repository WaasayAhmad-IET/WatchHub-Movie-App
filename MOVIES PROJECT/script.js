// API URLs
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
// Getting elements from the page
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const homeButton = document.getElementById('home-button');
// Load movies when the page opens
getMovies(API_URL);
// Function to get movies from API
function getMovies(url) {
  fetch(url)
    .then(function (response) {
      return response.json(); // Convert response into JavaScript object
    })
    .then(function (data) {
      showMovies(data.results); // Show movies on page
    })
    .catch(function (error) {
      console.error('Error:', error); // Handle any error
    });
}
// Function to display movies
function showMovies(movies) {
  main.innerHTML = ''; // Clear previous movies
  movies.forEach(function (movie) {
    const title = movie.title;
    const poster = movie.poster_path;
    const rating = movie.vote_average;
    const overview = movie.overview;
    // Create a movie box
    const movieBox = document.createElement('div');
    movieBox.classList.add('movie');
    // Add content inside the movie box
    movieBox.innerHTML = `
      <img src="${IMG_PATH + poster}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(rating)}">${rating}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;
    // Show on the screen
    main.appendChild(movieBox);
  });
}
// Function to color the rating
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
// When search form is submitted
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Stop page from refreshing
  const searchTerm = search.value.trim(); // Get what user typed
  if (searchTerm) {
    getMovies(SEARCH_API + searchTerm); // Search movie
    homeButton.style.display = 'block'; // Show home button
    search.value = ''; // Clear search box
  } else {
    window.location.reload(); // Reload the page
  }
});
// When home button is clicked
homeButton.addEventListener('click', function () {
  getMovies(API_URL); // Load popular movies again
  homeButton.style.display = 'none'; // Hide home button
  search.value = ''; // Clear search box
});