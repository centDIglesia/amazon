export let cart;
loadFormStorage();
export function loadFormStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionsId: "3",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3,
        deliveryOptionsId: "1",
      },
    ];
  }
}

function savetoStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

//add to cart function
export function addToCart(productId) {
  let matchingItem;

  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: "3",
    });
  }

  savetoStorage();
}

export function deleteProductfromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  savetoStorage();
}

export function updateDeliveryOption(productId, deliverOptionId) {
  let matchingItem;

  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });
  matchingItem.deliveryOptionsId = deliverOptionId;
  savetoStorage();
}
