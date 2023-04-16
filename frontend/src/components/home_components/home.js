import React, { useState, useEffect } from 'react'
import styles from './home.module.css'
import { useNavigate } from 'react-router-dom'

function Home({userData}) {
    const navigate = useNavigate()
    const [ imageExist, setImageExist ] = useState(false);

    const checkImage = (imageSrc)=>{
        const img = new Image();
        img.src = imageSrc;
        if(img.complete){
            setImageExist(true);
        } else {
            img.onload = () => {
                setImageExist(true);
            };
            img.onerror = () => {
                setImageExist(false);
            };
        }
    }

    useEffect(()=>{
        checkImage('/images/' + userData?.username + '.png');
    })
  return (
    <div className={styles.container}>
        { imageExist ? 
            <div className={styles.image} style={{backgroundImage: `url('/images/${userData?.username}.png')`}} onClick={()=> navigate('/profile')}/>
            :
            <div className={styles.image} onClick={()=> navigate('/profile')}> <div style={{width:'fit-content', margin: 'auto', marginTop: '45%', fontWeight: 'bold'}}>NO PROFILE IMAGE</div> </div>
        }
        <div className={styles.name} onClick={()=> navigate('/profile')}>
            {userData?.username}
        </div>
    </div>
  )
}

export default Home