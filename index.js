(function () {
  let cart = [
    {
      id: 1,
      name: "Creatine",
      price: 20.0,
      quantity: 1,
      imageURL:"img1.jpg"
    },
    {
      id: 2,
      name: "Protein Powder",
      price: 6.0,
      quantity: 1,
      imageURL: "img2.avif"
    },
    {
      id: 3,
      name: "Mass Gainer",
      price: 49.0,
      quantity: 1,
      imageURL: "img3.jpeg"
    },
    {
      id: 4,
      name: "BCAA",
      price: 15.0,
      quantity: 1,
      imageURL: "img4.webp"
    },
  ];

  const SHIPPING_COST = 10.0;

  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");
  const checkoutBtn = document.getElementById("checkout-btn");

  function reRenderUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      checkoutBtn.disabled = true;
      subtotalEl.textContent = "$0.00";
      totalEl.textContent = "$0.00";
      return;
    }

    cart.forEach((item) => {
      const itemEl = document.createElement("article");
      itemEl.className = "cart-item";
      itemEl.setAttribute("data-id", item.id);

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "item-image";

      const imgEl = document.createElement("img");
      imgEl.src = item.imageURL;
      imgEl.onerror = function () {
        this.onerror = null;
        this.src =
          "https://placehold.co/60x60?text=No+Image&bg=ffdddd&fg=aa0000";
      };
      imageWrapper.appendChild(imgEl);

      const infoEl = document.createElement("div");
      infoEl.className = "item-info";

      const nameEl = document.createElement("div");
      nameEl.className = "item-name";
      nameEl.textContent = item.name;

      const quantityEl = document.createElement("div");
      quantityEl.className = "item-quantity";

      const btnDecrease = document.createElement("button");
      btnDecrease.className = "btn-qty";
      btnDecrease.setAttribute(
        "aria-label",
        `Decrease quantity of ${item.name}`
      );
      btnDecrease.textContent = "−";
      btnDecrease.onclick = () => updateQuantity(item.id, item.quantity - 1);

      const qtyValue = document.createElement("div");
      qtyValue.className = "qty-value";
      qtyValue.textContent = item.quantity;

      const btnIncrease = document.createElement("button");
      btnIncrease.className = "btn-qty";
      btnIncrease.setAttribute(
        "aria-label",
        `Increase quantity of ${item.name}`
      );
      btnIncrease.textContent = "+";
      btnIncrease.onclick = () => updateQuantity(item.id, item.quantity + 1);

      quantityEl.appendChild(btnDecrease);
      quantityEl.appendChild(qtyValue);
      quantityEl.appendChild(btnIncrease);

      infoEl.appendChild(nameEl);
      infoEl.appendChild(quantityEl);

      const priceEl = document.createElement("div");
      priceEl.className = "item-price";
      priceEl.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

      itemEl.appendChild(imageWrapper);
      itemEl.appendChild(infoEl);
      itemEl.appendChild(priceEl);

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.style.marginTop = "6px";
      removeBtn.style.background = "#ff4c4c";
      removeBtn.style.border = "none";
      removeBtn.style.borderRadius = "5px";
      removeBtn.style.color = "white";
      removeBtn.style.fontSize = "12px";
      removeBtn.style.padding = "4px 8px";
      removeBtn.style.cursor = "pointer";
      removeBtn.setAttribute("aria-label", `Remove ${item.name} from cart`);
      removeBtn.onclick = () => removeItem(item.id);
      infoEl.appendChild(removeBtn);

      cartItemsContainer.appendChild(itemEl);
    });

    updateTotals();
  }


  function updateQuantity(id, newQuantity) {
    if (newQuantity < 1) return; 

    const itemIndex = cart.findIndex((i) => i.id === id);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity = newQuantity;
    reRenderUI();
  }


  function removeItem(id) {
    cart = cart.filter((i) => i.id !== id);
    reRenderUI();
  }

  function updateTotals() {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    subtotalEl.textContent = `$${subtotal}`;

    const total = subtotal === 0 ? 0 : subtotal + SHIPPING_COST;
    totalEl.textContent = `$${total}`;

    shippingEl.textContent =
      subtotal === 0 ? "$0.00" : `$${SHIPPING_COST}`;

    checkoutBtn.disabled = subtotal === 0;
  }

  checkoutBtn.onclick = function () {
    alert("Checkout completed! Thank you for your order.");
    cart = [];
    reRenderUI();
  };

  reRenderUI();
})();
