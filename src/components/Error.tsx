import { Button } from 'react-bootstrap';
import { useGlobalStateStore } from '../types/GlobalStateStore';
import { OutputData } from '../types/OutputData';

function Error(props: { output: React.MutableRefObject<OutputData | null> }) {
  const zustand = useGlobalStateStore();

  const error = props.output.current?.get('error') as string;
  return (
    <>
      <h2>Fehler</h2>
      <p>{error}</p>
      <p>
        <Button type='button' onClick={zustand.init}>
          Reset
        </Button>
      </p>
    </>
  );
}

export default Error;
