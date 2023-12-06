import React, { useState } from 'react';
import axios from '../Config/api';

const DeleteButton = ({ id, resource, deleteCallback }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = () => {
    setIsLoading(true);

    let token = localStorage.getItem('token');

    axios
      .delete(`/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        deleteCallback(true); // Pass true to indicate successful deletion
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <button
        onClick={onDelete}
        className='bg-red-500 text-white font-bold py-2 mt-3 px-10 rounded-full'
        disabled={isLoading}
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </>
  );
};

export default DeleteButton;
