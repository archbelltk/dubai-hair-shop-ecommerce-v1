// Account page: profile details form + order history, backed by localStorage.
document.addEventListener('DOMContentLoaded', function () {
  const DHS_ACCOUNT_KEY = 'dhs_account';
  const DEFAULT_ACCOUNT = {
    fullName: 'Amara Yusuf',
    email: 'amara.yusuf@example.com',
    phone: '+971 50 123 4567',
    address: 'Business Bay, Dubai, UAE',
  };

  function getAccount() {
    try {
      const raw = localStorage.getItem(DHS_ACCOUNT_KEY);
      return raw ? Object.assign({}, DEFAULT_ACCOUNT, JSON.parse(raw)) : Object.assign({}, DEFAULT_ACCOUNT);
    } catch (e) {
      return Object.assign({}, DEFAULT_ACCOUNT);
    }
  }

  function saveAccount(account) {
    localStorage.setItem(DHS_ACCOUNT_KEY, JSON.stringify(account));
  }

  function initials(name) {
    const letters = name.trim().split(/\s+/).map(function (w) { return w[0]; }).filter(Boolean);
    return letters.slice(0, 2).join('').toUpperCase() || 'DH';
  }

  const fullNameInput = document.getElementById('accountFullName');
  const emailInput = document.getElementById('accountEmail');
  const phoneInput = document.getElementById('accountPhone');
  const addressInput = document.getElementById('accountAddress');
  const avatarEl = document.getElementById('accountAvatar');
  const profileNameEl = document.getElementById('accountProfileName');
  const profileEmailEl = document.getElementById('accountProfileEmail');
  const form = document.getElementById('accountForm');
  const saveMessage = document.getElementById('accountSaveMessage');

  function renderProfile(account) {
    fullNameInput.value = account.fullName;
    emailInput.value = account.email;
    phoneInput.value = account.phone;
    addressInput.value = account.address;
    profileNameEl.textContent = account.fullName;
    profileEmailEl.textContent = account.email;
    avatarEl.textContent = initials(account.fullName);
  }

  renderProfile(getAccount());

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const account = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      address: addressInput.value.trim(),
    };
    saveAccount(account);
    renderProfile(account);
    saveMessage.hidden = false;
    clearTimeout(form._saveMessageTimer);
    form._saveMessageTimer = setTimeout(function () { saveMessage.hidden = true; }, 3000);
  });

  // Tabs
  const tabs = document.querySelectorAll('.account-tab[data-tab]');
  const panels = {
    details: document.getElementById('panel-details'),
    orders: document.getElementById('panel-orders'),
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      Object.keys(panels).forEach(function (key) {
        panels[key].hidden = key !== tab.dataset.tab;
      });
      if (tab.dataset.tab === 'orders') renderOrders();
    });
  });

  // Order history
  const ordersContainer = document.getElementById('accountOrders');
  const ordersEmpty = document.getElementById('accountOrdersEmpty');

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderOrders() {
    const orders = dhsGetOrders();
    if (orders.length === 0) {
      ordersContainer.innerHTML = '';
      ordersEmpty.hidden = false;
      return;
    }
    ordersEmpty.hidden = true;
    ordersContainer.innerHTML = orders.map(function (order) {
      const itemsSummary = order.items.map(function (item) {
        return item.name + ' <strong>&times;' + item.qty + '</strong>';
      }).join(', ');
      return (
        '<div class="order-card">' +
          '<div class="order-card-head">' +
            '<div>' +
              '<div class="order-card-number">' + order.orderNumber + '</div>' +
              '<div class="order-card-date">' + formatDate(order.date) + '</div>' +
            '</div>' +
            '<span class="order-status">' + order.status + '</span>' +
          '</div>' +
          '<div class="order-card-items">' + itemsSummary + '</div>' +
          '<div class="order-card-total"><span>Total</span><span>' + dhsFormatPrice(order.total) + '</span></div>' +
        '</div>'
      );
    }).join('');
  }
});
