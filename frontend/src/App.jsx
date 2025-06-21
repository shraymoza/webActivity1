import { Container, Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Home      from './components/Home';
import Products  from './components/Products';
import Contact   from './components/Contact';
import Register  from './components/Register';
import Login     from './components/Login';

import { logout } from './redux/authActions';

const PrivateRoute = ({ element }) => {
    const token = useSelector(state => state.auth.token);
    return token ? element : <Navigate to="/login" replace />;
};

function App() {
    const dispatch   = useDispatch();
    const { token }  = useSelector(state => state.auth);

    return (
        <Router>
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/">Product Manager</Navbar.Brand>

                    <Navbar.Toggle aria-controls="nav-collapse" />
                    <Navbar.Collapse id="nav-collapse">
                        <Nav className="ms-auto">
                            {token ? (
                                <>
                                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                                    <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/">Register</Nav.Link>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                {/* Public routes */}
                <Route path="/"        element={<Register />} />
                <Route path="/login"   element={<Login />}   />
                {/* Protected routes */}
                <Route path="/home"     element={<PrivateRoute element={<Home />}     />} />
                <Route path="/products" element={<PrivateRoute element={<Products />} />} />
                <Route path="/contact"  element={<PrivateRoute element={<Contact />}  />} />
            </Routes>
        </Router>
    );
}

export default App;
