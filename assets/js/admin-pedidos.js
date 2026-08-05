/* Admin — lista de pedidos pendiente_confirmar */

function renderStats() {
  const orders = getOrders();
  const pendientes = orders.filter((o) => o.estado === 'pendiente_confirmar');
  const confirmadosHoy = orders.filter((o) => {
    if (o.estado !== 'pagado_confirmado' || !o.confirmado_en) return false;
    const d = new Date(o.confirmado_en);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  });
  const montoPendiente = pendientes.reduce((s, o) => s + o.monto_total, 0);
  const totalActivos = orders.filter((o) => o.estado !== 'cancelado').length;

  document.getElementById('stat-row').innerHTML = `
    <div class="stat-card"><div class="num">${pendientes.length}</div><div class="label">Por confirmar</div></div>
    <div class="stat-card"><div class="num">${formatARS(montoPendiente)}</div><div class="label">Monto por confirmar</div></div>
    <div class="stat-card"><div class="num">${confirmadosHoy.length}</div><div class="label">Confirmados hoy</div></div>
    <div class="stat-card"><div class="num">${totalActivos}</div><div class="label">Pedidos totales</div></div>
  `;
}

function renderOrdersList() {
  const orders = getOrders().filter((o) => o.estado === 'pendiente_confirmar');
  const wrap = document.getElementById('orders-list');

  if (!orders.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="icon">${ICONS.sparkles(40)}</div>
        <h3>No hay pedidos esperando confirmación</h3>
        <p>Cuando un cliente suba un comprobante en la web, va a aparecer acá.</p>
        <a href="../index.html" class="btn btn-secondary" style="margin-top:10px;">Simular un pedido desde la tienda</a>
      </div>`;
    return;
  }

  wrap.innerHTML = orders
    .map(
      (o) => `
    <div class="order-card" data-order="${o.id}">
      <div class="receipt-thumb" data-view-receipt="${o.id}"><img src="${o.comprobante}" alt="Comprobante ${o.id}"></div>
      <div>
        <h4>${o.id} — ${o.cliente_nombre}</h4>
        <div class="meta">${o.cliente_email} · subido ${formatDateTime(o.comprobante_subido_en)} · ${tipoEntregaLabel(o.tipo_entrega)}</div>
        <div class="items-list">${o.items.map((i) => `${i.qty} × ${i.name}`).join(', ')}</div>
      </div>
      <div class="actions">
        <div class="amount">${formatARS(o.monto_total)}</div>
        <button class="btn btn-primary btn-sm" data-confirm="${o.id}">${ICONS.checkCircle(14)} Confirmar pago</button>
        <button class="btn btn-secondary btn-sm" data-view-receipt="${o.id}">Ver comprobante</button>
      </div>
    </div>`
    )
    .join('');

  wrap.querySelectorAll('[data-view-receipt]').forEach((el) => {
    el.addEventListener('click', () => showReceiptModal(getOrder(el.dataset.viewReceipt)));
  });
  wrap.querySelectorAll('[data-confirm]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const order = confirmOrder(btn.dataset.confirm);
      if (!order) return;
      showToast(`Pedido ${order.id} confirmado — mail enviado a ${order.cliente_email}`);
      renderStats();
      renderOrdersList();
      setTimeout(() => showEmailPreviewModal(order), 400);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdminShell('pedidos');
  renderStats();
  renderOrdersList();
});
