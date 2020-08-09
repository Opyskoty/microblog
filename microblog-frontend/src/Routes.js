import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BlogForm from "./BlogForm"
import BlogPost from "./BlogPost"
import BlogList from "./BlogList"

function Routes() {

  return (
    <Switch>
      <Route exact path="/posts/:postId">
        <BlogPost />
      </Route>
      <Route exact path="/new">
        <BlogForm />
      </Route>
      <Route exact path="/">
        <BlogList />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default Routes;
