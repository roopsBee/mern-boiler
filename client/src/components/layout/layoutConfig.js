import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { logOut } from "../../actions/auth";
import store from "../../store";

// render side bar links for Layout
// {[icon:component], name:string, [to:string], [onClick:function]}
export const drawerLinks = [
  {
    icon: <HomeIcon />,
    name: "Home",
    to: "/",
  },
  {
    name: "Logout",
    onClick: () => {
      store.dispatch(logOut());
    },
  },
  {
    name: "private",
    to: "/private",
  },
];

export const appName = "My Apps";
