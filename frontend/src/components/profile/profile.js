import React, { useState, useEffect } from 'react'
import styles from './profile.module.css';
import axios from 'axios';
function Profile({userData}) {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ image, setImage ] = useState('')
    const [ imageExist, setImageExist ] = useState(false);
    const [ editStatus, setEditStatus ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }
    const saveHandle = async () => {
        if(!(name && username && email && phone)){
            console.log(name);
            return setErrorMessage("ALL INPUTS ARE REQUIRED");
        }
        const formData = new FormData();
        formData.append('name',name);
        formData.append('username',username);
        formData.append('email',email);
        formData.append('phone',phone);
        formData.append('image',image);
        axios.post(
            '/user/editProfile',
            formData,
            {
                headers:{
                    "x-access-token": JSON.parse(localStorage.getItem('userToken'))
                }
            }).then((data) => {
                localStorage.setItem('userData',JSON.stringify(data.data));
                return setEditStatus(false);
            }).catch((error) => {
                setErrorMessage(error.response.data.toUpperCase());
            })
        // axios({
        //     method: 'POST',
        //     url: '/user/editProfile',
        //     data: {
        //         name,
        //         username,
        //         email,
        //         phone,
        //         image: image,
        //     },
        //     headers: {
        //         "x-access-token": JSON.parse(localStorage.getItem('userToken')),
        //     }
        // }).then((data) => {
        //     localStorage.setItem('userData',JSON.stringify(data.data));
        //     return setEditStatus(false);
        // }).catch((error) => {
        //     setErrorMessage(error.response.data.toUpperCase());
        // })
    }
    const checkImage = (imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = setImageExist(true);
        img.onerror = setImageExist(false);
    }

    useEffect(()=>{
        setName(userData.name);
        setUsername(userData.username);
        setEmail(userData.email);
        setPhone(userData.phone);
        checkImage('images/'+username+'.png');
    },[userData, username]);
    
  return (
    <div className={styles.container}>
        { errorMessage && <div className={styles['error-Message']}> {errorMessage} </div>}
        { <img src={`images/${username}.png`} alt='profile-pic' className={styles.image} />}
        <div className={styles.label}> Name </div>
        <input className={styles.input} value={name} style={editStatus ? {outline: '1px solid black',} : null} onChange={(e) => setName(e.target.value)} readOnly={!editStatus}/>
        <div className={styles.label}> Username </div>
        <input className={styles.input} value={username} style={editStatus ? {outline: '1px solid black',} : null} onChange={(e)=> setUsername(e.target.value)} readOnly={!editStatus}/>
        <div className={styles.label}> Email </div>
        <input className={styles.input} value={email} style={editStatus ? {outline: '1px solid black',} : null} onChange={(e) => setEmail(e.target.value)} readOnly={!editStatus} />
        <div className={styles.label}> Phone </div>
        <input className={styles.input} value={phone} style={editStatus ? {outline: '1px solid black',} : null} onChange={(e) => setPhone(e.target.value)} readOnly={!editStatus} />
        <div className={styles.label}> {imageExist ? 'Change picure' : 'Upload picture'} </div>
        <input type='file' style={{marginTop: '10px'}} onChange={handleImage}/>
        <div className={styles['button-container']}>
            { editStatus ?
                <div className={styles.button} style={{backgroundColor: 'green'}} onClick={saveHandle}>
                    SAVE
                </div> :
                <div className={styles.button} style={{backgroundColor: 'rgb(0,150,255)'}} onClick={()=>setEditStatus(true)}>
                    EDIT
                </div>
            }
        </div>
    </div>
  )
}

export default Profile