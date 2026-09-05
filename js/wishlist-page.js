document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('wishlistGrid');
  const emptyState = document.getElementById('wishlistEmpty');
  const content = document.getElementById('wishlistContent');

  function render() {
    const ids = dhsGetWishlist();
    const products = DHS_PRODUCTS.filter(function (p) { return ids.indexOf(p.id) !== -1; });

    if (products.length === 0) {
      content.hidden = true;
      emptyState.hidden = false;
      return;
    }

    content.hidden = false;
    emptyState.hidden = true;
    grid.innerHTML = products.map(dhsProductCardMarkup).join('');
  }

  grid.addEventListener('click', function (e) {
    if (e.target.closest('.wishlist-btn')) {
      // Wishlist state already toggled by the global handler; re-render to drop the removed item.
      setTimeout(render, 0);
    }
  });

  render();
});
