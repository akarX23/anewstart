import React from "react";
import { Link } from "react-router-dom";

const PostItem = (props) => {
  return <div>Post details {props.match.params.id}</div>;
};

export default PostItem;
