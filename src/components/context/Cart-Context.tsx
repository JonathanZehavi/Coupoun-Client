import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import Cart from '../Cart/Cart'
import { useLocalStorage } from '../Hooks/useLocalStorage'


type CartProviderProps = {
    children: ReactNode
}

export type CartItems = {
    id: number;
    amount: number;
}

type CartContext = {
    getAmountOfItems: (id: number) => number
    increaseCartAmount: (id: number) => void
    decreaseCartAmount: (id: number) => void
    removeFromCart: (id: number) => void
    cartItems: CartItems[]
    cartAmount: number
    setCartItems: Dispatch<SetStateAction<CartItems[]>>
    openCart: () => void
    closeCart: () => void
    logIn: () => void
    logOut: () => void
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>

}

export function useCart() {
    return useContext(CartContext)
}


export const CartContext = React.createContext({} as CartContext);


export function CartProvider({ children }: CartProviderProps) {

    const [cartItems, setCartItems] = useLocalStorage<CartItems[]>("shopping-cart", [])

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const chesckIsLoggedIn = () => {
        if (localStorage.getItem("isLoggedIn")) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

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

    useEffect(() => {
        chesckIsLoggedIn()
    }, [])
    

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
                setCartItems,
                cartAmount,
                logIn,
                logOut,
                isLoggedIn,
                setIsLoggedIn
            }}>
            {children}
            <Cart isOpen={isOpen} />
        </CartContext.Provider>
    )
}

