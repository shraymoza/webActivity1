import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, Form as FForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
    title:       Yup.string().required('required'),
    image:       Yup.string().url('invalid URL').required('required'),
    description: Yup.string().required('required'),
    price:       Yup.number().positive().required('required'),
});

function AddProduct({ show, handleClose, onSubmit, initial }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton><Modal.Title>Add / Edit Product</Modal.Title></Modal.Header>

            <Formik
                initialValues={initial}
                validationSchema={schema}
                onSubmit={values => { onSubmit(values); handleClose(); }}
            >
                {({ isSubmitting }) => (
                    <FForm>
                        <Modal.Body>
                            {['title', 'image', 'description', 'price'].map(name => (
                                <Form.Group className="mb-3" key={name}>
                                    <Form.Label className="text-capitalize">{name}</Form.Label>
                                    <Field
                                        as={name === 'description' ? 'textarea' : 'input'}
                                        className="form-control"
                                        name={name}
                                        rows={name === 'description' ? 3 : undefined}
                                    />
                                    <div className="text-danger small">
                                        <ErrorMessage name={name} />
                                    </div>
                                </Form.Group>
                            ))}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </FForm>
                )}
            </Formik>
        </Modal>
    );
}

export default AddProduct;
