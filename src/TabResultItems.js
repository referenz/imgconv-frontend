import React from 'react';
import { Carousel } from 'react-bootstrap';
import readableFilesize from './readableFilesize';

function Figure(props) {
    return <img src={props.image[1].source} className="mw-100" alt={props.image[1].manifest.filename} />
      
}

function TabResultItems(props) {
    // PNGs und das Originalbild kommen als Array an, WebP und JPEG kommen als Map an
    if (props.images instanceof Map ) {
        let images = Array.from(props.images);
        return <Carousel>
            { images.map(image =>
                <Carousel.Item key={image[0]}>
                    <Figure image={image} />
                    <Carousel.Caption>
                        <a href={image[1].source} download={image[1].manifest.filename}>{image[1].manifest.filename}</a><br />
                        Qualität: {image[1].manifest.quality} | Größe: {readableFilesize(image[1].manifest.filesize) } kiB
                    </Carousel.Caption>
                </Carousel.Item>    
            )}
        </Carousel>
    } else return <Carousel controls={false} indicators={false}>
        <Carousel.Item>
            <Figure image={props.images} />
            <Carousel.Caption>
                <a href={props.images[1].source} download={props.images[1].manifest.filename}> {props.images[1].manifest.filename}</a> <br />
                Größe: {readableFilesize(props.images[1].manifest.filesize)} kiB
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
}


export default TabResultItems;