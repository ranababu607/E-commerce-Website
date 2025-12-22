// ===== Data Storage =====
let cart = [];
let foods = [
  {
    id: 1,
    name: "Classic Pizza",
    category: "Pizza",
    price: 8.99,
    desc: "Delicious homemade pizza with fresh toppings",
    img: "assetss/Pizza1.jpg",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 10.99,
    desc: "Pizza loaded with pepperoni and mozzarella",
    img: "assetss/pizza2.jpg",
  },
  {
    id: 3,
    name: "Club Sandwich",
    category: "Sandwich",
    price: 7.99,
    desc: "Triple-layered sandwich with ham, bacon, and cheese",
    img: "assetss/Sendwice1.jpg",
  },
  {
    id: 4,
    name: "Veggie Sandwich",
    category: "Sandwich",
    price: 6.99,
    desc: "Fresh vegetables with creamy spread",
    img: "assetss/Sendwice2.jpg",
  },
  {
    id: 5,
    name: "Classic Burger",
    category: "Burger",
    price: 8.99,
    desc: "Juicy beef patty with all the fixings",
    img: "assetss/Burger1.jpg",
  },
  {
    id: 6,
    name: "Cheese Burger",
    category: "Burger",
    price: 9.99,
    desc: "Double cheese with beef patty",
    img: "assetss/Burger2.jpg",
  },
  {
    id: 7,
    name: "Special Sandwich",
    category: "Sandwich",
    price: 7.49,
    desc: "Crispy and delicious sandwich",
    img: "assetss/Sendwice3.jpg",
  },
  {
    id: 8,
    name: "Bacon Burger",
    category: "Burger",
    price: 10.99,
    desc: "Crispy bacon with beef patty",
    img: "assetss/Burger3.jpg",
  },
];

const categories = ["Pizza", "Sandwich", "Burger"];

// ===== Initialize App =====
document.addEventListener("DOMContentLoaded", function () {
  loadCart();
  displayHome();
  setupEventListeners();
});

// ===== Event Listeners =====
function setupEventListeners() {
  document
    .querySelector(".cart-toggle")
    .addEventListener("click", function (e) {
      e.preventDefault();
      showPage("cart");
    });
}

// ===== Page Navigation =====
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId).classList.add("active");

  // Scroll to top
  window.scrollTo(0, 0);

  // Load content based on page
  if (pageId === "home") {
    displayHome();
  } else if (pageId === "categories") {
    displayCategories();
  } else if (pageId === "foods") {
    displayAllFoods();
  } else if (pageId === "cart") {
    updateCartDisplay();
  }
}

// ===== Home Page =====
function displayHome() {
  // Display categories
  const homeCategoriesDiv = document.getElementById("home-categories");
  const categoryImages = {
    Pizza: "assetss/Pizza1.jpg",
    Sandwich: "assetss/Sendwice1.jpg",
    Burger: "assetss/Burger1.jpg",
  };
  homeCategoriesDiv.innerHTML = categories
    .map(
      (cat) => `
        <div class="category-card" onclick="filterByCategory('${cat}')">
            <img src="${categoryImages[cat]}" alt="${cat}">
            <div class="category-overlay">
                <span class="category-name">${cat}</span>
            </div>
        </div>
    `
    )
    .join("");

  // Display featured foods (first 6)
  const homeFoodsDiv = document.getElementById("home-foods");
  homeFoodsDiv.innerHTML = foods
    .slice(0, 6)
    .map((food) => createFoodCard(food))
    .join("");
}

// ===== Categories Page =====
function displayCategories() {
  const categoriesDiv = document.getElementById("all-categories");
  const categoryImages = {
    Pizza: "assetss/Pizza1.jpg",
    Sandwich: "assetss/Sendwice1.jpg",
    Burger: "assetss/Burger1.jpg",
  };
  categoriesDiv.innerHTML = categories
    .map(
      (cat) => `
        <div class="category-card" onclick="filterByCategory('${cat}')">
            <img src="${categoryImages[cat]}" alt="${cat}">
            <div class="category-overlay">
                <span class="category-name">${cat}</span>
            </div>
        </div>
    `
    )
    .join("");
}

// ===== Foods Page =====
function displayAllFoods() {
  const foodsDiv = document.getElementById("all-foods");
  const filterSelect = document.getElementById("category-filter");

  // Populate filter dropdown
  filterSelect.innerHTML =
    '<option value="">All Categories</option>' +
    categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("");

  // Display all foods
  foodsDiv.innerHTML = foods.map((food) => createFoodCard(food)).join("");
}

// ===== Create Food Card HTML =====
function createFoodCard(food) {
  return `
        <div class="food-card">
            <img src="${food.img}" alt="${food.name}" class="food-img">
            <div class="food-info">
                <span class="food-category">${food.category}</span>
                <h3 class="food-name">${food.name}</h3>
                <p class="food-desc">${food.desc}</p>
                <div class="food-price">$${food.price.toFixed(2)}</div>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <input type="number" value="1" min="1" max="10" id="qty-${
                      food.id
                    }" style="width: 60px;">
                    <button class="btn btn-primary" onclick="addToCart(${
                      food.id
                    })">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

// ===== Shopping Cart =====
function addToCart(foodId) {
  const food = foods.find((f) => f.id === foodId);
  const qtyInput = document.getElementById(`qty-${foodId}`);
  const quantity = parseInt(qtyInput.value) || 1;

  const existingItem = cart.find((item) => item.id === foodId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: quantity,
    });
  }

  updateCart();
  showNotification("Added to cart!");
  qtyInput.value = 1;
}

function removeFromCart(foodId) {
  cart = cart.filter((item) => item.id !== foodId);
  updateCart();
}

function updateCartQuantity(foodId, newQuantity) {
  const item = cart.find((item) => item.id === foodId);
  if (item) {
    item.quantity = Math.max(1, parseInt(newQuantity) || 1);
    updateCart();
  }
}

function updateCart() {
  saveCart();
  updateCartBadge();
  updateCartDisplay();
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalItems;
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (cart.length === 0) {
    cartItems.innerHTML =
      '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
    cartTotal.textContent = "0.00";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${
                      item.quantity
                    }" min="1" max="10" 
                           onchange="updateCartQuantity(${
                             item.id
                           }, this.value)" style="width: 60px;">
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger" onclick="removeFromCart(${
                      item.id
                    })">Remove</button>
                </td>
            </tr>
        `;
    })
    .join("");

  cartTotal.textContent = total.toFixed(2);
}

function saveCart() {
  localStorage.setItem("foodcart", JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem("foodcart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartBadge();
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const message = `Order confirmed!\n\nTotal: $${total.toFixed(
    2
  )}\n\nThank you for your order!`;
  alert(message);

  cart = [];
  updateCart();
  showPage("foods");
}

// ===== Filter Functions =====
function filterByCategory(category = null) {
  const filterSelect = document.getElementById("category-filter");
  const category_val = category || filterSelect.value;

  const foodsDiv = document.getElementById("all-foods");
  const filtered = category_val
    ? foods.filter((f) => f.category === category_val)
    : foods;

  foodsDiv.innerHTML =
    filtered.length > 0
      ? filtered.map((food) => createFoodCard(food)).join("")
      : '<p class="empty-message">No foods found in this category.</p>';

  if (category) {
    showPage("foods");
    window.scrollTo(0, 0);
  }
}

// ===== Search Function =====
function searchFood(event) {
  event.preventDefault();
  const searchTerm = document
    .getElementById("search-input")
    .value.toLowerCase();

  const filtered = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm) ||
      food.desc.toLowerCase().includes(searchTerm)
  );

  const foodsDiv = document.getElementById("all-foods");
  foodsDiv.innerHTML =
    filtered.length > 0
      ? filtered.map((food) => createFoodCard(food)).join("")
      : '<p class="empty-message">No foods found matching your search.</p>';

  showPage("foods");
  document.getElementById("search-input").value = "";
}

// ===== Notifications =====
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// ===== Animations =====
const style = document.createElement("style");
style.innerHTML = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
