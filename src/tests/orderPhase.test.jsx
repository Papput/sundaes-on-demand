import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('order phases for happy path', async () => {
    //render app
    render(<App />);
    // add ice cream scoops and toppings

    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' })

    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');

    const mAndMs = await screen.findByRole('checkbox', { name: 'M&Ms' });

    userEvent.click(mAndMs);
    // find and click order button

    const orderButton = await screen.findByRole('button', { name: /Order Sundae!/i });
    
    userEvent.click(orderButton);
    
    // check summary information based on order 
    const toppingsSummary = await screen.findByText('Toppings: $', { exact: false });
    expect(toppingsSummary).toHaveTextContent('1.50');
    
    const scoopsSummary = await screen.findByText('Scoops: $', { exact: false });
    expect(scoopsSummary).toHaveTextContent('4.00');

    const vanillaScoopList = await screen.findByText('vanilla', { exact: false });
    expect(vanillaScoopList).toHaveTextContent('2');
    
    const totalSummary = await screen.findByText(/Total: \$/i);
    expect(totalSummary).toHaveTextContent('5.50');
    
    // accept terms and conditions and click button to confirm order
    const termsAndConditionCheckbox = screen.getByRole('checkbox', { name: /I agree to Terms and Conditions/i});
    userEvent.click(termsAndConditionCheckbox);
    const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
    userEvent.click(confirmOrderButton);
    
    // see if page is showing loading spinner
    const loadingSpinner = screen.getByText('Loading...')
    expect(loadingSpinner).toBeInTheDocument();
    const orderNumber = await screen.findByRole('heading', { name: /your order number /i });

    
    // check that loading spinner has disapered
    const nullLoadingSpinner = screen.queryByText('Loading...')
    expect(nullLoadingSpinner).not.toBeInTheDocument();

    // confirm order number on confirmation page
    expect(orderNumber).toHaveTextContent(/[0-9]/i)

    
    // click "new order" button on confirmation page
    const newOrderButton = screen.getByRole('button', { name: /new order/i });
    userEvent.click(newOrderButton);

    // check that scoops and toppings subtotals have ben reset
    const toppingsSubtotal = await screen.findByText('Toppings total: $', { exact: false });
    const scoopsSubtotal = await screen.findByText('Scoops total: $', { exact: false });

    expect(toppingsSubtotal).toHaveTextContent('0.00');
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    await screen.findByRole('spinbutton', { name: 'Vanilla' })
    await screen.findByRole('checkbox', { name: 'M&Ms' })
});

test('No toppings on the page if no toppings are selected', async () => {
    render(<App />);
    // add ice cream scoops and toppings

    const vanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla' })
    
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '2');
    
    const chocolateScoop = await screen.findByRole('spinbutton', { name: 'Chocolate' })
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, '1');

    const orderButton = await screen.findByRole('button', { name: /Order Sundae!/i });
    userEvent.click(orderButton);
    // check summart information based on order 
    
    const scoopsSummary = screen.getByText('Scoops: $', { exact: false });
    expect(scoopsSummary).toHaveTextContent('6.00');
    const toppingsSummary = screen.queryByText('Toppings: $', { exact: false });
    expect(toppingsSummary).not.toBeInTheDocument();

})