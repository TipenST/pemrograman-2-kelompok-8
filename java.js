// ==========================================
// DATA AWAL PRODUK BAJU (shirttrd)
// ==========================================
let products = [
  {
    id: 1,
    brand: "Uniqlo",
    title: "Airism Oversized Cotton Crew Neck",
    price: 199000,
    location: "Jakarta Selatan",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    brand: "Erigo",
    title: "T-Shirt Vintage Graphic Black",
    price: 135000,
    location: "Bandung",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    brand: "Stussy",
    title: "Basic Logo Longsleeve Tee White",
    price: 650000,
    location: "Surabaya",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80"
  }
];

let currentUploadedImage = "";
let selectedProductToBuy = null;

// ==========================================
// NAVIGASI HALAMAN (ROUTING)
// ==========================================
const pages = {
  landing: document.getElementById("page-landing"),
  auth: document.getElementById("page-auth"),
  dashboard: document.getElementById("page-dashboard"),
  sell: document.getElementById("page-sell"),
  checkout: document.getElementById("page-checkout")
};

function showPage(pageName) {
  Object.values(pages).forEach(page => page.classList.remove("active"));
  if (pages[pageName]) {
    pages[pageName].classList.add("active");
    window.scrollTo(0, 0);
  }
}

// Event Navigasi Antar Halaman
document.getElementById("btn-start").addEventListener("click", () => showPage("auth"));
document.getElementById("btn-to-login").addEventListener("click", () => showPage("auth"));
document.getElementById("btn-back-landing").addEventListener("click", () => showPage("landing"));
document.getElementById("btn-to-sell").addEventListener("click", () => showPage("sell"));
document.getElementById("btn-back-dashboard").addEventListener("click", () => showPage("dashboard"));
document.getElementById("btn-cancel-sell").addEventListener("click", () => showPage("dashboard"));
document.getElementById("btn-cancel-checkout").addEventListener("click", () => showPage("dashboard"));
document.getElementById("btn-logout").addEventListener("click", () => showPage("auth"));

// ==========================================
// AUTH (LOGIN & SIGN UP)
// ==========================================
const tabLoginBtn = document.getElementById("tab-login-btn");
const tabSignupBtn = document.getElementById("tab-signup-btn");
const formLogin = document.getElementById("form-login");
const formSignup = document.getElementById("form-signup");
const userDisplay = document.getElementById("user-display");

tabLoginBtn.addEventListener("click", () => {
  tabLoginBtn.classList.add("active");
  tabSignupBtn.classList.remove("active");
  formLogin.classList.add("active");
  formSignup.classList.remove("active");
});

tabSignupBtn.addEventListener("click", () => {
  tabSignupBtn.classList.add("active");
  tabLoginBtn.classList.remove("active");
  formSignup.classList.add("active");
  formLogin.classList.remove("active");
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const identifier = document.getElementById("login-identifier").value.trim();
  userDisplay.textContent = `Halo, ${identifier.split("@")[0]}!`;
  renderProducts();
  showPage("dashboard");
});

formSignup.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  userDisplay.textContent = `Halo, ${name}!`;
  renderProducts();
  showPage("dashboard");
});

// ==========================================
// FORMAT RUPIAH & RENDER DASHBOARD
// ==========================================
function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(amount);
}

function renderProducts() {
  const productContainer = document.getElementById("product-list");
  const countBadge = document.getElementById("product-count");
  productContainer.innerHTML = "";

  countBadge.textContent = `${products.length} Produk`;

  if (products.length === 0) {
    productContainer.innerHTML = `
      <div class="empty-state">
        <p>Semua koleksi baju sudah terjual habis!</p>
        <button onclick="document.getElementById('btn-to-sell').click()" class="btn btn-primary" style="margin-top: 14px;">
          Jual Baju Baru
        </button>
      </div>
    `;
    return;
  }

  products.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="product-info">
        <span class="product-brand">${item.brand}</span>
        <h4 class="product-title">${item.title}</h4>
        <div class="product-price">${formatRupiah(item.price)}</div>
        <div class="product-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${item.location}
        </div>
        <button class="btn btn-buy" onclick="openCheckout(${item.id})">
          Beli Baju
        </button>
      </div>
    `;
    productContainer.appendChild(card);
  });
}

// ==========================================
// ALUR CHECKOUT & PEMBELIAN
// ==========================================
function openCheckout(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;

  selectedProductToBuy = item;

  const previewContainer = document.getElementById("checkout-item-preview");
  previewContainer.innerHTML = `
    <img src="${item.image}" class="checkout-img" alt="${item.title}">
    <div class="checkout-detail">
      <small style="text-transform: uppercase; color: #a3a3a3; font-weight:700;">${item.brand}</small>
      <h4>${item.title}</h4>
      <p>Asal: ${item.location}</p>
      <div class="price-tag">${formatRupiah(item.price)}</div>
    </div>
  `;

  showPage("checkout");
}

const formCheckout = document.getElementById("form-checkout");

formCheckout.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selectedProductToBuy) return;

  const address = document.getElementById("buyer-address").value.trim();
  const phone = document.getElementById("buyer-phone").value.trim();
  const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;

  alert(
    `✅ Pembelian Berhasil!\n\n` +
    `Produk: ${selectedProductToBuy.title} (${selectedProductToBuy.brand})\n` +
    `Total: ${formatRupiah(selectedProductToBuy.price)}\n` +
    `Metode Pembayaran: ${paymentMethod}\n` +
    `Alamat Tujuan: ${address}\n` +
    `No. Kontak: ${phone}\n\n` +
    `Baju berhasil dibeli dan otomatis dihapus dari daftar etalase.`
  );

  products = products.filter(p => p.id !== selectedProductToBuy.id);

  formCheckout.reset();
  selectedProductToBuy = null;

  renderProducts();
  showPage("dashboard");
});

// ==========================================
// UPLOAD GAMBAR & FORM JUAL BAJU
// ==========================================
const sellImageInput = document.getElementById("sell-image");
const imagePreview = document.getElementById("image-preview");
const uploadPlaceholder = document.getElementById("upload-placeholder");
const formSell = document.getElementById("form-sell");

sellImageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      currentUploadedImage = e.target.result;
      imagePreview.src = currentUploadedImage;
      imagePreview.style.display = "block";
      uploadPlaceholder.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});

formSell.addEventListener("submit", (e) => {
  e.preventDefault();

  const brand = document.getElementById("sell-brand").value.trim();
  const title = document.getElementById("sell-title").value.trim();
  const price = parseInt(document.getElementById("sell-price").value, 10);
  const location = document.getElementById("sell-location").value.trim();

  if (!currentUploadedImage) {
    alert("Silakan unggah gambar baju terlebih dahulu!");
    return;
  }

  const newProduct = {
    id: Date.now(),
    brand,
    title,
    price,
    location,
    image: currentUploadedImage
  };

  products.unshift(newProduct);

  formSell.reset();
  currentUploadedImage = "";
  imagePreview.style.display = "none";
  uploadPlaceholder.style.display = "flex";

  renderProducts();
  showPage("dashboard");
});
