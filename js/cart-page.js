document.addEventListener('DOMContentLoaded', function () {
  const itemsWrap = document.getElementById('cartItems');
  const emptyState = document.getElementById('cartEmpty');
  const cartContent = document.getElementById('cartContent');
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('discountRow');
  const discountEl = document.getElementById('cartDiscount');
  const shippingEl = document.getElementById('cartShipping');
  const totalEl = document.getElementById('cartTotal');
  const deliveryPriceLabel = document.getElementById('deliveryPriceLabel');
  const shippingInputs = document.querySelectorAll('input[name="shippingMethod"]');

  const couponToggle = document.getElementById('couponToggle');
  const couponForm = document.getElementById('couponForm');
  const couponInput = document.getElementById('couponInput');
  const couponApply = document.getElementById('couponApply');
  const couponMessage = document.getElementById('couponMessage');

  const orderNotes = document.getElementById('orderNotes');

  function itemMarkup(item) {
    return (
      '<div class="cart-item" data-id="' + item.id + '">' +
        '<div class="cart-item-img">' + dhsProductMedia(item) + '</div>' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">' + item.name + '</div>' +
          '<div class="cart-item-price">' + dhsFormatPrice(item.price) + '</div>' +
        '</div>' +
        '<div class="cart-item-qty">' +
          '<button class="qty-btn qty-decrease" aria-label="Decrease quantity">&minus;</button>' +
          '<span class="qty-value">' + item.qty + '</span>' +
          '<button class="qty-btn qty-increase" aria-label="Increase quantity">+</button>' +
        '</div>' +
        '<div class="cart-item-total">' + dhsFormatPrice(item.price * item.qty) + '</div>' +
        '<button class="cart-item-remove" aria-label="Remove item">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
      '</div>'
    );
  }

  function showCouponMessage(text, isError) {
    couponMessage.textContent = text;
    couponMessage.hidden = false;
    couponMessage.classList.toggle('error', !!isError);
    couponMessage.classList.toggle('success', !isError);
  }

  function renderCoupon() {
    const code = dhsGetCoupon();
    if (code) {
      couponToggle.hidden = true;
      couponForm.hidden = false;
      couponInput.value = code;
      couponInput.disabled = true;
      couponApply.textContent = 'Remove';
      showCouponMessage('Coupon "' + code + '" applied.', false);
    } else {
      couponToggle.hidden = false;
      couponForm.hidden = true;
      couponInput.value = '';
      couponInput.disabled = false;
      couponApply.textContent = 'Apply';
    }
  }

  function render() {
    const cart = dhsGetCart();

    if (cart.length === 0) {
      cartContent.hidden = true;
      emptyState.hidden = false;
      return;
    }

    cartContent.hidden = false;
    emptyState.hidden = true;
    itemsWrap.innerHTML = cart.map(itemMarkup).join('');

    const subtotal = dhsCartSubtotal();
    const discountRate = dhsCouponDiscountRate();
    const discount = Math.round(subtotal * discountRate);
    const shippingMethod = dhsGetShippingMethod();
    const deliveryFee = dhsCalculateShipping(subtotal, 'delivery');
    const shipping = dhsCalculateShipping(subtotal, shippingMethod);
    const total = subtotal - discount + shipping;

    subtotalEl.textContent = dhsFormatPrice(subtotal);
    if (discount > 0) {
      discountRow.hidden = false;
      discountEl.textContent = '-' + dhsFormatPrice(discount);
    } else {
      discountRow.hidden = true;
    }
    shippingEl.textContent = shipping === 0 ? 'Free' : dhsFormatPrice(shipping);
    deliveryPriceLabel.textContent = deliveryFee === 0 ? 'Free' : dhsFormatPrice(deliveryFee);
    totalEl.textContent = dhsFormatPrice(total);
  }

  itemsWrap.addEventListener('click', function (e) {
    const card = e.target.closest('.cart-item');
    if (!card) return;
    const id = card.dataset.id;
    const cart = dhsGetCart();
    const item = cart.find(function (i) { return i.id === id; });
    if (!item) return;

    if (e.target.closest('.qty-increase')) {
      dhsUpdateQty(id, item.qty + 1);
      render();
    } else if (e.target.closest('.qty-decrease')) {
      if (item.qty <= 1) {
        dhsRemoveFromCart(id);
      } else {
        dhsUpdateQty(id, item.qty - 1);
      }
      render();
    } else if (e.target.closest('.cart-item-remove')) {
      dhsRemoveFromCart(id);
      render();
    }
  });

  shippingInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      dhsSetShippingMethod(input.value);
      render();
    });
  });

  couponToggle.addEventListener('click', function () {
    couponToggle.hidden = true;
    couponForm.hidden = false;
    couponInput.focus();
  });

  couponApply.addEventListener('click', function () {
    if (dhsGetCoupon()) {
      dhsSetCoupon('');
      couponMessage.hidden = true;
      renderCoupon();
      render();
      return;
    }

    const code = couponInput.value.trim().toUpperCase();
    if (!code) return;

    if (DHS_COUPONS[code]) {
      dhsSetCoupon(code);
      renderCoupon();
      render();
    } else {
      showCouponMessage('Invalid coupon code.', true);
    }
  });

  orderNotes.value = dhsGetOrderNotes();
  orderNotes.addEventListener('input', function () {
    dhsSetOrderNotes(orderNotes.value);
  });

  const savedMethod = dhsGetShippingMethod();
  const savedInput = document.querySelector('input[name="shippingMethod"][value="' + savedMethod + '"]');
  if (savedInput) savedInput.checked = true;

  renderCoupon();
  render();
});
