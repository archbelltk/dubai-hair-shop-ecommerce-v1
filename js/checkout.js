document.addEventListener('DOMContentLoaded', function () {
  const checkoutLayout = document.getElementById('checkoutLayout');
  const emptyState = document.getElementById('checkoutEmpty');
  const confirmation = document.getElementById('checkoutConfirmation');
  const summaryItems = document.getElementById('summaryItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const discountRow = document.getElementById('checkoutDiscountRow');
  const discountEl = document.getElementById('checkoutDiscount');
  const shippingLabelEl = document.getElementById('checkoutShippingLabel');
  const shippingEl = document.getElementById('checkoutShipping');
  const totalEl = document.getElementById('checkoutTotal');
  const orderNotesWrap = document.getElementById('checkoutOrderNotes');
  const orderNotesText = document.getElementById('checkoutOrderNotesText');
  const form = document.getElementById('checkoutForm');
  const orderNumberEl = document.getElementById('orderNumber');
  const orderTotalEl = document.getElementById('orderTotal');
  const paymentInputs = document.querySelectorAll('input[name="paymentMethod"]');
  const cardFields = document.getElementById('cardFields');
  const payLaterNote = document.getElementById('payLaterNote');
  const cardRequiredInputs = cardFields.querySelectorAll('input[required]');

  const cart = dhsGetCart();

  if (cart.length === 0) {
    checkoutLayout.hidden = true;
    emptyState.hidden = false;
    return;
  }

  const subtotal = dhsCartSubtotal();
  const discount = Math.round(subtotal * dhsCouponDiscountRate());
  const shippingMethod = dhsGetShippingMethod();
  const shipping = dhsCalculateShipping(subtotal, shippingMethod);
  const total = subtotal - discount + shipping;

  summaryItems.innerHTML = cart.map(function (item) {
    return (
      '<div class="summary-line-item">' +
        '<span class="summary-line-name">' + item.name + ' <span class="summary-line-qty">&times;' + item.qty + '</span></span>' +
        '<span class="summary-line-price">' + dhsFormatPrice(item.price * item.qty) + '</span>' +
      '</div>'
    );
  }).join('');

  subtotalEl.textContent = dhsFormatPrice(subtotal);
  if (discount > 0) {
    discountRow.hidden = false;
    discountEl.textContent = '-' + dhsFormatPrice(discount);
  }
  shippingLabelEl.textContent = shippingMethod === 'pickup' ? 'Store Pickup' : 'Shipping';
  shippingEl.textContent = shipping === 0 ? 'Free' : dhsFormatPrice(shipping);
  totalEl.textContent = dhsFormatPrice(total);

  const notes = dhsGetOrderNotes();
  if (notes) {
    orderNotesWrap.hidden = false;
    orderNotesText.textContent = notes;
  }

  paymentInputs.forEach(function (input) {
    input.addEventListener('change', function () {
      const isCard = input.value === 'card' && input.checked;
      if (input.checked) {
        cardFields.hidden = input.value !== 'card';
        payLaterNote.hidden = input.value !== 'later';
        cardRequiredInputs.forEach(function (field) { field.required = input.value === 'card'; });
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const orderNumber = 'DHS-' + Math.floor(100000 + Math.random() * 900000);
    orderNumberEl.textContent = orderNumber;
    orderTotalEl.textContent = dhsFormatPrice(total);

    dhsSaveOrder({
      orderNumber: orderNumber,
      date: new Date().toISOString(),
      items: cart,
      subtotal: subtotal,
      discount: discount,
      shipping: shipping,
      total: total,
      status: 'Processing',
    });

    dhsClearCart();
    dhsClearCheckoutExtras();
    checkoutLayout.hidden = true;
    confirmation.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
