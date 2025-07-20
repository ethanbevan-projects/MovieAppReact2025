import React from "react";

const SearchBox = (props) => {
  return (
    <div>
      <input
        className="form-control"
        placeholder="Type to search"
        value={props.value}
        onChange={(event) => props.setsearchValue(event.target.value)}
      ></input>
    </div>
  );
};

export default SearchBox;
