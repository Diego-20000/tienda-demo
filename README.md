# Bazario — demo de tienda online

Prototipo **solo de frontend** de una tienda online general ("un poco de todo"), pensado como pieza de demo/portfolio: catálogo, carrito, checkout con pasarela de pagos simulada (o transferencia con confirmación manual) y panel de administración. No hay backend, base de datos, pagos ni mails reales: todo corre en el navegador con `localStorage`, así que sirve para ver y clickear las pantallas, no para vender de verdad.

Marca, productos, contacto y ubicación son **ficticios**, armados para que la demo se vea como una tienda real.

## Qué incluye

**Tienda (cliente):**
- Catálogo con ~30 productos de ejemplo (tecnología, hogar, indumentaria, belleza, deportes, ofertas), buscador y filtro por categoría.
- Detalle de producto con selector de cantidad.
- Carrito editable.
- Entrega: envío a domicilio (con dirección) o retiro en sucursal.
- **Pago con tarjeta**: pasarela simulada con 6 tarjetas distintas (débito sin recargo, crédito con recargo de 2.5% a 4.5% según la marca — igual que una pasarela real), formulario de tarjeta con validación (número con algoritmo de Luhn, vencimiento, CVV) y aprobación al instante.
- **Pago por transferencia**: alias + monto exacto + cuenta regresiva de reserva de stock (15 min) + subida de comprobante, para confirmar a mano desde el panel admin.
- Pantalla de estado del pedido, con vista previa del mail automático.
- **Contacto rápido**: botón flotante con WhatsApp, teléfono y email (links reales — `wa.me` / `tel:` / `mailto:`), más un formulario corto para dejar una consulta si no se quiere escribir por WhatsApp. La consulta queda visible en el panel admin.
- Responsive, pensado para verse bien también desde el celular.
- Toda la iconografía es SVG propio (`assets/js/icons.js`), sin emojis ni librerías externas.

**Panel de administración** (`/admin`, login simulado — cualquier usuario/contraseña entra):
- **Pedidos por confirmar**: pedidos pagados por transferencia con comprobante subido, botón para confirmar el pago a mano.
- **Productos**: agregar, editar y borrar productos (con foto propia opcional), y gestionar categorías (crear, renombrar, borrar). Los cambios se ven al toque en la tienda.
- **Consultas**: mensajes dejados desde el botón de contacto rápido, con badge de "nuevas" en el menú y botón para marcarlas como respondidas.
- **Historial**: todos los pedidos con método de pago, tipo de entrega, estado y comprobante (si aplica).

Estados del pedido: pago con tarjeta → nace directo en `pagado_confirmado` (aprobación instantánea). Pago por transferencia → `pendiente_pago → pendiente_confirmar → pagado_confirmado`, o `cancelado` si se vencen los 15 minutos sin comprobante.

## Fotos

Los productos usan imágenes placeholder generadas en el momento (SVG, sin depender de internet ni de fotos de terceros). Hay dos formas de poner fotos reales:

1. **Desde el panel admin** (`Productos → Editar`): subir una foto se guarda como parte del producto y se usa en vez del placeholder.
2. Poniendo una URL de imagen en el campo `img` de un producto en `assets/js/data.js` (son los datos "de fábrica" con los que arranca la demo).

## Cómo verlo

No requiere instalación ni build. Alcanza con abrir `index.html` en el navegador, o levantar un server estático simple, por ejemplo:

```bash
python -m http.server 8080
```

y entrar a `http://localhost:8080`.

Para probar el pago con tarjeta, cualquier número que pase el algoritmo de Luhn sirve — por ejemplo `4111 1111 1111 1111`, con cualquier vencimiento futuro y CVV de 3 dígitos.

Hay un botón "Reiniciar demo" en todas las pantallas para borrar carrito y pedidos guardados y arrancar de cero (no borra productos/categorías editados — para eso está "↺ Restaurar catálogo original" dentro de `admin/productos.html`).

## Estructura

```
index.html              Catálogo
producto.html            Detalle de producto
carrito.html             Carrito
checkout.html            Datos y entrega → método de pago → confirmación
pedido-confirmado.html   Estado del pedido
admin/                   Panel de administración (pedidos, productos, consultas, historial)
assets/css/style.css     Sistema de diseño (paleta en variables CSS)
assets/js/data.js        Catálogo "de fábrica" (seed) — productos y categorías
assets/js/store.js       Estado real: carrito, pedidos, pasarela de pagos, consultas y catálogo editable, en localStorage
assets/js/checkout.js    Flujo de checkout completo (entrega, tarjeta, transferencia)
assets/js/icons.js       Librería de íconos SVG inline (reemplaza cualquier emoji del sitio)
assets/js/contact-widget.js   Botón flotante de contacto rápido
```

## Qué le faltaría a una versión real

Esto es solo la maqueta de pantallas y flujo. Una implementación real necesitaría, como mínimo: backend con base de datos, una pasarela de pagos real (Mercado Pago, Stripe, etc. — nunca procesar tarjetas del lado del cliente como hace esta demo), subida de comprobante e imágenes de producto a almacenamiento real, envío de mail automático y autenticación de verdad en el panel de administración.
