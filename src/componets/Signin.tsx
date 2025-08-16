import {  useNavigate } from "react-router-dom";
import './Login.css'
import { useState } from "react";
const Singin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit= async (e:React.FormEvent)=>{
        e.preventDefault();
        setError('')
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })

            })
            .then((res=>{
                if (!res.ok) {
                    throw new Error('Failed to register');
                }
                return res.json();
            }))
            .then((data) => {
                localStorage.setItem('token', data.token);
                navigate('/login');
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
                
            }
        }
    }
    return(

        <>
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="Inputbox">
                    <input 
                        type="text"
                        value={username}
                        placeholder="Enter your username"
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="Inputbox">
                    <input 
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div className="Inputbox">
                    <input 
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="Inputbox">
                    <input 
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm your password"
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required
                    />
                </div>  
                {error && <p className="error">{error}</p>}  
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    )
    
}
export default Singin;