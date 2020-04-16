import React from "react";

const ShowHide = ({ isShowValue = false, children, Replace, ...props }) => {
  // if (isShowValue) {
  //   return children;
  // }
  return isShowValue ? children : Replace ? <Replace {...props} /> : null;

  // if (Replace) {
  //   return <Replace {...props} />;
  // } else {
  //   return null;
  // }
};

export default ShowHide;
