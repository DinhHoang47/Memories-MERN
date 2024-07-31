import React from "react";
import { useState } from "react";
import { getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, AppBar, TextField, Button, Paper } from "@mui/material";
import ChipInput from "material-ui-chip-input";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

import useStyle from "./styles";
import AddPostModal from "../AddPostModal/AddPostModal";
import usePost from "../../hooks/usePost";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home({ type }) {
  const classes = useStyle();
  const [posts, loading, error] = usePost("home", 1);
  console.log("posts: ", posts);
  return (
    <div className={classes.home}>
      <div className={classes.posts}>
        <Post classes={classes} />
        <Post classes={classes} />
        <Post classes={classes} />
        <Post classes={classes} />
        <Post classes={classes} />
        <Post classes={classes} />
        <Post classes={classes} />
        <Post classes={classes} />
      </div>
      <AddPostModal />
    </div>
  );
}

const Post = ({ classes }) => {
  return <div className={classes.post}></div>;
};

{
  /* <div className={classes.gridContainer}>
<div className={classes.leftSideBar}>
  <div className={classes.appBarSearch}>
    <TextField
      name="search"
      variant="outlined"
      label="Search Memories"
      fullWidth
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      onKeyDown={handleOnKeyDown}
      value={searchValue}
    ></TextField>
    <ChipInput
      style={{ margin: "10px 0" }}
      value={tags}
      onAdd={handleAddTags}
      onDelete={handleDeleteTags}
      label="Search Tags"
      variant="outlined"
    />
    <Button
      onClick={searchPost}
      color="primary"
      className={classes.searchButton}
      variant="contained"
    >
      Search
    </Button>
  </div>
  <div>
    <Pagination page={page} />
  </div>
</div>
<Posts setSelectedCardId={setSelectedCardId} />
</div> */
}

// const dispatch = useDispatch();
// const navigate = useNavigate();
// const classes = useStyle();
// const query = useQuery();
// const page = query.get("page") || 1;
// const [selectedCardId, setSelectedCardId] = useState(null);
// const [searchValue, setSearchValue] = useState("");
// const [tags, setTags] = useState([]);

// const handleOnKeyDown = (e) => {
//   if (e.keyCode === 13) {
//     // Search post
//     searchPost();
//   }
// };

// const handleAddTags = (tag) => {
//   setTags([...tags, tag]);
// };
// const handleDeleteTags = (tagToDelete) => {
//   setTags(tags.filter((tag) => tagToDelete !== tag));
// };

// const searchPost = () => {
//   if (searchValue.trim() || tags.length !== 0) {
//     // Do logic to dispatch -> fetch search post
//     // Parse tags to string before send as payload, because we can not pass an array to url
//     dispatch(getPostsBySearch({ searchValue, tags: tags.join(",") }));
//     navigate(
//       `/posts/search?searchQuery=${searchValue}&tags=${tags.join(",")}`
//     );
//   } else {
//     navigate("/");
//   }
// };

{
  /* <div className="">
<div className="">
  <AppBar
    className={classes.appBarSearch}
    position="static"
    color="inherit"
  >
    <TextField
      name="search"
      variant="outlined"
      label="Search Memories"
      fullWidth
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      onKeyDown={handleOnKeyDown}
      value={searchValue}
    ></TextField>
    <ChipInput
      style={{ margin: "10px 0" }}
      value={tags}
      onAdd={handleAddTags}
      onDelete={handleDeleteTags}
      label="Search Tags"
      variant="outlined"
    />
    <Button
      onClick={searchPost}
      color="primary"
      className={classes.searchButton}
      variant="contained"
    >
      Search
    </Button>
  </AppBar>
  <Form
    setSelectedCardId={setSelectedCardId}
    selectedCardId={selectedCardId}
  />
  <Paper className={classes.pagination} elevation={6}>
    <Pagination page={page} />
  </Paper>
</div>
<Grid container justifyContent="space-between" spacing={3}>
  <Posts setSelectedCardId={setSelectedCardId} />
</Grid>
</div> */
}
