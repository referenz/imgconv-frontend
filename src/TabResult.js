import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TabResultItems from './TabResultItems';


function TabResult(props) {
    const [jpegSources, setJpegSources] = useState(null);
    const [pngSource, setPngSource] = useState(null);
    const [webpSources, setWebpSources] = useState(null);
    const [sourcesResolved, setSourcesResolved] = useState(false);

    useEffect(() => {
        let manifest = [];
        async function resolve() {
            const jpegList = new Map();
            const webpList = new Map();
            for (const row of props.outputImages) {
                if (row[0] === 'manifest') { 
                    manifest= JSON.parse(row[1]);
                    continue;
                }
                if (row[0] === 'png') { 
                    setPngSource(['png', { source: await row[1].text(), manifest: manifest.png }]);
                    continue;
                }
                if (row[0].startsWith('jpeg-')) {
                    jpegList.set(row[0], { source: await row[1].text(), manifest: manifest.jpeg[row[0]] });
                    continue;
                }
                if (row[0].startsWith('webp-')) {
                    webpList.set(row[0], { source: await row[1].text(), manifest: manifest.webp[row[0]] });
                    continue;
                }
            }
            setJpegSources(jpegList);
            setWebpSources(webpList);
            setSourcesResolved(true);
        }

        resolve();
    }, [props.outputImages])

    return (
        <Tabs defaultActiveKey="home" className="sticky-top">
            <Tab eventKey="home" title="Original"><TabResultItems images={props.originalImage} /></Tab>
            <Tab eventKey="jpeg" title="JPEG">{ sourcesResolved && <TabResultItems images={jpegSources} /> }</Tab>
            <Tab eventKey="png" title="PNG">{ sourcesResolved && <TabResultItems images={pngSource} /> }</Tab>
            <Tab eventKey="webp" title="WebP">{ sourcesResolved && <TabResultItems images={webpSources} /> }</Tab>
        </Tabs>
    );
}

export default TabResult;