// generic fallback for Suspense + form submits
import { Spinner } from 'react-bootstrap';

export default function Loader({ full }) {
    return (
        <div
            className={`d-flex justify-content-center align-items-center ${
                full ? 'vh-100' : ''
            }`}
        >
            <Spinner animation="border" />
        </div>
    );
}
