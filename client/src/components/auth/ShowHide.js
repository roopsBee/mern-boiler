const ShowHide = ({
  isLoggedIn = false,
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
