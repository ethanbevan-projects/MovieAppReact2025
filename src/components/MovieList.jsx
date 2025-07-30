import React from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
        {props.movies.map((movie, index) => (
          <div
            key={movie.imdbID}
            className="image-container d-flex align-items-center justify-content-center MovieCard"
          >
            <img
              src={movie.Poster}
              alt="movie"
              onError={(e) => (e.target.style.display = "none")}
            />

            <div className="MovieCardText">
              <h2>{movie.Title}</h2>
            </div>

            <div
              className="overlay d-flex align-items-center justify-content-center"
              onClick={() => props.handleFavouritesClick(movie)}
            >
              <FavouriteComponent />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieList;
