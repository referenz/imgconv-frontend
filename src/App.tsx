import { useRef, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ReiheTopNavigation from './ReiheTopNavigation';
import ReiheInput from './ReiheInput';
import { inputData } from "./types/inputData";
import ReiheInit from './ReiheInit';
import ReiheLoading from './ReiheLoading';
import { AppState } from './types/AppState';
import { outputData } from './types/outputData';
import ReiheError from './ReiheError';
import ReiheResult from './ReiheResult';
import Ueber from './Ueber';

function App() {
  const [appState, setAppState] = useState<AppState>("INIT");
  const originalImage = useRef<inputData | null>(null);
  const outputImages = useRef<outputData | null>(null);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ReiheTopNavigation />
      <Switch>
        <Route path="/about">
          <Ueber />
        </Route>
        <Route path="/">
          <ReiheInput originalImage={originalImage} appState={setAppState} outputImages={outputImages} />
          { appState === "INIT" && <ReiheInit /> }
          { appState === "LOADING" && <ReiheLoading /> }
          { appState === "ERROR" && <ReiheError error={outputImages} /> }
          { appState === "DONE" && <ReiheResult originalImage={originalImage} outputImages={outputImages} /> }
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
