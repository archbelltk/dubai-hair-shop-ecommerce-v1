document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyState');
  const resultCount = document.getElementById('resultCount');
  const pageTitle = document.getElementById('shopPageTitle');
  const pageHeading = document.getElementById('shopPageHeading');
  const clearSearch = document.getElementById('shopClearSearch');
  const categoryInputs = document.querySelectorAll('input[name="category"]');
  const priceInputs = document.querySelectorAll('input[name="price"]');
  const sortInputs = document.querySelectorAll('input[name="sortOption"]');
  const clearBtn = document.getElementById('clearFilters');
  const filterApplyCount = document.getElementById('filterApplyCount');
  const newOnly = new URLSearchParams(window.location.search).get('new') === '1';
  const searchQuery = (new URLSearchParams(window.location.search).get('search') || '').trim();

  function getCheckedCategories() {
    return Array.from(categoryInputs).filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
  }

  function getSelectedPriceRange() {
    const checked = Array.from(priceInputs).find(function (i) { return i.checked; });
    return checked ? checked.value : 'all';
  }

  function getSelectedSort() {
    const checked = Array.from(sortInputs).find(function (i) { return i.checked; });
    return checked ? checked.value : 'featured';
  }

  function priceInRange(price, range) {
    if (range === 'all') return true;
    const parts = range.split('-').map(Number);
    return price >= parts[0] && price <= parts[1];
  }

  function updatePageTitle(categories) {
    let title = 'Shop All';
    if (searchQuery) {
      title = 'Search results for “' + searchQuery + '”';
    } else if (newOnly) {
      title = 'New Arrivals';
    } else if (categories.length === 1) {
      const cat = DHS_CATEGORIES.find(function (c) { return c.slug === categories[0]; });
      title = cat ? cat.label : 'Shop';
    }
    if (pageTitle) pageTitle.textContent = title;
    if (pageHeading) pageHeading.textContent = title;
    if (clearSearch) clearSearch.hidden = !searchQuery;
  }

  function matchesSearch(product, query) {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().indexOf(q) !== -1 ||
      product.categoryLabel.toLowerCase().indexOf(q) !== -1 ||
      product.description.toLowerCase().indexOf(q) !== -1
    );
  }

  function sortProducts(products, sort) {
    const sorted = products.slice();
    if (sort === 'price-asc') {
      sorted.sort(function (a, b) { return a.price - b.price; });
    } else if (sort === 'price-desc') {
      sorted.sort(function (a, b) { return b.price - a.price; });
    } else if (sort === 'newest') {
      sorted.sort(function (a, b) { return (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0); });
    }
    return sorted;
  }

  function render() {
    const categories = getCheckedCategories();
    const priceRange = getSelectedPriceRange();
    const sort = getSelectedSort();

    let filtered = DHS_PRODUCTS.filter(function (product) {
      const categoryMatch = categories.length === 0 || categories.indexOf(product.category) !== -1;
      const priceMatch = priceInRange(product.price, priceRange);
      const newMatch = !newOnly || product.badge === 'New';
      const searchMatch = matchesSearch(product, searchQuery);
      return categoryMatch && priceMatch && newMatch && searchMatch;
    });
    filtered = sortProducts(filtered, sort);

    updatePageTitle(categories);
    grid.innerHTML = filtered.map(dhsProductCardMarkup).join('');
    emptyState.hidden = filtered.length !== 0;
    grid.hidden = filtered.length === 0;
    resultCount.textContent = filtered.length + (filtered.length === 1 ? ' product' : ' products');
    filterApplyCount.textContent = filtered.length;
  }

  categoryInputs.forEach(function (input) { input.addEventListener('change', render); });
  priceInputs.forEach(function (input) { input.addEventListener('change', render); });

  clearBtn.addEventListener('click', function () {
    categoryInputs.forEach(function (input) { input.checked = false; });
    priceInputs.forEach(function (input) { input.checked = input.value === 'all'; });
    render();
  });

  // Filter drawer (opens as a side panel on mobile; sidebar is always visible on desktop)
  const shopSidebar = document.getElementById('shopSidebar');
  const filterOverlay = document.getElementById('filterOverlay');
  const filterOpenBtn = document.getElementById('filterOpenBtn');
  const filterCloseBtn = document.getElementById('filterCloseBtn');
  const filterApplyBtn = document.getElementById('filterApplyBtn');

  function openFilterDrawer() {
    shopSidebar.classList.add('open');
    filterOverlay.classList.add('open');
  }
  function closeFilterDrawer() {
    shopSidebar.classList.remove('open');
    filterOverlay.classList.remove('open');
  }
  filterOpenBtn.addEventListener('click', openFilterDrawer);
  filterCloseBtn.addEventListener('click', closeFilterDrawer);
  filterOverlay.addEventListener('click', closeFilterDrawer);
  filterApplyBtn.addEventListener('click', closeFilterDrawer);

  // Sort dropdown
  const sortWrap = document.querySelector('.sort-wrap');
  const sortToggleBtn = document.getElementById('sortToggleBtn');
  const sortDropdown = document.getElementById('sortDropdown');

  sortToggleBtn.addEventListener('click', function () {
    const isOpen = sortDropdown.hidden === false;
    sortDropdown.hidden = isOpen;
    sortToggleBtn.setAttribute('aria-expanded', String(!isOpen));
  });
  sortInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      sortDropdown.hidden = true;
      sortToggleBtn.setAttribute('aria-expanded', 'false');
      render();
    });
  });
  document.addEventListener('click', function (e) {
    if (!sortWrap.contains(e.target)) {
      sortDropdown.hidden = true;
      sortToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Preselect category from URL, e.g. shop.html?category=hair-extensions
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');
  if (categoryParam) {
    const input = document.querySelector('input[name="category"][value="' + categoryParam + '"]');
    if (input) input.checked = true;
  }

  render();
});
