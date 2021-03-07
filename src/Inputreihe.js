import React from "react";
import { Button, Col, Form } from "react-bootstrap";

const defaultLabel = "Datei hochladen";

const handleSubmit = (props, event) => {
  event.preventDefault();
  if(!event.target[0].files[0]) return;
  props.setAppState(3);

  const reader = new FileReader();
  reader.readAsDataURL(event.target[0].files[0]);
  reader.addEventListener("load", () => {
      // Hier wird für das Originalbild der Array gebaut, den TabResultItem verarbeiten kann
      const output = [
        'original',
        {
          source: reader.result,
          manifest: {
            filename: event.target[0].files[0].name,
            filesize: event.target[0].files[0].size, 
          }
        }
      ];
      props.originalImage(output);
  });

  const formdata = new FormData()
  formdata.append("datei", event.target[0].files[0]);
  fetch('http://localhost:' + (process.env.REACT_APP_FETCH_PORT ?? '3001'), {
      method: 'POST',
      body: formdata
    })
    .then(res => res.formData())
    .then(d => {
      props.outputImages(d);
      d.has('error') ? props.setAppState(5) : props.setAppState(6);
    });
};

const handleReset = (props, event) => {
  props.originalImage("");
  props.outputImages("");
  props.setAppState(0);
  
  event.target[0].nextSibling.innerText = defaultLabel;
};

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
        <Col className="text-center">
          <Button type="submit">Abschicken</Button>
        </Col>
        <Col className="text-center">
          <Button type="reset">Datei entfernen</Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default Inputreihe;
