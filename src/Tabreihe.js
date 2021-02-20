import React from 'react';
import { Tabs, Tab, Jumbotron } from 'react-bootstrap';
import Originaltab from './Originaltab';

function Tabreihe(props) {
    const loaded = props.isLoaded;

    if(loaded === true)
        return (
            <Tabs defaultActiveKey="home" className="sticky-top">
                <Tab eventKey="home" title="Original"><Originaltab image={props.image} /></Tab>
                <Tab eventKey="jpeg" title="JPEG" />
                <Tab eventKey="png" title="PNG" />
                <Tab eventKey="webp" title="WebP" />
            </Tabs>
        )
    else return (
        <Jumbotron className="text-center">
            <h1>ImgConv: Bilder online konvertieren</h1>
            <p>Bitte Bild auswählen und &quot;Abschicken&quot; betätigen.</p>
        </Jumbotron>
    );
}

export default Tabreihe;