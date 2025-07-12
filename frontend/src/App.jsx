import { Container, Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute';
import Loader         from './components/Loader';
import { logout }     from './redux/authActions';

// ─── Lazy-loaded pages ────────────────────────────────────────────────
const Home     = lazy(() => import('./components/Home'));
const Products = lazy(() => import('./components/Products'));
const Contact  = lazy(() => import('./components/Contact'));
const Register = lazy(() => import('./components/Register'));
const Login    = lazy(() => import('./components/Login'));
// ──────────────────────────────────────────────────────────────────────

function App() {
    const dispatch      = useDispatch();
    const { token }     = useSelector((state) => state.auth);
    const handleLogout = () => dispatch(logout());

    return (
        <Router>
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">Product Manager</Navbar.Brand>

                    <Navbar.Toggle aria-controls="main-nav" />
                    <Navbar.Collapse id="main-nav">
                        <Nav className="me-auto">
                            {token && (
                                <>
                                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                                </>
                            )}
                        </Nav>

                        <Nav>
                            {token ? (
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* All routes behind a single Suspense boundary */}
            <Suspense fallback={<Loader full />}>
                <Routes>
                    {/* Public */}
                    <Route path="/"       element={<Register />} />
                    <Route path="/login"  element={<Login />}   />

                    {/* Private */}
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/contact"
                        element={
                            <ProtectedRoute>
                                <Contact />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
