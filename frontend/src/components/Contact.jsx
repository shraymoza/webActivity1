import { Container, Card } from 'react-bootstrap'

function Contact() {
    return (
        <div className="bg-light py-5" style={{ minHeight: '90vh' }}>
            <Container className="d-flex justify-content-center align-items-center">
                <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-3">Contact Us</Card.Title>
                        <p><strong>Address:</strong> 1333 south park street, halifax</p>
                        <p><strong>Email:</strong> jane.doe@prodmanage.com</p>
                        <p><strong>Phone:</strong> 911</p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Contact
