

import { CartItems } from "../redux/slices/cart/types"
import { calcTotalPrice } from "./calcTotalPrice"

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data)  : []
    const totalPrice = calcTotalPrice(items)


    return {
        items: items as CartItems[],
        totalPrice
    }
}