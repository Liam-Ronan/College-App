import React, { useState } from 'react';
import axios from '../Config/api';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ id, resource, enrolments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const confirmDelete = async () => {
    setIsLoading(true);

    let token = localStorage.getItem('token');

    try {
      if (enrolments?.length > 0) {
        // Show a warning about attached enrolments
        setShowDeletePopup(false); // Close the current popup
        const confirmation = window.confirm(
          'This resource has enrolments attached to it. Are you sure you want to delete?'
        );

        if (!confirmation) {
          setIsLoading(false);
          return; // Abort the delete operation
        }

        // Delete the attached enrolments
        for (const enrolment of enrolments) {
          await axios.delete(`/enrolments/${enrolment.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
      }

      // Continue with deleting the course
      await axios
        .delete(`/${resource}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('Delete response:', response);
          navigate(`/${resource}`);
        })
        .catch((err) => {
          console.error('Error during delete:', err);
        })
        .finally(() => {
          setIsLoading(false);
          setShowDeletePopup(false);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
  };

  const onDelete = () => {
    // Show the delete confirmation popup
    setShowDeletePopup(true);
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
