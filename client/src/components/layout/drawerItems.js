import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLists } from "../../actions/lists";
import ShowHide from "../auth/ShowHide";
import AddList from "./AddList";

const DrawerItems = (
  drawerLinks,
  selectedLink,
  handleListItemClick,
  classes
) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getLists());
    }
  }, [isLoggedIn, dispatch]);

  const myLists = lists.map((list, index) => {
    const { _id, name } = list;
    index = index + drawerLinks.length + 1;
    return (
      <ListItem
        component={NavLink}
        to={`/list/${_id}`}
        button
        key={_id}
        selected={selectedLink === index}
        onClick={(event) => handleListItemClick(event, index)}
      >
        <ListItemIcon>
          <LinkIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    );
  });

  const drawerlinksRendered = drawerLinks.map((link, index) => {
    return (
      <ListItem
        component={NavLink}
        to={link.to ? link.to : ""}
        button
        key={link.name}
        selected={selectedLink === index}
        onClick={(event) => handleListItemClick(event, index, link.onClick)}
      >
        <ListItemIcon>{link.icon ? link.icon : <LinkIcon />}</ListItemIcon>
        <ListItemText primary={link.name} />
      </ListItem>
    );
  });
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {drawerlinksRendered}
        <ShowHide showIfLoggedOut={false} isLoggedIn={isLoggedIn}>
          <AddList
            index={drawerLinks.length}
            handleListItemClick={handleListItemClick}
            selectedLink={selectedLink}
          />
          {myLists}
        </ShowHide>
      </List>
    </div>
  );
};

export default DrawerItems;
