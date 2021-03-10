import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TabChart from './TabChart';
import TabResultItems from './TabResultItems';


function TabResult(props) {
    const manifest = useRef(null);
    const jpegSources = useRef(null);
    const pngSource = useRef(null);
    const webpSources = useRef(null);
    const [sourcesResolved, setSourcesResolved] = useState(false);

    useEffect(() => {
        async function resolve() {
            jpegSources.current = new Map();
            webpSources.current = new Map();
            for (const row of props.outputImages.current) {
                if (row[0] === 'manifest') { 
                    manifest.current = JSON.parse(row[1]);
                    continue;
                }
                if (row[0] === 'png' && manifest.current.png) { 
                    pngSource.current = ['png', { source: await row[1].text(), manifest: manifest.current.png }];
                    continue;
                }
                if (row[0].startsWith('jpeg-') && manifest.current.jpeg) {
                    jpegSources.current.set(row[0], { source: await row[1].text(), manifest: manifest.current.jpeg[row[0]] });
                    continue;
                }
                if (row[0].startsWith('webp-') && manifest.current.webp) {
                    webpSources.current.set(row[0], { source: await row[1].text(), manifest: manifest.current.webp[row[0]] });
                    continue;
                }
            }
            setSourcesResolved(true);
        }

        resolve();
    }, [props.outputImages])

    return (
        <Tabs defaultActiveKey="chart" className="sticky-top">
            <Tab eventKey="chart" title="Auswertung">{ sourcesResolved && <TabChart manifest={manifest.current} /> }</Tab>
            <Tab eventKey="home" title="Original"><TabResultItems images={props.originalImage.current} /></Tab>
            <Tab eventKey="jpeg" title="JPEG">{ sourcesResolved && <TabResultItems images={jpegSources.current} /> }</Tab>
            <Tab eventKey="png" title="PNG">{ sourcesResolved && <TabResultItems images={pngSource.current} /> }</Tab>
            <Tab eventKey="webp" title="WebP">{ sourcesResolved && <TabResultItems images={webpSources.current} /> }</Tab>
        </Tabs>
    );
}

export default TabResult;