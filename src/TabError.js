import React from 'react';
import { Jumbotron } from 'react-bootstrap';


function TabError(props) {
    return (
        <Jumbotron className="text-center">
            <h1>Fehler</h1>
            <p>{ props.error.current.get('error') }</p>
        </Jumbotron>
    );
}

export default TabError;