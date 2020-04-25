import { animated, useSpring } from "react-spring";
import ListName from "./ListName";
import React from "react";

function AnimatedListName(props) {
  const height = "32px";
  const styles = useSpring({
    from: { opacity: 0, height: "0px" },
    to: { opacity: 1, height: height },
  });

  return (
    <animated.div style={styles}>
      <ListName {...props} />
    </animated.div>
  );
}

export default AnimatedListName;
