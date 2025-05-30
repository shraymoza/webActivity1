import { Card, Container } from 'react-bootstrap'

function Contact() {
    return (
        <div className="bg-light py-5" style={{ minHeight: '90vh' }}>
            <Container className="d-flex justify-content-center align-items-center h-100">
                <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-3">Contact Us</Card.Title>
                        <p><strong>Address:</strong> 123 React Street, UI City, CA 90210</p>
                        <p><strong>Email:</strong> hello@prodmanage.com</p>
                        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Contact
