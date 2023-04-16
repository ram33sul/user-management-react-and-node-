import React, { useState, useEffect } from 'react'
import styles from './admin_edit_user.module.css'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function AdminEditUser() {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ imageExist, setImageExist ] = useState(false);
    const [ editStatus, setEditStatus ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ userId, setUserId ] = useState('');
    const [ searchParams ] = useSearchParams();

    const saveHandle = () => {
        if(!(name && username && email && phone)){
            return setErrorMessage("ALL INPUTS ARE REQUIRED");
        }
        axios({
            method: 'POST',
            url: '/admin/editUser?id='+userId,
            data: {
                name,
                username,
                email,
                phone
            },
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem('admin')),
            }
        }).then((data) => {
            localStorage.setItem('userData',JSON.stringify(data.data))
            return setEditStatus(false);
        }).catch((error) => {
            setErrorMessage(error.response.data.toUpperCase());
        })
    }
    const checkImage = (imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = setImageExist(true);
        img.onerror = setImageExist(false);
    }

    useEffect(()=>{

        const id = searchParams.get('id');
        if(!id){
            return alert("user id is missing in query");
        }
        setUserId(id);
        axios({
            method: 'GET',
            url: '/admin/getUser?id='+id,
            data: {
                id,
            },
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem('admin')),
            }
        }).then((data) => {
            const { name, username, email, phone } = data.data[0];
            setName(name);
            setUsername(username);
            setEmail(email);
            setPhone(phone);
            checkImage('/images/'+username+'.png');
        }).catch((error) => {
            console.log(error);
        })
    },[ searchParams ]);
    
  return (
    <div className={styles.container}>
        { errorMessage && <div className={styles['error-Message']}> {errorMessage} </div>}
        { imageExist && <img src='/images/profile.png' alt='profile-pic' className={styles.image} />}
        <div className={styles.label}> Name </div>
        <input className={styles.input} value={name} style={editStatus ? {outline: '1px solid black',} : null} onChange={(e) => setName(e.target.value)} readOnly={!editStatus}/>
        <div className={styles.label}> Username </div>
        <input className={styles.input} value={username} style={editStatus ? {outline: '1px solid black',} : null} onChange={(e)=> setUsername(e.target.value)} readOnly={!editStatus}/>
        <div className={styles.label}> Email </div>
        <input className={styles.input} value={email} style={editStatus ? {outline: '1px solid black',} : null} onChange={(e) => setEmail(e.target.value)} readOnly={!editStatus} />
        <div className={styles.label}> Phone </div>
        <input className={styles.input} value={phone} style={editStatus ? {outline: '1px solid black',} : null} onChange={(e) => setPhone(e.target.value)} readOnly={!editStatus} />
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

export default AdminEditUser