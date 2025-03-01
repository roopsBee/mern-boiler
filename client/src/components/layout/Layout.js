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
import DrawerItems from "./DrawerItems";
import { NavLink } from "react-router-dom";
import store from "../../store";
import { logOut } from "../../actions/auth";
import ShowHide from "../auth/ShowHide";
import Loading from "./Loading";

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
    padding: theme.spacing(3, 0, 0, 0),
  },
}));

function ResponsiveDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const breakpointMatches = useMediaQuery(theme.breakpoints.down("xs"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let isAuthenticating = useSelector((state) => state.auth.isAuthenticating);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (event) => {
    if (breakpointMatches) {
      handleDrawerToggle();
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={10} position="fixed" className={classes.appBar}>
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
          <Typography
            variant="h5"
            noWrap
            className={classes.title}
          ></Typography>

          <ShowHide isShowValue={!isLoggedIn}>
            <Button component={NavLink} to="/auth/register" color="inherit">
              Register
            </Button>
            <Button component={NavLink} color="inherit" to="/auth/login">
              Login
            </Button>
          </ShowHide>
          <ShowHide isShowValue={isLoggedIn}>
            <Button
              color="inherit"
              onClick={() => {
                store.dispatch(logOut());
              }}
              value="value"
            >
              Logout
            </Button>
          </ShowHide>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Navigation">
        <Hidden smUp>
          <SwipeableDrawer
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            variant="temporary"
            anchor="left"
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
            <DrawerItems
              handleListItemClick={handleListItemClick}
              classes={classes}
            />
          </SwipeableDrawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            elevation={10}
          >
            <div className={classes.toolbar}>
              <DrawerItems
                handleListItemClick={handleListItemClick}
                classes={classes}
              />
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ShowHide isShowValue={!isAuthenticating} Replace={Loading}>
          {props.children}
        </ShowHide>
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
