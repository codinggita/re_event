import React, { useEffect } from 'react'
import axios from 'axios'
const Home = () => {
  useEffect(() => {
    axios.get('http://localhost:3000/').then((response) => {
      console.log(response.data)
    })
  })
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <h1 className="text-4xl">Home</h1>
      </div>
    </>
  )
}

export default Home