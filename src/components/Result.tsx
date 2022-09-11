import { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Result.css';
import { InputData } from '../types/InputData';
import { OutputData } from '../types/OutputData';
import { Manifest, FileInfos } from '../types/FileFragment';
import Charts from './Charts';
import ImgFigure from './ImgFigure';

function Result(props: { originalImage: InputData; outputImages: OutputData }) {
  const manifest = useRef<Manifest>();
  const images = useRef<Map<string, { fileinfos?: FileInfos; source: string }>>();

  const [resolved, setResolved] = useState<boolean>(false);

  const [webps, setWebps] = useState<[string, { fileinfos?: FileInfos; source: string }][]>([]);
  const [jpegs, setJpegs] = useState<[string, { fileinfos?: FileInfos; source: string }][]>([]);

  useEffect(() => {
    async function resolve() {
      images.current = new Map();
      for (const [key, value] of props.outputImages as FormData) {
        if (key === 'manifest') {
          manifest.current = JSON.parse(value.toString());
          images.current.set('inputfile', {
            source: props.originalImage[1].source,
            fileinfos: props.originalImage[1].manifest,
          });
        } else if (key !== 'inputfile')
          images.current?.set(key, {
            source: await (value as File).text(),
            fileinfos: manifest.current?.[key] as FileInfos,
          });
      }
      setResolved(true);
    }
    resolve();
  }, []);

  useEffect(() => {
    images.current?.forEach((value, key) => {
      if (key.startsWith('webp-q')) setWebps(oldWebps => [...oldWebps, [key, value]]);
      if (key.startsWith('jpeg-q')) setJpegs(oldJpegs => [...oldJpegs, [key, value]]);
    });
  }, [resolved]);

  if (!resolved) return null;
  console.log(images);

  return (
    <Row>
      <Col xs={4} sm={3} md={2}>
        <ul id='bildernav'>
          <li>
            <a href='#inputfile'>Original</a>
          </li>
          <li>
            JPEG
            <ul className='secondhier'>
              {jpegs.map((jpeg, i) => {
                return (
                  <li key={i}>
                    <a href={'#' + jpeg[0]}>Qualität: {jpeg[1].fileinfos?.quality}</a>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            WebP
            <ul className='secondhier'>
              {webps.map((webp, i) => {
                return (
                  <li key={i}>
                    <a href={'#' + webp[0]}>Qualität: {webp[1].fileinfos?.quality}</a>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <a href='#png'>PNG</a>
          </li>
          <li>
            <a href='#webp-nearLossless'>WebP nearLossless</a>
          </li>
          <li>
            <a href='#chart'>Vergleichschart</a>
          </li>
        </ul>
      </Col>

      {/* Ende Sidenav, Anfang Hauptspalte */}

      <Col>
        <Row>
          <ImgFigure
            image={['inputfile', images.current?.get('inputfile') as { fileinfos?: FileInfos; source: string }]}
          />
        </Row>
        {jpegs.map((jpeg, i) => (
          <Row key={i}>
            <ImgFigure image={jpeg} />
          </Row>
        ))}
        {webps.map((webp, i) => (
          <Row key={i}>
            <ImgFigure image={webp} />
          </Row>
        ))}
        <Row>
          <ImgFigure image={['png', images.current?.get('inputfile') as { fileinfos?: FileInfos; source: string }]} />
        </Row>
        <Row>
          <ImgFigure
            image={[
              'webp-nearLossless',
              images.current?.get('webp-nearLossless') as { fileinfos?: FileInfos; source: string },
            ]}
          />
        </Row>
        <Row id='chart'>
          <Charts manifest={manifest.current as Manifest} />
        </Row>
      </Col>
    </Row>
  );
}

export default Result;
