import React, { useState } from 'react';
import styles from './login_signup_form.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function LoginForm(){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMsg ] = useState('');
    const navigate = useNavigate();
    const handleSubmit = () => {
        if(!(username && password)){
            return setErrorMsg("ALL INPUTS ARE REQUIRED");
        }
        axios({
            method: 'post',
            url: '/user/login',
            headers: {'Content-Type' : 'application/json'},
            data: {username, password}
        }).then((data) => {
            const { user, token } = data.data;
            localStorage.setItem('userData', JSON.stringify(user));
            localStorage.setItem('userToken', JSON.stringify(token));
            navigate('/');
        }).catch((error) => {
            setErrorMsg(error?.response?.data?.toUpperCase());
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                LOGIN
            </div>
            { errorMessage && 
                <div className={styles['error-message']}>
                    {errorMessage}
                </div>
            }
            <div className={styles.form}>
                <div className={styles['input-container']}>
                    <div className={styles.label}>
                        Username
                    </div>
                    <input className={styles.input} value={username} onChange={(e) => {setUsername(e.target.value)}} />
                </div>
                <div className={styles['input-container']}>
                    <div className={styles.label}>
                        Password
                    </div>
                    <input type='password' className={styles.input} value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <div className={styles['button-container']}>
                    <button className={styles['primary-button']} onClick={handleSubmit}>
                        LOGIN
                    </button>
                    <button className={styles['secondary-button']} onClick={()=> navigate('/signup')}>
                        SIGNUP
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;