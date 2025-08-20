
// import React from 'react';
// import {AbsoluteFill} from 'remotion';
// import {useAnim} from './use-anim';

// export const ImageBlock = ({layer, sceneDuration}) => {
//   const {visible, style} = useAnim({layer, sceneDuration});
//   if (!visible) return null;

//   const imgStyle = {
//     position: 'absolute',
//     left: layer.x ?? 0,
//     top: layer.y ?? 0,
//     width: layer.width ?? '100%',
//     height: layer.height ?? '100%',
//     objectFit: layer.fit ?? 'contain',
//   };

//   return (
//     <AbsoluteFill>
//       <img src={layer.src} alt="" style={{...imgStyle, ...style}} />
//     </AbsoluteFill>
//   );
// };


import React from 'react';
import {AbsoluteFill, staticFile} from 'remotion';

export const ImageBlock = ({layer, sceneDuration}) => {
  const src = layer.src?.startsWith('/') ? layer.src.slice(1) : layer.src;
  return (
    <AbsoluteFill>
      <img
        src={staticFile(src)}
        alt=""
        style={{
          position:'absolute', inset:0,
          width: layer.width ?? '100%',
          height: layer.height ?? '100%',
          objectFit: layer.fit ?? 'cover',
          opacity: layer.opacity ?? 1
        }}
      />
    </AbsoluteFill>
  );
};
