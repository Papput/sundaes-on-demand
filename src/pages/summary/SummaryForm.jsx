import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SummaryForm = () => {
    const [checkBoxChecked, setCheckBoxChecked] = useState(false);

    const checkboxLabel = (
        <span>
            I agree to <span style={{ color: "blue" }}> Terms and Conditions</span>
        </span>
    )
    return (
        <Form>
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
