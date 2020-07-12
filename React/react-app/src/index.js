import React, { Component } from "react";
import ReactDom from "react-dom";

import JSON from "./12.1 db.json.json";

// COMPONENTS
import Header from "./components/header";
import NewsList from "./components/news_list";
import NewsItem from "./components/news_list_item";

class App extends Component {
  state = {
    news: JSON,
    filtered: [],
  };

  getKeyword = (event) => {
    //  console.log(event.target.value);
    let keyword = event.target.value;
    let filtered = this.state.news.filter((item) => {
      return item.title.indexOf(keyword) > -1;
    });
    this.setState({
      filtered,
    });
    //console.log(filtered);
  };

  render() {
    let newFiltered = this.state.filtered;
    let newsWhole = this.state.news;

    return (
      <div>
        <Header keywords={this.getKeyword} />
        <NewsList
          news={newFiltered.length === 0 ? newsWhole : newFiltered}
          hello="bitch"
        />
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
