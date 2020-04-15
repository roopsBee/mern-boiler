import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddList = ({ handleListItemClick }) => {
  const location = useLocation();
  const onClick = (event) => {
    handleListItemClick(event);
  };
  return (
    <ListItem
      component={NavLink}
      to="/list/create"
      button
      key="add new list"
      selected={location.pathname === `/list/create` ? true : false}
      onClick={(event) => onClick(event)}
    >
      <ListItemIcon>
        <LinkIcon />
      </ListItemIcon>
      <ListItemText primary="New List" />
    </ListItem>
  );
};

export default AddList;
