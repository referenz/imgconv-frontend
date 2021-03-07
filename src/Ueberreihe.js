import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';


function Ueberreihe() {
    const [connected, setConnected] = useState(false);
    useEffect(()=> {
        fetch('http://' + (process.env.REACT_APP_FETCH_HOSTNAME || 'localhost') + ':' + (process.env.REACT_APP_FETCH_PORT ?? '3001'))
        .then(res => { if (res.ok && res.status === 200) setConnected(true) }, err => console.log(err))
    },[])

    return <Container className="my-5">
        <h1 className="my-3">ImgConv</h1>
        <p>Verbindung zum Backend: { (connected === false) ? 
            <Button variant="warning">nicht hergestellt</Button> : <Button variant="success">hergestellt</Button> }</p>
        <p>Version: {process.env.REACT_APP_VERSION}</p>
        <hr />
        <p>Frontend-Code: <a href="https://github.com/referenz/ImgConv-Frontend">https://github.com/referenz/ImgConv-Frontend</a></p>
        <p>Backend-Code: <a href="https://github.com/referenz/ImgConv-Backend">https://github.com/referenz/ImgConv-Backend</a></p>
    </Container>
}

export default Ueberreihe;