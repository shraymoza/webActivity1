import { Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className="home-hero d-flex align-items-center text-white">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1 className="fw-bold">Welcome to ProdManage</h1>
                        <p>
                            Effortlessly manage your products with our all-in-one tool. Create, view, edit,
                            and delete products — fast, simple, and reliable.
                        </p>
                        <Button as={Link} to="/products" variant="light">Explore Products</Button>
                    </Col>
                    <Col md={6} className="text-center">
                        <img
                            src="https://img.icons8.com/ios-filled/200/task-completed.png"
                            alt="Checklist"
                            className="img-fluid"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
