import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

import gradPNG from '../../public/graduation-hat.png';

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
                <div className='flex justify-evenly'>
                    <div>
                        <img src={gradPNG} alt="" className="h-32 w-32 p-2" />
                        <h1 className='text-4xl text-white font-black p-2'>Enrolment <strong className='font-colour underline underline-offset-8 font-bold'>EcoSystem</strong></h1>
                    </div>
                </div>
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