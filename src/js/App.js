import Category from "./Category.js";
import Product from "./Product.js";
const product = new Product();
const category = new Category();
document.addEventListener("DOMContentLoaded", () => {
  category.setApp();
  category.addToOptionCategory();
  category.showcontent();
  product.setApp();
  product.AddproductToList();
  product.createProducts(product.products);
});
