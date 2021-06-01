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
            {orderDetails.toppings.size > 0 && <OptionsSummary optionType="toppings" />}
            <h2 className={'mt-2 mb-2'}>Total: {orderDetails.totals.grandTotal}</h2>
            <SummaryForm setOrderPhase={setOrderPhase} />
        </>
    )
}

export default OrderSummary
