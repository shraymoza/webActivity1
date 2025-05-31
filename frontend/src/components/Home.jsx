import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home-hero text-white d-flex align-items-center">
            <Container fluid="lg">
                <Row className="align-items-center">
                    <Col xs={12} md={6}>
                        <h1 className="fw-bold">Welcome to Shray's Product Manager</h1>
                        <p>
                            Effortlessly manage your products with our all-in-one tool. Create, view, edit,
                            and delete products — fast, simple, and reliable.
                        </p>
                        <Button as={Link} to="/products" variant="light">Explore Products</Button>
                    </Col>
                    <Col xs={12} md={6} className="text-center">
                        <img
                            src="https://img.icons8.com/ios-filled/200/task-completed.png"
                            alt="Checklist"
                            className="img-fluid"
                            style={{ maxWidth: '250px' }}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
