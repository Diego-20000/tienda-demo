/* Admin — historial completo de pedidos */

function renderHistory() {
  const orders = getOrders();
  const wrap = document.getElementById('history-wrap');

  if (!orders.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="icon">📋</div>
        <h3>Todavía no hay pedidos</h3>
        <p>Armá uno desde la tienda para verlo reflejado acá.</p>
        <a href="../index.html" class="btn btn-secondary" style="margin-top:10px;">Ir a la tienda</a>
      </div>`;
    return;
  }

  wrap.innerHTML = `
    <div style="overflow-x:auto;">
    <table class="history">
      <thead>
        <tr>
          <th>Pedido</th>
          <th>Cliente</th>
          <th>Productos</th>
          <th>Monto</th>
          <th>Estado</th>
          <th>Creado</th>
          <th>Comprobante</th>
        </tr>
      </thead>
      <tbody>
        ${orders
          .map(
            (o) => `
          <tr>
            <td><strong>${o.id}</strong></td>
            <td>${o.cliente_nombre}<br><span class="text-muted" style="font-size:12px;">${o.cliente_email}</span></td>
            <td style="max-width:260px;">${o.items.map((i) => `${i.qty}× ${i.name}`).join(', ')}</td>
            <td>${formatARS(o.monto_total)}</td>
            <td><span class="badge badge-${o.estado}">${ESTADO_LABELS[o.estado]}</span></td>
            <td>${formatDateTime(o.creado_en)}</td>
            <td>${o.comprobante ? `<button class="btn btn-secondary btn-sm" data-view-receipt="${o.id}">Ver</button>` : '<span class="text-muted">—</span>'}</td>
          </tr>`
          )
          .join('')}
      </tbody>
    </table>
    </div>
  `;

  wrap.querySelectorAll('[data-view-receipt]').forEach((btn) => {
    btn.addEventListener('click', () => showReceiptModal(getOrder(btn.dataset.viewReceipt)));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdminShell('historial');
  renderHistory();
});
