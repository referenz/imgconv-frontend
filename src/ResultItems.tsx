import { fileFragment } from './types/fileFragment';
import { inputData } from "./types/inputData";
import readableFilesize from './readableFilesize';
import { Form, FormCheck } from 'react-bootstrap'
import { useState, useEffect } from 'react';

interface IResultItems {
    images: Map<string, fileFragment> | inputData
}

function Figure(props: { image: fileFragment | null }) {
    if (props.image) return <figure>
        <img src={props.image.source} alt={props.image.manifest.filename} />
        <figcaption>
            <a href={props.image.source} download={props.image.manifest.filename}>{props.image.manifest.filename}</a> <br />
            {props.image.manifest.quality && <>Qualität: {props.image.manifest.quality} | </>} 
            Größe: {readableFilesize(props.image.manifest.filesize)} kiB
        </figcaption>
    </figure>
    else return <></>
}

function ResultItems(props: IResultItems) {
    const [quality, setQuality] = useState<number>();

    useEffect(() => {
        if (props.images instanceof Map) {
            let range: number[] = [];
            Array.from(props.images).map(image => range.push(image[1].manifest.quality as number))
            setQuality(Math.min(...range));
        }
    },[props.images])

    const changeQuality = (q: number) => setQuality(q);

    if (props.images instanceof Map) {
        return <>
            <Form>
                <Form.Text className="pe-2">Qualitätsstufe auswählen: </Form.Text> 
                { Array.from(props.images).map(curr =>
                    <FormCheck inline type="radio" key={curr[0]} name="quality" id={curr[0]}
                        // eslint-disable-next-line eqeqeq
                        checked={quality == curr[1].manifest.quality }
                        label={curr[1].manifest.quality} value={curr[1].manifest.quality} 
                        onChange={e => changeQuality(parseInt((e.target as HTMLInputElement).value))} 
                    />
                )} 
            </Form>
            <Figure image={
                (props.images as Map<string, fileFragment>).get('jpeg-q' + quality)
                ?? (props.images as Map<string, fileFragment>).get('webp-q' + quality)
                ?? null
            }/>
        </>
    } else return <Figure image={(props.images as inputData)[1]} />
}

export default ResultItems;