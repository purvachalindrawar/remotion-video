// Converts story.json into renderer spec
const toFrames = (sec, fps) => Math.max(1, Math.round((Number(sec)||0) * fps));
const trim = (s) => String(s ?? "").replace(/^\/+/, "");

const normalizeAnimations = (arr) =>
  Array.isArray(arr) ? arr.map(a => ({
    type: String(a.type || "").toLowerCase(),
    speed: a.speed ?? a.interval ?? undefined,
    intensity: a.intensity,
    scale: a.scale,
    duration: a.duration,
    delay: a.delay ?? 0,
    direction: a.direction
  })) : [];

export const parseStoryboardToSpec = (story, defaults = {}) => {
  const fps = story.fps || defaults.fps || 30;
  const width = story.width || defaults.width || 1080;
  const height = story.height || defaults.height || 1920;

  const scenes = (story.frames || []).map((f, idx) => {
    const durationInFrames = toFrames(
      f.durationInSeconds ?? (f.endTime - f.startTime ?? 1),
      fps
    );

    const layers = [];

    if (f.visuals?.backgroundGradient?.length) {
      layers.push({
        type: 'gradient',
        colors: f.visuals.backgroundGradient,
        direction: f.visuals.gradientDirection || 'vertical',
        start: 0, end: durationInFrames
      });
    }
    if (f.visuals?.backgroundImage) {
      layers.push({
        type: 'image',
        src: `/${trim(f.visuals.backgroundImage)}`,
        x: 0, y: 0, width: '100%', height: '100%', fit: 'cover',
        start: 0, end: durationInFrames
      });
    }
    if (f.visuals?.backgroundVideo) {
      layers.push({
        type: 'video',
        src: `/${trim(f.visuals.backgroundVideo)}`,
        x: 0, y: 0, width: '100%', height: '100%', fit: 'cover',
        start: 0, end: durationInFrames,
        startFrom: 0
      });
    }
    if (f.visuals?.overlay) {
      layers.push({
        type: 'image',
        src: `/${trim(f.visuals.overlay)}`,
        x: 0, y: 0, width: '100%', height: '100%', fit: 'cover',
        opacity: 0.6,
        start: 0, end: durationInFrames
      });
    }

    if (typeof f.visuals?.text === 'string') {
      layers.push({
        type: 'text',
        content: f.visuals.text,
        x: f.visuals.x ?? 80,
        y: f.visuals.y ?? 360,
        color: f.visuals.textColor || 'white',
        fontSize: (f.visuals.textSize === 'large' ? 84 : f.visuals.textSize === 'small' ? 44 : 64),
        fontFamily: f.visuals.fontFamily || 'system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        animations: normalizeAnimations(f.visuals.animations ?? []),
        start: 0, end: durationInFrames
      });
    }

    const sfx = (f.sound?.effects || []).map((e) => {
      if (typeof e === 'string') return { src: `/${trim(e)}`, atFrame: 0, volume: 1 };
      return { src: `/${trim(e.name)}`, atFrame: toFrames(e.at ?? 0, fps), volume: e.volume ?? 1 };
    });

    return {
      id: `frame-${f.frameNumber ?? idx+1}`,
      durationInFrames,
      background: f.visuals?.backgroundColor ?? '#000000',
      transitionIn: f.transitionIn || null,
      transitionOut: f.transitionOut || null,
      layers, sfx
    };
  });

  return { width, height, fps, background: '#000000', scenes, audio: null };
};
