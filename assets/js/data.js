/* ============================================================
   Catálogo de muestra — Bazario
   Tienda general ("un poco de todo"), sin logística de feria:
   envío a domicilio o retiro en sucursal.
   Estos son los datos "de fábrica": la primera vez que se abre
   la demo se copian a localStorage (ver initCatalog en store.js)
   y desde ahí el panel admin puede agregar, editar o borrar
   productos y categorías sin tocar este archivo.
   ============================================================ */

const SEED_CATEGORIES = [
  { slug: 'tecnologia', label: 'Tecnología' },
  { slug: 'hogar', label: 'Hogar' },
  { slug: 'indumentaria', label: 'Indumentaria' },
  { slug: 'belleza', label: 'Belleza' },
  { slug: 'deportes', label: 'Deportes' },
  { slug: 'ofertas', label: 'Ofertas' },
];

const SEED_PRODUCTS = [
  // ---- Tecnología ----
  { id: 'p01', name: 'Auriculares Bluetooth Inalámbricos', category: 'tecnologia', price: 24500, desc: 'Auriculares in-ear con cancelación de ruido pasiva y estuche de carga. Autonomía de hasta 20 horas.' },
  { id: 'p02', name: 'Parlante Portátil Bluetooth', category: 'tecnologia', price: 32000, desc: 'Parlante resistente a salpicaduras, sonido envolvente, 12 horas de batería.' },
  { id: 'p03', name: 'Cargador Rápido USB-C 30W', category: 'tecnologia', price: 8900, desc: 'Cargador de pared compacto con carga rápida para celulares y tablets.' },
  { id: 'p04', name: 'Smartwatch Deportivo', category: 'tecnologia', price: 45000, desc: 'Monitoreo de actividad, frecuencia cardíaca y notificaciones. Resistente al agua.' },
  { id: 'p05', name: 'Power Bank 10000mAh', category: 'tecnologia', price: 15500, desc: 'Batería portátil con dos puertos USB, carga dos dispositivos a la vez.' },
  { id: 'p06', name: 'Mouse Inalámbrico', category: 'tecnologia', price: 9800, desc: 'Mouse ergonómico silencioso, conexión USB o Bluetooth.' },

  // ---- Hogar ----
  { id: 'p07', name: 'Set de Sábanas Queen', category: 'hogar', price: 22000, desc: 'Juego de sábanas 100% algodón, incluye funda de almohada. Varios colores.' },
  { id: 'p08', name: 'Juego de Toallas x3', category: 'hogar', price: 14500, desc: 'Toallas de algodón peinado, alta absorción. Set de 3 tamaños.' },
  { id: 'p09', name: 'Lámpara de Escritorio LED', category: 'hogar', price: 12800, desc: 'Luz regulable en 3 tonos, brazo flexible, entrada USB.' },
  { id: 'p10', name: 'Organizador Multiuso', category: 'hogar', price: 7500, desc: 'Organizador apilable de plástico resistente, ideal para placares o cocina.' },
  { id: 'p11', name: 'Set de Ollas Antiadherentes x5', category: 'hogar', price: 38000, desc: 'Juego de 5 ollas y sartenes con revestimiento antiadherente, aptas para todo tipo de cocinas.' },
  { id: 'p12', name: 'Difusor de Aromas', category: 'hogar', price: 11200, desc: 'Difusor ultrasónico con luz LED, ideal para ambientar cualquier ambiente.' },

  // ---- Indumentaria ----
  { id: 'p13', name: 'Remera Básica Algodón', category: 'indumentaria', price: 9500, desc: 'Remera unisex 100% algodón, corte clásico. Varios colores y talles.' },
  { id: 'p14', name: 'Buzo Canguro Unisex', category: 'indumentaria', price: 18900, desc: 'Buzo de frisa con capucha y bolsillo canguro, ideal para entretiempo.' },
  { id: 'p15', name: 'Zapatillas Urbanas', category: 'indumentaria', price: 34500, desc: 'Zapatillas livianas para uso diario, suela de goma antideslizante.' },
  { id: 'p16', name: 'Campera Rompeviento', category: 'indumentaria', price: 27800, desc: 'Campera liviana e impermeable, plegable, ideal para viajar.' },
  { id: 'p17', name: 'Gorra Ajustable', category: 'indumentaria', price: 6900, desc: 'Gorra de algodón con cierre ajustable, visera curva.' },

  // ---- Belleza ----
  { id: 'p18', name: 'Perfume Unisex 100ml', category: 'belleza', price: 19900, desc: 'Fragancia fresca de larga duración, formato de viaje disponible.' },
  { id: 'p19', name: 'Set de Skincare Facial', category: 'belleza', price: 16500, desc: 'Rutina completa: limpiador, tónico e hidratante para todo tipo de piel.' },
  { id: 'p20', name: 'Secador de Pelo Profesional', category: 'belleza', price: 21000, desc: 'Motor de alta potencia, 3 temperaturas y 2 velocidades, difusor incluido.' },
  { id: 'p21', name: 'Kit de Maquillaje Básico', category: 'belleza', price: 13800, desc: 'Set inicial con base, rubor, labial y pinceles esenciales.' },

  // ---- Deportes ----
  { id: 'p22', name: 'Pelota de Fútbol N°5', category: 'deportes', price: 12500, desc: 'Pelota oficial N°5, cámara de butilo, apta para césped y cemento.' },
  { id: 'p23', name: 'Mancuernas Ajustables (par)', category: 'deportes', price: 28000, desc: 'Par de mancuernas con discos intercambiables, de 2 a 10kg cada una.' },
  { id: 'p24', name: 'Mat de Yoga Antideslizante', category: 'deportes', price: 9900, desc: 'Colchoneta de 6mm, superficie antideslizante, incluye correa de transporte.' },
  { id: 'p25', name: 'Botella Térmica Deportiva', category: 'deportes', price: 8500, desc: 'Mantiene la temperatura hasta 12 horas, acero inoxidable, 750ml.' },
  { id: 'p26', name: 'Mochila Deportiva', category: 'deportes', price: 16900, desc: 'Mochila resistente al agua con compartimento para calzado, 30 litros.' },

  // ---- Ofertas ----
  { id: 'p27', name: 'Combo Home Office (mouse + lámpara)', category: 'ofertas', price: 19900, desc: 'Mouse inalámbrico + lámpara de escritorio LED, para armar tu rincón de trabajo.' },
  { id: 'p28', name: 'Pack Fitness (mat + botella)', category: 'ofertas', price: 16800, desc: 'Mat de yoga + botella térmica deportiva, todo lo que necesitás para entrenar.' },
  { id: 'p29', name: 'Combo Belleza (perfume + skincare)', category: 'ofertas', price: 32000, desc: 'Perfume unisex 100ml + set de skincare facial, en un solo pack.' },
  { id: 'p30', name: 'Set Tech Starter (auriculares + power bank)', category: 'ofertas', price: 36500, desc: 'Auriculares Bluetooth + power bank 10000mAh, el combo para andar siempre conectado.' },
];

function formatARS(n) {
  return '$' + Math.round(n).toLocaleString('es-AR');
}
