# Dulce Cosecha — demo de tienda online

Prototipo **solo de frontend** de una tienda online para un emprendimiento de feria (conservas, dulces y licores artesanales), pensado como pieza de demo/portfolio: catálogo, carrito, checkout con pago por transferencia y confirmación manual desde un panel de administración. No hay backend, base de datos, pagos ni mails reales: todo corre en el navegador con `localStorage`, así que sirve para ver y clickear las pantallas, no para vender de verdad.

Marca, productos, contacto y ubicación son **ficticios**, armados para que la demo se vea como una tienda real.

## Qué incluye

**Tienda (cliente):**
- Catálogo con ~26 productos de ejemplo (conservas, dulces, licores, combos), buscador y filtro por categoría.
- Detalle de producto con selector de cantidad.
- Carrito editable.
- Checkout: datos del cliente → alias de Mercado Pago + monto exacto + cuenta regresiva de reserva de stock (15 min) → subida de comprobante.
- Pantalla de estado del pedido (pendiente / confirmado / cancelado por vencimiento), con vista previa del mail automático.
- Responsive, pensado para verse bien también desde el celular.

**Panel de administración** (`/admin`, login simulado — cualquier usuario/contraseña entra):
- **Pedidos por confirmar**: comprobante subido, botón para confirmar el pago a mano.
- **Productos**: agregar, editar y borrar productos (con foto propia opcional), y gestionar categorías (crear, renombrar, borrar). Los cambios se ven al toque en la tienda.
- **Historial**: todos los pedidos con su estado y comprobante.

El flujo de pago replica un patrón real y simple para negocios chicos con volumen bajo/medio: el cliente transfiere y sube el comprobante, y una persona lo confirma a mano mirando la app de Mercado Pago — sin IA ni reconciliación automática. Estados del pedido: `pendiente_pago → pendiente_confirmar → pagado_confirmado`, o `cancelado` si se vencen los 15 minutos sin comprobante.

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

Hay un botón "Reiniciar demo" en todas las pantallas para borrar carrito y pedidos guardados y arrancar de cero (no borra productos/categorías editados — para eso está "↺ Restaurar catálogo original" dentro de `admin/productos.html`).

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

## Qué le faltaría a una versión real

Esto es solo la maqueta de pantallas y flujo. Una implementación real necesitaría, como mínimo: backend (Node/Express o similar) con base de datos, subida de comprobante e imágenes de producto a almacenamiento real, envío de mail automático (ej. con Resend) y autenticación de verdad en el panel de administración.
