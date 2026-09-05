// Shared cart utilities (localStorage-backed) used across shop, cart, and checkout pages.
const DHS_CART_KEY = 'dhs_cart';
const DHS_COUPON_KEY = 'dhs_coupon';
const DHS_SHIPPING_METHOD_KEY = 'dhs_shipping_method';
const DHS_ORDER_NOTES_KEY = 'dhs_order_notes';
const DHS_ORDERS_KEY = 'dhs_orders';

const DHS_SHIPPING_FREE_THRESHOLD = 1100;
const DHS_SHIPPING_FEE = 30;

// Mock coupon codes: code -> discount rate off subtotal.
const DHS_COUPONS = {
  WELCOME10: 0.10,
  DHS20: 0.20,
};

function dhsGetCart() {
  try {
    const raw = localStorage.getItem(DHS_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function dhsSaveCart(cart) {
  localStorage.setItem(DHS_CART_KEY, JSON.stringify(cart));
  dhsUpdateCartBadge();
}

function dhsAddToCart(product, qty) {
  qty = qty || 1;
  const cart = dhsGetCart();
  const existing = cart.find(function (item) { return item.id === product.id; });
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      qty: qty,
    });
  }
  dhsSaveCart(cart);
}

function dhsRemoveFromCart(id) {
  const cart = dhsGetCart().filter(function (item) { return item.id !== id; });
  dhsSaveCart(cart);
}

function dhsUpdateQty(id, qty) {
  const cart = dhsGetCart();
  const item = cart.find(function (item) { return item.id === id; });
  if (!item) return;
  item.qty = Math.max(1, qty);
  dhsSaveCart(cart);
}

function dhsClearCart() {
  dhsSaveCart([]);
}

function dhsCartCount() {
  return dhsGetCart().reduce(function (sum, item) { return sum + item.qty; }, 0);
}

function dhsCartSubtotal() {
  return dhsGetCart().reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
}

function dhsGetCoupon() {
  return localStorage.getItem(DHS_COUPON_KEY) || '';
}

function dhsSetCoupon(code) {
  if (code) {
    localStorage.setItem(DHS_COUPON_KEY, code);
  } else {
    localStorage.removeItem(DHS_COUPON_KEY);
  }
}

function dhsCouponDiscountRate() {
  return DHS_COUPONS[dhsGetCoupon()] || 0;
}

function dhsGetShippingMethod() {
  return localStorage.getItem(DHS_SHIPPING_METHOD_KEY) || 'delivery';
}

function dhsSetShippingMethod(method) {
  localStorage.setItem(DHS_SHIPPING_METHOD_KEY, method);
}

function dhsGetOrderNotes() {
  return localStorage.getItem(DHS_ORDER_NOTES_KEY) || '';
}

function dhsSetOrderNotes(notes) {
  if (notes) {
    localStorage.setItem(DHS_ORDER_NOTES_KEY, notes);
  } else {
    localStorage.removeItem(DHS_ORDER_NOTES_KEY);
  }
}

function dhsCalculateShipping(subtotal, method) {
  if (subtotal === 0) return 0;
  if (method === 'pickup') return 0;
  return subtotal >= DHS_SHIPPING_FREE_THRESHOLD ? 0 : DHS_SHIPPING_FEE;
}

function dhsClearCheckoutExtras() {
  dhsSetCoupon('');
  dhsSetOrderNotes('');
  localStorage.removeItem(DHS_SHIPPING_METHOD_KEY);
}

function dhsGetOrders() {
  try {
    const raw = localStorage.getItem(DHS_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function dhsSaveOrder(order) {
  const orders = dhsGetOrders();
  orders.unshift(order);
  localStorage.setItem(DHS_ORDERS_KEY, JSON.stringify(orders));
}

function dhsFormatPrice(amount) {
  return 'AED ' + amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function dhsUpdateCartBadge() {
  const count = dhsCartCount();
  document.querySelectorAll('.cart-badge').forEach(function (badge) {
    badge.textContent = count;
    badge.hidden = count === 0;
  });
}

document.addEventListener('DOMContentLoaded', dhsUpdateCartBadge);
