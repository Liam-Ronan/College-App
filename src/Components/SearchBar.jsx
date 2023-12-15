import React from 'react';

const SearchBar = ({ searchTerm, handleSearchInputChange, handleSearchSubmit }) => {
  return (
    <>
      <div className='flex justify-center p-5'>
        <form
          className='w-full flex justify-center text-black relative'
          onSubmit={handleSearchSubmit}
        >
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearchInputChange}
              className='w-3/4 rounded-full text-white border-4 border-sky-400 p-4 focus:outline-none bg-gray-900'
              placeholder='Search...'
            />
        </form>
      </div>
    </>
  );
};

export default SearchBar;
