// Shared product media + card rendering used by the shop grid, related products, and wishlist page.
const DHS_PLACEHOLDER_COLORS = {
  'hair-extensions': ['#e8ddd4', '#c9b8a8'],
  'fashion-design': ['#f3d9df', '#e998b7'],
  'natural-skincare': ['#e4ede4', '#b9d3b9'],
};

function dhsProductMedia(product) {
  if (product.image) {
    return '<img src="' + product.image + '" alt="' + product.name + '" loading="lazy" decoding="async">';
  }
  const colors = DHS_PLACEHOLDER_COLORS[product.category] || ['#e8e4e0', '#d4c4b5'];
  const initials = product.name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('');
  return '<div class="product-placeholder" style="background: linear-gradient(135deg, ' + colors[0] + ', ' + colors[1] + ')">' +
    '<span class="product-placeholder-initials">' + initials + '</span>' +
    '</div>';
}

function dhsProductCardMarkup(product) {
  const badge = product.badge ? '<span class="product-badge">' + product.badge + '</span>' : '';
  const original = product.originalPrice ? '<span class="original">' + dhsFormatPrice(product.originalPrice) + '</span>' : '';
  return (
    '<div class="product-card" data-id="' + product.id + '">' +
      '<a class="product-card-link" href="product.html?id=' + product.id + '">' +
        '<div class="product-img-wrap">' +
          dhsProductMedia(product) + badge +
          dhsWishlistButtonMarkup(product.id) +
        '</div>' +
        '<div class="product-name">' + product.name + '</div>' +
        '<div class="product-price">' + dhsFormatPrice(product.price) + ' ' + original + '</div>' +
      '</a>' +
    '</div>'
  );
}
