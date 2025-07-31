import React from "react";

const GenreList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
        {props.genres.map((genre) => (
          <div
            key={genre.imdbID || genre.title} // fallback if no imdbID
            className="image-container d-flex align-items-center justify-content-center MovieCard"
          >
            <img
              src={genre.Poster}
              alt="movie"
              onError={(e) => (e.target.style.display = "none")}
            />

            <div className="MovieCardText">
              <h2>{genre.Title}</h2>
            </div>

            <div
              className="overlay d-flex align-items-center justify-content-center"
              onClick={() => props.handleFavouritesClick(genre)}
            >
              <FavouriteComponent />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GenreList;
