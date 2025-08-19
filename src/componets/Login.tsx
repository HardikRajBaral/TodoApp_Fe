import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/css/Login.css'

const Login = () => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState('')
const navigate = useNavigate()

const handleSubmit= async (e: React.FormEvent)=>{
    e.preventDefault();
    setError('')
    try{
        await fetch('http://localhost:5000/api/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password}),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Login failed');
            }
            return res.json();
        })
        .then(data=>{
            localStorage.setItem("token",data.accesToken)
            navigate('/Notes')
        })
    }
    catch(err:any){
        setError(err.message || 'An error occurred during login');

    }
}

    return (
        <>
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='Inputbox '>
                        <input 
                            type="email" 
                            value={email} 
                            placeholder="Enter your email"
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className='Inputbox'> 
                        <input 
                            type="password" 
                            placeholder="Enter your password"
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Login</button>
                    <a href="/signup" className='text'>Don't have an account? Sign up</a>
                </form>
            </div>
        </>

    )
}

export default Login;