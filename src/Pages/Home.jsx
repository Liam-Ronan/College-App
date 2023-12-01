import LoginForm from "./LoginForm";
import { useAuth } from "../Contexts/AuthContext";
import React from 'react'

const Home = () => {
  const { authenticated } = useAuth();

  return (
    <>

        {(!authenticated) ? (
            <LoginForm />      
        ) : (
          <p>You are authenticated</p>
        )}
        
      </>
  )
}

export default Home;
