import React from "react";
import { animated, useSpring } from "react-spring";
import AddItem from "./AddItem";

function AnimatedAddItem(props) {
  const height = "48px";
  const styles = useSpring({
    from: { opacity: 0, height: "0px" },
    to: { opacity: 1, height: height },
  });
  return (
    <animated.div style={styles}>
      <AddItem {...props} />
    </animated.div>
  );
}

export default AnimatedAddItem;
