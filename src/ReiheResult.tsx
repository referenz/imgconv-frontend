import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Charts from './Charts';
import ResultItems from './ResultItems';
import { inputData } from "./types/inputData";
import { outputData } from './types/outputData';
import { fileFragment } from './types/fileFragment';

interface IOutputProps {
    originalImage: React.MutableRefObject<inputData | null>,
    outputImages: React.MutableRefObject<outputData | null>,
}

function ReiheResult(props: IOutputProps) {
    const manifest = useRef<any | null>(null); // todo: Typ spezifizieren
    const pngSource = useRef<inputData | null>(null);
    const jpegSources = useRef<Map<string, fileFragment> | null>(null);
    const webpSources = useRef<Map<string, fileFragment> | null>(null);
    const [resolved, setResolved] = useState<boolean>(false);

    useEffect(() => {
        jpegSources.current = new Map();
        webpSources.current = new Map();

        async function resolve() {
            for (const [key, value] of props.outputImages.current as FormData) {
                if (key === 'manifest')
                    manifest.current = JSON.parse(value as string);
                else if (key === 'png' && manifest.current?.png) 
                    pngSource.current = ['png', { source: await (value as File).text(), manifest: manifest.current.png}];
                else if (key.startsWith('jpeg') && manifest.current?.jpegs)
                    jpegSources.current?.set(key, { source: await (value as File).text(), manifest: manifest.current.jpegs[key]});
                else if (key.startsWith('webp') && manifest.current?.webps)
                    webpSources.current?.set(key, { source: await (value as File).text(), manifest: manifest.current.webps[key]})
            }
            setResolved(true)
        }

        resolve();
    }, [props.outputImages])

    return <Tabs defaultActiveKey="chart">
        <Tab eventKey="chart" title="Auswertung">{resolved && manifest.current && <Charts manifest={manifest.current} />}</Tab>
        <Tab eventKey="home" title="Original">{props.originalImage.current && <ResultItems images={props.originalImage.current} />}</Tab>
        <Tab eventKey="jpeg" title="JPEG">{resolved && jpegSources.current && <ResultItems images={jpegSources.current} />}</Tab>
        <Tab eventKey="png" title="PNG">{resolved && pngSource.current && <ResultItems images={pngSource.current} />}</Tab>
        <Tab eventKey="webp" title="WebP">{resolved && webpSources.current && <ResultItems images={webpSources.current} />}</Tab>
    </Tabs>
}

export default ReiheResult;