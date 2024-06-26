import React from "react";

const SearchBox = ({ onChange, ...rest }) => {
  return (
    <input
      {...rest}
      style={{ marginBottom: 20 }}
      type="text"
      className="form-control"
      onChange={({ target }) => onChange(target.value)}
    />
  );
};

SearchBox.defaultProps = {
  placeholder: "Search ..."
};

export default SearchBox;