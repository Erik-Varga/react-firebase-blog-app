import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            toast.error(error.code);
            console.log(error);
        }
    }

  return (
    <div className='d-flex justify-content-center'>
      <div className='border p-3 m-2 bg-light rounded shadow-sm w-70'>
        <h4>Login</h4>
        
        {/* Email */}
        <div className='form-group'>
          <label>Email</label>
          <input type='text' className='form-control' onChange={(e) => {setEmail(e.target.value)}}></input>
        </div>

        {/* Password */}
        <div className='form-group'>
          <label>Password</label>
          <input type='password' className='form-control' onChange={(e) => {setPassword(e.target.value)}}></input>
        </div>
        <br />
        <button className='btn btn-primary' onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}
