import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

//CSS
import '../App.css'

//Images
import CollegeSVG from '../Assets/Cartoons/Online learning-cuate.svg';
import gradPNG from '../../public/graduation-hat.png';



const LoginForm = () => {
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate()
    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "liamronan16@gmail.com",
        password: "abcde12345"
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {
        console.log("clicked", form);

        axios.post('https://college-api.vercel.app/api/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
            console.log(response.data);
            onAuthenticated(true, response.data.token);
            navigate('/home')


        })
        .catch(err => {
            console.error(err);
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
        });
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="flex h-screen items-center">

            <div className="flex-1 w-1/2 h-full bg-gray-900 flex items-center justify-center flex-col">
                <img src={CollegeSVG} alt="" className="h-3/5 w-4/5" />
                <h1 className='text-4xl text-white font-light p-2'>Enrolment <strong className='font-colour underline underline-offset-8 font-bold'>EcoSystem</strong></h1>
                <p className='text-center max-w-xl text-xl p-2 text-white font-sans'>Navigate a rich landscape of courses and resources, where each decision opens doors to new learning and growth.</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-xl p-8 bg-white ring ring-gray-300 ring-opacity-50 shadow-xl rounded-xl p-8 w-full">
                    {/* Your login form HTML goes here */}
                    <img src={gradPNG} alt="" className="mx-auto h-32 w-32 p-2" />
                    <h2 className="text-center text-5xl font-light mb-4 font-sans p-2">Welcome <strong className='font-colour font-bold underline underline-offset-8'>Back</strong></h2>
                    <h3 className='text-2xl font-light m-5 text-center'>Please enter your details</h3>

                   
                    <div className="mb-4">
                        <label className="block text-gray-900 text-lg font-bold font-bold mb-2 p-2 font-sans">
                        Email:
                        </label>
                        <input
                            onChange={handleForm}
                            type="text"
                            placeholder='someone@gmail.com'
                            name="email"
                            value={form.email}
                            className="w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-900 text-lg font-bold font-bold mb-2 p-2  font-sans">
                        Password:
                        </label>
                        <input
                            onChange={handleForm}
                            type="password"
                            name="password"
                            value={form.password}
                            className="w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50"
                            required
                        />
                    </div>

                    <button
                        onClick={handleClick}
                        type="submit"
                        className="w-full bg-gray-800 text-white p-3 mt-6 rounded-3xl hover:bg-gray-900"
                    >
                        Login
                    </button>
                    <p style={errorStyle}>{errorMessage}</p>
                  
                </div>
            </div>
        </div>
    );
}
export default LoginForm; 
