import Storage from "./Storage.js";
const addNewCategoryBtn = document.querySelector("#add-category");
const contentCategory = document.querySelector("#content-category");
const inputTitle = document.querySelector("#category-title");
const descInput = document.querySelector("#category-description");
const addNewCategory = document.querySelector("#add__btncategory");
const categoryDOM = document.querySelector("#product-category");
const cancelBtn = document.querySelector("#cancle_btn");
export default class CategoryView {
  constructor() {
    addNewCategory.addEventListener("click", (e) => {
      this.addNewCtegory(e);
      inputTitle.value = "";
      descInput.value = "";
    });
    this.categories = [];
  }
  addNewCtegory(e) {
    e.preventDefault();
    const title = inputTitle.value;
    const description = descInput.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategory();
    //update DOM update select option in categories
    this.addToOptionCategory();
  }
  setApp() {
    this.categories = Storage.getAllCategory();
  }
  showcontent() {
    addNewCategoryBtn.addEventListener("click", () => {
      contentCategory.classList.toggle("hidden");
    });
    addNewCategory.addEventListener("click", () => {
      contentCategory.classList.toggle("hidden");
    });
    cancelBtn.addEventListener("click", () => {
      contentCategory.classList.toggle("hidden");
    });
  }
  addToOptionCategory() {
    let result = `<option class="bg-slate-500 text-slate-300" value="#">
    select a category
    </option>`;
    this.categories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-300" value="${element.id}">
      ${element.title}
    </option>`;
      categoryDOM.innerHTML = result;
    });
  }
}
