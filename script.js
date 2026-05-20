const products = [
  {
    name: "Customized Book Labels with Kid's Photo & Hindu Gods Designs - Set of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/viratkohlibookstickers.webp"
  },
  {
    name: "Farm Fresh Veggie Basket",
    category: "Grocery",
    price: 349,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Organic Fruit Combo",
    category: "Grocery",
    price: 429,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Wireless Bass Earbuds",
    category: "Electronics",
    price: 1299,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Smart Fitness Band",
    category: "Electronics",
    price: 1899,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Cotton Comfort Bedsheet",
    category: "Home",
    price: 799,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ceramic Dinner Set",
    category: "Home",
    price: 1499,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Glow Skin Care Kit",
    category: "Beauty",
    price: 699,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Herbal Hair Oil Pack",
    category: "Beauty",
    price: 299,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80"
  }
];

const productsGrid = document.querySelector("#productsGrid");
const searchInput = document.querySelector("#searchInput");
const cartCount = document.querySelector("#cartCount");
const categoryButtons = document.querySelectorAll(".category-chip");

let activeCategory = "All";
let cartItems = 0;

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function productCard(product) {
  const priceHtml = product.normalPrice
    ? `
        <div class="price-options">
          <span><strong>${currency.format(product.normalPrice)}</strong> Normal</span>
          <span><strong>${currency.format(product.waterproofPrice)}</strong> Waterproof</span>
        </div>
      `
    : `<span class="price">${currency.format(product.price)}</span>`;

  return `
    <article class="product-card">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="tag">${product.category}</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="meta">
          ${priceHtml}
          <span class="rating">Rating ${product.rating}</span>
        </div>
        <button class="add-button" type="button" data-product="${product.name}">Add to cart</button>
      </div>
    </article>
  `;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  productsGrid.innerHTML = filteredProducts.length
    ? filteredProducts.map(productCard).join("")
    : `<div class="empty-state">No products found. Try another search or category.</div>`;
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);

productsGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button) return;

  cartItems += 1;
  cartCount.textContent = cartItems;
  button.textContent = "Added";
  setTimeout(() => {
    button.textContent = "Add to cart";
  }, 900);
});

renderProducts();
