import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import readableFilesize from './readableFilesize';
import { Container, Form, FormCheck } from 'react-bootstrap';

function TabChart({manifest}) {
    const myCanvas = useRef();
    const myChart = useRef(null);
    const [showOriginal, setShowOriginal] = useState(true);
    const [showPNG, setShowPNG] = useState(true);

    function handleChange(_e, item) {
        if (item === 'png') setShowPNG(!showPNG);
        if (item === 'original') setShowOriginal(!showOriginal);
    }
    
    useEffect(() => {
        function fillData(manifest) {
            let labels = [];
            let sizes = [];
            let bgcolor = [];
        
            // Inputfile
            if (showOriginal === true) {
                labels.push('Originaldatei');
                sizes.push(manifest.inputfile.filesize);
                bgcolor.push('rgba(136, 140, 160, 0.5)');
            }
            
            // JPEG
            for(const jpeg of Object.entries(manifest.jpeg)) {
                labels.push('JPEG, Q ' + jpeg[1].quality);
                sizes.push(jpeg[1].filesize);
                bgcolor.push('rgba(239, 145, 57, 0.5)');
            }
            
            // PNG 
            if (showPNG === true) {
                labels.push('PNG');
                sizes.push(manifest.png.filesize);
                bgcolor.push('rgba(60, 239, 57, 0.5)');
            }
        
            // WebP
            for(const webp of Object.entries(manifest.webp)) {
                labels.push('WebP, Q ' + webp[1].quality);
                sizes.push(webp[1].filesize);
                bgcolor.push('rgba(57, 87, 239, 0.5)');
            }
        
            sizes = sizes.map(curr => readableFilesize(curr));
            return [labels, sizes, bgcolor];
        }

        const [labels, data, bgcolor] = fillData(manifest);

        if (!myChart.current) {
            myChart.current = new Chart(myCanvas.current, {
                type: 'bar',
                data: {
                    // Original, JPEG, PNG, WebP
                    labels: labels,
                    datasets: [{
                        label: 'Größe in kiB',
                        data: data,
                        backgroundColor: bgcolor,
                    }],
                },
                options: {
                    legend: { display: false },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'kiB'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        } else {
            myChart.current.data = {
                labels: labels,
                datasets: [{
                    label: 'Größe in kiB',
                    data: data,
                    backgroundColor: bgcolor,
                }]
            };
            myChart.current.update();
        }
    }, [manifest, showOriginal, showPNG]);

    return <Container>
        <canvas ref={myCanvas} className="my-4"></canvas>
        <Form className="mb-1 text-center">
        <FormCheck type="checkbox" inline id="showOriginal" label="Original in Auswertung einbeziehen" className="px-4"
                onChange={e => handleChange(e, 'original')} checked={showOriginal} />
            <FormCheck type="checkbox" inline id="showPNG" label="PNG in Auswertung einbeziehen" className="px-4"
                onChange={e => handleChange(e, 'png')} checked={showPNG} />
        </Form>
    </Container>
}

export default TabChart;