// Media item types:
// { type: 'image', src: '/assets/...', alt: '...' }
// { type: 'image', src: '/assets/...', alt: '...', span: 'full' }   ← panoramic strip, renders full-width
// { type: 'video', src: '/assets/...', poster: '/assets/...' }      ← 16:9 default
// { type: 'video', ..., aspect: 'square' }                          ← ~1:1 content (char animations)
// { type: 'video', ..., aspect: 'portrait' }                        ← 9:16 mobile screen recordings
// { type: 'embed', src: 'https://player.vimeo.com/...' }            ← iframe embed
// Gallery order: videos appear before images on the page (hero = first video if available)

export const projects = [
  {
    id: 'sneaky-panda',
    index: '01',
    title: 'Sneaky Panda',
    subtitle: 'Mobile Game Titles — Panda Power & RiftCraft',
    roles: ['Animator', 'Tech Artist', '3D Generalist'],
    tools: ['Blender', 'Spine 2D', 'Unity'],
    year: '2021–2025',
    type: 'Professional',
    thumbnail: '/assets/thumbs/sneaky-panda.jpg',
    reelUrl: null,
    description: [
      'Four years at Sneaky Panda, a mobile games studio — started as animator and ended up owning the entire visual pipeline. Shipped two titles: Panda Power and RiftCraft.',
      'Work spans stylized 2D and 3D character animation, Spine 2D rigging, Unity integration (Animator State Machine, Timeline, Particle System, prefabs), UI motion, simple VFX, and keeping mobile builds clean and under 150 MB.',
    ],
    gallery: [
      { type: 'image', src: '/assets/sneaky-panda/backgrounds1.jpg', alt: 'Panda Power — game background' },
      { type: 'image', src: '/assets/sneaky-panda/backgrounds2.jpg', alt: 'Panda Power — game background 2' },
      { type: 'image', src: '/assets/sneaky-panda/backgrounds3.jpg', alt: 'Panda Power — game background 3' },
      { type: 'image', src: '/assets/sneaky-panda/backgrounds4.jpg', alt: 'Panda Power — game background 4' },
      { type: 'image', src: '/assets/sneaky-panda/croc_madam_animation.jpg', alt: 'Croc Madam — character animation sheet' },
      { type: 'image', src: '/assets/sneaky-panda/knight.jpg', alt: 'RiftCraft Knight — character sheet' },
      { type: 'image', src: '/assets/sneaky-panda/knight_3.jpg', alt: 'RiftCraft Knight — evolution design', span: 'full' },
      // Character animations — Panda Power (square ~1:1)
      { type: 'video', src: '/assets/sneaky-panda/anim/croc-idle.mp4', poster: '/assets/sneaky-panda/croc_madam_animation.jpg', alt: 'Croc Madam — idle animation', aspect: 'square' },
      { type: 'video', src: '/assets/sneaky-panda/anim/croc_rig_example.mp4', poster: '/assets/sneaky-panda/croc_madam_animation.jpg', alt: 'Croc — rig example', aspect: 'square' },
      { type: 'video', src: '/assets/sneaky-panda/anim/chameleon_idle.mp4', poster: '/assets/sneaky-panda/backgrounds1.jpg', alt: 'Chameleon — idle animation', aspect: 'square' },
      // Character animations — RiftCraft (square ~1:1)
      { type: 'video', src: '/assets/sneaky-panda/anim/knight_rig_example.mp4', poster: '/assets/sneaky-panda/knight.jpg', alt: 'Knight — rig example', aspect: 'square' },
      { type: 'video', src: '/assets/sneaky-panda/anim/knight-attack.mp4', poster: '/assets/sneaky-panda/knight.jpg', alt: 'Knight — attack animation', aspect: 'square' },
      { type: 'video', src: '/assets/sneaky-panda/anim/ranger_attack.mp4', poster: '/assets/sneaky-panda/knight_3.jpg', alt: 'Ranger — attack animation', aspect: 'square' },
      { type: 'video', src: '/assets/sneaky-panda/anim/joker-rig.mp4', poster: '/assets/sneaky-panda/knight.jpg', alt: 'Joker — rig example', aspect: 'square' },
      { type: 'video', src: '/assets/sneaky-panda/anim/skeleton-hulk.mp4', poster: '/assets/sneaky-panda/knight_3.jpg', alt: 'Skeleton Hulk — action', aspect: 'square' },
      { type: 'video', src: '/assets/sneaky-panda/anim/action1.mp4', poster: '/assets/sneaky-panda/knight.jpg', alt: 'RiftCraft — action animation', aspect: 'square' },
      // Gameplay footage — portrait 9:16 mobile recordings
      { type: 'video', src: '/assets/sneaky-panda/gameplay/panda-power-1.mp4', poster: '/assets/sneaky-panda/backgrounds1.jpg', alt: 'Panda Power — gameplay 1', aspect: 'portrait' },
      { type: 'video', src: '/assets/sneaky-panda/gameplay/panda-power-2.mp4', poster: '/assets/sneaky-panda/backgrounds2.jpg', alt: 'Panda Power — gameplay 2', aspect: 'portrait' },
      { type: 'video', src: '/assets/sneaky-panda/riftcraft/riftcraft-1.mp4', poster: '/assets/sneaky-panda/knight.jpg', alt: 'RiftCraft — gameplay 1', aspect: 'portrait' },
      { type: 'video', src: '/assets/sneaky-panda/riftcraft/riftcraft-2.mp4', poster: '/assets/sneaky-panda/knight.jpg', alt: 'RiftCraft — gameplay 2', aspect: 'portrait' },
      { type: 'video', src: '/assets/sneaky-panda/riftcraft/riftcraft-3.mp4', poster: '/assets/sneaky-panda/knight_3.jpg', alt: 'RiftCraft — gameplay 3', aspect: 'portrait' },
      { type: 'video', src: '/assets/sneaky-panda/riftcraft/riftcraft-4.mp4', poster: '/assets/sneaky-panda/knight_3.jpg', alt: 'RiftCraft — gameplay 4', aspect: 'portrait' },
    ],
    process: [],
  },
  {
    id: 'windows-at-night',
    index: '02',
    title: 'I Look Through Your Windows\nAt Night From My Roof',
    subtitle: 'Short Film — ILTY',
    roles: ['Director', 'Animator', '3D Artist'],
    tools: ['Blender'],
    year: '2023',
    type: 'Personal',
    thumbnail: '/assets/thumbs/ilty.jpg',
    reelUrl: null,
    description: [
      'A short 3D animated film. Replace with full description.',
    ],
    gallery: [
      { type: 'image', src: '/assets/ilty/lookdev1.jpg', alt: 'ILTY — lookdev' },
      { type: 'image', src: '/assets/ilty/lookdev2.jpg', alt: 'ILTY — lookdev 2' },
      { type: 'image', src: '/assets/ilty/paintover.jpg', alt: 'ILTY — paint over / concept' },
      { type: 'image', src: '/assets/ilty/backdrop.jpg', alt: 'ILTY — backdrop' },
      { type: 'image', src: '/assets/ilty/lilly_turnaround.jpg', alt: 'Lilly — character turnaround', span: 'full' },
      { type: 'image', src: '/assets/ilty/ron_shading.jpg', alt: 'Ron — character shading', span: 'full' },
      { type: 'image', src: '/assets/ilty/initial_designs.jpg', alt: 'Initial character designs' },
      { type: 'image', src: '/assets/ilty/apartment.webp', alt: "Lilly's apartment — environment design" },
      { type: 'image', src: '/assets/ilty/the_roof.webp', alt: 'The roof — environment design' },
      { type: 'image', src: '/assets/ilty/still1.jpg', alt: 'Film still 1' },
      { type: 'image', src: '/assets/ilty/still2.jpg', alt: 'Film still 2' },
      { type: 'video', src: '/assets/ilty/anim/seq01.mp4', poster: '/assets/ilty/still1.jpg', alt: 'ILTY — sequence 01' },
      { type: 'video', src: '/assets/ilty/anim/seq02.mp4', poster: '/assets/ilty/still2.jpg', alt: 'ILTY — sequence 02' },
      { type: 'video', src: '/assets/ilty/anim/seq03.mp4', poster: '/assets/ilty/lookdev1.jpg', alt: 'ILTY — sequence 03' },
    ],
    process: [],
  },
  {
    id: 'goodbye-firefly',
    index: '03',
    title: 'Goodbye, Firefly',
    subtitle: 'Short Film',
    roles: ['Director', 'Animator'],
    tools: ['Blender'],
    year: '2021',
    type: 'Personal',
    thumbnail: '/assets/thumbs/goodbye-firefly.jpg',
    reelUrl: null,
    description: [
      'Short 3D animated film exploring memory and transition.',
      'Honorable Mention — ASIF International Film Festival, 2020.',
    ],
    gallery: [
      { type: 'image', src: '/assets/goodbye-firefly/goodbye_main.jpg', alt: 'Goodbye, Firefly — main still' },
      { type: 'image', src: '/assets/goodbye-firefly/frame2.jpg', alt: 'Film frame — sequence 2' },
      { type: 'image', src: '/assets/goodbye-firefly/frame3.jpg', alt: 'Film frame — sequence 4' },
      { type: 'image', src: '/assets/goodbye-firefly/frame4.jpg', alt: 'Film frame — sequence 5' },
      { type: 'image', src: '/assets/goodbye-firefly/lookdev.jpg', alt: 'Look development' },
      { type: 'image', src: '/assets/goodbye-firefly/colorscript.webp', alt: 'Color script' },
      { type: 'image', src: '/assets/goodbye-firefly/concept_car.jpg', alt: 'Vehicle concept — car' },
      { type: 'image', src: '/assets/goodbye-firefly/concept_house.jpg', alt: 'Environment concept — house' },
      { type: 'image', src: '/assets/goodbye-firefly/concept_truck.jpg', alt: 'Vehicle concept — truck' },
      { type: 'video', src: '/assets/goodbye-firefly/anim/seq01.mp4', poster: '/assets/goodbye-firefly/goodbye_main.jpg', alt: 'Goodbye, Firefly — sequence 01' },
      { type: 'video', src: '/assets/goodbye-firefly/anim/seq02.mp4', poster: '/assets/goodbye-firefly/frame2.jpg', alt: 'Goodbye, Firefly — sequence 02' },
    ],
    process: [
      { label: 'Concept art', image: '/assets/goodbye-firefly/concept_car.jpg' },
      { label: 'Look development', image: '/assets/goodbye-firefly/lookdev.jpg' },
      { label: 'Final frame', image: '/assets/goodbye-firefly/goodbye_main.jpg' },
    ],
  },
  {
    id: '2love',
    index: '04',
    title: '2Love',
    subtitle: 'Short Film — In Production',
    roles: ['Art Director', 'Animator', '3D Artist'],
    tools: ['Blender', 'After Effects'],
    year: '2025',
    type: 'Personal',
    thumbnail: '/assets/thumbs/2love.jpg',
    reelUrl: null,
    description: [
      'Short film about love and competition. 2D/3D mix. Currently in production.',
    ],
    gallery: [
      { type: 'image', src: '/assets/2love/bg_main.webp', alt: '2Love — background art' },
      { type: 'video', src: '/assets/2love/pink-turnaround.mp4', poster: '/assets/2love/bg_main.webp', alt: '2Love — character turnaround', aspect: 'square' },
      { type: 'video', src: '/assets/2love/anim/low-angle.mp4', poster: '/assets/2love/bg_main.webp', alt: '2Love — low angle shot', aspect: 'square' },
      { type: 'video', src: '/assets/2love/anim/clay-mix.mp4', poster: '/assets/2love/bg_main.webp', alt: '2Love — clay render' },
      { type: 'video', src: '/assets/2love/anim/sc07-sh03.mp4', poster: '/assets/2love/bg_main.webp', alt: '2Love — scene 07 shot 03' },
      { type: 'video', src: '/assets/2love/anim/sc07-sh12.mp4', poster: '/assets/2love/bg_main.webp', alt: '2Love — scene 07 shot 12' },
    ],
    process: [],
  },
  {
    id: 'personal',
    index: '05',
    title: 'Personal Work',
    subtitle: 'Selected pieces',
    roles: ['Animator', 'Artist'],
    tools: ['Blender'],
    year: '2020–2025',
    type: 'Personal',
    thumbnail: '/assets/thumbs/personal.jpg',
    reelUrl: null,
    description: [
      'Personal animation experiments and standalone pieces made outside of production. Flute Cowboy is a character study — rigging, skinning, and full animation cycle in Blender.',
    ],
    gallery: [
      { type: 'image', src: '/assets/personal/cowboy_turnaround.jpg', alt: 'Flute Cowboy — character turnaround', span: 'full' },
      { type: 'video', src: '/assets/personal/flute-cowboy.mp4', poster: '/assets/personal/cowboy_turnaround.jpg', alt: 'Flute Cowboy — animation' },
    ],
    process: [],
  },
];

// Showreel embed — home page hero
export const REEL_URL = 'https://www.youtube.com/embed/0bat7JchHCw?rel=0&modestbranding=1&autoplay=1&mute=1';
