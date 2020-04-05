import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import { NavLink } from "react-router-dom";

const drawerItems = (
  drawerLinks,
  selectedItemState,
  handleListItemClick,
  classes
) => {
  const drawerlinksRendered = drawerLinks.map((link, index) => {
    return (
      <ListItem
        component={NavLink}
        to={link.to ? link.to : ""}
        button
        key={link.name}
        selected={selectedItemState === index}
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
      <List>{drawerlinksRendered}</List>
    </div>
  );
};

export default drawerItems;
