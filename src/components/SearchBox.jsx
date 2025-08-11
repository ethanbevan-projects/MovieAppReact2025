import React, { useState } from "react";

const SearchBox = ({ getMovieRequest, setsearchValue, value }) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    setsearchValue(newValue);

    if (!newValue) {
      const saved = localStorage.getItem("lastSearch");
      if (saved) {
        setLocalValue(saved);
        setsearchValue(saved);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovieRequest(localValue); // Pass freshest text directly
  };

  return (
    <>
      <div className="searchingMobile">
        <form onSubmit={handleSubmit} className="formSubmit">
          <input
            type="search"
            className="form-control"
            value={localValue}
            onChange={handleChange}
            autoComplete="on"
            placeholder="   Search any movie..."
          />
        </form>
      </div>

      <div className="searchingDesktop">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="form-control"
            value={localValue}
            onChange={handleChange}
            autoComplete="on"
            placeholder="   Search any movie..."
          />
        </form>
      </div>
    </>
  );
};

export default SearchBox;
