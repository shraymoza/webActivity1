import { Modal, Button, Form } from 'react-bootstrap'

function AddProduct({ show, handleClose, handleAdd, newProduct, setNewProduct }) {
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewProduct(prev => ({ ...prev, [name]: value }))
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Banner</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter banner url"
                            name="image"
                            value={newProduct.image}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Enter description"
                            name="description"
                            rows={3}
                            value={newProduct.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleAdd}>Add Product</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddProduct
