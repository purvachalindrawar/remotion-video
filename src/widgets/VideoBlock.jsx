import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile} from 'remotion';

export const VideoBlock = ({layer}) => (
  <AbsoluteFill>
    <OffthreadVideo
      src={staticFile(layer.src?.startsWith('/') ? layer.src.slice(1) : layer.src)}
      muted
      startFrom={layer.startFrom ?? 0}
      style={{
        position: 'absolute', inset: 0,
        width: layer.width ?? '100%', height: layer.height ?? '100%',
        objectFit: layer.fit ?? 'cover'
      }}
    />
  </AbsoluteFill>
);
