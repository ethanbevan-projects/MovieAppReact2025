import React from "react";

const HistoryList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

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
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryList;
