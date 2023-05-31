import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] =useState('')

  const navigate = useNavigate()

  //handle the success notify
  const succesNotify = () => {
    toast.success('login successfully, redirecting...'), {
      position: toast.POSITION.TOP_RIGHT
    }
  }
  
  //handle the errors notify
  const errorNotify = (message: string) => {
    toast.error(message), {
      position: toast.POSITION.TOP_RIGHT
    }
  }

  //To handle Login submit. 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    axios.post('https://staging-api.takyon.io/auth/login', { email, password })
      .then(resp => {

        if (resp.status === 200) {
          console.log(resp.data);
          
          succesNotify()
          setEmail('')
          setPassword('')

          setTimeout(() => {
            navigate('/')
          }, 2000);
        }

      }).catch((err) => {

        setError(err.response.data.message);
        errorNotify(err.response.data.message)

      }).finally(() => {

        setIsLoading(false)
      })

    new Notification('login')

  }

  return (
    <div className="bg-secondary">
      <div className="max-w-[1100px] h-[calc(100vh-80px)] mx-auto flex items-center justify-center relative overflow-hidden">
        <ToastContainer />

        {/* login form */}
        <div className="bg-white rounded-md py-5 px-4 border w-4/5 max-w-[400px]">
          <form onSubmit={(e) => { handleSubmit(e) }} >
            <h2 className="text-xl mb-6">Login</h2>

            <div className='mb-4'>
              <label>
                <div className='text-xs mb-1 text-t-secondary'>Email</div>
                <input required value={email} type="email" onChange={(e) => setEmail(e.target.value)} className={`border ${error.includes('email')? 'border-2 border-red-500' : ''} rounded-sm bg-light-primary py-1 px-2 focus:outline-gray-400 w-full`} />
                {error.includes('email') && <p className='text-xs text-red-500'>- Email not valid</p>}
              </label>
            </div>

            <div className='mb-8'>
              <label>
                <div className='text-xs mb-1 text-t-secondary'>Password</div>
                <input required value={password} type="password" onChange={(e) => setPassword(e.target.value)} className={`border ${error.includes('Password')? 'border-2 border-red-500' : ''} rounded-sm bg-light-primary py-1 px-2 focus:outline-gray-400 w-full`} />
                {error.includes('Password') && <p className='text-xs text-red-500'>- password not valid</p>}
              </label>
            </div>

            <div>
              <button className='bg-primary text-white text-center text-xs font-semibold w-full rounded-sm py-2 uppercase'>{isLoading ?  <span>Processing...</span> : 'Login'}</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
