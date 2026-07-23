const body = document.body;
const overlay = document.querySelector('.page-overlay');
const cartDrawer = document.querySelector('.cart-drawer');
const cartButton = document.querySelector('.cart-button');
const cartClose = document.querySelector('.cart-close');
const cartItems = document.querySelector('.cart-items');
const cartEmpty = document.querySelector('.cart-empty');
const cartFooter = document.querySelector('.cart-footer');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total');
const modal = document.querySelector('.product-modal');
const modalClose = document.querySelector('.modal-close');
const modalArt = document.querySelector('.modal-art');
const modalName = document.querySelector('#modal-name');
const modalPrice = document.querySelector('.modal-price');
const modalAdd = document.querySelector('.modal-add');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const searchToggle = document.querySelector('.search-toggle');
const searchPanel = document.querySelector('.search-panel');
const searchClose = document.querySelector('.search-close');
const searchInput = document.querySelector('#site-search');
const searchResults = document.querySelector('.search-results');

let cart = [];
let activeProduct = null;

function setOverlay(show) {
  overlay.hidden = !show;
  body.classList.toggle('locked', show);
}

function openCart() {
  closeModal(false);
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  setOverlay(true);
  cartClose.focus();
}

function closeCart(clearOverlay = true) {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  if (clearOverlay) setOverlay(false);
}

function renderCart() {
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-thumb"><img src="${item.image}" alt="" /></div>
      <div><h3>${item.name}</h3><p>Size ${item.size} · Qty 1</p></div>
      <button class="cart-remove" type="button" aria-label="Remove ${item.name}" data-index="${index}">×</button>
    `;
    cartItems.appendChild(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = cart.length;
  cartTotal.textContent = `$${total} AUD`;
  cartEmpty.hidden = cart.length > 0;
  cartFooter.hidden = cart.length === 0;

  document.querySelectorAll('.cart-remove').forEach(button => {
    button.addEventListener('click', () => {
      cart.splice(Number(button.dataset.index), 1);
      renderCart();
    });
  });
}

function addProduct(name, price, size = 'M', image = '') {
  cart.push({ name, price: Number(price), size, image });
  renderCart();
  openCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', event => {
    const card = event.currentTarget.closest('.product-card');
    addProduct(card.dataset.name, card.dataset.price, 'M', card.dataset.image);
  });
});

function openModal(card) {
  activeProduct = card;
  modalName.textContent = card.dataset.name;
  modalPrice.textContent = `$${card.dataset.price} AUD`;
  modalArt.innerHTML = `<img src="${card.dataset.image}" alt="${card.dataset.name}" />`;
  closeCart(false);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  setOverlay(true);
  modalClose.focus();
}

function closeModal(clearOverlay = true) {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  if (clearOverlay) setOverlay(false);
}

document.querySelectorAll('.product-image').forEach(image => {
  image.addEventListener('click', () => openModal(image.closest('.product-card')));
});

modalAdd.addEventListener('click', () => {
  const selected = document.querySelector('input[name="size"]:checked');
  addProduct(activeProduct.dataset.name, activeProduct.dataset.price, selected.value, activeProduct.dataset.image);
});

cartButton.addEventListener('click', openCart);
cartClose.addEventListener('click', () => closeCart());
modalClose.addEventListener('click', () => closeModal());
overlay.addEventListener('click', () => { closeCart(false); closeModal(false); setOverlay(false); });

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeCart(false); closeModal(false); setOverlay(false);
    closeSearch(); closeMenu();
  }
});

function closeMenu() {
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileNav.classList.remove('open');
  mobileNav.setAttribute('aria-hidden', 'true');
}

menuToggle.addEventListener('click', () => {
  const open = !mobileNav.classList.contains('open');
  mobileNav.classList.toggle('open', open);
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
  body.classList.toggle('locked', open);
});

mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  closeMenu(); body.classList.remove('locked');
}));

function closeSearch() {
  searchPanel.classList.remove('open');
  searchPanel.setAttribute('aria-hidden', 'true');
  searchToggle.setAttribute('aria-expanded', 'false');
  searchInput.value = '';
  searchResults.textContent = '';
}

searchToggle.addEventListener('click', () => {
  searchPanel.classList.add('open');
  searchPanel.setAttribute('aria-hidden', 'false');
  searchToggle.setAttribute('aria-expanded', 'true');
  setTimeout(() => searchInput.focus(), 100);
});
searchClose.addEventListener('click', closeSearch);

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { searchResults.textContent = ''; return; }
  const matches = [...document.querySelectorAll('.product-card')].filter(card =>
    `${card.dataset.name} ${card.dataset.category}`.toLowerCase().includes(query)
  );
  searchResults.innerHTML = matches.length
    ? `${matches.length} result${matches.length > 1 ? 's' : ''}: ${matches.map(m => m.dataset.name).join(' · ')}`
    : 'No pieces found. Try “tee”, “hoodie” or “faith”.';
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .13 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.querySelector('.newsletter-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = event.currentTarget.email.value.trim();
  const status = document.querySelector('.form-status');
  if (!email || !email.includes('@')) {
    status.textContent = 'Enter a valid email address.';
    return;
  }
  status.textContent = `You’re in. First access will be sent to ${email}.`;
  event.currentTarget.reset();
});

document.querySelector('.checkout-button').addEventListener('click', () => {
  alert('Storefront demo: connect this button to Shopify, Stripe or your preferred checkout.');
});

document.querySelector('#year').textContent = new Date().getFullYear();
renderCart();
