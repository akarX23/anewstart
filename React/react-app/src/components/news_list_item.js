import React from "react";

const NewsItem = ({ item }) => {
  return (
    <div className="news_item">
      <div>
        <h3>{item.title}</h3>
        <div>{item.feed}</div>
      </div>
    </div>
  );
};

export default NewsItem;
