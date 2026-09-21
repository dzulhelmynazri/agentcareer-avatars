/**
 * Injects CSS gaze and blinking animation keyframes into a rendered SVG.
 * The SVG remains self-contained with no external dependencies or scripts.
 */
import dedent from "dedent";

export const svgAnime = (
  base: string,
  matrices: string[][],
  duration: number
): string => {
  if (matrices.length < 2) {
    throw new Error("At least two keyframes are required for animation");
  }

  const mask = base.match(/<mask[\s\S]*?<\/mask>/);
  if (!mask) {
    throw new Error("SVG mask not found");
  }

  let n = 0;
  const maskAnime = mask[0].replaceAll(
    /transform="matrix\([^)]*\)"/g,
    () => `class="oeil${n++}"`
  );
  if (n === 0) {
    throw new Error("No eye elements found to animate in mask");
  }

  const perFrame = matrices[0]?.length ?? 0;
  if (perFrame !== n) {
    throw new Error(`${n} eyes in mask, but ${perFrame} in keyframe matrices`);
  }

  const step = 100 / (matrices.length - 1);
  const rules = Array.from({ length: n }, (_, eyeIdx) => {
    const steps = matrices
      .map(
        (m, i) =>
          `${Number((i * step).toFixed(3))}% { transform: ${m[eyeIdx]}; }`
      )
      .join("\n        ");
    return dedent`
      @keyframes oeil${eyeIdx} {
        ${steps}
      }
    `;
  });

  const style = dedent`
    <style>
      .oeil0, .oeil1 {
        transform-box: view-box;
        transform-origin: 0 0;
        animation-duration: ${duration}s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-direction: alternate;
      }
      ${Array.from(
        { length: n },
        (_, i) => `.oeil${i} { animation-name: oeil${i}; }`
      ).join("\n      ")}
      ${rules.join("\n      ")}
    </style>
  `;

  return base.replace(mask[0], maskAnime).replace("</svg>", `${style}</svg>`);
};
