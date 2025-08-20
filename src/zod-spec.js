// import {z} from 'zod';

// const anim = z.object({
//   name: z
//     .enum([
//       'fadeIn','fadeOut','slideUp','slideDown','slideLeft','slideRight',
//       'scaleIn','scaleOut','typewriter',
//     ])
//     .optional(),
//   duration: z.number().int().positive().optional(),
//   delay: z.number().int().min(0).optional(),
// });

// const baseLayer = {
//   x: z.number().optional(),
//   y: z.number().optional(),
//   start: z.number().int().min(0).optional(),
//   end: z.number().int().min(0).optional(),
//   animations: z.array(anim).optional(),
//   opacity: z.number().min(0).max(1).optional(),
// };

// const textLayer = z.object({
//   type: z.literal('text'),
//   content: z.string(),
//   fontSize: z.number().optional(),
//   fontFamily: z.string().optional(),
//   color: z.string().optional(),
//   maxWidth: z.number().optional(),
//   align: z.enum(['left','center','right']).optional(),
//   lineHeight: z.number().optional(),
//   ...baseLayer,
// });

// const imageLayer = z.object({
//   type: z.literal('image'),
//   src: z.string(),
//   width: z.union([z.number(), z.string()]).optional(),
//   height: z.union([z.number(), z.string()]).optional(),
//   fit: z.enum(['contain','cover']).optional(),
//   ...baseLayer,
// });

// const videoLayer = z.object({
//   type: z.literal('video'),
//   src: z.string(),
//   muted: z.boolean().optional(),
//   loop: z.boolean().optional(),
//   width: z.union([z.number(), z.string()]).optional(),
//   height: z.union([z.number(), z.string()]).optional(),
//   ...baseLayer,
// });

// const gradientLayer = z.object({
//   type: z.literal('gradient'),
//   colors: z.array(z.string()).min(2),
//   direction: z.string().optional(), // 'vertical' | 'horizontal' | 'diagonal'
//   ...baseLayer,
// });

// const sfxItem = z.object({
//   src: z.string(),
//   volume: z.number().min(0).max(1).optional(),
//   atFrame: z.number().int().min(0).optional(),
// });

// const scene = z.object({
//   id: z.string().optional(),
//   durationInFrames: z.number().int().positive(),
//   background: z.string().optional(),
//   transitionOut: z
//     .object({
//       type: z.enum(['crossfade']).default('crossfade'),
//       duration: z.number().int().min(0).default(0),
//     })
//     .optional(),
//   layers: z.array(z.union([textLayer, imageLayer, videoLayer, gradientLayer])).default([]),
//   sfx: z.array(sfxItem).optional(),
// });

// const specSchema = z.object({
//   width: z.number().int().positive().default(1080),
//   height: z.number().int().positive().default(1920),
//   fps: z.number().int().positive().default(30),
//   background: z.string().optional(),
//   scenes: z.array(scene),
//   audio: z
//     .object({
//       src: z.string(),
//       volume: z.number().min(0).max(1).optional(),
//     })
//     .nullable()
//     .optional(),
// });

// export const validateSpec = (data) => specSchema.parse(data);


import {z} from 'zod';

const anim = z.object({
  name: z.enum([
    'fadeIn','fadeOut','slideUp','slideDown','slideLeft','slideRight',
    'scaleIn','scaleOut','typewriter',
  ]).optional(),
  duration: z.number().int().positive().optional(),
  delay: z.number().int().min(0).optional(),
});

const baseLayer = {
  x: z.union([z.number(), z.string()]).optional(),
  y: z.union([z.number(), z.string()]).optional(),
  start: z.number().int().min(0).optional(),
  end: z.number().int().min(0).optional(),
  animations: z.array(anim).optional(),
  opacity: z.number().min(0).max(1).optional(),
  width: z.union([z.number(), z.string()]).optional(),
  height: z.union([z.number(), z.string()]).optional(),
};

const textLayer = z.object({
  type: z.literal('text'),
  content: z.string(),
  fontSize: z.number().optional(),
  fontFamily: z.string().optional(),
  color: z.string().optional(),
  maxWidth: z.number().optional(),
  align: z.enum(['left','center','right']).optional(),
  lineHeight: z.number().optional(),
  ...baseLayer,
});

const imageLayer = z.object({
  type: z.literal('image'),
  src: z.string(),
  fit: z.enum(['contain','cover']).optional(),
  ...baseLayer,
});

const videoLayer = z.object({
  type: z.literal('video'),
  src: z.string(),
  startFrom: z.number().int().min(0).optional(), // frames in source
  endAt: z.number().int().min(0).optional(),     // frames in source
  fit: z.enum(['contain','cover']).optional(),
  muted: z.boolean().optional(),
  loop: z.boolean().optional(),
  ...baseLayer,
});

const gradientLayer = z.object({
  type: z.literal('gradient'),
  colors: z.array(z.string()).min(2),
  direction: z.string().optional(), // 'vertical' | 'horizontal' | 'diagonal'
  ...baseLayer,
});

const sfxItem = z.object({
  src: z.string(),
  volume: z.number().min(0).max(1).optional(),
  atFrame: z.number().int().min(0).optional(),
});

const scene = z.object({
  id: z.string().optional(),
  durationInFrames: z.number().int().positive(),
  background: z.string().optional(),
  transitionOut: z.object({
    type: z.enum(['crossfade']).default('crossfade'),
    duration: z.number().int().min(0).default(0),
  }).optional(),
  layers: z.array(z.union([textLayer, imageLayer, videoLayer, gradientLayer])).default([]),
  sfx: z.array(sfxItem).optional(),
});

const specSchema = z.object({
  width: z.number().int().positive().default(1080),
  height: z.number().int().positive().default(1920),
  fps: z.number().int().positive().default(30),
  background: z.string().optional(),
  scenes: z.array(scene),
  audio: z.object({
    src: z.string(),
    volume: z.number().min(0).max(1).optional(),
  }).nullable().optional(),
});

export const validateSpec = (data) => specSchema.parse(data);
