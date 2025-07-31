import React from "react";

const PopularList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
        {props.popularMovies.map((popularMovie) => (
          <div
            key={popularMovie.imdbID || popularMovie.title} // fallback if no imdbID
            className="image-container d-flex align-items-center justify-content-center MovieCard"
          >
            <img
              src={popularMovie.poster}
              alt="movie"
              onError={(e) => (e.target.style.display = "none")}
            />

            <div className="MovieCardText">
              <h2>{popularMovie.title}</h2>
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

export default PopularList;
