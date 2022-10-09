import React from 'react'
import { Button, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ICoupon } from '../../Model/ICoupon';
import { AppState } from '../../Redux/app-state';
import { useCart } from '../Context/Cart-Container';

type CartItemProp = {
    id: number;
    amount: number;
}


function CartItem({ id, amount }: CartItemProp) {
    const { removeFromCart }: any = useCart()

    const coupons = useSelector((state: AppState) => state.coupons)

    const item: ICoupon = coupons.find(item => item.id === id)
    if (item == null) return null;


    return (
        <Stack direction="horizontal" gap={2}>
            <img src={item.image} style={{
                width: "125px",
                height: "125px",
                objectFit: "cover"
            }} />

            <div className="me-auto">
                <div>
                    {item.title}{" "}
                    {amount > 1 && (
                        <span className='text-muted' style={{ fontSize: ".85rem" }}>x{amount}</span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    ${item.price}
                </div>
                <div>
                    ${item.price * amount}
                </div>
                <Button variant="outline-danger" size='sm' onClick={() => removeFromCart(item.id)}>&times;</Button>
                
            </div>
        </Stack>
    )
}

export default CartItem