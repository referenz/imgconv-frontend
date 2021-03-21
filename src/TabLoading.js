import React from 'react';
import { Jumbotron, Spinner } from 'react-bootstrap';


function TabLoading() {
    return <Jumbotron className="text-center">
            <Spinner animation="border" role="status"><span className="sr-only">Lädt...</span></Spinner>
        </Jumbotron>
}

export default TabLoading;