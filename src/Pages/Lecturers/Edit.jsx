import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../Config/api';
import React from 'react'
import Tagline from '../../Components/Tagline';
import Popup from '../../Components/Popup';

const Edit = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [lecturer, setLecturer] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
      name: "",
      address: "",
      email: "",
      phone: "",
  });

  const errorStyle = {
    color: 'red'
  };

  let token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/lecturers/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data.data);

        setLecturer(response.data.data);
        setForm(response.data.data);
    })
    .catch(err => {
        console.error(err);
    })
  }, [id]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
  
    if (name === "phone") {
      // Validate phone number using regex (in the format of 085-2243211)
      const phoneRegex = /^\d{3}-\d{7}$/;
      errorMessage = phoneRegex.test(value)
        ? ""
        : "Phone number must be in the format of 000-0000000.";
    }
    else if(name === "address") {
      const addressRegex = /^\d+.+[a-zA-Z]/i;
      errorMessage = addressRegex.test(value)
      ? ""
      : "Address must contain a house number followed by characters.";
    }
    
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: { message: errorMessage },
    }));
  };

  const isRequired = (fields) => {

    let included = true;
    setErrors({});

    fields.forEach(field => {

        if(!form[field]){
            included = false;
            setErrors(prevState => ({
                ...prevState,
                [field]: {
                    message: `${field} is required!`
                }
            }));
        }
        
    });

    return included;
	};

  const submitForm = (e) => {
    e.preventDefault();
    console.log('submitted', form);

    if(isRequired(['name', 'address', 'email', 'phone'])){
        let token = localStorage.getItem('token');
        let timeoutId;

        axios.put(`/lecturers/${id}`, form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            setShowPopup(true);

              timeoutId = setTimeout(() => {
                setShowPopup(false);
                navigate(`/lecturers/${id}`);
              }, 5000);
        })
        .catch(err => {
            console.error(err);
        });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if(!lecturer) return <h3>Lecturer not found</h3>

  return (
    <div className='p-8 bg-gray-900 text-white'>

       <h1 className='flex justify-center text-[24px] p-5 text-white'>
          {showPopup && <Popup message={`${lecturer.name} Edited`} onClose={closePopup} />}
      </h1>

      <div className='p-8'>
        <h2 className='text-center p-3 text-4xl font-medium'>Edit<strong className='font-colour font-bold'> Lecturer</strong></h2>
        <div className='flex justify-center items-center'> 
            <form className='w-1/2' onSubmit={submitForm}>

              <div className='mb-4 text-lg font-semibold text-white mb-2 font-sans w-full'>
              <h2 className='ml-3 p-2'>Name: </h2>
                  <input 
                    className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                    type='text' 
                    onChange={handleForm} 
                    value={form.name} 
                    name='name' />
                    
                    <span style={errorStyle}>{errors.name?.message}</span>
              </div>

              <div className='mb-4 text-lg font-semibold text-white mb-2 p-2 font-sans'>
              <h2 className='ml-3 p-2'>Address: </h2>
                  <input 
                  className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                    type='text'
                    onChange={handleForm} 
                    value={form.address} 
                    name='address'/>

                    <span style={errorStyle}>{errors.address?.message}</span>
              </div>

              <div className='mb-4 text-lg font-semibold text-white mb-2 p-2 font-sans'>
              <h2 className='ml-3 p-2'>Email:</h2>
                  <input 
                  className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                    type='email' 
                    onChange={handleForm} 
                    value={form.email} 
                    name='email'/>

                    <span style={errorStyle}>{errors.email?.message}</span>
              </div>

              <div className='mb-4 font-semibold text-white text-lg mb-2 p-2 font-sans'>
              <h2 className='ml-3 p-2'>Phone:</h2>
                  <input 
                  className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                    type='text' 
                    onChange={handleForm} 
                    value={form.phone} 
                    name='phone'/>

                    <span style={errorStyle}>{errors.phone?.message}</span>
              </div>

              <div className='text-center flex justify-center pt-5'>
                <input className='bg-[#edb51c] text-white font-bold py-2 mb-5 px-10 rounded-full cursor-pointer' type='submit' />
              </div>
            </form>
          </div>
      </div>

      <Tagline />

    </div>
  )
}

export default Edit