import { useGlobalStateStore } from '../types/GlobalStateStore';
import { useRef } from 'react';
import { Container } from 'react-bootstrap';
import Result from './Result';
import UploadForm from './UploadForm';
import Loading from './Loading';
import Error from './Error';
import { InputData } from '../types/InputData';
import { OutputData } from '../types/OutputData';

function AppMain() {
  const zustand = useGlobalStateStore();

  const originalImage = useRef<InputData>(null);
  const outputImages = useRef<OutputData>(null);

  return (
    <Container fluid as='main'>
      {zustand.globalState === 'INIT' && <UploadForm originalImage={originalImage} outputImages={outputImages} />}
      {zustand.globalState === 'LOADING' && <Loading />}
      {zustand.globalState === 'DONE' && originalImage.current && outputImages.current && (
        <Result originalImage={originalImage.current} outputImages={outputImages.current} />
      )}
      {zustand.globalState === 'ERROR' && <Error output={outputImages} />}
    </Container>
  );
}

export default AppMain;
