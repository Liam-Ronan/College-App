import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

//Images
import gradPNG from '../../public/graduation-hat.png';

//Icons
import { BiLogOut } from "react-icons/bi";

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
                    <div className='flex justify-evenly items-center bg-gray-900 text-white pt-6 pb-6'>
                        <div>
                            <Link to="/Home" className='flex items-center'>
                                <img src={gradPNG} alt="" className="h-16 w-16 p-3" />
                                <h1 className='text-2xl text-white font-light pb-2'>Enrolment <strong className='font-colour font-bold slider-link pb-1'>EcoSystem</strong></h1>
                            </Link>
                        </div>
                    
                        <div className='font-bold'>
                            <Link to="/Courses" className='slider-link mr-5 pb-1'>Courses</Link>
                            <Link to="/Lecturers" className='slider-link mr-5 pb-1'>Lecturers</Link>
                            <Link to="/Enrolments" className='slider-link  mr-5 pb-1'>Enrolments</Link>
                        </div>

                        <div className='font-bold'>
                            <button className='flex slider-link pb-1' onClick={logout}><BiLogOut className='text-2xl mr-1'/> Logout</button>
                        </div>
                    </div>

                </>

            ) : null}

        </>
    );
};

export default Navbar;