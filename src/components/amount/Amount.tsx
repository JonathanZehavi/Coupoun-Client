import React from 'react'
import { useState } from 'react'
import './Amount.css'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { useEffect } from 'react'

export interface IProps {
    quantity: number
}


function Amount(props: IProps) {
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        if (props.quantity) {
            setAmount(props.quantity)
        }
    }, [])

    return (
        <div className='amount-wrap'>
            <input type="number" defaultValue={amount} key={amount} />
            <div className="btn-wrap">
                <button onClick={() => setAmount(amount + 1)}><FaAngleUp /></button>
                <button onClick={() => setAmount(() => amount === 0 ? 0 : amount - 1)}><FaAngleDown /></button>
            </div>
        </div>
    )
}

export default Amount