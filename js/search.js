// Global search overlay wired to the nav search triggers on every page.
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const form = document.getElementById('searchForm');
  const closeBtn = document.getElementById('searchCloseBtn');
  const results = document.getElementById('searchResults');
  const triggers = document.querySelectorAll('[data-search-trigger]');
  if (!overlay || !input || !form || !results) return;

  function openSearch() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { input.focus(); }, 50);
  }

  function closeSearch() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function matchProduct(product, query) {
    return (
      product.name.toLowerCase().indexOf(query) !== -1 ||
      product.categoryLabel.toLowerCase().indexOf(query) !== -1 ||
      product.description.toLowerCase().indexOf(query) !== -1
    );
  }

  function renderResultItem(product) {
    return (
      '<a class="search-result-item" href="product.html?id=' + product.id + '">' +
        '<span class="search-result-media">' + dhsProductMedia(product) + '</span>' +
        '<span class="search-result-info">' +
          '<span class="search-result-name">' + product.name + '</span>' +
          '<span class="search-result-category">' + product.categoryLabel + '</span>' +
        '</span>' +
        '<span class="search-result-price">' + dhsFormatPrice(product.price) + '</span>' +
      '</a>'
    );
  }

  function renderResults() {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      results.innerHTML = '<p class="search-hint">Start typing to search hair extensions, fashion, and skincare.</p>';
      return;
    }

    const matches = DHS_PRODUCTS.filter(function (p) { return matchProduct(p, query); });

    if (matches.length === 0) {
      results.innerHTML = '<p class="search-empty">No products found for &ldquo;' + input.value.trim() + '&rdquo;.</p>';
      return;
    }

    const shown = matches.slice(0, 6);
    results.innerHTML =
      shown.map(renderResultItem).join('') +
      '<a class="search-view-all" href="shop.html?search=' + encodeURIComponent(input.value.trim()) + '">' +
        'View all ' + matches.length + ' result' + (matches.length === 1 ? '' : 's') +
      '</a>';
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      openSearch();
    });
  });

  closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
  });

  input.addEventListener('input', renderResults);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
      window.location.href = 'shop.html?search=' + encodeURIComponent(query);
    }
  });

  renderResults();
});
