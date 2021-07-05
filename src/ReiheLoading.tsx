import { Container, Spinner } from "react-bootstrap";

function ReiheLoading() {
    return (
        <Container fluid className="textcontent">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Lädt ...</span>
            </Spinner>
        </Container>
    )
}

export default ReiheLoading;