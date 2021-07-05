import React, { SyntheticEvent, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { inputData } from "./types/inputData";
import { AppState } from './types/AppState';
import { outputData } from './types/outputData';

interface IInputProps {
    originalImage: React.MutableRefObject<inputData | null>,
    appState: React.Dispatch<React.SetStateAction<AppState>>,
    outputImages: React.MutableRefObject<outputData | null>,
}

function ReiheInput(props: IInputProps) {
    const submitButton = useRef<HTMLButtonElement>(null);

    const selectFile = () => {
        if (submitButton.current) submitButton.current.disabled = false;
    };

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        props.appState("LOADING");

        const file = (event.target as HTMLFormElement).inputfile.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => {
            const output: inputData = [
                'original', 
                {
                    source: reader.result as string,
                    manifest: {
                        filename: file.name,
                        filesize: file.size,
                    }
                }
            ];
            props.originalImage.current = output; 
            
            const formdata = new FormData()
            formdata.append("datei", file);
            fetch('https://' + (process.env.REACT_APP_BACKEND ?? 'referenz.io/ImgConv/backend'), {
                method: 'POST',
                body: formdata
              })
              .then(res => res.formData())
              .then(d => {
                props.outputImages.current = d;
                d.has('error') ? props.appState('ERROR') : props.appState('DONE');
              });
        });
    };

    const handleReset = () => {
        if (submitButton.current) submitButton.current.disabled = true;
        props.originalImage.current = null;
        props.appState("INIT");        
    };

    return (
        <Form onSubmit={e => handleSubmit(e)} onReset={handleReset} id="submitform">
            <Form.Group controlId="inputfile">
                <Form.Label>Datei hochladen:</Form.Label>
                <Form.Control type="file" onChange={selectFile} />
            </Form.Group>
            <Form.Group id="buttongroup">
                <Button ref={submitButton} disabled={true} type="submit">Abschicken</Button>
                <Button type="reset">Datei entfernen</Button>
            </Form.Group>
        </Form>
    )
}

export default ReiheInput;