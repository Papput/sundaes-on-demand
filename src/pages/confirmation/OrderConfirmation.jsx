import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useOrderDetails } from '../../contexts/OrderDetails'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({setOrderPhase}) => {
    const [orderDetails] = useOrderDetails();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [orderNumber, setOrderNumber] = useState(null);
    useEffect(() => {
        const sendOrder = async () => {
            setLoading(true)
            setError(false)
            try {
                const postRespons = await axios.post('http://localhost:3030/order')
                setOrderNumber(postRespons.data.orderNumber);
                setLoading(false);
            } catch (err) {
                setError(err);
            }
        }
        sendOrder();
    }, [])

    const handleClick = () => {
        orderDetails.resetOrderProvider();
        setOrderPhase('inProgress');
    }

    if(error) {
        return (
            <>
                <AlertBanner />
                {console.log(error)}
            </>
        )
    }

    if(loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }

    return (
        <>
            <h1>Thank you</h1>
            <h2>Your order number is {orderNumber}</h2>
            <p style={{ fontSize: '25%' }}>as per our terms and conditions, nothing will happen now</p>

            <Button onClick={handleClick}>Create new order</Button>
        </>
    )
}

export default OrderConfirmation
