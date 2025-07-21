import { useState, useEffect } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import MovieList from "./components/MovieList";
import Nav from "./components/Nav";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import addFavourites from "./components/addFavourites";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    function onScroll() {
      if (showMenu) {
        setShowNoteButton(false);
      } else if (window.scrollY < 100) {
        setShowNoteButton(true);
      } else {
        setShowNoteButton(false);
      }
    }
  });

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
    getMovieRequest();
  }, [searchValue]);

  const [favourites, setFavourites] = useState([]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  };

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
        </div>
      </div>
    </div>
  );
};

export default App;
