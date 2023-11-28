import { useState } from 'react';
import axios from '../Config/api';
import React from 'react'
// import { useNavigate } from 'react-router-dom';

const DeleteButton = ({id, resource, deleteCallback}) => {

  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate();

  const onDelete = () => {
    setIsLoading(true);
    let token = localStorage.getItem('token');

        axios.delete(`/${resource}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
        console.log(response.data);
        deleteCallback(id);
        // navigate('/festivals');
        })
        .catch(err => {
        console.log(err.response.data)
        });
  };

  return (
    <>
        <button onClick={onDelete}>
            {isLoading ? "Deleting..." : "Delete"}
        </button>
    </>
  )
}

export default DeleteButton;
