import '../App.css'
import {Box} from '@mui/material'
import MyTextField from './fields/MyTextField'
import MyPassField from './fields/MyPassField'
import MyButton from './fields/MyButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import.meta.env.VITE_API_URL

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/token/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password
                })
            });
            
            const data = await response.json();

            if (response.ok){
                console.log("Login Successful: ", data)
                
                console.log("ACCESS TOKEN:", data.access);

                localStorage.setItem('access',data.access);
                localStorage.setItem('refresh', data.refresh);

                console.log(localStorage.getItem('access'))
                
                console.log("About to navigate...");
                navigate('/dashboard');
            } else {
                console.log("Login Failed: ", data)
            }
        } catch(error){
            console.log("Error: ",error);
        }
    };

    return (
        <div className="loginContainer">

            <div className="loginLeft">
            <div className="illustrationBox">
                <img
                src="/illustration.png"
                alt="login"
                className="illustration"
                />
            </div>
            </div>

            <div className="loginRight">

            <div className="loginCard">

                <h2 className="loginTitle">
                Personal Expense Tracker!
                </h2>

                <p className="loginSubtitle">
                Please sign-in to your Account
                </p>

                <MyTextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <MyPassField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <div className="rememberRow">
                </div>

                <MyButton
                label="Log In"
                onClick={handleLogin}
                />

                <p className="registerText">
                Don't have an Account?{" "}
                <Link to="/register">Create an account</Link>
                </p>

            </div>

            </div>

        </div>
        );
}

export default Login