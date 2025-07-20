import { useState, useEffect } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import MovieList from "./components/MovieList";
import Nav from "./components/Nav";

const App = () => {
  const [movies, setMovies] = useState([]);

  const getMovieRequest = async () => {
    const url = "http://www.omdbapi.com/?s=batman&apikey=df9e59e0";
    const response = await fetch(url);
    const responsJson = await response.json();
    setMovies(responsJson.Search);
  };

  useEffect(() => {
    getMovieRequest();
  }, []);

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

  return (
    <>
      <div>
        <Nav showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>

      <div className="container movie-app">
        <div className="row gx-10">
          <MovieList movies={movies} />
        </div>
      </div>
    </>
  );
};

export default App;
