import React from 'react';
import { Jumbotron } from 'react-bootstrap';


function TabError(props) {
    console.log(props.error);
    return (
        <Jumbotron className="text-center">
            <h1>Fehler</h1>
            <p>{ props.error.get('error') }</p>
        </Jumbotron>
    );
}

export default TabError;