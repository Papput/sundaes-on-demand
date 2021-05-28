import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

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
    fireEvent.click(enableButtonCheckbox);
    
    expect(confirmOrdersButton).toBeEnabled();
    
    // unchecking checkbox disables button 
    fireEvent.click(enableButtonCheckbox);
    
    expect(confirmOrdersButton).toBeDisabled();

})