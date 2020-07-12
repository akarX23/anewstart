import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

//COMPONENTS
import Home from "./components/home";
import Posts from "./components/posts";
import Profile from "./components/profile";
import PostItem from "./components/post_item";
import LifeCycles from "./components/lifecycles";
import Conditional from "./components/conditional";
import User from "./components/user";

const App = () => {
  return (
    <HashRouter>
      <div>
        <header>
          <Link to="/"> Home</Link> <br />
          <Link
            to="/posts"
            activeStyle={{ color: "red" }}
            activeClassName="selected"
          >
            Posts
          </Link>
          <br />
          <Link
            to={{
              pathname: "/profile",
            }}
          >
            Profiles
          </Link>
          <br />
          <Link to="/lifecycle">LifeCycle</Link>
          <br />
          <Link to="/conditional">Conditional</Link>
          <br />
          <Link to="/user">User</Link>
          <br />
        </header>
        <hr />
        <Switch>
          <Route path="/posts/:id" component={PostItem} />
          <Route path="/lifecycle" component={LifeCycles} />
          <Route path="/posts" exact component={Posts} />
          <Route path="/profile" component={Profile} />
          <Route path="/conditional" exact component={Conditional} />
          <Route path="/user" component={User} />
          <Route path="/" exact component={Home} />
          <Route component={Posts} />
        </Switch>
      </div>
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
