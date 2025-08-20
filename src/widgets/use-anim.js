// import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

// export const useAnim = ({layer, sceneDuration}) => {
//   const frame = useCurrentFrame();
//   const {fps} = useVideoConfig();

//   const start = layer.start ?? 0;
//   const end = layer.end ?? sceneDuration;
//   const visible = frame >= start && frame < end;
//   const local = Math.max(0, frame - start);

//   let transform = '';
//   let opacity = layer.opacity ?? 1;

//   (layer.animations || []).forEach((a) => {
//     const d = a.duration ?? Math.round(fps * 0.5);
//     const t = a.delay ?? 0;
//     const f = Math.max(0, local - t);

//     if (a.name === 'fadeIn') {
//       const v = interpolate(f, [0, d], [0, opacity], {extrapolateRight: 'clamp'});
//       opacity = v;
//     }
//     if (a.name === 'fadeOut') {
//       const outStart = Math.max(0, (layer.end ?? sceneDuration) - start - d);
//       const v = interpolate(local, [outStart, outStart + d], [opacity, 0], {extrapolateLeft: 'clamp'});
//       opacity = v;
//     }
//     if (a.name === 'slideUp') {
//       const y = interpolate(f, [0, d], [40, 0], {extrapolateRight: 'clamp'});
//       transform += ` translateY(${y}px)`;
//     }
//     if (a.name === 'slideDown') {
//       const y = interpolate(f, [0, d], [-40, 0], {extrapolateRight: 'clamp'});
//       transform += ` translateY(${y}px)`;
//     }
//     if (a.name === 'slideLeft') {
//       const x = interpolate(f, [0, d], [40, 0], {extrapolateRight: 'clamp'});
//       transform += ` translateX(${x}px)`;
//     }
//     if (a.name === 'slideRight') {
//       const x = interpolate(f, [0, d], [-40, 0], {extrapolateRight: 'clamp'});
//       transform += ` translateX(${x}px)`;
//     }
//     if (a.name === 'scaleIn') {
//       const s = interpolate(f, [0, d], [0.9, 1], {extrapolateRight: 'clamp'});
//       transform += ` scale(${s})`;
//     }
//     if (a.name === 'scaleOut') {
//       const s = interpolate(f, [0, d], [1, 0.9], {extrapolateRight: 'clamp'});
//       transform += ` scale(${s})`;
//     }
//     // 'typewriter' handled in TextBlock
//   });

//   return {visible, local, start, end, style: {opacity, transform}};
// };


import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export const useAnim = ({layer, sceneDuration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const start = layer.start ?? 0;
  const end = layer.end ?? sceneDuration;
  const visible = frame >= start && frame < end;
  const local = Math.max(0, frame - start);

  let transform = '';
  let opacity = layer.opacity ?? 1;

  (layer.animations || []).forEach((a) => {
    const d = a.duration ?? Math.round(fps * 0.5);
    const t = a.delay ?? 0;
    const f = Math.max(0, local - t);

    if (a.name === 'fadeIn') {
      opacity = interpolate(f, [0, d], [0, opacity], {extrapolateRight: 'clamp'});
    }
    if (a.name === 'fadeOut') {
      const outStart = Math.max(0, (layer.end ?? sceneDuration) - start - d);
      opacity = interpolate(local, [outStart, outStart + d], [opacity, 0], {extrapolateLeft: 'clamp'});
    }
    if (a.name === 'slideUp') {
      const y = interpolate(f, [0, d], [40, 0], {extrapolateRight: 'clamp'});
      transform += ` translateY(${y}px)`;
    }
    if (a.name === 'slideDown') {
      const y = interpolate(f, [0, d], [-40, 0], {extrapolateRight: 'clamp'});
      transform += ` translateY(${y}px)`;
    }
    if (a.name === 'slideLeft') {
      const x = interpolate(f, [0, d], [40, 0], {extrapolateRight: 'clamp'});
      transform += ` translateX(${x}px)`;
    }
    if (a.name === 'slideRight') {
      const x = interpolate(f, [0, d], [-40, 0], {extrapolateRight: 'clamp'});
      transform += ` translateX(${x}px)`;
    }
    if (a.name === 'scaleIn') {
      const s = interpolate(f, [0, d], [0.9, 1], {extrapolateRight: 'clamp'});
      transform += ` scale(${s})`;
    }
    if (a.name === 'scaleOut') {
      const s = interpolate(f, [0, d], [1, 0.9], {extrapolateRight: 'clamp'});
      transform += ` scale(${s})`;
    }
    // 'typewriter' handled in TextBlock
  });

  return {visible, local, start, end, style: {opacity, transform}};
};
