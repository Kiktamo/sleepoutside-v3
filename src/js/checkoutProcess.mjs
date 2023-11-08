import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';
import { checkout } from './externalServices.mjs';
import { formDataToJSON } from './utils.mjs';

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity,
    };
  });
  return simplifiedItems;
}

const checkoutProcess = {
  key: '',
  outputSelector: '',
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  finish: function () {
    // empty cart
    setLocalStorage(this.key, []);
  },
  calculateItemSummary: function () {
    const summaryElement = document.querySelector(
      this.outputSelector + ' #cartTotal'
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + ' #num-items'
    );

    // Quantity
    let count = 0;

    this.list.forEach((item) => {
      count += item.quantity;
    });

    itemNumElement.innerText = count;

    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice * item.quantity);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = '$' + this.itemTotal;
  },
  calculateOrdertotal: function () {
    // Quantity
    let count = 0;

    this.list.forEach((item) => {
      count += item.quantity;
    });

    this.shipping = 10 + (count - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  },
  displayOrderTotals: function () {
    const shipping = document.querySelector(this.outputSelector + ' #shipping');
    const tax = document.querySelector(this.outputSelector + ' #tax');
    const orderTotal = document.querySelector(
      this.outputSelector + ' #orderTotal'
    );
    shipping.innerText = '$' + this.shipping;
    tax.innerText = '$' + this.tax;
    orderTotal.innerText = '$' + this.orderTotal;
  },
  checkout: async function (form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);

      window.location.href = `./success.html?order=${encodeURIComponent(
        res.orderId
      )}`;
      this.finish();
    } catch (err) {
      console.log(err);
      // err.message.forEach((element) => {
      //   alertMessage(element.toString());
      // });
      if (typeof err.message === 'object') {
        for (const key in err.message) {
          if (err.message.hasOwnProperty(key)) {
            const element = err.message[key];
            // Here, 'key' is the property name, and 'element' is the value.
            alertMessage(element);
          }
        }
      }
    }
  },
};

export default checkoutProcess;
