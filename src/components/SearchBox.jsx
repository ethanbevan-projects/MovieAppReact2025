import React from "react";

const SearchBox = (props) => {
  const handleInput = (e) => {
    const value = e.target.value;
    props.setsearchValue(value);
    if (!value) {
      const saved = localStorage.getItem("lastSearch");
      if (saved) props.setsearchValue(saved);
    }
  };

  return (
    <>
      <div className="searchingMobile">
        <input
          type="search"
          className="form-control"
          value={props.value}
          onChange={handleInput}
          onKeyUp={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleInput(e)}
          autoComplete="on"
          placeholder="Search any movie..."
        />
        <button onClick={props.getMovieRequest}>Search</button>
      </div>
      <div className="searchingDesktop">
        <input
          type="search"
          className="form-control"
          value={props.value}
          onChange={handleInput}
          onKeyUp={handleInput}
          onKeyDown={(e) => e.key === "Enter" && handleInput(e)}
          autoComplete="on"
          placeholder="Search any movie..."
        />
      </div>
    </>
  );
};

export default SearchBox;
