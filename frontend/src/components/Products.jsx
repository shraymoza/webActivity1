import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../redux/productActions';

import {
    Container,
    Row,
    Col,
    Card,
    Button,
} from 'react-bootstrap';

import SkeletonCard from './SkeletonCard';

const AddProduct = lazy(() => import('./AddProduct'));

function Products() {
    const dispatch           = useDispatch();
    const { items, loading } = useSelector((state) => state.products);

    const [show,    setShow]    = useState(false);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSubmit = (data) => {
        editing
            ? dispatch(updateProduct(editing.id, data))
            : dispatch(createProduct(data));
        setShow(false);
        setEditing(null);
    };

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-0">Products</h2>
                <Button onClick={() => setShow(true)}>Add Product</Button>
            </div>

            {/* Loading → skeletons */}
            {loading ? (
                <Row>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Col xs={12} sm={6} md={4} key={i} className="mb-4">
                            <SkeletonCard />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Row>
                    {items.map((p) => (
                        <Col xs={12} sm={6} md={4} key={p.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={p.image || 'https://via.placeholder.com/300x200'}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{p.title}</Card.Title>
                                    <Card.Text className="flex-grow-1">{p.description}</Card.Text>

                                    <div className="d-flex justify-content-between">
                                        <strong>${p.price}</strong>
                                        <div>
                                            <Button
                                                size="sm"
                                                className="me-2"
                                                onClick={() => {
                                                    setEditing(p);
                                                    setShow(true);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline-danger"
                                                onClick={() => dispatch(deleteProduct(p.id))}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Lazy-loaded modal */}
            <Suspense fallback={null}>
                <AddProduct
                    show={show}
                    handleClose={() => {
                        setShow(false);
                        setEditing(null);
                    }}
                    onSubmit={handleSubmit}
                    initial={
                        editing ?? { title: '', image: '', description: '', price: '' }
                    }
                />
            </Suspense>
        </Container>
    );
}

export default Products;
