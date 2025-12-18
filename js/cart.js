async function showCartData() {
  let cartContain = document.querySelector(".cart-contain");

  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart.length === 0) {
    document.querySelector("#removeAllItemsFromCart").classList.add("hidden");
    cartContain.innerHTML = "";
    return;
  } else {
    document.querySelector(".empty-cart").classList.add("hidden");
  }

  for (let i = 0; i < cart.length; i++) {
    const qty = cart[i].qty;
    const product_id = cart[i].id;
    const url = `https://dummyjson.com/products/${product_id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        cartContain.innerHTML += `
            <tbody>
                <tr class="text-center">
                    <td><img class="h-15 md:h-30 w-20" src="${
                      data.thumbnail
                    }" alt="${data.title}"></td>
                    <td class="truncate">${data.title}</td>
                    <td class="hidden md:block items-center md:mt-13">${
                      data.price
                    } $</td>
                    <td> 
                        <button data-id=${
                          data.id
                        } class="decrement cursor-pointer me-2 md:me-4 text-2xl">-</button>
                            ${qty} 
                        <button data-id=${
                          data.id
                        } class="increment cursor-pointer ms-2 md:ms-4 text-2xl">+</button> 
                    </td>
                    <td>${Number(qty * data.price).toFixed(2)}</td>
                    <td class="cursor-pointer"><i data-id=${
                      data.id
                    } class="removeFromCart fa-regular fa-trash-can text-red-500"></i></td>
                </tr>
            </tbody>
        `;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

showCartData();

function removeItemFromCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  document.querySelector(".cart-contain").addEventListener("click", (e) => {
    if (e.target.classList.contains("removeFromCart")) {
      const product_id = Number(e.target.dataset.id);

      const newCart = cart.filter((item) => Number(item.id) !== product_id);

      localStorage.setItem("cart", JSON.stringify(newCart));
      window.location.reload();
      shoNoteRemovedFromCart();
    }
  });
}
removeItemFromCart();

function removeAllItemFromCart() {
  document
    .querySelector("#removeAllItemsFromCart")
    .addEventListener("click", () => {
      const newCart = [];
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.location.reload();
    });
}

removeAllItemFromCart();


const updateQty = () => {
  document.querySelector(".cart-contain").addEventListener("click", (e) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    // INCREMENT
    if (e.target.classList.contains("increment")) {
      const product_id = e.target.dataset.id;
      const newCart = cart.map((item) => {
        if (item.id === product_id) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.location.reload();
    }
    // DECREMENT
    if (e.target.classList.contains("decrement")) {
      const product_id = e.target.dataset.id;
      const newCart = cart.map((item) => {
        if (item.id === product_id) {
          if (item.qty == 1) {
            document.querySelector(".cart-contain").removeEventListener();
          }
          return {
            ...item,
            qty: item.qty - 1,
          };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.location.reload();
    }
  });
};
updateQty();


function shoNoteRemovedFromCart() {
  const noteCart = document.querySelector(".removed-note-cart");
  noteCart.classList.remove("hidden");
  console.log(noteCart);
  setTimeout(() => {
    noteCart.classList.add("hidden");
  }, 2000);
}
