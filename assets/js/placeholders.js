/* ============================================================
   Generador de imágenes placeholder (SVG, 100% local, sin red).
   Dibuja una silueta simple por categoría sobre un fondo con
   degradé pastel. Si un producto tiene foto real (campo "img"
   subido desde el panel admin), esa imagen se usa en su lugar
   — ver productImage() más abajo.
   ============================================================ */

const PLACEHOLDER_PALETTES = [
  ['#F0D9C9', '#E3A857'], // terracota / mostaza
  ['#E8EEE4', '#8FA888'], // salvia
  ['#F6E4D8', '#C97C5D'], // arcilla
  ['#F1E6D3', '#B98452'], // arena
  ['#EADCEE', '#B98FC2'], // ciruela suave
];

function paletteFor(seed) {
  return PLACEHOLDER_PALETTES[seed % PLACEHOLDER_PALETTES.length];
}

// Siluetas simples por categoría, dibujadas a mano con formas básicas
const CATEGORY_ICONS = {
  conservas: (c) => `
    <rect x="150" y="148" width="100" height="28" rx="6" fill="${c}"/>
    <rect x="138" y="172" width="124" height="112" rx="16" fill="${c}" opacity=".9"/>
    <rect x="152" y="196" width="96" height="52" rx="8" fill="#fff" opacity=".3"/>
  `,
  dulces: (c) => `
    <circle cx="163" cy="222" r="42" fill="${c}" opacity=".9"/>
    <circle cx="237" cy="222" r="42" fill="${c}" opacity=".65"/>
    <circle cx="158" cy="210" r="4" fill="#fff" opacity=".55"/>
    <circle cx="174" cy="230" r="4" fill="#fff" opacity=".55"/>
    <circle cx="148" cy="230" r="4" fill="#fff" opacity=".55"/>
    <circle cx="230" cy="212" r="4" fill="#fff" opacity=".45"/>
    <circle cx="246" cy="230" r="4" fill="#fff" opacity=".45"/>
  `,
  licores: (c) => `
    <rect x="186" y="138" width="28" height="34" rx="6" fill="${c}"/>
    <path d="M172 172 h56 l10 28 v78 a10 10 0 0 1 -10 10 h-56 a10 10 0 0 1 -10 -10 v-78 z" fill="${c}" opacity=".9"/>
    <rect x="172" y="222" width="56" height="26" fill="#fff" opacity=".22"/>
  `,
  combos: (c) => `
    <rect x="130" y="190" width="140" height="100" rx="10" fill="${c}" opacity=".9"/>
    <rect x="130" y="190" width="140" height="26" fill="#fff" opacity=".35"/>
    <rect x="190" y="190" width="20" height="100" fill="#fff" opacity=".35"/>
  `,
  default: (c) => `
    <circle cx="200" cy="220" r="70" fill="${c}" opacity=".85"/>
  `,
};

function productPlaceholderDataUri(category, seed) {
  const [bg, fg] = paletteFor(seed);
  const iconFn = CATEGORY_ICONS[category] || CATEGORY_ICONS.default;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="g${seed}" cx="50%" cy="42%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${bg}"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g${seed})"/>
  ${iconFn(fg)}
</svg>`.trim();
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function productImage(product) {
  if (product.img) return product.img;
  const numeric = parseInt(String(product.id).replace(/\D/g, ''), 10) || 0;
  return productPlaceholderDataUri(product.category, numeric);
}
