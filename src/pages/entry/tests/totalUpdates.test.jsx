import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

    // make sure total starts out $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })

    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');

    expect(scoopsSubtotal).toHaveTextContent('6.00')
})


test('update topping subtotal when toppings change', async () => {
    render(<Options optionType="toppings" />)
    
    // Assert on default toppings subtotal
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    //Find and tick one box and assert on updated subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');
    
    // tick anothercheckbox and assert on substotal
    const mAndMsCheckbox = await screen.findByRole('checkbox', { name: 'M&Ms' });
    userEvent.click(mAndMsCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('3.00');
    
    // click on of the boxes off and assert on subtotal
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

});

describe('grand total', () => {
    test('grand total starts at $0.00', async () => {
        render(<OrderEntry />)

        const grandTotalHeading = await screen.findByRole('heading', { name: /grand total: \$/i });
        expect(grandTotalHeading).toHaveTextContent('0.00');
    });

    test('grand total updates properly if scoop is added first', async () => {
        render(<OrderEntry />);

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        const grandTotalHeading = await screen.findByRole('heading', { name: /grand total: \$/i });

        expect(grandTotalHeading).toHaveTextContent('2.00')

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
        userEvent.click(cherriesCheckbox);

        expect(grandTotalHeading).toHaveTextContent('3.50');
    });
    test('grand total updates properly if topping is added first', async () => {
        render(<OrderEntry />);

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
        userEvent.click(cherriesCheckbox);
        
        const grandTotalHeading = await screen.findByRole('heading', { name: /grand total: \$/i });
        expect(grandTotalHeading).toHaveTextContent('1.50');

        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        expect(grandTotalHeading).toHaveTextContent('3.50')
    });
    test('grand total updates properly if item is removed', async () => {
        render(<OrderEntry />);

        const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.click(cherriesCheckbox);
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');
        
        const grandTotalHeading = await screen.findByRole('heading', { name: /grand total: \$/i });
        expect(grandTotalHeading).toHaveTextContent('3.50')
        
        userEvent.click(cherriesCheckbox);

        expect(grandTotalHeading).toHaveTextContent('2.00');
    });
})


