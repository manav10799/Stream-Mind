const useClearLocalStorage = (input, movies) => {
  let getSearchedMovieTimeStamp = JSON.parse(localStorage.getItem(input)) || {
    timeStamp: Date.now(),
  };
  const OneDay = 24 * 60 * 60 * 1000;
  let localStoredMovies =
    JSON.parse(localStorage.getItem("Searched Movies")) || [];
  if (Date.now() - getSearchedMovieTimeStamp.timeStamp > OneDay) {
    getSearchedMovieTimeStamp = { timeStamp: Date.now() };
    localStoredMovies = [];
  }
  localStoredMovies.push(...movies);
  localStorage.setItem("Searched Movies", JSON.stringify(localStoredMovies));
  localStorage.setItem(input, JSON.stringify(getSearchedMovieTimeStamp));
};

export default useClearLocalStorage;
