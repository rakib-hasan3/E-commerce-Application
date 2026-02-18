// for trending 
const BASE_URL = "https://fakestoreapi.com";

async function loadTrendingProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const products = await res.json();


    const trending = products.slice(0, 3);

    renderTrending(trending);

  } catch (error) {
    console.error("Trending Error:", error);
  }
}

function renderTrending(products) {
  const container = document.getElementById("trending-products");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");

    card.className =
      " rounded-2xl lg:m-0 m-8 shadow-md hover:shadow-xl transition p-4";

    card.innerHTML = `
          <img src="${product.image}" 
               class="h-40 mx-auto object-contain mb-4">

          <h3 class="font-semibold text-lg mb-2">
            ${truncate(product.title)}
          </h3>

          <p class="text-gray-600 text-sm mb-1">
            ${product.category}
          </p>

          <p class="font-bold text-indigo-600 mb-2">
            $${product.price}
          </p>

          <p class="text-yellow-500 text-sm mb-3">
            ⭐ ${product.rating.rate}
          </p>

          <div class="flex gap-2">
            <button 
              
              onclick="showDetails(${product.id})"
              class="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-lg">
              Details
            </button>

            <button 
              onclick='addToCart(${JSON.stringify(product)})'
              class="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 py-2 rounded-lg">
              Add
            </button>
          </div>
        `;

    container.appendChild(card);
  });
}

// helper
function truncate(text, limit = 35) {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

loadTrendingProducts();
// get all products


async function loadAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const products = await res.json();
    renderProducts(products);
  } catch (error) {
    console.error("Products Error:", error);
  }
}

async function loadCategories() {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`);
    const categories = await res.json();
    renderCategories(categories);
  } catch (error) {
    console.error("Category Error:", error);
  }
}

function renderCategories(categories) {
  const container = document.getElementById("categories");
  container.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.innerText = "All";
  allBtn.className = btnStyle();
  allBtn.onclick = loadAllProducts;
  container.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = cat;
    btn.className = btnStyle();
    btn.onclick = () => loadByCategory(cat);
    container.appendChild(btn);
  });
}

async function loadByCategory(category) {
  try {
    const res = await fetch(
      `${BASE_URL}/products/category/${category}`
    );
    const products = await res.json();
    renderProducts(products);
  } catch (error) {
    console.error("Filter Error:", error);
  }
}

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");

    card.className =
      "bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4";

    card.innerHTML = `
      <img src="${product.image}" class="h-40 mx-auto object-contain mb-4">

      <h3 class="font-semibold text-lg mb-2">
        ${truncate(product.title)}
      </h3>

      <p class="text-gray-600 text-sm">${product.category}</p>
      <p class="font-bold text-indigo-600">$${product.price}</p>
      <p class="text-yellow-500">⭐ ${product.rating.rate}</p>
    `;

    container.appendChild(card);
  });
}

function truncate(text, limit = 35) {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

// Page load
loadCategories();
loadAllProducts();


// catagori wis
async function loadCategories() {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`);
    const categories = await res.json();
    renderCategories(categories);
  } catch (error) {
    console.error("Category Error:", error);
  }
}

function renderCategories(categories) {
  const container = document.getElementById("categories");
  container.innerHTML = "";

  // "All" Button
  const allBtn = document.createElement("button");
  allBtn.innerText = "All";
  allBtn.className = categoryBtnStyle();
  allBtn.onclick = loadAllProducts;
  container.appendChild(allBtn);

  // Category Buttons
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = capitalize(cat);
    btn.className = categoryBtnStyle();
    btn.onclick = () => loadByCategory(cat);
    container.appendChild(btn);
  });
}

// Tailwind Button Style
function categoryBtnStyle() {
  return "px-4 py-2 bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white transition";
}

// Capitalize first letter
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function loadAllProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const products = await res.json();
    renderProducts(products);
  } catch (error) {
    console.error("Products Error:", error);
  }
}

async function loadByCategory(category) {
  try {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    const products = await res.json();
    renderProducts(products);
  } catch (error) {
    console.error("Filter Error:", error);
  }
}

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 h-full flex flex-col";

    card.innerHTML = `
      <img src="${product.image}" class="h-40 mx-auto object-contain mb-4 shrink-0">
      
      <h3 class="font-semibold text-lg mb-2">${truncate(product.title)}</h3>
      <p class="text-gray-600 text-sm mb-1">${capitalize(product.category)}</p>
      <p class="font-bold text-indigo-600 mb-2">$${product.price}</p>
      <p class="text-yellow-500 text-sm mb-3">⭐ ${product.rating.rate}</p>
      
      <div class="flex-grow"></div>

      <div class="flex gap-2 mt-auto pt-2">
        <button onclick="showDetails(${product.id})" class="btn btn-primary flex-1">Details</button>
        <button class="btn btn-secondary flex-1">Add</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Helper truncate
function truncate(text, limit = 35) {
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}
loadCategories();
loadAllProducts();


// show details 
async function showDetails(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    openModal(product);

  } catch (error) {
    console.error("Details Error:", error);
  }
}

function openModal(product) {
  document.getElementById("product-modal").classList.remove("hidden");
  document.getElementById("product-modal").classList.add("flex");

  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-title").innerText = product.title;
  document.getElementById("modal-description").innerText = product.description;
  document.getElementById("modal-price").innerText = "$" + product.price;
  document.getElementById("modal-rating").innerText = "⭐ " + product.rating.rate;
}

function closeModal() {
  document.getElementById("product-modal").classList.add("hidden");
  document.getElementById("product-modal").classList.remove("flex");
}

