import {Composition} from 'remotion';
import {VideoFromJSON} from './VideoFromJSON';
import story from '../public/story.json';

export const RemotionRoot = () => (
  <Composition
    id="JsonReel"
    component={VideoFromJSON}
    durationInFrames={story.frames.reduce((a,f)=>a+f.durationInSeconds*story.fps,0)}
    fps={story.fps}
    width={story.width}
    height={story.height}
  />
);
