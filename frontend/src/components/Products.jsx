import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { BsPencil, BsTrash } from 'react-icons/bs'

const products = [
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

function Products() {
    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Products</h2>
                <Button variant="primary">Add Product</Button>
            </div>
            <Row>
                {products.map(product => (
                    <Col key={product.id} md={4} className="mb-4">
                        <Card className="h-100">
                            <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-primary fw-bold">${product.price}</span>
                                    <div>
                                        <BsPencil className="me-3 text-success" role="button" />
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
