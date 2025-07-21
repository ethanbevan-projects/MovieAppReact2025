import React from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      <div style={{ display: "flex", gap: "0", flexWrap: "nowrap" }}>
        {props.movies.map((movie, index) => (
          <div key={index} style={{ flex: "0 0 auto" }}>
            <img src={movie.Poster} alt="movie"></img>
            <div
              className=""
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
