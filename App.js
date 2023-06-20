// Fetch movies from the external API
function fetchMovies() {
  fetch('https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch(error => {
      console.log('Error fetching movies:', error);
    });
}

// Display movies on the web page
function displayMovies(movies) {
  const movieList = document.querySelector('.movie-list ul');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const imageUrl = 'https://image.tmdb.org/t/p/original/' + movie.poster_path;
    const title = movie.title || 'movie-title';
    const voteCount = movie.vote_count || 'vote-count';
    const voteAverage = movie.vote_average || 'vote-average';

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <img src="${imageUrl}" alt="Movie Poster">
      <h2>${title}</h2>
      <p class="vote-count">${voteCount} votes</p>
      <p class="vote-average">${voteAverage} rating</p>
      <i class="far fa-heart"></i>
    `;

    movieList.appendChild(movieCard);
  });
}

// Sort movies by release date (oldest to latest)
function sortByDateOldestToLatest() {
  const movies = Array.from(document.querySelectorAll('.movie-list .movie-card'));
  movies.sort((a, b) => {
    const aDate = new Date(a.dataset.releaseDate);
    const bDate = new Date(b.dataset.releaseDate);
    return aDate - bDate;
  });
  movies.forEach(movie => {
    movie.parentNode.appendChild(movie);
  });
}

// Sort movies by release date (latest to oldest)
function sortByDateLatestToOldest() {
  const movies = Array.from(document.querySelectorAll('.movie-list .movie-card'));
  movies.sort((a, b) => {
    const aDate = new Date(a.dataset.releaseDate);
    const bDate = new Date(b.dataset.releaseDate);
    return bDate - aDate;
  });
  movies.forEach(movie => {
    movie.parentNode.appendChild(movie);
  });
}

// Sort movies by rating (least to most)
function sortByRatingLeastToMost() {
  const movies = Array.from(document.querySelectorAll('.movie-list .movie-card'));
  movies.sort((a, b) => {
    const aRating = parseFloat(a.dataset.voteAverage);
    const bRating = parseFloat(b.dataset.voteAverage);
    return aRating - bRating;
  });
  movies.forEach(movie => {
    movie.parentNode.appendChild(movie);
  });
}

// Sort movies by rating (most to least)
function sortByRatingMostToLeast() {
  const movies = Array.from(document.querySelectorAll('.movie-list .movie-card'));
  movies.sort((a, b) => {
    const aRating = parseFloat(a.dataset.voteAverage);
    const bRating = parseFloat(b.dataset.voteAverage);
    return bRating - aRating;
  });
  movies.forEach(movie => {
    movie.parentNode.appendChild(movie);
  });
}

// Search movies by name
function searchMovies() {
  const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
  const movies = Array.from(document.querySelectorAll('.movie-list .movie-card'));
  
  movies.forEach(movie => {
    const title = movie.querySelector('h2').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      movie.style.display = 'block';
    } else {
      movie.style.display = 'none';
    }
  });
}

// Toggle favorite status of a movie
function toggleFavorite() {
  this.classList.toggle('fas');
  this.classList.toggle('far');

  const movieTitle = this.parentNode.querySelector('h2').textContent;
  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  if (this.classList.contains('fas')) {
    // Add movie to favorites
    if (!favoriteMovies.includes(movieTitle)) {
      favoriteMovies.push(movieTitle);
    }
  } else {
    // Remove movie from favorites
    const index = favoriteMovies.indexOf(movieTitle);
    if (index > -1) {
      favoriteMovies.splice(index, 1);
    }
  }

  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
}

// Load favorite movies from local storage
function loadFavoriteMovies() {
  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  const movies = document.querySelectorAll('.movie-list .movie-card');

  movies.forEach(movie => {
    const movieTitle = movie.querySelector('h2').textContent;
    const favoriteIcon = movie.querySelector('i');
    
    if (favoriteMovies.includes(movieTitle)) {
      favoriteIcon.classList.add('fas');
      favoriteIcon.classList.remove('far');
    }
  });
}

// Initialize the web page
function init() {
  fetchMovies();
  loadFavoriteMovies();

  document.querySelector('.sorting-options button:nth-child(1)').addEventListener('click', sortByDateOldestToLatest);
  document.querySelector('.sorting-options button:nth-child(2)').addEventListener('click', sortByRatingLeastToMost);
  document.querySelector('.sorting-options button:nth-child(3)').addEventListener('click', sortByDateLatestToOldest);
  document.querySelector('.sorting-options button:nth-child(4)').addEventListener('click', sortByRatingMostToLeast);
  document.querySelector('.search-bar button').addEventListener('click', searchMovies);
  document.querySelectorAll('.movie-list .movie-card i').forEach(icon => icon.addEventListener('click', toggleFavorite));
}

init();
