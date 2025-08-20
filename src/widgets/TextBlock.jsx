import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';

const splitWords = (s) => s.split(/(\s+)/);

export const TextBlock = ({layer, sceneDuration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const anims = layer.animations || [];

  const start = layer.start ?? 0;
  const end = layer.end ?? sceneDuration;
  if (frame < start || frame >= end) return null;
  const local = frame - start;

  const text = layer.content || '';
  const type = anims.find(a => a.type === 'typewriter');
  const wordSeq = anims.find(a => a.type === 'word-by-word');

  let rendered = text;
  if (type) {
    const cps = Math.max(1, type.speed ?? 30);
    const chars = Math.min(text.length, Math.floor((local / fps) * cps));
    rendered = text.slice(0, chars);
  } else if (wordSeq) {
    const interval = Math.max(1, wordSeq.speed ?? wordSeq.interval ?? 8);
    const tokens = splitWords(text);
    const wordsShown = Math.floor(local / interval);
    rendered = tokens.slice(0, Math.max(1, wordsShown)).join('');
  }

  let opacity = layer.opacity ?? 1;
  let translateX = 0, translateY = 0, scale = 1, filter = '';

  anims.forEach(a => {
    if (a.type === 'pulse') {
      const d = a.duration ? a.duration : Math.round(fps * 0.6);
      const sMax = a.scale ?? 1.08;
      const t = local % d;
      const s = interpolate(t, [0, d/2, d], [1, sMax, 1]);
      scale *= s;
    }
    if (a.type === 'slide-in') {
      const d = a.duration ?? Math.round(fps * 0.4);
      const dir = (a.direction || 'up').toLowerCase();
      const delta = interpolate(local, [0, d], [ (dir==='left')?40:(dir==='right')?-40:0, 0]);
      const deltaY = interpolate(local, [0, d], [ (dir==='up')?40:(dir==='down')?-40:0, 0]);
      translateX += delta;
      translateY += deltaY;
      opacity = interpolate(local, [0, d], [0, 1]);
    }
    if (a.type === 'glitch') {
      const period = a.duration ?? 10;
      const on = ((Math.floor(local) % period) < Math.max(1, Math.floor(period/3)));
      opacity *= on ? 1 : 0.4;
      filter = 'drop-shadow(0 0 6px rgba(0,255,255,0.5))';
    }
  });

  const styleBox = {
    position: 'absolute',
    left: layer.x ?? 64,
    top: layer.y ?? 360,
    width: layer.maxWidth ?? 960,
    color: layer.color || 'white',
    fontSize: layer.fontSize ?? 64,
    fontFamily: layer.fontFamily ?? 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 1.2,
    whiteSpace: 'pre-wrap',
    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
    opacity,
    filter
  };

  return (
    <AbsoluteFill>
      <div style={styleBox}>{rendered}</div>
    </AbsoluteFill>
  );
};
