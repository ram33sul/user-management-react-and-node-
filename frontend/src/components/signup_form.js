import React, { useState } from 'react'
import styles from './login_signup_form.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function SignupForm() {

    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const navigate = useNavigate()
    const handleSubmit = () => {
        if(!(name && username && email && phone && password)){
            return setErrorMessage("ALL INPUTS ARE REQUIRED");
        }
        axios({
            method: 'post',
            url: '/user/signup',
            data: {
                name,
                username,
                email,
                phone,
                password,
            }
        }).then((data) => {
            const { user, token } = data.data;
            localStorage.setItem('userData',JSON.stringify(user));
            localStorage.setItem('userToken',JSON.stringify(token));
            navigate('/');
        }).catch((error) => {
            setErrorMessage(error?.response?.data?.toUpperCase());
        })
    }

  return (
    <div className={styles.container}>
        <div className={styles.heading}>
            SIGNUP
        </div>
        {  errorMessage &&
            <div className={styles['error-message']}>
                {errorMessage}
            </div>                
        }
        <div className={styles.form}>
            <div className={styles['input-container']}>
                <div className={styles.label}>
                    Name
                </div>
                <input className={styles.input} value={name} onChange={(e) => {setName(e.target.value)}} />
            </div>
            <div className={styles['input-container']}>
                <div className={styles.label}>
                    Username
                </div>
                <input className={styles.input} value={username} onChange={(e) => {setUsername(e.target.value)}} />
            </div>
            <div className={styles['input-container']}>
                <div className={styles.label}>
                    Email
                </div>
                <input type='email' className={styles.input} value={email} onChange={(e) => {setEmail(e.target.value)}} />
            </div>
            <div className={styles['input-container']}>
                <div className={styles.label}>
                    Phone
                </div>
                <input className={styles.input} value={phone} onChange={(e) => {setPhone(e.target.value)}} />
            </div>
            <div className={styles['input-container']}>
                <div className={styles.label}>
                    Password
                </div>
                <input type='password' className={styles.input} value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </div>
            <div className={styles['button-container']}>
                <button className={styles['primary-button']} onClick={handleSubmit}>
                    SIGNUP
                </button>
                <button className={styles['secondary-button']} onClick={()=> navigate('/login')}>
                    LOGIN
                </button>
            </div>
        </div>
    </div>
  )
}

export default SignupForm