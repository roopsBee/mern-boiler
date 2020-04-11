const ShowHide = ({
  isLoggedIn = false, // point to isLoggedin state
  showIfLoggedIn = true,
  showIfLoggedOut = true,
  getAuthlevel = "all",
  authLevel = "all",
  children,
}) => {
  if (getAuthlevel === authLevel) {
    if (isLoggedIn && showIfLoggedIn) {
      return children;
    } else if (!isLoggedIn && showIfLoggedOut) {
      return children;
    }
  }
  return null;
};

export default ShowHide;
