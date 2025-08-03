import React, { useState } from "react";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const [selectedMovie, setSelectedMovie] = useState(null);

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

            <div
              className="overlay2 d-flex align-items-center justify-content-center"
              onClick={() => setSelectedMovie(movie)}
            ></div>
          </div>
        ))}

        {selectedMovie && (
          <div key={selectedMovie.imdbID} className="MoviePopup">
            <div className="MoviePopupContent PopupMovies">
              <button onClick={() => setSelectedMovie(null)}>✕</button>
              <h2>{selectedMovie.Title}</h2>
              <p className="descriptionMovies">{selectedMovie.Plot}</p>

              <video
                key={selectedMovie.imdbID}
                src="https://res.cloudinary.com/dfikzj7lg/video/upload/v1754054694/720p_h264_youtube_fsozld.mp4"
                controls
                autoPlay
                muted
                playsInline
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "auto",
                  borderRadius: "10px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieList;
