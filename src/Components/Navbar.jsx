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
            {(authenticated) ? (
                <>
                    <Link to="/Home">Home</Link> |
                    <Link to="/Courses">All Courses</Link> |
                    <Link to="/Lecturers">All Lecturers</Link> |
                    <Link to="/Enrolments">All Enrolments</Link> |
                </>

            ) : null}


            {(authenticated) ? (
                <button onClick={logout}>Logout</button>
            ) : ""}

        </>
    );
};

export default Navbar;