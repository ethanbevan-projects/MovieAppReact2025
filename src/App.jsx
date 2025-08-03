import { useState, useEffect } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import Nav from "./components/Nav";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import addFavourites from "./components/addFavourites";
import RemoveFavourites from "./components/RemoveFavourites";
import HistoryList from "./components/HistoryList";

import popularMovies2025 from "./data/popularMovies2025.json";
import PopularList from "./components/PopularList";

import genreJsonList from "./data/genreJsonList.json";
import GenreList from "./components/GenreList";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchValue, setsearchValue] = useState("");

  const [recentSearches, setrecentSearches] = useState([]);
  const [recentShows, setrecentShows] = useState([]);

  const [favourites, setFavourites] = useState([]);

  const [historySaves, sethistorySaves] = useState([]);
  const [historyShows, sethistoryShows] = useState([]);

  const [genreHistories, setgenreHistories] = useState([]);

  const [popularMovies, setpopularMovies] = useState([]);

  const [genres, setGenres] = useState([]);

  const [genreNames, setgenreNames] = useState([]);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [userTyped, setUserTyped] = useState(false);

  const [genresNav, setgenresNav] = useState([]);
  const [genresListed, setgenresListed] = useState([]);
  const [genreMoviesData, setGenreMoviesData] = useState([]);
  const [selectedGenreName, setSelectedGenreName] = useState("");

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=980d1d3c`;
    const response = await fetch(url);
    const responsJson = await response.json();

    if (!responsJson.Search) {
      setMovies([]); // clear previous results
      return;
    }

    const fullMovieDetailsList = await Promise.all(
      responsJson.Search.map(async (searchItem) => {
        const id = searchItem.imdbID;
        const fullDetailsUrl = `http://www.omdbapi.com/?i=${id}&apikey=980d1d3c`;
        const fullDetailsResponse = await fetch(fullDetailsUrl);
        const fullMovieDetails = await fullDetailsResponse.json();
        const votes = +fullMovieDetails.imdbVotes?.replace(/,/g, "") || 0;
        return votes >= 30000 ? fullMovieDetails : null;
      })
    );

    const filteredMovies = fullMovieDetailsList.filter(Boolean);

    setMovies(filteredMovies);
    setrecentShows(filteredMovies);
    localStorage.setItem("recentShows", JSON.stringify(filteredMovies));

    if (responsJson.Search) {
      localStorage.setItem("lastSearch", searchValue);

      const timer = setTimeout(async () => {
        let foundValid = false;

        for (const searchResult of responsJson.Search) {
          const movieId = searchResult.imdbID;

          const fullDataUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=980d1d3c`;
          const fullDataResponse = await fetch(fullDataUrl);
          const fullMovieData = await fullDataResponse.json();

          const voteCount = +fullMovieData.imdbVotes?.replace(/,/g, "") || 0;

          const searchWords = searchValue.toLowerCase().split(" ");
          const titleLower = fullMovieData.Title.toLowerCase();

          const hasAnyWord = searchWords.some((word) =>
            titleLower.includes(word)
          );

          if (voteCount >= 30000 && hasAnyWord) {
            foundValid = true;
            break;
          }
        }

        if (foundValid) {
          const savedHistory = JSON.parse(
            localStorage.getItem("historySaves") || "[]"
          );

          const normalizedSaved = savedHistory.map((s) =>
            s.toLowerCase().trim()
          );
          const normalizedInput = searchValue.toLowerCase().trim();

          const isTooSimilar = normalizedSaved.some(
            (saved) =>
              normalizedInput.includes(saved) || saved.includes(normalizedInput)
          );

          if (!isTooSimilar) {
            const updatedSavedHistory = [searchValue, ...savedHistory];

            sethistorySaves(updatedSavedHistory);

            localStorage.setItem(
              "historySaves",
              JSON.stringify(updatedSavedHistory)
            );
          }
        }
      }, 2000);
    }

    return () => clearTimeout(timer);
  };

  const clickedGenre = (clicked) => {
    setSelectedGenreName(clicked);

    const genreClickedOn = genreJsonList.find(
      ({ genreName }) => genreName === clicked
    );

    if (genreClickedOn) {
      setgenresListed(genreClickedOn.topFilms);
    }
  };

  useEffect(() => {
    const fetchGenreMovies = async () => {
      if (!genresListed.length) return;

      const data = await Promise.all(
        genresListed.map(async (title) => {
          const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
            title
          )}&apikey=980d1d3c`;
          const res = await fetch(url);
          return await res.json();
        })
      );
      const shuffled = [...data].sort(() => Math.random() - 0.5);

      setGenreMoviesData(shuffled);
    };

    fetchGenreMovies();
  }, [genresListed]);

  useEffect(() => {
    const savedRecentShowsStorage = JSON.parse(
      localStorage.getItem("recentShows") || "[]"
    );
    setrecentShows(savedRecentShowsStorage);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("lastSearch");
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded || !userTyped) return;

    const delay = setTimeout(() => {
      if (searchValue.length >= 2) getMovieRequest();
      else setMovies([]);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue, hasLoaded, userTyped]);

  useEffect(() => {
    if (historySaves[1]) {
      getHistoryRequest();
    }
  }, [historySaves]);

  const getHistoryRequest = async () => {
    const urlHistory = `http://www.omdbapi.com/?s=${historySaves[1]}&apikey=980d1d3c`;
    const responseHistory = await fetch(urlHistory);
    const responsJsonHistory = await responseHistory.json();

    if (responsJsonHistory.Search) {
      const detailed = await Promise.all(
        responsJsonHistory.Search.map(async (m) => {
          const res = await fetch(
            `http://www.omdbapi.com/?i=${m.imdbID}&apikey=980d1d3c`
          );
          const data = await res.json();
          const votes = +data.imdbVotes.replace(/,/g, "") || 0;
          return votes >= 30000 ? data : null;
        })
      );
      sethistoryShows(detailed.filter(Boolean));
    }
  };

  useEffect(() => {
    const savedHistorySaves = JSON.parse(
      localStorage.getItem("historySaves") || "[]"
    );

    sethistorySaves(savedHistorySaves);
  }, []);

  const getPopularRequest = async () => {
    const moviesWithPosters = await Promise.all(
      popularMovies2025.map(async ({ title }) => {
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(
          title
        )}&apikey=980d1d3c`;
        const response = await fetch(url);
        const data = await response.json();
        return {
          Title: data.Title,
          Poster: data.Poster,
          imdbID: data.imdbID,
          Plot: data.Plot,
        };
      })
    );

    setpopularMovies(moviesWithPosters.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    getPopularRequest();
  }, []);

  useEffect(() => {
    if (recentSearches) {
      console.log("recentSearches updated:", recentSearches);
    }
  }, [recentSearches]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [movie, ...favourites];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  useEffect(() => {
    const storedFavourites = localStorage.getItem("react-movie-app-favourites");

    if (storedFavourites) {
      const movieFavourites = JSON.parse(storedFavourites);
      setFavourites(movieFavourites);
    }
  }, []);

  return (
    <div className="MoviesApp">
      <Nav
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        genreJsonList={genreJsonList}
        clickedGenre={clickedGenre}
        MovieList={MovieList}
        favourites={favourites}
        removeFavouriteMovie={removeFavouriteMovie}
        RemoveFavourites={RemoveFavourites}
      />

      <div className="container-fluid ">
        <div className="MovieTitleAndSearchBox">
          <div className="theSearchBox">
            <SearchBox
              searchValue={searchValue}
              setsearchValue={(val) => {
                const trimmed = val.trim();
                setsearchValue(trimmed);

                if (trimmed === "") {
                  setUserTyped(false);
                  const recent = JSON.parse(
                    localStorage.getItem("recentShows") || "[]"
                  );
                  setrecentShows(recent);
                  setMovies([]);

                  setrecentShows(
                    JSON.parse(localStorage.getItem("recentShows") || "[]")
                  );
                } else {
                  setUserTyped(true);
                }
              }}
            />
          </div>
        </div>

        {searchValue.trim() !== "" && movies.length > 0 && (
          <div className="MovieTitleAndSearchBox">
            <div className=" MovieTitleAndSearch d-flex justify-content-between align-items-center gap-3">
              <MovieListHeading heading="Your Search" />
            </div>
          </div>
        )}

        <div className="container-fluid movie-app">
          {searchValue.trim() !== "" && movies.length > 0 && (
            <div className="row">
              <MovieList
                movies={movies}
                handleFavouritesClick={addFavouriteMovie}
                favouriteComponent={addFavourites}
              />
            </div>
          )}

          {genreMoviesData?.length > 0 && selectedGenreName && (
            <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
              <MovieListHeading
                heading={`${selectedGenreName} top picks this week`}
              />
            </div>
          )}

          {genreMoviesData?.length > 0 && selectedGenreName && (
            <div className="row">
              <PopularList
                popularMovies={genreMoviesData}
                handleFavouritesClick={addFavouriteMovie}
                favouriteComponent={addFavourites}
              />
            </div>
          )}

          <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
            <MovieListHeading heading="Our Most Popular 2025" />
          </div>

          <div className="row">
            <PopularList
              popularMovies={popularMovies}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={addFavourites}
            />
          </div>

          {!searchValue.trim() !== "" && recentShows.length > 0 && (
            <>
              <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
                <MovieListHeading heading="Your Recent Search" />
              </div>
              <div className="row">
                <MovieList
                  movies={recentShows}
                  handleFavouritesClick={addFavouriteMovie}
                  favouriteComponent={addFavourites}
                />
              </div>
            </>
          )}

          {favourites.length > 0 && (
            <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
              <MovieListHeading heading="Favourites" />
            </div>
          )}

          {favourites.length > 0 && (
            <div className="row favouriteRow">
              <MovieList
                movies={favourites}
                handleFavouritesClick={removeFavouriteMovie}
                favouriteComponent={RemoveFavourites}
              />
            </div>
          )}

          {historySaves.length > 2 && (
            <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
              <MovieListHeading heading="Recent History" />
            </div>
          )}

          {historySaves.length > 2 && (
            <div className="row">
              <HistoryList
                historyShows={historyShows}
                handleFavouritesClick={addFavouriteMovie}
                favouriteComponent={addFavourites}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
