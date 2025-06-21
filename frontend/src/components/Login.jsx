import React from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authActions';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    email   : Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
    const dispatch  = useDispatch();
    const navigate  = useNavigate();
    const { loading, error, token } = useSelector(s => s.auth);

    // already logged-in? jump straight to /home
    React.useEffect(() => { if (token) navigate('/home'); }, [token]);

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
            <Card className="p-4 shadow-sm" style={{maxWidth: 400, width: '100%'}}>
                <h3 className="mb-3 text-center">Login</h3>

                {error && <Alert variant="danger">{error}</Alert>}

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={values => dispatch(login(values))}
                >
                    <FormikForm>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Field name="email" as={Form.Control} type="email" />
                            <ErrorMessage name="email" component="div" className="text-danger small" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Field name="password" as={Form.Control} type="password" />
                            <ErrorMessage name="password" component="div" className="text-danger small" />
                        </Form.Group>

                        <Button type="submit" className="w-100" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                        </Button>
                    </FormikForm>
                </Formik>
            </Card>
        </Container>
    );
}

export default Login;
