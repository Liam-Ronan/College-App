import React, { useEffect, useState } from 'react';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';

//Import search bar
import SearchBar from '../../Components/SearchBar';

//Import Course Comps
import CreateCourseButton from '../../Components/Courses/CreateCourseButton';
import CourseCard from '../../Components/Courses/CourseCard';
import CourseText from '../../Components/Courses/CourseText';

import Tagline from '../../Components/Tagline';



const Index = () => {
    const { authenticated } = useAuth();
    const token = localStorage.getItem('token');
  
    const [courses, setCourses] = useState([]);

    //Search State Variables
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
  
    useEffect(() => {
      axios
        .get('/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          setCourses(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [token, courses]);


    //Search Functions
    const handleSearchInputChange = (e) => {
      setSearchTerm(e.target.value);
    }

    const handleSearchSubmit = (e) => {
      e.preventDefault();

      //Filtering through courses to match course title
      const filtered = courses.filter((course) => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      )

      setFilteredCourses(filtered);
    }

    //If searchTerm is true - return the filtered courses, if false return just courses
    const coursesToMap = searchTerm ? filteredCourses : courses;

    if(courses.length === 0) return <h3>There are no Courses</h3>;
  
    return (
      <div className='bg-gray-900'>
        <div className="container mx-auto">
          <CourseText />
          <CreateCourseButton />
          <SearchBar 
            searchTerm={searchTerm}
            handleSearchInputChange={handleSearchInputChange}
            handleSearchSubmit={handleSearchSubmit}
          />
  
          <div className="flex flex-wrap -mx-4">
            <CourseCard
              courses={coursesToMap}
              authenticated={authenticated}    
            />
          </div>

        </div>
        <Tagline />
      </div>
    );
  };
  
  export default Index;
