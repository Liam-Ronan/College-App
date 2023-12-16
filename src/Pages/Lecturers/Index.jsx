import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';
import SearchBar from '../../Components/SearchBar';

import CreateLecturerButton from '../../Components/Lecturers/CreateLecturerButton';

import Tagline from '../../Components/Tagline';

import LecturersCard from '../../Components/Lecturers/LecturersCard';
import LecturerText from '../../Components/Lecturers/LecturerText';

const Index = () => {
  const { authenticated } = useAuth();
  const token = localStorage.getItem('token');

  const [lecturers, setLecturers] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLecturers, setFilteredlecturers] = useState([]);

  useEffect(() => {
    axios
      .get('/lecturers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setLecturers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, lecturers]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const filtered = lecturers.filter((lecturer) => (
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))

    setFilteredlecturers(filtered);
  }

  const lecturersToMap = searchTerm ? filteredLecturers : lecturers;

  if(lecturers.length === 0) return <h3>There are no lecturers</h3>;

  return (
    <div className='bg-gray-900'>
        <div className="container mx-auto">
          <LecturerText />
          <CreateLecturerButton />

          <SearchBar
            searchTerm={searchTerm}
            handleSearchInputChange={handleSearchInputChange}
            handleSearchSubmit={handleSearchSubmit}
          />

          <div className="flex flex-wrap mx-4">
            <LecturersCard 
              lecturers={lecturersToMap}
              authenticated={authenticated}
            />
          </div>
      
        </div>
      <Tagline />
    </div>
    
    
  );
};

export default Index;
