import React from "react";

const SearchBox = (props) => {
  return (
    <input
      className="form-control"
      value={props.value}
      onChange={(e) => {
        const value = e.target.value;
        props.setsearchValue(value);
        if (!value) {
          const saved = localStorage.getItem("lastSearch");
          if (saved) props.setsearchValue(saved);
        }
      }}
      placeholder="Search any movie..."
    ></input>
  );
};

export default SearchBox;
