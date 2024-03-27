 import React, { createContext } from "react";
import { all_products } from "../data";



export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {};
    // Initialize cart with product IDs
    all_products.forEach(product => {
        cart[product.id] = 0;
    });
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = React.useState(getDefaultCart());
    
    
    const addToCart = (id) => {
        setCartItems((prev)=>({...prev, [id]: prev[id] + 1}))
        console.log(cartItems);
    }

    const removeFromCart = (id) => {
        setCartItems((prev)=>({...prev, [id]: prev[id] - 1}))
    }

    const removeAllCart = (id) => {
        setCartItems((prev)=>({...prev, [id]: prev[id] - prev[id]}))
    }

    const getTotalTaxAmount = () => {
        // tax rate is 11%
        const taxRate = 0.11;
        let totalTaxAmount = 0;
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        totalTaxAmount = totalAmount * taxRate;
        return totalTaxAmount;
    }
    
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = all_products.find((product) => product.id === Number(item));
            totalAmount += itemInfo.new_price * cartItems[item];
          }
        }
        return totalAmount;
      };

      const getSubtotal = () => {
        const totalCartAmount = getTotalCartAmount();
        const totalTaxAmount = getTotalTaxAmount();
        return totalCartAmount + totalTaxAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            totalItems+= cartItems[item];
          }
        }
        return totalItems;
      };

    const contextValue = {all_products,cartItems,addToCart,removeFromCart,removeAllCart, getTotalCartAmount, getTotalCartItems, getTotalTaxAmount, getSubtotal};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;