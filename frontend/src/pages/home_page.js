import React, { useEffect, useState } from 'react'
import Home from '../components/home_components/home'

function HomePage() {
    const [ userData, setUserData ] = useState();
    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);
        setUserData(userData);
        console.log(userData);
    },[])
  return (
    <div>
        <Home userData={userData} />
    </div>
  )
}

export default HomePage