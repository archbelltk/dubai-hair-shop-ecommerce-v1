// Shared wishlist utilities (localStorage-backed) + global heart-button wiring.
const DHS_WISHLIST_KEY = 'dhs_wishlist';

function dhsGetWishlist() {
  try {
    const raw = localStorage.getItem(DHS_WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function dhsSaveWishlist(ids) {
  localStorage.setItem(DHS_WISHLIST_KEY, JSON.stringify(ids));
  dhsUpdateWishlistBadge();
}

function dhsIsWishlisted(id) {
  return dhsGetWishlist().indexOf(id) !== -1;
}

function dhsToggleWishlist(id) {
  const list = dhsGetWishlist();
  const index = list.indexOf(id);
  if (index === -1) {
    list.push(id);
  } else {
    list.splice(index, 1);
  }
  dhsSaveWishlist(list);
  return index === -1;
}

function dhsWishlistCount() {
  return dhsGetWishlist().length;
}

function dhsUpdateWishlistBadge() {
  const count = dhsWishlistCount();
  document.querySelectorAll('.wishlist-badge').forEach(function (badge) {
    badge.textContent = count;
    badge.hidden = count === 0;
  });
}

function dhsHeartIconSvg() {
  return '<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>';
}

function dhsWishlistButtonMarkup(id) {
  const active = dhsIsWishlisted(id) ? ' active' : '';
  return '<button class="wishlist-btn' + active + '" data-id="' + id + '" aria-label="Add to wishlist">' + dhsHeartIconSvg() + '</button>';
}

function dhsWireWishlistButtons() {
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.wishlist-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const isActive = dhsToggleWishlist(btn.dataset.id);
    btn.classList.toggle('active', isActive);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  dhsUpdateWishlistBadge();
  dhsWireWishlistButtons();
});
