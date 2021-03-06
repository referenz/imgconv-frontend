//import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import Hauptnavigation from "./Hauptnavigation";
import Inputreihe from "./Inputreihe";
import TabInit from "./TabInit";
import TabError from "./TabError";
import TabLoading from "./TabLoading";
import TabResult from "./TabResult";
import { useState } from "react";

function App() {
  const [appState, setAppState] = useState(0); 
  /* appState: 0 = init, 3 = warten auf Fetch-Ergebnis, 5 = Fehler, 6 = konvertierte Bild angekommen */ 

  const [originalImage, set_originalImage] = useState("");
  const [outputImages, set_outputImages] = useState("");

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      <Row>
        <Col className="px-0">
          <Hauptnavigation className="navbar1" />
        </Col>
      </Row>
      <Row>
        <Col className="px-0">
          <Inputreihe 
            className="inputbar1" 
            setAppState={setAppState}  
            originalImage={set_originalImage} 
            outputImages={set_outputImages}
          />
        </Col>
      </Row>
      <Row className="flex-fill">
        <Col className="px-0">
          { appState === 0 && <TabInit /> }
          { appState === 3 && <TabLoading /> }
          { appState === 5 && <TabError error={outputImages} />} 
          { appState === 6 && <TabResult originalImage={originalImage} outputImages={outputImages} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
