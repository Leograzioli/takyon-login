import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxios from '../hooks/useAxios';

export default function Login() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, error, request] = useAxios({ method: 'POST', url: 'https://staging-api.takyon.io/auth/login', data:{ email, password } }, false)
  

  //To handle Login submit. 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    request();
  }

  return (
    <div className="bg-secondary">
      <div className="max-w-[1100px] h-[calc(100vh-80px)] mx-auto flex items-center justify-center relative overflow-x-hidden">
        <ToastContainer />

        {/* login form */}
        <div className="bg-white rounded-md py-5 px-4 border w-4/5 max-w-[400px]">
          <form onSubmit={(e) => { handleSubmit(e) }} >
            <h2 className="text-xl mb-6">Login</h2>

            <div className='mb-4'>
              <label>
                <div className='text-xs mb-1 text-t-secondary'>Email</div>
                <input id='email' required value={email} type="email" onChange={(e) => setEmail(e.target.value)} className={`border ${error.includes('email')? 'border-2 border-red-500' : ''} rounded-sm bg-light-primary py-1 px-2 focus:outline-gray-400 w-full`} />
                {error.includes('email') && <p className='text-xs text-red-500'>- Email not valid</p>}
              </label>
            </div>

            <div className='mb-8'>
              <label>
                <div className='text-xs mb-1 text-t-secondary'>Password</div>
                <input id='password' required value={password} type="password" onChange={(e) => setPassword(e.target.value)} className={`border ${error.includes('Password')? 'border-2 border-red-500' : ''} rounded-sm bg-light-primary py-1 px-2 focus:outline-gray-400 w-full`} />
                {error.includes('Password') && <p className='text-xs text-red-500'>- password not valid</p>}
              </label>
            </div>

            <div>
              <button className='bg-primary text-white text-center text-xs font-semibold w-full rounded-sm py-2 uppercase'>{loading ?  <span>Processing...</span> : 'Login'}</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
