import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const Navbar = () => {
    const { authenticated, onAuthenticated } = useAuth();

    const navigate = useNavigate();

    const logout = () => {
        onAuthenticated(false);
        navigate('/');
    }

    return (
        <>
            <Link to="/">Home</Link> |
            <Link to="/Courses">All Courses</Link> |
            <Link to="/Courses">All Lecturers</Link> |
            <Link to="/Courses">All Enrolments</Link> |

            {(authenticated) ? (
                <button onClick={logout}>Logout</button>
            ) : ""}
        </>
    );
};

export default Navbar;