import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {parseStoryboardToSpec} from './parse-storyboard';
import {TextBlock} from './widgets/TextBlock';
import {ImageBlock} from './widgets/ImageBlock';
import {VideoBlock} from './widgets/VideoBlock';
import {TransitionIn, TransitionOut} from './widgets/transitions';

import story from '../public/story.json';

export const VideoFromJSON = () => {
  const spec = parseStoryboardToSpec(story, {});
  let from = 0;

  return (
    <AbsoluteFill style={{backgroundColor: spec.background}}>
      {spec.scenes.map((scene, idx) => {
        const total = scene.durationInFrames;
        const body = (
          <AbsoluteFill style={{backgroundColor: scene.background}}>
            {scene.layers?.map((l, i) => {
              if (l.type === 'text') return <TextBlock key={i} layer={l} sceneDuration={scene.durationInFrames} />;
              if (l.type === 'image') return <ImageBlock key={i} layer={l} sceneDuration={scene.durationInFrames} />;
              if (l.type === 'video') return <VideoBlock key={i} layer={l} sceneDuration={scene.durationInFrames} />;
              return null;
            })}
          </AbsoluteFill>
        );

        const wrappedIn = scene.transitionIn
          ? <TransitionIn type={scene.transitionIn.type} duration={scene.transitionIn.duration}>{body}</TransitionIn>
          : body;

        const wrapped = scene.transitionOut
          ? <TransitionOut type={scene.transitionOut.type} duration={scene.transitionOut.duration}>{wrappedIn}</TransitionOut>
          : wrappedIn;

        const comp = (
          <Sequence key={idx} from={from} durationInFrames={total} layout="none">
            {wrapped}
          </Sequence>
        );
        from += total;
        return comp;
      })}
    </AbsoluteFill>
  );
};
