import { formatCurrency } from "../scripts/utils/money.js";

if (formatCurrency(2000.4) === "20.00") {
  console.log("Test passed. The formatted price is as expected.");
} else {
  console.error("Test failed. The formatted price is not as expected.");
  
}
