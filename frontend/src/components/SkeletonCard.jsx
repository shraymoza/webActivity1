import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card } from 'react-bootstrap';

export default function SkeletonCard() {
    return (
        <Card className="h-100 shadow-sm">
            <Skeleton height={200} />
            <Card.Body>
                <Skeleton height={24} width="60%" className="mb-2" />
                <Skeleton count={3} />
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Skeleton width={60} height={24} />
                    <Skeleton width={80} height={32} />
                </div>
            </Card.Body>
        </Card>
    );
}
