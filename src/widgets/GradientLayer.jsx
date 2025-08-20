// import React from 'react';
// import {AbsoluteFill} from 'remotion';
// import {useAnim} from './use-anim';

// const dirToCss = (direction) => {
//   const d = (direction || 'vertical').toLowerCase();
//   if (d === 'horizontal') return 'to right';
//   if (d === 'diagonal') return '45deg';
//   return 'to bottom';
// };

// export const GradientLayer = ({layer, sceneDuration}) => {
//   const {visible, style} = useAnim({layer, sceneDuration});
//   if (!visible) return null;

//   const bg = {
//     position: 'absolute',
//     inset: 0,
//     backgroundImage: `linear-gradient(${dirToCss(layer.direction)}, ${layer.colors.join(', ')})`,
//   };
//   return (
//     <AbsoluteFill>
//       <div style={{...bg, ...style}} />
//     </AbsoluteFill>
//   );
// };


import React from 'react';
import {AbsoluteFill} from 'remotion';
import {useAnim} from './use-anim';

const dirToCss = (direction) => {
  const d = (direction || 'vertical').toLowerCase();
  if (d === 'horizontal') return 'to right';
  if (d === 'diagonal') return '45deg';
  return 'to bottom';
};

export const GradientLayer = ({layer, sceneDuration}) => {
  const {visible, style} = useAnim({layer, sceneDuration});
  if (!visible) return null;

  const bg = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `linear-gradient(${dirToCss(layer.direction)}, ${layer.colors.join(', ')})`,
  };

  return (
    <AbsoluteFill>
      <div style={{...bg, ...style}} />
    </AbsoluteFill>
  );
};
