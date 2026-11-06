/**
 * Juno marks as SVG strings.
 *
 * Source of truth: equinor/panel-equinor-branding, juno/logo/juno-o-mark-v3-*.svg.
 * The ring uses `currentColor` here so one mark serves light and dark; the favicon
 * variants bake the ring colour in because a <link rel="icon"> has no CSS context.
 */

const LEAF =
  'M-9 0 C -18 -40, -32 -65, -32 -95 C -32 -125, -18 -150, 0 -158 C 18 -150, 32 -125, 32 -95 C 32 -65, 18 -40, 9 0 A 9 9 0 0 1 -9 0 Z M0 -122 a 12 18 0 1 0 0.01 0 Z';

function leaves(colors: [string, string, string, string, string]): string {
  // angle a, scale s, base radius R; base = (R cos a, -R sin a), rotate = 96 - a
  const placement: Array<[number, number, number, number]> = [
    [-35.1, -26.5, -47, 0.16],
    [-18.0, -36.9, -20, 0.23],
    [0.7, -39.0, 7, 0.31],
    [17.8, -33.6, 34, 0.4],
    [31.1, -21.8, 61, 0.44]
  ];
  return placement
    .map(
      ([x, y, r, s], i) =>
        `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path fill-rule="evenodd" fill="${colors[i]}" d="${LEAF}"/></g>`
    )
    .join('');
}

const LIGHT_LEAVES: [string, string, string, string, string] = [
  '#ff1243', // Equinor red — origin
  '#17a589', // data teal
  '#3a86c8', // HoloViz blue
  '#f37726', // Jupyter orange
  '#9547c0' // Nebari purple
];

const DARK_LEAVES: [string, string, string, string, string] = [
  '#ff4d6d',
  '#1fbf9f',
  '#5b9fdb',
  '#f58a45',
  '#a85fd0'
];

function oMark(ringColor: string, palette = LIGHT_LEAVES, badge = ''): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-68 -104 172 172">` +
    `<circle cx="0" cy="0" r="22" fill="none" stroke="${ringColor}" stroke-width="16"/>` +
    leaves(palette) +
    badge +
    `</svg>`
  );
}

/** In-app logo: ring follows the theme via currentColor. */
export const JUNO_LOGO_SVG = oMark('currentColor');

/** Favicons: fixed ring colour (dark ring reads on both light and dark browser chrome). */
export const JUNO_FAVICON_IDLE_SVG = oMark('#262628');

/** Busy favicon: same mark with a Jupyter-orange dot at the bottom-right. */
export const JUNO_FAVICON_BUSY_SVG = oMark(
  '#262628',
  LIGHT_LEAVES,
  '<circle cx="76" cy="40" r="26" fill="#f37726" stroke="#ffffff" stroke-width="8"/>'
);

export function svgDataUrl(svg: string): string {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export { DARK_LEAVES };
