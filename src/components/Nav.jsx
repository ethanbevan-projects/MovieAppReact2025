import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

function Nav({ showMenu, setShowMenu, genreJsonList, clickedGenre }) {
  return (
    <>
      <header className="NavHeader">
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
            src="./Images/Net-removebg-preview.png"
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
      </header>

      {showMenu && (
        <div className="FullscreenMenu">
          <button className="close-button" onClick={() => setShowMenu(false)}>
            ✕
          </button>
        </div>
      )}
    </>
  );
}

export default Nav;
