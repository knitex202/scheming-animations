import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  // Initialize cart with product IDs
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = React.useState(getDefaultCart());
  const [all_products, setAll_Products] = useState([]);
  const [all_promos, setAll_Promos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Products(data));
  }, []);

  useEffect(()=>{
    fetch("http://localhost:4000/allpromos")
    .then((response) => response.json())
    .then((data) => setAll_Promos(data));
  },[])

  const addToCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    console.log(cartItems);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  const removeAllCart = (id) => {
    setCartItems((prev) => ({ ...prev, [id]: prev[id] - prev[id] }));
  };

  const getTotalTaxAmount = () => {
    // tax rate is 11%
    const taxRate = 0.11;
    let totalTaxAmount = 0;
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    totalTaxAmount = (totalAmount * taxRate).toFixed(2); // Round to the nearest hundredth
    return parseFloat(totalTaxAmount); // Convert back to float
  };

  const getPromoDiscount = (promoCode) => {
   const promo = all_promos.find((promo)=>promo.code === promoCode);
    if (promo && promo.code === promoCode){
      const discount = parseFloat(promo.discount)
      const totalCartAmount = getTotalCartAmount();
      return (totalCartAmount *(discount / 100)).toFixed(2); // Round to nearest hundredth
    }else {
      return 0;
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return parseFloat(totalAmount.toFixed(2)); // Round to nearest hundredth
  };

  const getSubtotal = () => {
    const totalCartAmount = getTotalCartAmount();
    const totalTaxAmount = getTotalTaxAmount();
    const subtotal = totalCartAmount + totalTaxAmount;
    return parseFloat(subtotal.toFixed(2));
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    removeAllCart,
    getPromoDiscount,
    getTotalCartAmount,
    getTotalCartItems,
    getTotalTaxAmount,
    getSubtotal,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
