import React from 'react';
import {useCurrentFrame, interpolate} from 'remotion';

export const TransitionIn = ({type='fade', duration=15, children}) => {
  const f = useCurrentFrame();
  if (type === 'fade') {
    const o = interpolate(f, [0, duration], [0, 1]);
    return <div style={{opacity:o}}>{children}</div>;
  }
  return children;
};

export const TransitionOut = ({type='fade', duration=15, children}) => {
  const f = useCurrentFrame();
  if (type === 'fade') {
    const o = interpolate(f, [0, duration], [1, 0]);
    return <div style={{opacity:o}}>{children}</div>;
  }
  return children;
};
