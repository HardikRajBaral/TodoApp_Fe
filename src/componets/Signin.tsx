import {  useNavigate } from "react-router-dom";
import '../assets/css/Login.css';
import { useState } from "react";
const Singin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Failed to register');
        }

        const data = await res.json();

        localStorage.setItem('token', data.token);
        navigate('/');
    } catch (err) {
        if (err instanceof Error) {
        setError(err.message);
        } else {
        setError('An unexpected error occurred');
        }
    }
    };

    return(

        <>
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="Inputbox">
                    <input 
                        type="text"
                        value={name}
                        placeholder="Enter your username"
                        onChange={(e)=>setName(e.target.value)}
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