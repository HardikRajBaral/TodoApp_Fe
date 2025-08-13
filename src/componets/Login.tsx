import {useState} from 'react'


const Login = () => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState('')

const handleSubmit= async (e: React.FormEvent)=>{
    e.preventDefault();
    setError('')
    try{
        fetch('http://localhost:5321/api/login',{
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
        })
    }
    catch(err:any){
        setError(err.message || 'An error occurred during login');

    }
}

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Login</button>
                </form>
            </div>
        </>

    )
}

export default Login;