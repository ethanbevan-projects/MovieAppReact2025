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

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [historySaves, sethistorySaves] = useState([]);
  const [historyShows, sethistoryShows] = useState([]);
  const [genreHistories, setgenreHistories] = useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=df9e59e0`;
    const response = await fetch(url);
    const responsJson = await response.json();

    if (!responsJson.Search) {
      setMovies([]); // clear previous results
      return;
    }

    const fullMovieDetailsList = await Promise.all(
      responsJson.Search.map(async (searchItem) => {
        const id = searchItem.imdbID;
        const fullDetailsUrl = `http://www.omdbapi.com/?i=${id}&apikey=df9e59e0`;
        const fullDetailsResponse = await fetch(fullDetailsUrl);
        const fullMovieDetails = await fullDetailsResponse.json();
        const votes = +fullMovieDetails.imdbVotes?.replace(/,/g, "") || 0;
        return votes >= 10000 ? fullMovieDetails : null;
      })
    );

    const filteredMovies = fullMovieDetailsList.filter(Boolean);
    setMovies(filteredMovies);

    if (responsJson.Search) {
      localStorage.setItem("lastSearch", searchValue);

      const timer = setTimeout(async () => {
        console.log("3 seconds");

        let foundValid = false;

        for (const searchResult of responsJson.Search) {
          const movieId = searchResult.imdbID;

          const fullDataUrl = `http://www.omdbapi.com/?i=${movieId}&apikey=df9e59e0`;
          const fullDataResponse = await fetch(fullDataUrl);
          const fullMovieData = await fullDataResponse.json();

          const voteCount = +fullMovieData.imdbVotes?.replace(/,/g, "") || 0;

          const searchWords = searchValue.toLowerCase().split(" ");
          const titleLower = fullMovieData.Title.toLowerCase();

          const hasAnyWord = searchWords.some((word) =>
            titleLower.includes(word)
          );

          if (voteCount >= 10000 && hasAnyWord) {
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

            console.log({ updatedSavedHistory });

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

  useEffect(() => {
    const savedSearch = localStorage.getItem("lastSearch");
    if (savedSearch) setsearchValue(savedSearch);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchValue.length >= 2) getMovieRequest();
      else setMovies([]); // clear if input is short
    }, 500);

    return () => clearTimeout(delay);
  }, [searchValue]);

  useEffect(() => {
    if (historySaves[1]) {
      getHistoryRequest();
    }
  }, [historySaves]);

  const getHistoryRequest = async () => {
    const urlHistory = `http://www.omdbapi.com/?s=${historySaves[1]}&apikey=df9e59e0`;
    const responseHistory = await fetch(urlHistory);
    const responsJsonHistory = await responseHistory.json();

    if (responsJsonHistory.Search) {
      sethistoryShows(responsJsonHistory.Search);
    }
  };

  useEffect(() => {
    const savedHistorySaves = JSON.parse(
      localStorage.getItem("historySaves") || "[]"
    );
    console.log("Loaded from localStorage:", savedHistorySaves);

    sethistorySaves(savedHistorySaves);
  }, []);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
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
      <Nav showMenu={showMenu} setShowMenu={setShowMenu} />

      <div className="container-fluid ">
        <div className="MovieTitleAndSearchBox">
          <div className=" MovieTitleAndSearch d-flex justify-content-between align-items-center gap-3">
            <MovieListHeading heading="Recent Searches" />
            <SearchBox
              searchValue={searchValue}
              setsearchValue={setsearchValue}
            />
          </div>
        </div>
        <div className="container-fluid movie-app">
          <div className="row">
            <MovieList
              movies={movies}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={addFavourites}
            />
          </div>

          <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
            <MovieListHeading heading="Your Recommendations" />
          </div>

          <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
            <MovieListHeading heading="Favourites" />
          </div>
          <div className="row favouriteRow">
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}
            />
          </div>

          <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
            <MovieListHeading heading="Recent History" />
          </div>

          <div className="row">
            <HistoryList
              historyShows={historyShows}
              handleFavouritesClick={addFavouriteMovie}
              favouriteComponent={addFavourites}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
