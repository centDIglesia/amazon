import {
  cart,
  deleteProductfromCart,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOption.js";

const today = dayjs();

let cartSummaryHTML = "";

cart.forEach((CartItem) => {
  const productId = CartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliverOptionId = CartItem.deliveryOptionsId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliverOptionId) {
      deliveryOption = option;
    }
  });
 const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }" >
    <div class="delivery-date ">
    Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
    <img class="product-image"
        src="${matchingProduct.image}">

    <div class="cart-item-details">
        <div class="product-name">
       ${matchingProduct.name}
        </div>
        <div class="product-price">
        $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
        <span>
            Quantity: <span class="quantity-label">${CartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
            Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
          matchingProduct.id
        }">
            Delete
        </span>
        </div>
    </div>

    <div class="delivery-options ">

        <div class="delivery-options-title">
                 Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, CartItem)}
    </div>
    </div>
    </div>
`;
});


//function for delivery option list in checkout page
//
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

    html += `
    <div class="delivery-option  js-delivery-option" 
    data-product-id="${matchingProduct.id}"
     data-delivery-option-id="${deliveryOption.id}" >


            <input type="radio"
                 ${isChecked ? "checked" : ""}
                class="delivery-option-input"
                name="${matchingProduct.id}" 
                            
                >
            <div>
                <div class="delivery-option-date">
                ${dateString}
                </div>

                <div class="delivery-option-price">
              ${priceString} Shipping Fee
                </div>

            </div>
    </div>`;
  });

  return html;
}

// Update the order summary in the DOM
document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// Add event listeners to all ".js-delete-link" elements
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    // Get the product ID from the data attribute of the clicked link
    const productId = link.dataset.productId;

   
    deleteProductfromCart(productId);

    // Find the container element for the c
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    
    container.remove();
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
