# Abriendo Caminos — demo de tienda online

Prototipo **solo de frontend** para mostrarle el flujo completo a Priscila antes de arrancar el desarrollo real (Node + Express + PostgreSQL, ver spec técnica del proyecto). No hay backend, base de datos, pagos ni mails reales: todo corre en el navegador con `localStorage`, así que sirve para ver y clickear las pantallas, no para vender de verdad.

**Rubro:** conservas, dulces y licores artesanales (mermeladas, escabeches, alfajores, licores caseros, combos de regalo).

## Qué incluye

**Tienda (cliente):**
- Catálogo con ~26 productos de ejemplo (conservas, dulces, licores, combos), buscador y filtro por categoría.
- Detalle de producto con selector de cantidad.
- Carrito editable.
- Checkout: datos del cliente → alias de Mercado Pago + monto exacto + cuenta regresiva de reserva de stock (15 min, igual que en la spec) → subida de comprobante.
- Pantalla de estado del pedido (pendiente / confirmado / cancelado por vencimiento), con vista previa del mail automático.
- Adaptado para mobile (Priscila lo ve desde el celu).

**Panel de administración** (`/admin`, login simulado — cualquier usuario/contraseña entra):
- **Pedidos por confirmar**: comprobante subido, botón para confirmar el pago a mano.
- **Productos**: agregar, editar y borrar productos (con foto propia opcional), y gestionar categorías (crear, renombrar, borrar). Los cambios se ven al toque en la tienda — es la forma de que Priscila pruebe cómo sería cargar su propio catálogo.
- **Historial**: todos los pedidos con su estado y comprobante.

Los estados del pedido replican la spec: `pendiente_pago → pendiente_confirmar → pagado_confirmado`, o `cancelado` si se vencen los 15 minutos sin comprobante.

## Fotos

Los productos usan imágenes placeholder generadas en el momento (SVG, sin depender de internet ni de fotos de terceros) — así el catálogo no se ve vacío mientras no haya fotos reales. Hay dos formas de poner fotos reales:

1. **Desde el panel admin** (`Productos → Editar`): subir una foto se guarda como parte del producto y se usa en vez del placeholder. Es la forma pensada para que Priscila la pruebe ella misma.
2. Poniendo una URL de imagen en el campo `img` de un producto en `assets/js/data.js` (son los datos "de fábrica" con los que arranca la demo).

## Cómo verlo

No requiere instalación ni build. Alcanza con abrir `index.html` en el navegador, o levantar un server estático simple, por ejemplo:

```bash
python -m http.server 8080
```

y entrar a `http://localhost:8080`.

Hay un botón "Reiniciar demo" en todas las pantallas para borrar carrito y pedidos guardados y arrancar de cero (no borra productos/categorías que se hayan editado — para eso está "↺ Restaurar catálogo original" dentro de `admin/productos.html`).

## Estructura

```
index.html              Catálogo
producto.html            Detalle de producto
carrito.html             Carrito
checkout.html            Datos + transferencia + comprobante
pedido-confirmado.html   Estado del pedido
admin/                   Panel de administración (pedidos, productos, historial)
assets/css/style.css     Sistema de diseño (paleta en variables CSS)
assets/js/data.js        Catálogo "de fábrica" (seed) — productos y categorías
assets/js/store.js       Estado real: carrito, pedidos y catálogo editable, en localStorage
```

## Qué falta para producción

Esto es solo la maqueta de las pantallas y el flujo. Para la versión real falta todo lo que está en la spec técnica: backend en Node/Express, base de datos PostgreSQL, subida de comprobante e imágenes de producto a almacenamiento real, envío de mail con Resend, y el panel de administración con autenticación de verdad.
