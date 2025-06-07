import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, createProduct } from '../redux/productActions';
import { Spinner, Container, Row, Col, Card, Button } from 'react-bootstrap';
import AddProduct from './AddProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
    const dispatch  = useDispatch();
    const { items, loading, error } = useSelector(state => state.products);

    /* modal state */
    const [show, setShow] = useState(false);

    useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);
    useEffect(() => { if (error) toast.error(error); }, [error]);

    const handleAdd = values => dispatch(createProduct(values));

    return (
        <Container className="mt-5">
            <ToastContainer position="top-center" />
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Products</h2>
                <Button onClick={() => setShow(true)}>Add Product</Button>
            </div>

            <AddProduct
                show={show}
                handleClose={() => setShow(false)}
                onSubmit={handleAdd}
                initial={{ title:'', image:'', description:'', price:'' }}
            />

            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <Row>
                    {items.map(p => (
                        <Col xs={12} sm={6} md={4} key={p.id} className="mb-4">
                            <Card className="h-100">
                                <Card.Img variant="top" src={p.image} style={{ height:200, objectFit:'cover' }} />
                                <Card.Body>
                                    <Card.Title>{p.title}</Card.Title>
                                    <Card.Text>{p.description}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <span className="fw-bold">${p.price}</span>
                                        {/* update & delete buttons go here */}
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
