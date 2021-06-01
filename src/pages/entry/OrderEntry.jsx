import React, { useEffect } from 'react';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails'
import { Button } from 'react-bootstrap';


const OrderEntry = ({setOrderPhase}) => {
    const [orderDetails] = useOrderDetails();
    return (
        <div>
            <h1>Design your Sundae!</h1>
            <Options optionType={'scoops'} />
            <Options optionType={'toppings'} />

            <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
            <Button variant="primary" size="lg" onClick={() => setOrderPhase('review')}>Order Sundae!</Button>
        </div>
    )
}

export default OrderEntry
