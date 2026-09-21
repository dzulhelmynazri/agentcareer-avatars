export const PRESET_SEEDS = [
  "agentcareer",
  "nexus-ai",
  "grok-bot",
  "sarah-connor",
  "hal-9000",
  "jarvis",
  "cyber-scout",
  "neon-runner",
] as const;

export const BODY_OPTIONS = [
  { desc: "Hash from seed", id: "random", label: "Random" },
  { desc: "Rounded square", id: "squircle", label: "Squircle" },
  { desc: "Classic ball", id: "cercle", label: "Circle" },
  { desc: "Soft lobes", id: "nuage", label: "Cloud" },
  { desc: "Organic pebble", id: "galet", label: "Pebble" },
  { desc: "Tear droplet", id: "goutte", label: "Drop" },
  { desc: "Pill shape", id: "capsule", label: "Capsule" },
  { desc: "Futuristic tech", id: "hexagone", label: "Hexagon" },
  { desc: "Soft triangle", id: "triangle", label: "Triangle" },
] as const;

export const COLOR_OPTIONS = [
  { hex: "transparent", id: "random", label: "Random" },
  { hex: "#0a0a0c", id: "noir", label: "Obsidian" },
  { hex: "#2d68ff", id: "bleu", label: "Electric Blue" },
  { hex: "#00d293", id: "menthe", label: "Mint Neon" },
  { hex: "#ff4d4d", id: "corail", label: "Coral Red" },
  { hex: "#8c52ff", id: "violet", label: "Deep Purple" },
  { hex: "#ffb800", id: "moutarde", label: "Mustard Gold" },
  { hex: "#ff3e96", id: "rose", label: "Cyber Pink" },
  { hex: "#7a7a85", id: "cendre", label: "Ash Grey" },
] as const;

export const EXPRESSION_OPTIONS = [
  { desc: "Hash from seed", id: "random", label: "Random" },
  { desc: "Centered, observant", id: "neutre", label: "Neutral" },
  { desc: "Gentle smile curve", id: "heureux", label: "Happy" },
  { desc: "Tilted, inquisitive", id: "curieux", label: "Curious" },
  { desc: "Engaged focus", id: "attentif", label: "Attentive" },
  { desc: "Wide open eyes", id: "surpris", label: "Surprised" },
  { desc: "Sparkling energy", id: "excite", label: "Excited" },
  { desc: "Half-lidded calm", id: "blase", label: "Bored" },
  { desc: "Narrowed focus", id: "mefiant", label: "Wary" },
  { desc: "Overjoyed gaze", id: "hilare", label: "Laughing" },
] as const;
