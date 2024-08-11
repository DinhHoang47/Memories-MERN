import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container } from "@mui/material";

import NavBar from "./components/Navbar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { useSelector } from "react-redux";
import { HomeLayout } from "./layouts/HomeLayout/HomeLayout";
import { HOME_POST, LIKED_POST, MY_POST } from "./constants/actionTypes";

const App = () => {
  const loginUser = useSelector((state) => state.profile);
  return (
    <>
      <Helmet>
        <meta
          http-equiv="Cross-Origin-Opener-Policy"
          content="same-origin-allow-popups"
        />
      </Helmet>
      <Router>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="" exact element={<Navigate to={"/posts"} />} />
            <Route path="posts" exact element={<Home type={HOME_POST} />} />
            <Route
              path="posts/liked"
              exact
              element={<Home type={LIKED_POST} />}
            />
            <Route
              path="posts/myposts"
              exact
              element={<Home type={MY_POST} />}
            />
            <Route path="/posts/:id" exact element={<PostDetails />} />
          </Route>
          <Route
            path="/auth"
            element={loginUser ? <Auth /> : <Navigate to="/posts" replace />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
