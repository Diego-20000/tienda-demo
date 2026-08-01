/* Admin — gestión de productos y categorías (CRUD sobre localStorage) */

let prodActiveCategory = 'all';
let prodSearchTerm = '';
let modalUploadedImg = null;

function renderCategoryChips() {
  const wrap = document.getElementById('category-chips');
  const categories = getCategories();
  wrap.innerHTML = categories
    .map((c) => {
      const count = productCount(c.slug);
      return `
      <span class="category-chip">
        <span>${c.label}</span>
        <span class="count">(${count})</span>
        <button type="button" data-rename-cat="${c.slug}" title="Renombrar">✏️</button>
        <button type="button" data-delete-cat="${c.slug}" title="${count > 0 ? 'No se puede borrar: tiene productos' : 'Borrar categoría'}">🗑️</button>
      </span>`;
    })
    .join('');

  wrap.querySelectorAll('[data-rename-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.renameCat;
      const current = categories.find((c) => c.slug === slug);
      const nuevo = prompt('Nuevo nombre para la categoría:', current ? current.label : '');
      if (nuevo && nuevo.trim()) {
        saveCategory(nuevo.trim(), slug);
        showToast('Categoría actualizada');
        refreshAll();
      }
    });
  });
  wrap.querySelectorAll('[data-delete-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.dataset.deleteCat;
      if (productCount(slug) > 0) {
        alert('No se puede borrar: todavía hay productos en esta categoría. Movelos a otra categoría primero.');
        return;
      }
      if (confirm('¿Borrar esta categoría?')) {
        deleteCategory(slug);
        showToast('Categoría borrada');
        refreshAll();
      }
    });
  });
}

function renderProductFilters() {
  const wrap = document.getElementById('category-filters');
  wrap.innerHTML = '<button class="active" data-cat="all">Todos</button>';
  getCategories().forEach((c) => {
    const btn = document.createElement('button');
    btn.textContent = c.label;
    btn.dataset.cat = c.slug;
    wrap.appendChild(btn);
  });
  wrap.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      prodActiveCategory = btn.dataset.cat;
      wrap.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderProductList();
    });
  });
}

function renderProductList() {
  const wrap = document.getElementById('products-list');
  const products = getProducts().filter((p) => {
    const matchesCat = prodActiveCategory === 'all' || p.category === prodActiveCategory;
    const matchesSearch = !prodSearchTerm || p.name.toLowerCase().includes(prodSearchTerm);
    return matchesCat && matchesSearch;
  });

  if (!products.length) {
    wrap.innerHTML = `<div class="empty-state"><div class="icon">🍯</div><h3>No hay productos acá</h3><p>Probá con otro filtro o agregá uno nuevo.</p></div>`;
    return;
  }

  wrap.innerHTML = products
    .map(
      (p) => `
    <div class="admin-product-card">
      <div class="thumb"><img src="${productImage(p)}" alt="${p.name}"></div>
      <div>
        <h4>${p.name}</h4>
        <div class="meta">${categoryLabel(p.category)} · ${formatARS(p.price)}</div>
      </div>
      <div class="actions">
        <button class="btn btn-secondary btn-sm" data-edit="${p.id}">Editar</button>
        <button class="btn btn-danger btn-sm" data-delete="${p.id}">Eliminar</button>
      </div>
    </div>`
    )
    .join('');

  wrap.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.addEventListener('click', () => openProductModal(getProduct(btn.dataset.edit)));
  });
  wrap.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = getProduct(btn.dataset.delete);
      if (confirm(`¿Borrar "${product.name}"? Esto no afecta pedidos ya hechos.`)) {
        deleteProduct(product.id);
        showToast('Producto borrado');
        refreshAll();
      }
    });
  });
}

function openProductModal(product) {
  modalUploadedImg = product ? product.img || null : null;
  const categories = getCategories();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" data-close>✕</button>
      <h3 class="mt-0">${product ? 'Editar producto' : 'Agregar producto'}</h3>
      <form id="product-form">
        <div class="field">
          <label for="pf-name">Nombre</label>
          <input type="text" id="pf-name" required value="${product ? product.name.replace(/"/g, '&quot;') : ''}">
        </div>
        <div class="field">
          <label for="pf-category">Categoría</label>
          <select id="pf-category">
            ${categories.map((c) => `<option value="${c.slug}" ${product && product.category === c.slug ? 'selected' : ''}>${c.label}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="pf-price">Precio (ARS)</label>
          <input type="number" id="pf-price" min="0" step="50" required value="${product ? product.price : ''}">
        </div>
        <div class="field">
          <label for="pf-desc">Descripción</label>
          <textarea id="pf-desc" rows="3">${product ? product.desc : ''}</textarea>
        </div>
        <div class="field">
          <label>Foto (opcional)</label>
          <div class="upload-box" id="pf-upload-box">
            ${product && product.img ? `<div class="upload-preview"><img src="${product.img}" alt=""></div><div class="hint" style="margin-top:8px;">Hacé clic para cambiar la imagen</div>` : '📎 Hacé clic para subir una foto (si no subís nada, se usa una imagen genérica)'}
            <input type="file" id="pf-file" accept="image/*" style="display:none;">
          </div>
        </div>
        <div class="flex gap-8" style="margin-top:20px;">
          <button type="submit" class="btn btn-primary btn-block">${product ? 'Guardar cambios' : 'Agregar producto'}</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.hasAttribute('data-close')) overlay.remove();
  });

  const uploadBox = document.getElementById('pf-upload-box');
  const fileInput = document.getElementById('pf-file');
  uploadBox.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      modalUploadedImg = reader.result;
      uploadBox.innerHTML = `<div class="upload-preview"><img src="${modalUploadedImg}" alt=""></div><div class="hint" style="margin-top:8px;">Hacé clic para cambiar la imagen</div>`;
      uploadBox.appendChild(fileInput);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      id: product ? product.id : null,
      name: document.getElementById('pf-name').value.trim(),
      category: document.getElementById('pf-category').value,
      price: Math.max(0, parseInt(document.getElementById('pf-price').value, 10) || 0),
      desc: document.getElementById('pf-desc').value.trim(),
      img: modalUploadedImg,
    };
    if (!data.name || !data.category) return;
    saveProduct(data);
    overlay.remove();
    showToast(product ? 'Producto actualizado' : 'Producto agregado');
    refreshAll();
  });
}

function refreshAll() {
  renderCategoryChips();
  renderProductFilters();
  renderProductList();
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdminShell('productos');
  refreshAll();

  document.getElementById('add-product-btn').addEventListener('click', () => openProductModal(null));

  document.getElementById('add-category-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-category-input');
    const label = input.value.trim();
    if (!label) return;
    saveCategory(label, null);
    input.value = '';
    showToast('Categoría agregada');
    refreshAll();
  });

  document.getElementById('search-input').addEventListener('input', (e) => {
    prodSearchTerm = e.target.value.trim().toLowerCase();
    renderProductList();
  });

  document.getElementById('restore-catalog-btn').addEventListener('click', () => {
    if (confirm('¿Restaurar el catálogo original? Se van a perder los productos y categorías que hayas agregado o editado en esta demo.')) {
      resetCatalog();
      showToast('Catálogo restaurado');
      refreshAll();
    }
  });
});
