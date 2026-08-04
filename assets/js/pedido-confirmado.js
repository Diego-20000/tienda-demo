/* Pantalla de estado del pedido, post-checkout */

function itemsRowsHtml(order) {
  return order.items
    .map((i) => `<div class="row"><span>${i.qty} × ${i.name}</span><span>${formatARS(i.unitPrice * i.qty)}</span></div>`)
    .join('');
}

function orderBoxHtml(order) {
  return `
    <div class="status-order-box">
      <div class="row"><span>Nº de pedido</span><span><strong>${order.id}</strong></span></div>
      <div class="row"><span>Estado</span><span class="badge badge-${order.estado}">${ESTADO_LABELS[order.estado]}</span></div>
      ${itemsRowsHtml(order)}
      <div class="row"><span>Total</span><span><strong>${formatARS(order.monto_total)}</strong></span></div>
      <div class="row"><span>Entrega</span><span>Retiro en feria</span></div>
    </div>
  `;
}

function render() {
  const id = new URLSearchParams(window.location.search).get('id');
  const order = getOrder(id);
  const wrap = document.getElementById('status-wrap');

  if (!order) {
    wrap.innerHTML = `<div class="status-screen"><h2>No encontramos ese pedido</h2><a href="index.html" class="btn btn-primary">Volver al catálogo</a></div>`;
    return;
  }

  if (order.estado === 'pendiente_confirmar') {
    wrap.innerHTML = `
      <div class="status-screen">
        <div class="status-icon pending">🕒</div>
        <h1>¡Recibimos tu comprobante!</h1>
        <p class="text-muted">Recibimos tu comprobante, te confirmamos en breve.</p>
        ${orderBoxHtml(order)}
        <div class="flex gap-8" style="justify-content:center; margin-top:20px;">
          <button class="btn btn-secondary" onclick="location.reload()">🔄 Actualizar estado</button>
          <a href="index.html" class="btn btn-ghost">Volver al catálogo</a>
        </div>
        <p class="hint text-muted" style="margin-top:14px; font-size:12.5px;">Tip demo: confirmá este pedido desde el <a href="admin/index.html">panel de administración</a> y volvé a "Actualizar estado" para ver el cambio.</p>
      </div>
    `;
  } else if (order.estado === 'pagado_confirmado') {
    wrap.innerHTML = `
      <div class="status-screen">
        <div class="status-icon confirmed">✅</div>
        <h1>¡Pedido confirmado!</h1>
        <p class="text-muted">Ya vimos tu pago. Retirás en la feria en el horario habitual.</p>
        ${orderBoxHtml(order)}
        <div class="info-box" style="text-align:left;">📍 Plaza San Martín — Villa Origen — sábados 10 a 19h, domingos y feriados 10 a 18h.</div>
        <div class="flex gap-8" style="justify-content:center; margin-top:20px;">
          <button class="btn btn-secondary" id="view-email">✉️ Ver mail que le llegó al cliente</button>
          <a href="index.html" class="btn btn-ghost">Volver al catálogo</a>
        </div>
      </div>
    `;
    document.getElementById('view-email').addEventListener('click', () => showEmailModal(order));
  } else if (order.estado === 'cancelado') {
    wrap.innerHTML = `
      <div class="status-screen">
        <div class="status-icon cancelled">⏳</div>
        <h1>Pedido cancelado</h1>
        <p class="text-muted">Se venció la reserva de 15 minutos sin comprobante y liberamos el stock.</p>
        ${orderBoxHtml(order)}
        <a href="index.html" class="btn btn-primary" style="margin-top:20px;">Volver al catálogo</a>
      </div>
    `;
  } else {
    window.location.href = 'checkout.html';
  }
}

function showEmailModal(order) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" data-close>✕</button>
      <h3 class="mt-0">Vista previa del mail automático</h3>
      <p class="hint" style="margin-top:-8px;">Se dispara solo al tocar "Confirmar" en el panel. En producción se envía con Resend.</p>
      <div class="email-preview">
        <div class="email-head">Para: ${order.cliente_email}<br>Asunto: Tu pedido ${order.id} está confirmado ✅</div>
        <div class="email-body">
          <p>¡Hola ${order.cliente_nombre.split(' ')[0]}!</p>
          <p>Confirmamos tu pago del pedido <strong>${order.id}</strong>:</p>
          <ul>${order.items.map((i) => `<li>${i.qty} × ${i.name}</li>`).join('')}</ul>
          <p><strong>Total: ${formatARS(order.monto_total)}</strong></p>
          <p>Retiro en feria — Plaza San Martín — Villa Origen.<br>Sábados 10 a 19h · domingos y feriados 10 a 18h.</p>
          <p>¡Gracias por elegirnos!<br>Dulce Cosecha</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.hasAttribute('data-close')) overlay.remove();
  });
}

document.addEventListener('DOMContentLoaded', render);
