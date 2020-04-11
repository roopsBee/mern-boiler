import HomeIcon from "@material-ui/icons/Home";
import React from "react";

// render side bar links for Layout
// {[icon:component], name:string, [to:string], [onClick:function]}
export const drawerLinks = [
  {
    icon: <HomeIcon />,
    name: "Home",
    to: "/",
  },
];

export const appName = "My Apps";
