import React from "react";
import { Container } from "react-bootstrap";
import { outputData } from './types/outputData';

interface IErrorProps {
    error: React.MutableRefObject<outputData | null>,
}

function ReiheError(props: IErrorProps) {
    return (
        <Container fluid className="textcontent">
            <h1>Fehler</h1>
            <p>{ props.error.current?.get('error') }</p>
        </Container>
    )
}

export default ReiheError;