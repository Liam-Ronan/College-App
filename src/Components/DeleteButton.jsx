// DeleteButton.jsx
import React, { useState } from 'react';
import axios from '../Config/api';

const DeleteButton = ({ id, resource, deleteCallback }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const onDelete = () => {
    // Show the delete confirmation popup
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setIsLoading(true);
  
    let token = localStorage.getItem('token');
  
    axios
      .delete(`/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Delete response:', response);
  
        if (response && response.status === 200) {
          console.log('Delete success:', response.status, response.data);
          deleteCallback(); // Trigger callback to handle redirection
        } else {
          console.warn('Delete request did not return a success status.');
        }
      })
      .catch((err) => {
        console.error('Error during delete:', err);
      })
      .finally(() => {
        setIsLoading(false);
        // Close the popup after deletion
        setShowDeletePopup(false);
      });
  };
  

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
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

      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-6 rounded-md">
            <p className="text-red-500 text-xl font-bold mb-4">
              Are you sure you want to delete?
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-full"
              >
                Confirm
              </button>
              <button
                onClick={closeDeletePopup}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
