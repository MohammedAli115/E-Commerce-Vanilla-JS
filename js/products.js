const handleCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((acc, cur) => acc + cur.qty, 0);
  document.querySelector(".cart-length").textContent = totalQty;
};
handleCartCount();

async function fetchProducts() {


  let productsContain = document.querySelector(".products-contain");

  productsContain.innerHTML = "";

  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=&skip=&limit=20&sortBy=&order=`
    );
    const data = await response.json();
    if (response.ok) {
      console.log(data);

      data.products.map((product) => {
        productsContain.innerHTML += `
            <div class="product group bg-whit bg-violet-100 m-4 rounded-2xl cursor-pointer transition-all duration-300 p-3 ">
            
                <!-- Image -->
                <div class="overflow-hidden rounded-xl">
                    <img 
                    class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" 
                    src="${product.thumbnail}" 
                    alt="${product.description}" 
                    />
                </div>

                <!-- Info -->
                <div class="mt-3 text-center">
                    <h3 class="text-sm font-semibold text-gray-800 truncate">
                    ${product.title}
                    </h3>

                    <p class="text-lg font-bold text-green-600 mt-1">
                    ${product.price} $
                    </p>

                    <!-- Button -->
                    <button 
                    data-id="${product.id}" 
                    class="addToCart mt-3 cursor-pointer bg-black px-5 text-white py-2 rounded-xl text-sm duration-300 hover:bg-gray-800 transition-colors"
                    >
                    Add to Cart
                    <i class="fa-solid fa-cart-plus mr-1"></i>
                    </button>
                </div>
            </div>
                `;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();

function addToCart() {
  let qty = 1;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.querySelector(".products-contain").addEventListener("click", (e) => {
    if (e.target.classList.contains("addToCart")) {
      const product_id = e.target.dataset.id;
      console.log(product_id);

      const existing = cart.find((item) => item.id === product_id);

      if (existing) {
        existing.qty++;
        handleCartCount();
      } else {
        cart.push({
          id: product_id,
          qty,
        });
        shoNoteAddedToCart();
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
