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

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [movies, setMovies] = useState([]);
  const [searchValue, setsearchValue] = useState("");

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=df9e59e0`;
    const response = await fetch(url);
    const responsJson = await response.json();

    if (responsJson.Search) {
      setMovies(responsJson.Search);
    }
  };

  useEffect(() => {
    if (searchValue) {
      getMovieRequest();
      localStorage.setItem("lastSearch", searchValue);
    }
  }, [searchValue]);

  const [favourites, setFavourites] = useState([]);

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

  useEffect(() => {
    const savedSearch = localStorage.getItem("lastSearch");
    if (savedSearch) setsearchValue(savedSearch);
  }, []);

  return (
    <div className="MoviesApp">
      <Nav showMenu={showMenu} setShowMenu={setShowMenu} />

      <div className="container-fluid ">
        <div className="MovieTitleAndSearchBox">
          <div className=" MovieTitleAndSearch d-flex justify-content-between align-items-center gap-3">
            <MovieListHeading heading="Movies" />
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
        </div>
      </div>
    </div>
  );
};

export default App;
