
import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { BsTrash, BsPencil } from 'react-icons/bs'

function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts([
                {
                    id: 1,
                    name: 'Wireless Headphones',
                    description: 'Noise cancelling over-ear headphones',
                    price: 500,
                    image: 'https://ccimg.canadacomputers.com/Products/800x800/236/1450/221732/99633.jpg',
                },
                {
                    id: 2,
                    name: 'Smart Watch',
                    description: 'Smart wearable with health tracking',
                    price: 400,
                    image: 'https://cdn.mos.cms.futurecdn.net/qDiWC728ZbsZJuP34meocG.jpg',
                },
                {
                    id: 3,
                    name: 'Laptop',
                    description: '14-inch Full HD display, 256GB SSD',
                    price: 1600,
                    image: 'https://cdn.mos.cms.futurecdn.net/FUi2wwNdyFSwShZZ7LaqWf-1200-80.jpg',
                },
            ]
        )
    }, [])

    return (
        <Container fluid="lg" className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h2 className="fw-bold m-0">Products</h2>
                <Button variant="primary">Add Product</Button>
            </div>
            <Row>
                {products.map((product) => (
                    <Col xs={12} sm={6} md={4} key={product.id} className="mb-4">
                        <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-primary fw-bold">${product.price}</span>
                                    <div>
                                        <BsPencil className="me-2 text-success" role="button" />
                                        <BsTrash className="text-danger" role="button" />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Products

