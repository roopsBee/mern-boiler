import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import LinkIcon from "@material-ui/icons/Link";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getLists } from "../../actions/lists";
import ShowHide from "../auth/ShowHide";
import AddList from "./AddList";
import DrawerItem from "./DrawerItem";

const DrawerItems = (handleListItemClick, classes) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getLists());
    }
  }, [isLoggedIn, dispatch]);

  const myLists = lists.map((list) => {
    const { _id, name } = list;
    return (
      <ListItem
        component={NavLink}
        to={`/list/${_id}`}
        button
        key={_id}
        selected={location.pathname === `/list/${_id}` ? true : false}
        onClick={handleListItemClick}
      >
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    );
  });

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <DrawerItem
          name="Home"
          to="/"
          icon={<HomeIcon />}
          onClick={handleListItemClick}
        />
        <ShowHide showIfLoggedOut={false} isLoggedIn={isLoggedIn}>
          <AddList handleListItemClick={handleListItemClick} />
          {myLists}
        </ShowHide>
      </List>
    </div>
  );
};

export default DrawerItems;
