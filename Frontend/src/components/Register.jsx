import '../App.css'
import {Box} from '@mui/material'
import MyTextField from './fields/MyTextField'
import MyPassField from './fields/MyPassField'
import MyButton from './fields/MyButton';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async () =>{
        if (password !== confirmPassword){
            console.log("Passwords do not match");
            return;
        }

        try{
            const response = await fetch('http://127.0.0.1:8000/api/register/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json();

            if (!response.ok){
                console.log("Registration Failed: ", data);
                return;
            }
            
            console.log("User Registered: ", data)

            const loginResponse = await fetch('http://127.0.0.1:8000/api/token/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    username: email,
                    password
                })
            });

            const loginData = await loginResponse.json();

            if (loginResponse.ok){
                localStorage.setItem('access', loginData.access)
                localStorage.setItem('refresh', loginData.refresh)
                navigate('/dashboard');
            } else{
                console.log("Auto Login Failed: ", LoginData);
                navigate('/');
            }

        } catch(error){
            console.log("Error:",error)
        }
    };

    return (
        <div className="loginContainer">

            <div className="loginLeft">
            <div className="illustrationBox">
                <img
                src="/illustration.png"
                alt="register"
                className="illustration"
                />
            </div>
            </div>

            <div className="loginRight">

            <div className="loginCard">

                <h2 className="loginTitle">
                Create Account
                </h2>

                <p className="loginSubtitle">
                Join us and start managing your finances
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

                <MyPassField
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(e.target.value)
                }
                />

                {password &&
                confirmPassword &&
                password !== confirmPassword && (
                    <p className="errorText">
                    Passwords do not match
                    </p>
                )}

                <MyButton
                label="Register"
                onClick={handleRegister}
                />

                <p className="registerText">
                Already have an account?{" "}
                <Link to="/">Login</Link>
                </p>

            </div>

            </div>

        </div>
        );
}

export default Register