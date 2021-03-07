import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';


function Ueberreihe() {
    const [connected, setConnected] = useState(false);
    useEffect(()=> {
        fetch('http://localhost:' + (process.env.REACT_APP_FETCH_PORT ?? '3001'))
        .then(res => { if (res.ok && res.status === 200) setConnected(true) }, err => console.log(err))
    },[])

    return <Container className="my-5">
        <h1 className="my-3">ImgConv</h1>
        <p>Verbindung zum Backend: { (connected === false) ? 
            <Button variant="warning">nicht hergestellt</Button> : <Button variant="success">hergestellt</Button> }</p>
        <hr />
        <p>Frontend-Code: noch nicht veröffentlicht</p>
        <p>Backend-Code: <a href="https://github.com/referenz/ImgConv-Backend">https://github.com/referenz/ImgConv-Backend</a></p>
    </Container>
}

export default Ueberreihe;