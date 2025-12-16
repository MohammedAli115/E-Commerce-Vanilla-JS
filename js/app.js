const handleCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((acc, cur) => acc + cur.qty, 0);
  document.querySelector(".cart-length").textContent = totalQty;
};
handleCartCount();

async function fetchProducts() {
  let url = "https://dummyjson.com/products";
  let containProducts = document.querySelector(".some-products .products ");

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      data.products.slice(0, 3).map((product) => {
        containProducts.innerHTML += `
                <div class="product shadow-2xl text-center group gap-3 px-2 cursor-pointer bg-slate-100 hover:bg-slate-200 duration-300 m-2 rounded-2xl">
                    <img class="group-hover:scale-[1.1] duration-300"  src=${product.thumbnail} alt=${product.description} />
                    <h3 class="truncate">${product.title}</h3>
                    <p>${product.price} $</p>
                    <button data-id=${product.id} class="addToCart bg-black text-white cursor-pointer p-1 px-3 rounded-xl my-3">Add To Cart <i class="fa-solid fa-cart-plus"></i></button>
                </div>
                `;
      });
    }
  } catch {
    console.log(Error("Fetch Categories is Not Ok"));
  }
}

fetchProducts();

function addToCart() {
  let qty = 1;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  document
    .querySelector(".some-products .products ")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("addToCart")) {
        const product_id = e.target.dataset.id;

        const existing = cart.find((item) => item.id === product_id);

        if (existing) {
          existing.qty++;
        } else {
          shoNoteAddedToCart();
          cart.push({
            id: product_id,
            qty,
          });
        }
        handleCartCount();
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    });
}

addToCart();

function shoNoteAddedToCart() {
  const noteCart = document.querySelector(".add-cart-note");
  noteCart.classList.remove("hidden");
  setTimeout(() => {
    noteCart.classList.add("hidden");
  }, 2000);
}
