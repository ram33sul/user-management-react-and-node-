import React, { useEffect, useState } from 'react'
import Profile from '../components/profile/profile'

function ProfilePage() {
    const [ userData, setUserData ] = useState({});
    useEffect(()=>{
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUserData(userData);
    },[])
  return (
    <div>
        <Profile userData={userData}/>
    </div>
  )
}

export default ProfilePage