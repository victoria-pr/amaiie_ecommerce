<<<<<<< HEAD
import { createContext, useReducer } from 'react';
=======
import { createContext, useReducer } from "react";
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995

export const Store = createContext();

const initialState = {
<<<<<<< HEAD
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    cart: {
        shippingAddress: localStorage.getItem("shippingAddress")
        ? JSON.parse(localStorage.getItem("shippingAddress"))
        : {},
        paymentMethod: localStorage.getItem("paymentMethod")
        ? localStorage.getItem("paymentMethod")
        : "",
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    },
=======
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
};
function reducer(state,action) {
    switch (action.type) { 
        case 'CART_ADD_ITEM':
            // add item to cart
            const newItem = action.payload; 
            const existItem = state.cart.cartItems.find( 
                (item) => item._id === newItem._id 
            ); 
            const cartItems = existItem 
                ? state.cart.cartItems.map((item) => 
                    item._id === existItem._id ? newItem : item 
                )
                : [...state.cart.cartItems, newItem]; 
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                return { ...state, cart: { ...state.cart, cartItems } }; 

<<<<<<< HEAD
        case 'CART_REMOVE_ITEM': {
            // remove item from cart
            const cartItems = state.cart.cartItems.filter(
                (item) => item._id !== action.payload._id
            );
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }
        case "CART_CLEAR":
          return { ...state, cart: { ...state.cart, cartItems: [] } }
        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload };
        case 'USER_SIGNOUT':
            return { ...state, userInfo: null ,
            cart: {
                cartItems: [],
                shippingAddress: {},
                paymentMethod: "",
              },
            };
        case "SAVE_SHIPPING_ADDRESS":
            return {...state,
                  cart: { ...state.cart, shippingAddress: action.payload },
                };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
      
        default:
            return state;
        }
    }
 
=======
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // add item to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };

    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    default:
      return state;
  }
}

>>>>>>> 31851ef7e9a9f5a12d5c73757792042e0ddd3995
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}