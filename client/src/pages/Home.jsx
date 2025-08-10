import React from 'react'
import Navbar from '../components/Navbar'
import LandingPage from '../components/LandingPage'

const Home = () => {
  return (
    <div className='w-full h-[100vh]'>
      <Navbar/>
      <LandingPage/>
    </div>
  )
}

export default Home