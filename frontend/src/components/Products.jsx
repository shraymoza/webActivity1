import { useEffect, useState } from 'react';
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
    Spinner,
} from 'react-bootstrap';
import AddProduct from './AddProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector(state => state.products);

    /* modal state */
    const [show, setShow] = useState(false);
    const [editing, setEditing] = useState(null);

    /* fetch on mount */
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    /* toast backend errors */
    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    /* add or update based on editing flag */
    const handleSubmit = values => {
        if (editing) {
            dispatch(updateProduct(editing.id, values));
        } else {
            dispatch(createProduct(values));
        }
    };

    return (
        <Container className="mt-5">
            <ToastContainer position="top-center" />

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Products</h2>
                <Button
                    onClick={() => {
                        setEditing(null);
                        setShow(true);
                    }}
                >
                    Add Product
                </Button>
            </div>

            {/* Modal form component */}
            <AddProduct
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleSubmit}
                initial={
                    editing ?? {
                        title: '',
                        image: '',
                        description: '',
                        price: '',
                    }
                }
            />

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row>
                    {items.map(p => (
                        <Col xs={12} sm={6} md={4} key={p.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={p.image}
                                    style={{ height: 200, objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{p.title}</Card.Title>
                                    <Card.Text className="flex-grow-1">
                                        {p.description}
                                    </Card.Text>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold">${p.price}</span>

                                        <div className="d-flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline-primary"
                                                onClick={() => {
                                                    setEditing(p);  // ← edit mode
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
        </Container>
    );
}

export default Products;
