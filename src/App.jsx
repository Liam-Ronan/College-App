import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './Contexts/AuthContext';

//Import Components
import Navbar from './Components/Navbar';

//Import Pages
/* import Home from './Pages/Home'; */
import PageNotFound from './Pages/PageNotFound';

//Courses Pages
import CoursesIndex from './Pages/Courses/Index';
import CoursesShow from './Pages/Courses/Show';
import CoursesCreate from './Pages/Courses/Create';
import CoursesEdit from './Pages/Courses/Edit';

//Lecturers Pages
import LecturersIndex from './Pages/Lecturers/Index';
import LecturersShow from './Pages/Lecturers/Show';
import LecturersCreate from './Pages/Lecturers/Create';
import LecturersEdit from './Pages/Lecturers/Edit';

//Enrolments Pages
import EnrolmentsIndex from './Pages/Enrolments/Index';
import EnrolmentsShow from './Pages/Enrolments/Show';
import EnrolmentsCreate from './Pages/Enrolments/Create';
import EnrolmentsEdit from './Pages/Enrolments/Edit';
import LoginForm from './Pages/LoginForm';

function App() {

  const { authenticated, onAuthenticated } = useAuth();

  let protectedRoutes;

  useEffect(() => {
    if(localStorage.getItem('token')){
      onAuthenticated(true);
    }
  }, []);

  if(authenticated){
    protectedRoutes = (
      <>
        {/* Courses */}
        <Route path='/Courses/Create' element={<CoursesCreate />} />
        <Route path='/Courses/:id/Edit' element={<CoursesEdit />} />
        <Route path='/Courses/:id' element={<CoursesShow />} />

        {/* Lecturers */}
        <Route path='/Lecturers/Create' element={<LecturersCreate />} />
        <Route path='/Lecturers/:id/Edit' element={<LecturersEdit />} />
        <Route path='/Lecturers/:id' element={<LecturersShow />} />

        {/* Enrolments */}
        <Route path='/Enrolments/Create' element={<EnrolmentsCreate />} />
        <Route path='/Enrolments/:id/Edit' element={<EnrolmentsEdit />} />
        <Route path='/Enrolments/:id' element={<EnrolmentsShow />} />
      </>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/Courses' element={<CoursesIndex />} />
        <Route path='/Lecturers' element={<LecturersIndex />} />
        <Route path='/Enrolments' element={<EnrolmentsIndex />} />
        {protectedRoutes}

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
