import { Figure } from 'react-bootstrap';
import './ImgFigure.css';
import readableFilesize from '../readableFilesize';
import { FileInfos } from '../types/FileFragment';

function ImgFigure(props: { image: [handler: string, fileinfos: { fileinfos?: FileInfos; source: string }] }) {
  return (
    <Figure>
      <Figure.Image fluid id={props.image[0]} src={props.image[1].source} alt={props.image[1].fileinfos?.filename} />
      <Figure.Caption>
        <a href={props.image[1].source} download={props.image[1].fileinfos?.filename}>
          {props.image[1].fileinfos?.filename}
        </a>
        <br />
        {props.image[1].fileinfos?.quality && <>Qualität: {props.image[1].fileinfos.quality} | </>}
        Größe: {readableFilesize(props.image[1].fileinfos?.filesize as number)} kiB
      </Figure.Caption>
    </Figure>
  );
}

export default ImgFigure;
