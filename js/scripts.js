var normalizeData = movies.map(function (movie) {
	return {
		title: movie.Title,
		year: movie.movie_year,
		genre: movie.Categories.split('|'),
		summary: movie.summary,
		rating: movie.imdb_rating,
		runtime: movie.runtime,
		youtube_id: movie.ytid
	};
});

var movieGenre = [];
var movieGenreSelectEl = document.querySelector('.movie-genre-select');
normalizeData.forEach(function (movie) {
  movie.genre.forEach(function (genre) {
    if (movieGenre.indexOf(genre) === -1) {
      movieGenre.push(genre)
    };
  });
});

var genresFragment = document.createDocumentFragment();
movieGenre.slice().sort().forEach(function (genre) {
  var moviesGenreOptionEl = document.createElement('option');
  var moviesGenreOptionLinkEl = document.createElement('a');
  moviesGenreOptionLinkEl.textContent = genre;
  moviesGenreOptionEl.appendChild(moviesGenreOptionLinkEl);
  genresFragment.appendChild(moviesGenreOptionEl);
});
movieGenreSelectEl.appendChild(genresFragment);

var topMovies = normalizeData.slice(0).sort(function (a, b) {
	if (a.rating > b.rating) {
		return -1;
	} else if (a.rating < b.rating) {
		return 1;
	} else {
		return 0;
	}
});

var top21Movies = topMovies.slice(0, 21);
var moviesWrapperEl = document.querySelector('.movies--wrapper');
var movieTemplate = document.querySelector('#movie--template').content;
var moviesWrapperFragment = document.createDocumentFragment();

top21Movies.forEach(function (movie) {
	var movieClone = document.importNode(movieTemplate, true);
	movieClone.querySelector('.movie--title').textContent = movie.title
	movieClone.querySelector('.movie--rating').textContent = movie.rating
	movieClone.querySelector('.movie--year').textContent = movie.year
	movieClone.querySelector('.movie--genre').textContent = movie.genre
	movieClone.querySelector('.movie--summary').textContent = movie.summary
	moviesWrapperFragment.appendChild(movieClone);
});
moviesWrapperEl.appendChild(moviesWrapperFragment);