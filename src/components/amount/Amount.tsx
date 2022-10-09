import React from 'react'
import { useState } from 'react'
import './Amount.css'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ActionType } from '../../Redux/action-type'

export interface IProps {
    amount: number
}


function Amount(props: IProps) {
    let dispatch = useDispatch();

    const [amount, setAmount] = useState(0)
  
    useEffect(() => {
        if (props.amount) {
            setAmount(props.amount)
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