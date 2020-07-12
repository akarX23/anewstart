import React from "react";
import { Link } from "react-router-dom";

import Card from "../hoc/card";
import Auth from "../hoc/auht";

const Profile = (props) => {
  const redir = () => {
    //props.history.push("/");
  };

  return (
    <Auth>
      <Card>
        <Link
          to={{
            pathname: `${props.match.url}/posts`,
          }}
        >
          take me
        </Link>

        {redir()}
      </Card>
    </Auth>
  );
};

export default Profile;
