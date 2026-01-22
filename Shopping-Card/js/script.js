class Product {
  constructor(id, name, image, description, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }
}

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  calculateTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class Cart {
  constructor() {
    this.cart = [];
  }

  addItem(product, quantity = 1) {
    const existingItem = this.cart.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push(new CartItem(product, quantity));
    }
  }

  getTotalItem() {
    return this.cart.length;
  }

  removeItem(product_id) {
    this.cart = this.cart.filter((item) => item.product.id !== product_id);
  }

  displayItem() {
    return this.cart;
  }

  getTotalCost() {
    return this.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  increaseItemQuantity(item_id, quantity = 1) {
    const product = products.find((p) => p.id === item_id);
    this.addItem(product, quantity);
  }

  decreaseItemQuantity(item_id, quantity = 1) {
    const item = this.cart.find((item) => item.product.id === item_id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity <= 0) {
        this.removeItem(item_id);
      }
    }
  }
}

const products = [
  new Product(1, "Baskets", "assets/baskets.png", "This is a basket", 100),
  new Product(2, "Socks", "assets/socks.png", "This is a sock", 20),
  new Product(3, "Bag", "assets/bag.png", "This is a bag", 50),
];

const shoppingCart = new Cart();

function updateQuantity(productId) {
  const item = shoppingCart.cart.find((i) => i.product.id === productId);
  const quantitySpan = document.querySelector(
    `.quantity[data-product-id="${productId}"]`
  );
  if (quantitySpan) {
    quantitySpan.textContent = item ? item.quantity : 0;
  }
}

function renderUI() {
  const productContainer = document.querySelector(".list-products");

  for (const product of products) {
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="card-body">
          <div class="card" style="width: 18rem">
            <img src="${product.image}" class="card-img-top" alt="baskets" />
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <h4 class="unit-price">${product.price} $</h4>
              <div class="flex gap-3">
                <button class="btn btn-secondary add-btn" data-product-id="${product.id}">+</button>
                <span class="quantity" data-product-id="${product.id}">0</span>
                <button class="btn btn-secondary remove-btn" data-product-id="${product.id}">-</button>
              </div>
              <div>
                <i class="fas fa-trash-alt delete-btn" data-product-id="${product.id}"></i>
                <i class="fas fa-heart"></i>
              </div>
            </div>
          </div>
        </div>`;
    productContainer.appendChild(div);

    const addBtn = div.querySelector(".add-btn");
    const removeBtn = div.querySelector(".remove-btn");
    const deleteBtn = div.querySelector(".delete-btn");

    addBtn.addEventListener("click", () => {
      shoppingCart.increaseItemQuantity(product.id);
      updateQuantity(product.id);
      renderCart();
    });

    removeBtn.addEventListener("click", () => {
      shoppingCart.decreaseItemQuantity(product.id);
      updateQuantity(product.id);
      renderCart();
    });

    deleteBtn.addEventListener("click", () => {
      shoppingCart.removeItem(product.id);
      updateQuantity(product.id);
      renderCart();
    });
  }

  console.log(shoppingCart.displayItem());
}

function renderCart() {
  const cartTotal = document.querySelector(".total");
  cartTotal.textContent = `${shoppingCart.getTotalCost()} $`;
}

renderUI();
renderCart();
