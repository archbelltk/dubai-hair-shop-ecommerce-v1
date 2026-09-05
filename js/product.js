document.addEventListener('DOMContentLoaded', function () {
  const notFound = document.getElementById('productNotFound');
  const content = document.getElementById('productContent');

  const params = new URLSearchParams(window.location.search);
  const product = DHS_PRODUCTS.find(function (p) { return p.id === params.get('id'); });

  if (!product) {
    notFound.hidden = false;
    content.hidden = true;
    return;
  }

  document.title = product.name + ' | Dubai Hair Shop';

  document.getElementById('productBreadcrumbCategory').textContent = product.categoryLabel;
  document.getElementById('productBreadcrumbCategory').href = 'shop.html?category=' + product.category;
  document.getElementById('productBreadcrumbName').textContent = product.name;

  const badgeMarkup = product.badge ? '<span class="product-detail-badge">' + product.badge + '</span>' : '';
  const productMediaEl = document.getElementById('productMedia');
  productMediaEl.innerHTML = dhsProductMedia(product) + badgeMarkup;
  const productMediaImg = productMediaEl.querySelector('img');
  if (productMediaImg) productMediaImg.loading = 'eager';

  document.getElementById('productCategoryTag').textContent = product.categoryLabel;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productDescription').textContent = product.description || '';

  const priceEl = document.getElementById('productPrice');
  priceEl.innerHTML = dhsFormatPrice(product.price) +
    (product.originalPrice ? ' <span class="original">' + dhsFormatPrice(product.originalPrice) + '</span>' : '');

  document.getElementById('productWishlistWrap').innerHTML = dhsWishlistButtonMarkup(product.id);

  // Quantity stepper
  const qtyValue = document.getElementById('productQtyValue');
  let qty = 1;
  document.getElementById('productQtyDecrease').addEventListener('click', function () {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });
  document.getElementById('productQtyIncrease').addEventListener('click', function () {
    qty += 1;
    qtyValue.textContent = qty;
  });

  const addedBanner = document.getElementById('addedBanner');
  const addedBannerText = document.getElementById('addedBannerText');

  document.getElementById('productAddToCart').addEventListener('click', function () {
    dhsAddToCart(product, qty);
    addedBannerText.textContent = '"' + product.name + '" has been added to your cart.';
    addedBanner.hidden = false;
  });

  document.getElementById('addedBannerClose').addEventListener('click', function () {
    addedBanner.hidden = true;
  });

  // Related products: same category, excluding current, up to 4
  const related = DHS_PRODUCTS.filter(function (p) { return p.category === product.category && p.id !== product.id; }).slice(0, 4);
  const relatedSection = document.getElementById('relatedProducts');
  if (related.length) {
    document.getElementById('relatedProductsGrid').innerHTML = related.map(dhsProductCardMarkup).join('');
  } else {
    relatedSection.hidden = true;
  }
});
