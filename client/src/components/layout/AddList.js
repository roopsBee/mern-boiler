import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { NavLink } from "react-router-dom";

const AddList = ({ index, handleListItemClick, selectedLink }) => {
  const onClick = (event) => {
    handleListItemClick(event, index);
  };
  return (
    <ListItem
      component={NavLink}
      to="/list/create"
      button
      key="add new list"
      selected={selectedLink === index}
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
