import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../Config/api';
import React from 'react'

const Edit = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
      title: "",
      description: "",
      city: "",
      start_date: "",
      end_date: ""
  });

  const errorStyle = {
    color: 'red'
  };

  let token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/courses/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data.data);

        setCourse(response.data.data);
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

  if(isRequired(['title', 'description', 'code', 'points', 'level'])){
      let token = localStorage.getItem('token');

      axios.put(`/courses/${id}`, form, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      })
      .then(response => {
          navigate(`/courses/${id}`);
      })
      .catch(err => {
          console.error(err);
      });
  }
};

  if(!course) return <h3>Festival not found</h3>

  return (
    <>
        <h2>Edit Course</h2>
        <form onSubmit={submitForm}>

          <div>Title: 
              <input 
                type='text' 
                onChange={handleForm} 
                value={form.title} 
                name='title' />
                
                <span style={errorStyle}>{errors.title?.message}</span>
          </div>

          <div>Code: 
              <input 
                type='text'
                onChange={handleForm} 
                value={form.code} 
                name='code'/>

                <span style={errorStyle}>{errors.code?.message}</span>
          </div>

          <div>Description: 
              <input 
                type='text' 
                onChange={handleForm} 
                value={form.description} 
                name='description'/>

                <span style={errorStyle}>{errors.description?.message}</span>
          </div>

          <div>Points: 
              <input 
                type='text' 
                onChange={handleForm} 
                value={form.points} 
                name='points'/>

                <span style={errorStyle}>{errors.points?.message}</span>
          </div>

          <div>Level: 
              <input 
              type='text' 
              onChange={handleForm} 
              value={form.level} 
              name='level'/>

              <span style={errorStyle}>{errors.level?.message}</span>
          </div>

            <input type='submit' />
        </form>
    </>
  )
}

export default Edit