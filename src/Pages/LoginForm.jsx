import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import '../App.css'

import CollegeSVG from '../Assets/Online learning-cuate.svg';

const LoginForm = () => {
    const { onAuthenticated } = useAuth();

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

            <div className="flex-1 w-1/2 h-full bg-gray-800 flex items-center justify-center">
                <img src={CollegeSVG} alt="" className="h-auto w-auto" />
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-xl p-8 bg-white ring ring-gray-300 ring-opacity-50 shadow-xl rounded-xl p-16 w-full">
                    {/* Your login form HTML goes here */}
                    <h2 className="text-center text-5xl font-light mb-4 font-sans p-2">Welcome <strong className='font-colour font-bold'>Back</strong></h2>
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
