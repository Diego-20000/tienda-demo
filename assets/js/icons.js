/* ============================================================
   Librería de íconos — SVG lineales inline (estilo trazo fino,
   sin depender de ninguna fuente de íconos externa). Reemplaza
   todos los emojis del sitio. Cada función acepta un tamaño en
   px (por defecto 16) y devuelve el <svg> como string.
   ============================================================ */

const ICONS = {
  settings: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="2.6"/><path d="M10 2.5v2.1M10 15.4v2.1M17.5 10h-2.1M4.6 10H2.5M15.4 4.6l-1.5 1.5M6.1 13.9l-1.5 1.5M15.4 15.4l-1.5-1.5M6.1 6.1 4.6 4.6"/></svg>`,
  shopBag: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 7h10l-.7 9.3a1 1 0 0 1-1 .7H6.7a1 1 0 0 1-1-.7L5 7Z"/><path d="M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7"/></svg>`,
  cart: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h1.6l1.8 9.4a1.5 1.5 0 0 0 1.5 1.2h6.4a1.5 1.5 0 0 0 1.5-1.2L17 6.5H5.3"/><circle cx="8" cy="17" r="1.1"/><circle cx="14.5" cy="17" r="1.1"/></svg>`,
  truck: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 5.5h8.5v8H2z"/><path d="M10.5 8.5H14l3 2.5v2.5h-2"/><circle cx="6" cy="15.3" r="1.4"/><circle cx="14.5" cy="15.3" r="1.4"/></svg>`,
  store: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 4 3h12l1 5.5"/><path d="M3 8.5v7.5h14V8.5"/><path d="M8 16v-4h4v4"/></svg>`,
  creditCard: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="15" height="10" rx="1.5"/><path d="M2.5 8.5h15"/><path d="M5 12h3"/></svg>`,
  search: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M16.5 16.5 13 13"/></svg>`,
  inbox: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 11.5 5 4h10l2.5 7.5"/><path d="M2.5 11.5h4.6l1 2h3.8l1-2h4.6v4H2.5z"/></svg>`,
  tag: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3h5v5l-8.5 8.5a1.5 1.5 0 0 1-2 0l-3-3a1.5 1.5 0 0 1 0-2L11 3Z"/><circle cx="13.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>`,
  list: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7.3 5h9.2M7.3 10h9.2M7.3 15h9.2"/><circle cx="3.3" cy="5" r=".9" fill="currentColor" stroke="none"/><circle cx="3.3" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="3.3" cy="15" r=".9" fill="currentColor" stroke="none"/></svg>`,
  logout: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 17H4.5A1.5 1.5 0 0 1 3 15.5v-11A1.5 1.5 0 0 1 4.5 3H8"/><path d="M13 14l4-4-4-4"/><path d="M17 10H8"/></svg>`,
  clock: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7.5"/><path d="M10 5.5V10l3 2"/></svg>`,
  checkCircle: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7.5"/><path d="M6.5 10.2l2.3 2.3 4.7-5"/></svg>`,
  hourglass: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 3h9M5.5 17h9"/><path d="M6.5 3c0 3 2 4 3.5 5 1.5-1 3.5-2 3.5-5M6.5 17c0-3 2-4 3.5-5 1.5 1 3.5 2 3.5 5"/></svg>`,
  refresh: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10a6 6 0 1 1-2-4.5"/><path d="M16 3v3.5h-3.5"/></svg>`,
  mail: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="15" height="11" rx="1.5"/><path d="M2.5 5.5 10 11l7.5-5.5"/></svg>`,
  paperclip: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 6.5 8 12a2 2 0 1 0 2.8 2.8l5.5-5.5a3.6 3.6 0 0 0-5-5L5.8 9.8a5 5 0 0 0 7 7"/></svg>`,
  bank: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8 10 3l7.5 5"/><path d="M3.5 8h13v7h-13z"/><path d="M2.5 17h15"/><path d="M6.5 10.5v3M10 10.5v3M13.5 10.5v3"/></svg>`,
  pencil: (s = 14) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12.5 3.5 16 7l-9 9-4 1 1-4z"/></svg>`,
  trash: (s = 14) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 5.5h13"/><path d="M7 5.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5"/><path d="M5.5 5.5 6.2 16a1.5 1.5 0 0 0 1.5 1.4h4.6a1.5 1.5 0 0 0 1.5-1.4l.7-10.5"/></svg>`,
  sparkles: (s = 26) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3v3M10 14v3M3 10h3M14 10h3"/><path d="M6 6l1.5 1.5M12.5 12.5 14 14M14 6l-1.5 1.5M7.5 12.5 6 14"/><circle cx="10" cy="10" r="2.2"/></svg>`,
  package: (s = 26) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2.5 17 6v8l-7 3.5L3 14V6z"/><path d="M3 6l7 3.5L17 6M10 9.5V17.5"/></svg>`,
  pin: (s = 15) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17.5s6-5.4 6-9.7a6 6 0 1 0-12 0c0 4.3 6 9.7 6 9.7Z"/><circle cx="10" cy="7.8" r="2"/></svg>`,
  phone: (s = 16) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3.5h3l1.3 3.6-1.8 1.4a10 10 0 0 0 4.9 4.9l1.4-1.8 3.6 1.3v3a1.5 1.5 0 0 1-1.6 1.5A13.5 13.5 0 0 1 3 5.1 1.5 1.5 0 0 1 4 3.5Z"/></svg>`,
  messageCircle: (s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 9.6A6.5 6.5 0 1 1 6.3 4.7L3 3l1.4 3.4A6.4 6.4 0 0 0 3.5 9.6 6.5 6.5 0 0 0 10 16c1 0 2-.2 2.8-.6L17 17l-1.3-3.3c.8-1 1.3-2.3 1.3-4.1Z"/></svg>`,
};

// Bootstrap: reemplaza <span class="icon-slot" data-icon="nombre"
// data-size="18"></span> en HTML estático por el SVG correspondiente.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-icon]').forEach((el) => {
    const name = el.dataset.icon;
    const size = el.dataset.size ? parseInt(el.dataset.size, 10) : undefined;
    if (ICONS[name]) el.innerHTML = ICONS[name](size);
  });
});
