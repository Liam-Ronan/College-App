import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from './Contexts/AuthContext';

//Import Components
import Navbar from './Components/Navbar';

//Import Pages
import Home from './Pages/Home';
import PageNotFound from './Pages/PageNotFound';

//Courses Pages
import CoursesIndex from './Pages/Courses/Index';
import CoursesShow from './Pages/Courses/Show';
import CoursesCreate from './Pages/Courses/Create';
import CoursesEdit from './Pages/Courses/Edit';

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
        <Route path='/Courses/Create' element={<CoursesCreate />} />
        <Route path='/Courses/:id/Edit' element={<CoursesEdit />} />
        <Route path='/Courses/:id' element={<CoursesShow />} />
      </>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Courses' element={<CoursesIndex />} />
        {protectedRoutes}

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}

export default App
