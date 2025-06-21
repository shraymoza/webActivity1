import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authActions';
import { Alert, Spinner } from 'react-bootstrap';

// Yup validation schema
const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
        .matches(/^\d{10,15}$/, 'Phone must be 10 to 15 digits')
        .required('Phone is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

function Register() {

    const initialValues = {
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    };

    const dispatch  = useDispatch();
    const navigate  = useNavigate();
    const { loading, error, token } = useSelector(s => s.auth);

    React.useEffect(() => { if (token) navigate('/home'); }, [token]);

    const handleSubmit = values => dispatch(register(values));

    return (
        <div className="bg-light py-5" style={{ minHeight: '100vh' }}>
            <Container className="d-flex justify-content-center align-items-center">
                <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '500px' }}>
                    <Card.Body>
                        <h3 className="text-center mb-4">Register</h3>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <FormikForm>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Field name="fullName" className="form-control" />
                                        <div className="text-danger small"><ErrorMessage name="fullName" /></div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Field name="email" type="email" className="form-control" />
                                        <div className="text-danger small"><ErrorMessage name="email" /></div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Field name="phone" className="form-control" />
                                        <div className="text-danger small"><ErrorMessage name="phone" /></div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Field name="password" type="password" className="form-control" />
                                        <div className="text-danger small"><ErrorMessage name="password" /></div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Field name="confirmPassword" type="password" className="form-control" />
                                        <div className="text-danger small"><ErrorMessage name="confirmPassword" /></div>
                                    </Form.Group>

                                    <div className="d-grid">
                                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                                            Register
                                        </Button>
                                    </div>
                                </FormikForm>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Register;
