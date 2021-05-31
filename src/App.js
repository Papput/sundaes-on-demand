import Container from 'react-bootstrap/Container';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry'

function App() {
    return (
        <Container>
            <OrderDetailsProvider>
                {/* summary page needs provider */}
                <OrderEntry />
            </OrderDetailsProvider>

            {/* confirmation page does not need provider */}
        </Container>
    );
}

export default App;
