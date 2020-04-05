import React from "react";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { drawerLinks, appName } from "./layoutConfig";
import drawerItems from "./drawerItems";
import { NavLink } from "react-router-dom";
import store from "../../store";
import { logOut } from "../../actions/auth";
import ShowHide from "../auth/ShowHide";

const drawerWidth = 200;
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedLink, setSelectedLink] = React.useState(0);
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event, index, onClick) => {
    setSelectedLink(index);
    if (breakpointMatches) {
      handleDrawerToggle();
    }
    if (onClick) {
      onClick();
    }
  };

  const drawer = drawerItems(
    drawerLinks,
    selectedLink,
    handleListItemClick,
    classes
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap className={classes.title}>
            {appName}
          </Typography>

          <ShowHide
            isLoggedIn={isLoggedIn}
            showIfLoggedOut={true}
            showIfLoggedIn={false}
          >
            <Button component={NavLink} to="/auth/register" color="inherit">
              Register
            </Button>
            <Button component={NavLink} color="inherit" to="/auth/login">
              Login
            </Button>
          </ShowHide>
          <Button
            color="inherit"
            onClick={() => {
              store.dispatch(logOut());
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Navigation">
        <Hidden smUp>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onOpen={handleDrawerToggle}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar}>{drawer}</div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
