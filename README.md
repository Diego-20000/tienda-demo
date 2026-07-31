# Abriendo Caminos — demo de tienda online

Prototipo **solo de frontend** para mostrarle el flujo completo a Priscila antes de arrancar el desarrollo real (Node + Express + PostgreSQL, ver spec técnica del proyecto). No hay backend, base de datos, pagos ni mails reales: todo corre en el navegador con `localStorage`, así que sirve para ver y clickear las pantallas, no para vender de verdad.

## Qué incluye

**Tienda (cliente):**
- Catálogo con ~31 productos de ejemplo (mates, tazas, tazones, platitos, juegos de té, combos), buscador y filtro por categoría.
- Detalle de producto con selector de cantidad.
- Carrito editable.
- Checkout: datos del cliente → alias de Mercado Pago + monto exacto + cuenta regresiva de reserva de stock (15 min, igual que en la spec) → subida de comprobante.
- Pantalla de estado del pedido (pendiente / confirmado / cancelado por vencimiento), con vista previa del mail automático.

**Panel de administración** (`/admin`, login simulado — cualquier usuario/contraseña entra):
- Pedidos pendientes de confirmar, con el comprobante subido y botón para confirmar el pago a mano.
- Historial completo de pedidos con estado y comprobante.

Los estados del pedido replican la spec: `pendiente_pago → pendiente_confirmar → pagado_confirmado`, o `cancelado` si se vencen los 15 minutos sin comprobante.

## Fotos

Los productos usan imágenes placeholder generadas en el momento (SVG, sin depender de internet ni de fotos de terceros) — así el catálogo no se ve vacío mientras no haya fotos reales. Para reemplazarlas por las fotos reales de Priscila, alcanza con poner una URL de imagen en el campo `img` de cada producto en `assets/js/data.js` (hoy no está seteado y por eso usa el placeholder).

## Cómo verlo

No requiere instalación ni build. Alcanza con abrir `index.html` en el navegador, o levantar un server estático simple, por ejemplo:

```bash
python -m http.server 8080
```

y entrar a `http://localhost:8080`.

Hay un botón "Reiniciar demo" en todas las pantallas para borrar carrito y pedidos guardados y arrancar de cero.

## Estructura

```
index.html              Catálogo
producto.html            Detalle de producto
carrito.html             Carrito
checkout.html            Datos + transferencia + comprobante
pedido-confirmado.html   Estado del pedido
admin/                   Panel de administración
assets/css/style.css     Sistema de diseño (paleta en variables CSS)
assets/js/data.js        Catálogo de productos de muestra
assets/js/store.js       Estado (carrito + pedidos) en localStorage
```

## Qué falta para producción

Esto es solo la maqueta de las pantallas y el flujo. Para la versión real falta todo lo que está en la spec técnica: backend en Node/Express, base de datos PostgreSQL, subida de comprobante a almacenamiento real, envío de mail con Resend, y el panel de administración con autenticación de verdad.
