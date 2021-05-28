import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from '@testing-library/user-event';
// checkbox is unchecked by default
test('Checkbox & button initial state', () => {
    render(<SummaryForm />);
    const enableButtonCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
    const confirmOrdersButton = screen.getByRole('button', {name: "Confirm order"});
    
    expect(enableButtonCheckbox).not.toBeChecked();
    expect(confirmOrdersButton).toBeDisabled();
});

test('checkbox enables and disables button', () => {
    render(<SummaryForm />);
    const enableButtonCheckbox = screen.getByRole('checkbox', {name: "I agree to Terms and Conditions"});
    const confirmOrdersButton = screen.getByRole('button', {name: "Confirm order"});
    
    expect(confirmOrdersButton).toBeDisabled();
    
    // checkbox enables button
    userEvent.click(enableButtonCheckbox);
    
    expect(confirmOrdersButton).toBeEnabled();
    
    // unchecking checkbox disables button 
    userEvent.click(enableButtonCheckbox);
    
    expect(confirmOrdersButton).toBeDisabled();

});

test('popover responds to hover', async () => {
    render(<SummaryForm />);

    //popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);

    expect(nullPopover).not.toBeInTheDocument();
    // popover appers upon mouseover of checkbox label
    const termsAndCondition = screen.getByText(/terms and conditions/i)
    userEvent.hover(termsAndCondition);
    
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    
    // popover disappears when we mouse out
    userEvent.unhover(termsAndCondition);
    
    await waitForElementToBeRemoved(popover);
})