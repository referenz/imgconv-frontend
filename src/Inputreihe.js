import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

const defaultLabel = "Datei hochladen";

const handleSubmit = (props, event) => {
    event.preventDefault();
    props.toggle(); // todo: Toggle durch gezieltes Anschalten ersetzen

    const reader = new FileReader();
    reader.readAsDataURL(event.target[0].files[0]);
    reader.addEventListener("load", () => props.setimage(reader.result));
}

const handleReset = (props, event) => {
    props.setimage('');
    event.target[0].nextSibling.innerText = defaultLabel;
    props.reset(false);
}

const handleChange = (event) => event.target.labels[0].innerText = event.target.files[0].name;

function Inputreihe(props) {
    return (
        <Form className="inputbar1 mb-4 mt-2 pb-2" onSubmit={(e) => handleSubmit(props, e)} onReset={(e) => handleReset(props, e)}>
            <Form.Row>
                <Form.Group as={Col} className="px-3">
                    <Form.File label={defaultLabel} custom data-browse="Auswählen" onChange={handleChange} className="my-2" id="fileinput" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Col className="text-center"><Button type="submit">Abschicken</Button></Col>
                <Col className="text-center"><Button type="reset">Datei entfernen</Button></Col>
            </Form.Row>
        </Form>
    )
}

export default Inputreihe;