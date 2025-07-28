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

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchValue, setsearchValue] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [historySaves, sethistorySaves] = useState([]);
  const [historyShows, sethistoryShows] = useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=df9e59e0`;
    const response = await fetch(url);
    const responsJson = await response.json();

    if (responsJson.Search) {
      setMovies(responsJson.Search);
      localStorage.setItem("lastSearch", searchValue);
    }
  };

  useEffect(() => {
    const savedSearch = localStorage.getItem("lastSearch");
    if (savedSearch) setsearchValue(savedSearch);
  }, []);

  useEffect(() => {
    if (searchValue) {
      getMovieRequest();
    }
  }, [searchValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("3 seconds");

      const historySavedBox = JSON.parse(
        localStorage.getItem("historySaves") || "[]"
      );

      if (searchValue && !historySavedBox.includes(searchValue)) {
        const updatedhistorySavedBox = [searchValue, ...historySavedBox];

        sethistorySaves(updatedhistorySavedBox);

        console.log({ updatedhistorySavedBox });

        localStorage.setItem(
          "historySaves",
          JSON.stringify(updatedhistorySavedBox)
        );
      }
    }, 2000);

    return () => clearTimeout(timer);
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

          <div className=" MovieTitleAndSearch MovieFavouriteTitle d-flex justify-content-between align-items-center gap-3">
            <MovieListHeading heading="Your Recommended" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
