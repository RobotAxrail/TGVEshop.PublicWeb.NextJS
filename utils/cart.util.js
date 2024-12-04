/**
 * Add item into the cart passed the method
 * @param {Object} selected
 * @param {Object} cart
 * @param {Integer} quantity
 * @param {Integer} variant
 * @returns the result cart
 */
export function addItem(selected, cart, quantity = 1, variant = 0) {
  cart = cart ? cart : [];
  const selectedIndex = cart.findIndex((item) => item.id === selected?.id);
  if (selectedIndex > -1) {
    cart[selectedIndex].quantity += quantity;
  } else {
    cart.push({
      ...selected,
      discountedPrice: selected.deliveryPrice,
      price: selected.deliveryPrice,
      quantity,
    });
  }

  return cart;
}

export function removeItem(selected, cart, all = false) {
  const selectedIndex = cart.findIndex((item) => item.id === selected.id);
  if (selectedIndex > -1) {
    if (cart[selectedIndex].quantity > 1 && !all) {
      cart[selectedIndex].quantity -= 1;
      if (cart[selectedIndex].quantity <= cart[selectedIndex].maxQuantity) {
        cart[selectedIndex].errorMessage = null;
      }
    } else {
      cart.splice(selectedIndex, 1);
    }
  }

  return cart;
}

export function getItemQuantity(selected, cart) {
  const selectedIndex = cart.findIndex((item) => item.id === selected?.id);
  if (selectedIndex > -1) {
    return cart[selectedIndex].quantity;
  }
  return 0;
}

export function calculateItems(cart) {
  return cart?.reduce((acc, item) => (acc += item.quantity), 0);
}

export function calculateCart(cart, selected) {
  let calculatedTotal = 0;
  cart.forEach((item) => {
    let price =
      item.subtotalWithTax !== 0 ? item.subtotalWithTax : item.subtotal;
    calculatedTotal += price;
  });
  return calculatedTotal;
}
