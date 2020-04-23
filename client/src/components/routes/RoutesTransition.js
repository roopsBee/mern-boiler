import React from "react";
import { useLocation } from "react-router-dom";
import { animated, useTransition } from "react-spring";

function RoutesTransition({ children }) {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate3d(25%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, immediate: true },
  });

  return transitions.map(({ props, key }) => (
    <animated.div key={key} style={props}>
      {children}
    </animated.div>
  ));
}

export default RoutesTransition;
