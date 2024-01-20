import React, { useEffect } from 'react'
import axios from 'axios'
import HeroSection from '../components/HeroSection'
const Home = () => {
  // useEffect(() => {
  //   axios.get('http://localhost:3000/').then((response) => {
  //     console.log(response.data)
  //   })
  // })
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <HeroSection />
      </div>
    </>
  )
}

export default Home