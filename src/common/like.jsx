import React from 'react';

const Like = ({ liked, onToggle }) => {
  const classes = liked ? "fa fa-heart" : "fa fa-heart-o";

  return (
    <i style={{ cursor: "pointer" }} onClick={onToggle} className={classes} aria-hidden="true" />
  );
};

export default Like;