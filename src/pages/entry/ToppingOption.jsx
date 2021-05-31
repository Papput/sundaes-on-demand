import React from 'react';
import { Col, Form, Row } from 'react-bootstrap'


const ToppingOption = ({name, imagePath, updateItemCount}) => {

    const handleChange = (event) => {
        const itemCount = event.currentTarget.checked ? 1 : 0;
        updateItemCount(name, itemCount)
    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center'}}>
            <img style={{ width: '75%' }} src={`http://localhost:3030${imagePath}`} alt={`${name} topping`} />

            <Form.Group controlId={`${name}-toppings-checkbox`}>
                <Form.Check 
                    role="checkbox"
                    type="checkbox"
                    label={name}
                    onChange={handleChange}
                />
            </Form.Group>
        </Col>
    )
}

export default ToppingOption
