import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

function Nav({
  showMenu,
  setShowMenu,
  genreJsonList,
  clickedGenre,
  MovieList,
  favourites,
  removeFavouriteMovie,
  RemoveFavourites,
}) {
  return (
    <>
      <header className="NavHeader">
        <div className="NavHeaderBox">
          <div className="btn-group fixed-top-left">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Genre
            </button>
            <ul className="dropdown-menu dropdown-menu-start">
              {genreJsonList.map(({ genreName }) => (
                <li key={genreName}>
                  <a
                    onClick={() => clickedGenre(genreName)}
                    className="dropdown-item"
                    href="#"
                  >
                    {genreName}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="center">
            <img
              className="imageFakeflix"
              src="https://i.ibb.co/XrxYCds4/Net-removebg-preview.png"
              style={{ width: "150px" }}
            />
          </div>

          <div className="left">
            <div
              className="hamburger-icon"
              onClick={() => setShowMenu(!showMenu)}
            >
              Favourites
            </div>
          </div>
        </div>
      </header>

      {showMenu && (
        <div className="FullscreenMenu">
          <div>
            <button className="close-button" onClick={() => setShowMenu(false)}>
              ✕
            </button>
          </div>
          <div className="container-fluid navFavourites">
            <div className="row favouriteRow">
              <MovieList
                movies={favourites}
                handleFavouritesClick={removeFavouriteMovie}
                favouriteComponent={RemoveFavourites}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
