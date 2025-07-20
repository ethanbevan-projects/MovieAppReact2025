import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

function Nav({ showMenu, setShowMenu }) {
  return (
    <>
      <header className="AppHeader">
        <FaBars
          size={24}
          className="hamburger-icon"
          onClick={() => setShowMenu(!showMenu)}
        />
        {/* <p className="ethanNotesAppTitle">Ethan notes app 2025</p> */}
        <img
          className="imageFakeflix"
          src="./Images/Net-removebg-preview.png"
          style={{ width: "140px" }}
        ></img>
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
