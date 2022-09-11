import { SyntheticEvent, DragEvent } from 'react';
import { Form } from 'react-bootstrap';
import './UploadForm.css';
import { useGlobalStateStore } from '../types/GlobalStateStore';
import { InputData } from '../types/InputData';
import { OutputData } from '../types/OutputData';

function UploadForm(props: {
  originalImage: React.MutableRefObject<InputData | null>;
  outputImages: React.MutableRefObject<OutputData | null>;
}) {
  const zustand = useGlobalStateStore();

  function dragover(e: SyntheticEvent) {
    e.preventDefault();
    (e.target as HTMLLabelElement).classList.add('dragover');
  }

  function dragleave(e: SyntheticEvent) {
    (e.target as HTMLLabelElement).classList.remove('dragover');
  }

  function drop(e: DragEvent) {
    e.preventDefault();
    (e.target as HTMLLabelElement).innerText = e.dataTransfer.files[0].name;
    submitFile(e.dataTransfer.files[0]);
  }

  function fs_input(e: SyntheticEvent) {
    const parentElement = (e.target as HTMLInputElement).parentElement;
    if (parentElement) {
      parentElement.classList.add('dragover');
      parentElement.innerText = (e.target as HTMLInputElement).files?.[0].name ?? '';
    }

    submitFile((e.target as HTMLInputElement).files?.[0] as File);
  }

  async function submitFile(file: File) {
    zustand.setGlobalState('LOADING');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      const output: InputData = [
        'original',
        {
          source: reader.result as string,
          manifest: {
            filename: file.name,
            filesize: file.size,
          },
        },
      ];

      props.originalImage.current = output;

      const formdata = new FormData();
      formdata.append('datei', file);
      const fetchURL =
        process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://referenz.io/ImgConv/backend';

      fetch(fetchURL, {
        method: 'POST',
        body: formdata,
      })
        .then(res => res.formData())
        .then(d => {
          props.outputImages.current = d;
          d.has('error') ? zustand.setGlobalState('ERROR') : zustand.setGlobalState('DONE');
        })
        .catch(() => zustand.setGlobalState('ERROR'));
    });
  }

  return (
    <Form className='dropform'>
      <Form.Group controlId={'dropzone'}>
        <Form.Label
          className='dropzone'
          onDragOver={e => dragover(e)}
          onDragLeave={e => dragleave(e)}
          onDrop={e => drop(e)}
        >
          Grafikdatei auf dieses Feld ziehen oder hier klicken
          <Form.Control type='file' onChange={e => fs_input(e)} />
        </Form.Label>
      </Form.Group>
    </Form>
  );
}

export default UploadForm;
