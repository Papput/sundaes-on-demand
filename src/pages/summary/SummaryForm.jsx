import React, { useState } from 'react'
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap'

const SummaryForm = ({setOrderPhase}) => {
    const [checkBoxChecked, setCheckBoxChecked] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                No ice cream will actually be delivered
            </Popover.Content>
        </Popover>
    );

    const checkboxLabel = (
        <span>
            I agree to 
                <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popover}>
                    <span style={{ color: "blue" }}> Terms and Conditions</span>
                </OverlayTrigger>
                
        </span>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderPhase('complete');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check 
                    type="checkbox"
                    checked={checkBoxChecked}
                    onChange={(e) => setCheckBoxChecked(e.currentTarget.checked)}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!checkBoxChecked}>
                Confirm order
            </Button>
        </Form>
    )
}

export default SummaryForm
