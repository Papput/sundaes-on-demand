import React, { useState } from 'react'
import { Form, Button, Popover, OverlayTrigger } from 'react-bootstrap'


// const popover = (
//     <Popover id="popover-basic">
//       <Popover.Header as="h3">Popover right</Popover.Header>
//       <Popover.Body>
//         And here's some <strong>amazing</strong> content. It's very engaging.
//         right?
//       </Popover.Body>
//     </Popover>
//   );
  
//   const Example = () => (
//     <OverlayTrigger trigger="click" placement="right" overlay={popover}>
//       <Button variant="success">Click me to see</Button>
//     </OverlayTrigger>
//   );
const SummaryForm = () => {
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
