document.addEventListener('DOMContentLoaded', function () {
  const bestsellersGrid = document.getElementById('bestsellersGrid');
  if (bestsellersGrid) {
    const featuredIds = ['hair-brazilian-straight', 'fashion-ankara-midi-dress', 'skincare-shea-glow-serum', 'hair-deep-wave-lace'];
    const featured = featuredIds.map(function (id) { return DHS_PRODUCTS.find(function (p) { return p.id === id; }); }).filter(Boolean);
    bestsellersGrid.innerHTML = featured.map(dhsProductCardMarkup).join('');
  }

  const categoryGrids = [
    { id: 'featuredHairExtensions', category: 'hair-extensions' },
    { id: 'featuredFashionDesign', category: 'fashion-design' },
    { id: 'featuredNaturalSkincare', category: 'natural-skincare' },
  ];

  categoryGrids.forEach(function (entry) {
    const grid = document.getElementById(entry.id);
    if (!grid) return;
    const products = DHS_PRODUCTS.filter(function (p) { return p.category === entry.category; }).slice(0, 4);
    grid.innerHTML = products.map(dhsProductCardMarkup).join('');
  });
});
