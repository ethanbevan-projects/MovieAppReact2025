import React from "react";

const PopularList = () => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
        {popularMovies2025.map((movie) => (
          <div className="image-container d-flex align-items-center justify-content-center">
            <li key={movie.title}>{movie.title}</li>

            <img
              src=""
              alt="movie"
              onError={(e) => (e.target.style.display = "none")}
            />

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
