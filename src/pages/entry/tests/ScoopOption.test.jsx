import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('Box turns red', () => {

    render(<ScoopOption name="Vanilla" imagePath="/scoops" updateItemCount={jest.fn()} />)

    const VanillaScoop = screen.getByRole('spinbutton', { name: 'Vanilla'})

    expect(VanillaScoop).not.toHaveClass('is-invalid')
    
    // test that - negative number is invalid
    userEvent.clear(VanillaScoop)
    userEvent.type(VanillaScoop, '-5')
    expect(VanillaScoop).toHaveClass('is-invalid')
    
    // test that decimal number is invalid
    userEvent.clear(VanillaScoop)
    userEvent.type(VanillaScoop, '4.5')
    expect(VanillaScoop).toHaveClass('is-invalid')
    
    // test that more then 10 scoops are invalid
    userEvent.clear(VanillaScoop)
    userEvent.type(VanillaScoop, '11')
    expect(VanillaScoop).toHaveClass('is-invalid')
    
    // integer is valid 0 -> 10
    userEvent.clear(VanillaScoop)
    userEvent.type(VanillaScoop, '1')
    expect(VanillaScoop).not.toHaveClass('is-invalid')
});