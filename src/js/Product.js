import Storage from "./Storage.js";
const addProductBtn = document.querySelector("#add-product");
const titleInput = document.querySelector("#product-title");
const quantityInput = document.querySelector("#product-quantity");
const categoryInput = document.querySelector("#product-category");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

export default class Product {
  constructor() {
    addProductBtn.addEventListener("click", (e) => {
      this.AddproductToList(e);
      titleInput.value = "";
      quantityInput.value = "1";
    });
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  AddproductToList(e) {
    // e.preventDefault();
    if (e && e.preventDefault) e.preventDefault();
    const title = titleInput.value;
    const quantity = quantityInput.value;
    const category = categoryInput.value;
    if (!title || !quantity || !category) return;
    Storage.saveProducts({ title, category, quantity });
    this.products = Storage.getAllProducts();
    this.createProducts(this.products);
    console.log(this.products);
    console.log(Storage.getAllCategory());
  }
  createProducts(products) {
    const productDOM = document.querySelector("#add-list");
    let result = "";
    products.forEach((element) => {
      const selectedCategory = Storage.getAllCategory().find(
        (c) => Number(c.id) == Number(element.category)
      );
      result += `<div class="flex items-center justify-between mb-8">
      <span class="text-slate-400">${element.title}</span>
      <div class="flex items-center gap-x-3">
        <span class="text-slate-400">${new Date().toLocaleDateString(
          "fa-Ir"
        )}</span>
        <span
          class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl"
          >${selectedCategory.title}</span
        >
        <span
          class="flex justify-center items-center w-7 h-7 rounded-full bg-slate-500 text-slate-100 border-2 border-slate-400"
          >${element.quantity}</span
        >
        <button
          class="delete-product border px-2 py-0.5 rounded-2xl border-red-200 text-red-400" data-product-id=${
            element.id
          } 
        >
          delete
        </button>
      </div>
      </div>`;
    });
    productDOM.innerHTML = result;
    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.deleteProduct(e);
      });
    });
  }
  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    console.log(this.products);
    this.createProducts(filteredProducts);
  }
  sortProducts(e) {
    const value = e.target.value; //target => همون ابجکتی است که ایونت را برای ما اجرا کرده است
    this.products = Storage.getAllProducts(value);
    this.createProducts(this.products);
  }
  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProducts(productId);
    this.products = Storage.getAllProducts();
    this.createProducts(this.products);
  }
}
