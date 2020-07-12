import React from "react";

const Card = (props) => {
  const style = {
    background: "Lightgrey",
  };

  return <div style={style}>{props.children}</div>;
};

export default Card;
