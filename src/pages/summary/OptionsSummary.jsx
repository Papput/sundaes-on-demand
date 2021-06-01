import React from 'react';
import { useOrderDetails } from '../../contexts/OrderDetails';
import ListGroup from 'react-bootstrap/ListGroup';

const OptionsSummary = ({optionType}) => {
    const [orderDetails] = useOrderDetails();
    const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

    let orderEnries = []
    for (const [name, amount] of orderDetails[optionType]) {
        orderEnries.push(<ListGroup.Item key={name}>{amount} {name}</ListGroup.Item>)
    }
    
    
    return (
        <>
            <h2>{title}: {orderDetails.totals[optionType]}</h2>

            {orderEnries.length > 0 && (
                <ListGroup>
                    {orderEnries}
                </ListGroup>
            )}
        </>
    )
}

export default OptionsSummary
