import { Container, Button } from "react-bootstrap";
import { useEffect } from 'react';
import { useState } from 'react';

function Ueber() {
    const [connected, setConnected] = useState<boolean>(false);
    useEffect(()=> {
        console.log(process.env.REACT_APP_BACKEND);
        fetch('https://' + (process.env.REACT_APP_BACKEND ?? 'referenz.io/ImgConv/backend'))
        .then(res => { if (res.ok && res.status === 200) setConnected(true) }, err => console.log(err))
    },[])

    return (
        <Container fluid className="textcontent">
            <h1>ImgConv: Bilder online konvertieren</h1>
            <p>Verbindung zum Backend: { (connected === false) ? 
            <Button variant="warning">nicht hergestellt</Button> : <Button variant="success">hergestellt</Button> }</p>
            <p>Version: {process.env.REACT_APP_VERSION}</p>
            <hr />
            <p>Frontend-Code: <a href="https://github.com/referenz/ImgConv-Frontend">https://github.com/referenz/ImgConv-Frontend</a></p>
            <p>Backend-Code: <a href="https://github.com/referenz/ImgConv-Backend">https://github.com/referenz/ImgConv-Backend</a></p>
        </Container>
    )

}

export default Ueber;