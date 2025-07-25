import React from "react";

const SearchBox = (props) => {
  return (
    <input
      className="form-control"
      value={props.value}
      onChange={(event) => props.setsearchValue(event.target.value)}
      placeholder="Type to search..."
    ></input>
  );
};

export default SearchBox;
