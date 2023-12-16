
import React from 'react'
import { IoCodeSlash } from 'react-icons/io5';

const LecturerText = () => {
  return (
    <>
        <div className='flex justify-center'>
              <IoCodeSlash className='outline-double text-8xl p-3 rounded-xl  font-colour m-8' />
        </div>
          <h2 className="text-4xl text-center font-medium mb-3 py-3 text-white">All <strong className='font-colour underline underline-offset-8 '>Lecturers</strong></h2>

      <div className='flex justify-center'>
        <p className='text-white text-2xl text-center font-light mb-6 max-w-4xl'>
        Lecturers are the heart of the educational journey, guiding students with wisdom and enthusiasm. Their dedication goes beyond imparting knowledge; it ignites a passion for learning. In classrooms led by these educators, diverse perspectives flourish, and critical thinking becomes second nature..</p>
      </div>
    </>
  )
}

export default LecturerText