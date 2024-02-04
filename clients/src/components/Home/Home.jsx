import React from "react";
import { useState } from "react";
import { getPostsBySearch } from "../../actions/posts";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper,
  Modal,
} from "@mui/material";
import ChipInput from "material-ui-chip-input";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CancelIcon from "@material-ui/icons/Cancel";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";

import useStyle from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyle();
  const query = useQuery();
  const page = query.get("page") || 1;
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState([]);
  const [openAddNewPost, setOpenAddNewPost] = useState(false);

  const handleOnKeyDown = (e) => {
    if (e.keyCode === 13) {
      // Search post
      searchPost();
    }
  };

  const handleAddTags = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDeleteTags = (tagToDelete) => {
    setTags(tags.filter((tag) => tagToDelete !== tag));
  };

  const searchPost = () => {
    if (searchValue.trim() || tags.length !== 0) {
      // Do logic to dispatch -> fetch search post
      // Parse tags to string before send as payload, because we can not pass an array to url
      dispatch(getPostsBySearch({ searchValue, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${searchValue}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };
  return (
    <div className={classes.gridContainer}>
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
      <AddNewPostModal
        classes={classes}
        openModal={openAddNewPost}
        setOpenModal={setOpenAddNewPost}
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
      />
      <Posts
        setOpenAddNewPost={setOpenAddNewPost}
        setSelectedCardId={setSelectedCardId}
      />
      <AddNewPostsButton
        setOpenAddNewPost={setOpenAddNewPost}
        classes={classes}
      />
    </div>
  );
}

const AddNewPostsButton = ({ classes, setOpenAddNewPost }) => {
  return (
    <div
      onClick={() => {
        setOpenAddNewPost((pre) => {
          return !pre;
        });
      }}
      className={classes.addNewPostButton}
    >
      <AddAPhotoIcon className={classes.addNewPostButtonIcon} />
    </div>
  );
};

const AddNewPostModal = ({
  openModal,
  setOpenModal,
  classes,
  selectedCardId,
  setSelectedCardId,
}) => {
  return (
    <Modal open={openModal}>
      <div className={classes.addNewPostModal}>
        <div
          onClick={() => {
            setOpenModal(false);
          }}
          className={classes.modalCloseButton}
        >
          <CancelIcon />
        </div>
        <Form
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
      </div>
    </Modal>
  );
};

{
  /* <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          spacing={3}
        >
          <Grid className={classes.leftSideBar} item xs={12} sm={6} md={3}>
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
          </Grid>

          <Grid className={classes.mainContent} item xs={12} sm={6} md={9}>
            <Posts setSelectedCardId={setSelectedCardId} />
          </Grid>
        </Grid> */
}
