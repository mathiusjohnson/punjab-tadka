const createMenuItems = function(menuItems) {
  return `
<form method='/menu' action="POST">
  <article class="menu-items">
    <header class="name-of-item">
      <span class="name">${menuItems.name}</span>
    </header>
    <main class="max-width">
      <p class="tweeted-text break-long-words hover-blur">${menuItems.description}</p>
    </main>
    <footer class="menu-item-footer">
      <span class="price">${menuItems.price}</span>
      <ul class="icons">
        <li><input type="number" required minlength="1" maxlength="1" placeholder="0"></li>
        <li><button class="order-button">Add</button>
        </li>
      </ul>
    </footer>
  </article>
</form>
`;
};
const renderMenu = function(items) {
  for (const item of items) {
    const menuHTML = createMenuItems(item);
    $('#menu-items-container').append(menuHTML);
  }
};
const loadMenu = function() {
  $
    .get('/api/menu/')
    .then((resp) => {
      renderMenu(resp.entries);
    });
};
//ADDING TO THE CART
const createAddToCart = function(menuItems) {
  return `
  <form action='/addToCart' method="POST">
  <div class="flex-column">
  <span class="your-order-summary"> Your Order </span>
  <div class="item1">
    <p>${menuItems.quantity} ${menuItems.name} ${menuItems.price}</p>
    <p>${menuItems.quantity} ${menuItems.name} ${menuItems.price}</p>
    <p>${menuItems.quantity} ${menuItems.name} ${menuItems.price}</p>
  </div>
  <div class="total-div">
    <p class="subtotal"> Food & Beverage Subtotal </p>
    <p class="tax"> GST </p>
    <p class="total"> Total </p>
    <p class="total-amt"> Total </p>
    <p class="place-order"> PLACE ORDER </p>
  </div>
</div>
</form>
`;
};
const renderCart = function(items) {
  for (const item of items) {
    const cartHTML = createAddToCart(item);
    $('.order-cart').append(cartHTML);
  }
};
const loadCart = function() {
  $
    .post('/api/addToCart')
    .then((resp) => {
      console.log(resp);
      renderCart(resp.entries);
    });
};
$(document).ready(function() {
  // loadMenu();
  //On click of nav button, pulls up menu skeleton
  $("#nav-button").on('click', function(event) {
    event.preventDefault();
    loadMenu();
  });
  //On click listener for add to cart,
  $("#menu-items-container").on('click', ".order-button", function(event) {
    event.preventDefault();
    loadCart();
  });
});