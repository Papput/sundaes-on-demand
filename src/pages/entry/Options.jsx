import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import { Row } from 'react-bootstrap';

const Options = ({optionType}) => {
    // optionType is 'scoops' or 'toppings'
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then((response) => setItems(response.data))
        .catch((error) => {
            // handle error
        });
    }, [optionType]);
    
    // replace null with ToppingOption
    const ItemComponent = optionType === 'scoops' ? ScoopOption : null;

    const optionItems = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />)

    return (
        <Row>
            {optionItems}
        </Row>
    )
}

export default Options
