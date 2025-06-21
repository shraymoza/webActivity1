import React from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authActions';
import { useNavigate, Link } from 'react-router-dom';

/* ───────── Form validation rules ───────── */
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Must be at least 6 chars')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
});

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, token } = useSelector(state => state.auth);

    /* If a token already exists
    React.useEffect(() => {
        if (token) navigate('/home');
    }, [token, navigate]);

    /* Handle submit via Redux thunk */
    const handleSubmit = values => {
        const { confirmPassword, ...body } = values;
        dispatch(register(body));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="p-4 shadow-sm" style={{ maxWidth: 450, width: '100%' }}>
                <h3 className="mb-3 text-center">Create Account</h3>

                {error && <Alert variant="danger">{error}</Alert>}

                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <FormikForm>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Field name="name" as={Form.Control} />
                            <ErrorMessage name="name" component="div" className="text-danger small" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Field name="email" type="email" as={Form.Control} />
                            <ErrorMessage name="email" component="div" className="text-danger small" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Field name="password" type="password" as={Form.Control} />
                            <ErrorMessage name="password" component="div" className="text-danger small" />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Field name="confirmPassword" type="password" as={Form.Control} />
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
                        </Form.Group>

                        <Button type="submit" className="w-100" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
                        </Button>
                    </FormikForm>
                </Formik>

                <div className="mt-3 text-center">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </Card>
        </Container>
    );
}

export default Register;
