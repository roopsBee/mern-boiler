import React from "react";
import { useLocation } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { NavLink } from "react-router-dom";

function DrawerItem({ name, to, handleClick, Icon, ...props }) {
  const location = useLocation();
  let isPath = location.pathname === to ? true : false;
  return (
    <ListItem
      component={NavLink}
      to={to}
      button
      key={name}
      selected={isPath}
      onClick={handleClick}
      {...props}
    >
      {Icon ? (
        <ListItemIcon>
          <Icon color={isPath ? "secondary" : "primary"} />
        </ListItemIcon>
      ) : null}
      <ListItemText primary={name} />
    </ListItem>
  );
}

export default DrawerItem;
