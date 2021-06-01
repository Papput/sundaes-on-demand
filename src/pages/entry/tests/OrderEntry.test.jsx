import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings route', async () => {
    server.resetHandlers(
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    );

    render(<OrderEntry setOrderPhase={jest.fn()} />);

    await waitFor(async () => {
        const alerts = await screen.findAllByRole('alert')
        expect(alerts).toHaveLength(2);
    });

});

test('disable Order Button if no scoops are selected', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />)

    // scoop 0
    const scoopSubTotal = await screen.findByText('Scoops total: ', {exact: false})

    expect(scoopSubTotal).toHaveTextContent('0.00')
    
    // button disabled
    const orderButton = screen.getByRole('button', { name: /order sundae/i} )
    
    expect(orderButton).toBeDisabled();
    
    // scoop 1
    const VanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla'})
    userEvent.clear(VanillaScoop);
    userEvent.type(VanillaScoop, '1')
    expect(scoopSubTotal).toHaveTextContent('2.00')
    
    // button enabled
    expect(orderButton).toBeEnabled();
    
    // scoop 0
    userEvent.clear(VanillaScoop);
    userEvent.type(VanillaScoop, '0')
    expect(scoopSubTotal).toHaveTextContent('0.00')
    
    // button disabled
    expect(orderButton).toBeDisabled();
});

test('Scoops total does not update on invalid value', async () => {

    render(<OrderEntry setOrderPhase={jest.fn()} />)

    // check initial states
    const VanillaScoop = await screen.findByRole('spinbutton', { name: 'Vanilla'})
    expect(VanillaScoop).not.toHaveClass('is-invalid')

    
    const scoopSubTotal = await screen.findByText('Scoops total: ', {exact: false})
    expect(scoopSubTotal).toHaveTextContent('$0.00');
    
    
    // test that - negative number is invalid
    userEvent.clear(VanillaScoop)
    userEvent.type(VanillaScoop, '-5')
    expect(VanillaScoop).toHaveClass('is-invalid')
    
    // scoop subtotal should not increase
    expect(scoopSubTotal).toHaveTextContent('$0.00');
})