import React, { useState } from "react";

const HistoryList = (props) => {
  const FavouriteComponent = props.favouriteComponent;
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <div style={{ display: "flex", gap: "20px", flexWrap: "nowrap" }}>
        {props.historyShows.map((historyShow, index) => (
          <div
            key={historyShow.imdbID}
            className="image-container d-flex align-items-center justify-content-center MovieCard"
          >
            <img src={historyShow.Poster} alt="historyShow"></img>

            <div className="MovieCardText">
              <h2>{historyShow.Title}</h2>
            </div>
            <div
              className="overlay d-flex align-items-center justify-content-center"
              onClick={() => props.handleFavouritesClick(historyShow)}
            >
              <FavouriteComponent />
            </div>

            <div
              className="overlay2 d-flex align-items-center justify-content-center"
              onClick={() => setSelectedMovie(historyShow)}
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

export default HistoryList;
