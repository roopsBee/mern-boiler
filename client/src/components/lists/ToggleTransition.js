import React from "react";
import { animated, useTransition } from "react-spring";

//toggle - state true/false
//transitionStyles - {from{styles},to:{styles},leave:{styles}}

export default function App({ toggle, transitionStyles, children }) {
  const transitions = useTransition(toggle, null, transitionStyles);

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props}>
          {children}
        </animated.div>
      )
  );
}
