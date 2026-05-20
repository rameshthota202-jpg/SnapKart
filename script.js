const products = [
  {
    name: "Telugu Wedding Welcome Board",
    category: "Welcome Board",
    priceOptions: [
      { label: "12x18 inches", price: 599 },
      { label: "18x24 inches (1.5x2 Feet)", price: 799 },
      { label: "24x36 inches (2x3 Feet)", price: 1299 }
    ],
    note: "Couple names and surname customization available",
    rating: 4.9,
    image: "assets/products/welcome-board/telugu-wedding-welcome-board.webp"
  },
  {
    name: "Telugu Wedding Welcome Board 12x18",
    category: "Welcome Board",
    price: 599,
    note: "Couple names and surname customization available",
    rating: 4.9,
    image: "assets/products/welcome-board/teluguweddingwelcomesunboardbuyonline.webp"
  },
  {
    name: "Telugu Wedding Welcome Board 18x24",
    category: "Welcome Board",
    price: 799,
    note: "Couple names and surname customization available",
    rating: 4.9,
    image: "assets/products/welcome-board/welcome_wedding_sun_board_designs_533c7113-401f-41ab-8c65-44d42d0a7f04.webp"
  },
  {
    name: "Telugu Wedding Welcome Board 24x36",
    category: "Welcome Board",
    price: 1299,
    note: "Couple names and surname customization available",
    rating: 4.9,
    image: "assets/products/welcome-board/582d185afeead6eb016a515d47a5c143.jpg"
  },
  {
    name: "Barbie School Book Labels with Customized Photo - Pack of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/Barbie_School_Books_Lables.webp"
  },
  {
    name: "Ben 10 School Book Labels with Customized Photo - Pack of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/ben_10_books_stickers_order_online.webp"
  },
  {
    name: "Durga God School Book Labels with Customized Photo - Pack of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/Durga_copy.webp"
  },
  {
    name: "School Books Label with Customized Photo - Pack of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/fb51dff9ddfd814b49ad03cf45ebefdc.jpg"
  },
  {
    name: "School Books Labels Stickers with Photo and Name - Pack of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/School_Books_Lables_Stickers.webp"
  },
  {
    name: "Spiderman School Book Labels with Photo and Name - Pack of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/Spiderman_School_books_lables_stickers_with_photo_and_name.webp"
  },
  {
    name: "Spiderman School Book Labels Extra Design - Pack of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/Spiderman_School_books_lables_stickers_with_photo_and_name (1).webp"
  },
  {
    name: "Customized Book Labels with Kid's Photo & Hindu Gods Designs - Set of 30 Stickers",
    category: "Paper Stickers",
    normalPrice: 99,
    waterproofPrice: 129,
    rating: 4.9,
    image: "assets/products/viratkohlibookstickers.webp"
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
  let priceHtml = `<span class="price">${currency.format(product.price)}</span>`;

  if (product.priceOptions) {
    priceHtml = `
        <div class="price-options">
          ${product.priceOptions
            .map((option) => `<span><strong>${currency.format(option.price)}</strong> ${option.label}</span>`)
            .join("")}
        </div>
      `;
  } else if (product.normalPrice) {
    priceHtml = `
        <div class="price-options">
          <span><strong>${currency.format(product.normalPrice)}</strong> Normal</span>
          <span><strong>${currency.format(product.waterproofPrice)}</strong> Waterproof</span>
        </div>
      `;
  }

  const noteHtml = product.note ? `<p class="product-note">${product.note}</p>` : "";

  return `
    <article class="product-card">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="tag">${product.category}</span>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        ${noteHtml}
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
