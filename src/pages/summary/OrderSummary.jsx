import React from 'react'
import OptionsSummary from './OptionsSummary'
import SummaryForm from './SummaryForm'
import { useOrderDetails } from '../../contexts/OrderDetails';


const OrderSummary = ({setOrderPhase}) => {
    const [orderDetails] = useOrderDetails();
    return (
        <>
            <h1>Order Summary</h1>
            <OptionsSummary optionType="scoops" />
            <OptionsSummary optionType="toppings" />
            <h2>Total: {orderDetails.totals.grandTotal}</h2>
            <SummaryForm setOrderPhase={setOrderPhase} />
        </>
    )
}

export default OrderSummary
