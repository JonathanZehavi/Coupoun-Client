import React, { ReactNode, useContext, useState } from 'react'

import Cart from '../Cart/Cart'
import Header from '../Header/Header'
import { useLocalStorage } from '../Hooks/useLocalStorage'

type CartContext = {
    getAmountOfItems: (id: number) => number
    increaseCartAmount: (id: number) => void
    decreaseCartAmount: (id: number) => void
    removeFromCart: (id: number) => void

}

export const CartContext = React.createContext({});

export function useCart() {
    return useContext(CartContext)
}

type CartProviderProps = {
    children: ReactNode
}

export type CartItem = {
    id: number;
    amount: number;
}

export function CartProvider({ children }: CartProviderProps) {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    console.log(isLoggedIn);
    

    

    const cartAmount = cartItems.reduce((amount, item) => item.amount + amount, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    const logIn = () => setIsLoggedIn(true)
    const logOut = () => setIsLoggedIn(false)

    function getAmountOfItems(id: number) {
        return cartItems.find(item => item.id === id)?.amount || 0;
    }
    function increaseCartAmount(id: number) {
        setCartItems(currentItem => {
            if (currentItem.find(item => item.id === id) == null) {
                return [...currentItem, { id, amount: 1 }]
            } else {
                return currentItem.map(item => {
                    if (item.id === id) {
                        return { ...item, amount: item.amount + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseCartAmount(id: number) {
        setCartItems(currentItem => {
            if (currentItem.find(item => item.id === id)?.amount === 1) {
                return currentItem.filter(item => item.id !== id)
            } else {
                return currentItem.map(item => {
                    if (item.id === id) {
                        return { ...item, amount: item.amount - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number) {
        setCartItems(currentItem => {
            return currentItem.filter(item => item.id !== id)
        })
    }

    return (
        <CartContext.Provider
            value={{
                getAmountOfItems,
                increaseCartAmount,
                decreaseCartAmount,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartAmount,
                logIn,
                logOut
            }}>
            {children}
            <Cart isOpen={isOpen} />
        </CartContext.Provider>
    )
}

