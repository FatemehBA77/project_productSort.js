const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of application",
    createdAt: "2021-11-06T10:52:09.899Z",
  },
  {
    id: 2,
    title: "backend",
    description: "backendend of application",
    createdAt: "2021-09-23T12:53:45.899Z",
  },
];
const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2021-10-31T10:52:09.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2022-10-31T10:52:09.556Z",
  },
  {
    id: 3,
    title: "Viu.js",
    category: "frontend",
    createdAt: "2022-10-31T10:52:09.556Z",
  },
];
export default class Storage {
  static getAllCategory() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];
    const sortCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt) ? -1 : 1;
    });
    return sortCategories;
  }
  static saveCategory(categoryTosave) {
    const savedCategories = Storage.getAllCategory();
    // for first we shoud check category available or un available
    // edit => save
    // new => save
    const existedItem = savedCategories.find((n) => n.id == categoryTosave.id);
    if (existedItem) {
      // edit
      existedItem.title = categoryTosave.title;
      existedItem.description = categoryTosave.description;
    } else {
      // new
      categoryTosave.id = new Date().getTime(); //is uniqe => method getTime()
      categoryTosave.createdAt = new Date().toISOString();
      savedCategories.push(categoryTosave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProduct = JSON.parse(localStorage.getItem("products")) || [];
    const sortProducts = savedProduct.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) - new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt) ? 1 : -1;
      }
    });
    return sortProducts;
  }
  static saveProducts(productToSave) {
    const savedProducts = Storage.getAllProducts();
    // for first we shoud check category available or un available
    // edit => save
    // new => save
    const existedItem = savedProducts.find((n) => n.id == productToSave.id);
    if (existedItem) {
      // edit
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      // new
      productToSave.id = new Date().getTime(); //is uniqe => method getTime()
      productToSave.createdAt = new Date().toISOString();
      savedProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }
  static deleteProducts(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProduct = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("products", JSON.stringify(filteredProduct));
  }
}
