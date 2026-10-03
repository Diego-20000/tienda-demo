/* Catálogo — grid, filtro por categoría y buscador */

let activeCategory = 'all';
let searchTerm = '';

function renderCategoryFilters() {
  const wrap = document.getElementById('category-filters');
  getCategories().forEach((c) => {
    const btn = document.createElement('button');
    btn.textContent = c.label;
    btn.dataset.cat = c.slug;
    btn.addEventListener('click', () => {
      activeCategory = c.slug;
      document.querySelectorAll('#category-filters button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
    wrap.appendChild(btn);
  });
  wrap.querySelector('button[data-cat="all"]').addEventListener('click', function () {
    activeCategory = 'all';
    document.querySelectorAll('#category-filters button').forEach((b) => b.classList.remove('active'));
    this.classList.add('active');
    renderGrid();
  });
}

function renderGrid() {
  const grid = document.getElementById('product-grid');
  const noResults = document.getElementById('no-results');
  grid.innerHTML = '';

  const filtered = getProducts().filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm) || p.desc.toLowerCase().includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  if (!filtered.length) {
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  filtered.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <a href="producto.html?id=${p.id}">
        <div class="thumb"><img src="${productImage(p)}" alt="${p.name}" loading="lazy"></div>
      </a>
      <div class="body">
        <span class="cat">${escapeHtml(categoryLabel(p.category))}</span>
        <a href="producto.html?id=${encodeURIComponent(p.id)}"><h3>${escapeHtml(p.name)}</h3></a>
        <span class="price">${formatARS(p.price)}</span><span class="stock-note">${p.stock === 0 ? 'Agotado' : p.stock <= 5 ? `Últimas ${p.stock}` : `${p.stock} disponibles`}</span>
      </div>
      <div class="add-row">
        <button class="btn btn-secondary btn-block btn-sm" data-add="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>${p.stock === 0 ? 'Agotado' : 'Agregar al carrito'}</button>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('[data-add]').forEach((btn) => {
    btn.addEventListener('click', () => {
      addToCart(btn.dataset.add, 1);
      showToast('Agregado al carrito');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategoryFilters();
  renderGrid();
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderGrid();
  });
});
