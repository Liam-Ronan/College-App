import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../Config/api';
import React from 'react'

const Edit = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [lecturer, setLecturer] = useState(null);
  const [errors, setErrors] = useState({});

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
    setForm(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
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

      axios.put(`/lecturers/${id}`, form, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      })
      .then(response => {
          navigate(`/lecturers/${id}`);
      })
      .catch(err => {
          console.error(err);
      });
  }
};

  if(!lecturer) return <h3>Lecturer not found</h3>

  return (
    <>
        <h2>Edit Lecturer</h2>
        <form onSubmit={submitForm}>

            <div>Name: 
              <input 
                type='text' 
                onChange={handleForm} 
                value={form.name} 
                name='name' />
                
                <span style={errorStyle}>{errors.name?.message}</span>
            </div>

            <div>Address: 
                <input 
                    type='text'
                    onChange={handleForm} 
                    value={form.address} 
                    name='address'/>

                    <span style={errorStyle}>{errors.address?.message}</span>
            </div>

            <div>Email: 
                <input 
                    type='text' 
                    onChange={handleForm} 
                    value={form.email} 
                    name='email'/>

                    <span style={errorStyle}>{errors.email?.message}</span>
            </div>

            <div>Phone: 
                <input 
                    type='text' 
                    onChange={handleForm} 
                    value={form.phone} 
                    name='phone'/>

                    <span style={errorStyle}>{errors.phone?.message}</span>
            </div>

            <input type='submit' />
        </form>
    </>
  )
}

export default Edit