import React from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertBanner = ({message, variant}) => {
    const alertMessage = message || "An unexpected error ocurred. Please try again later."
    const alertVeriant = variant || 'danger';

    return (
        <Alert variant={alertVeriant} style={{ backgroundColor: 'red' }}>
            {alertMessage}
        </Alert>
    )
}

export default AlertBanner
