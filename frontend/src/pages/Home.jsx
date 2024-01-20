import React, { useEffect } from 'react'
import axios from 'axios'
import LogSign from '../components/Login/LogSign'
const Home = () => {
  useEffect(() => {
    axios.get('http://localhost:3000/').then((response) => {
      console.log(response.data)
    })
  })
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <LogSign />
      </div>
    </>
  )
}

export default Home