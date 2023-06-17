import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

export default function Navbar() {
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  }

  return (
    <div className='border mb-3' style={{ backgroundColor: 'whitesmoke' }}>
      <div className='d-flex justify-content-between align-items-center'>
        <nav className='nav d-flex flex-row align-items-center'>
          <div className='title'>
              My Blog
          </div>
          <Link className='nav-link' to='/'>Home </Link>
          {/* <Link className='nav-link' to='/register'>Register </Link> */}
        </nav>
        <div className='d-flex align-items-center justify-content-end'>
          {!user && (
            <>
              <Link to='/login'>
                <button className='btn btn-primary btn-sm me-3'>Login</button>
              </Link>
            </>
          )}
          {user && (
            <>
              <span className='user pe-2'>
                <small>
                  Signed in: { user.displayName || user.email }
                </small>
              </span>
              <button className='btn btn-primary btn-sm me-3' onClick={() => {signOut(auth)}}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
