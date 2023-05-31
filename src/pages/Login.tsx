import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Login() {

  type User = {
    email: string,
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<User | null>(null)
  const [notify, setNotify] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  //To handle Login submit. 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    axios.post('https://staging-api.takyon.io/auth/login', { email, password })
      .then(resp => {

        if (resp.status === 200) {
          setUser(resp.data);
          setNotify(true)
          console.log(resp.data);
        }

      }).catch(err => {
        console.log(err.response);

      }).finally(() => {

        setIsLoading(false)

        setTimeout(() => {
          navigate('/')
        }, 1000);

      })

    new Notification('login')

  }
  return (
    <div className="bg-secondary">
      <div className="max-w-[1100px] h-[calc(100vh-80px)] mx-auto flex items-center justify-center relative overflow-hidden">

        {/* login form */}
        <div className="bg-white rounded-md py-5 px-4 border w-4/5 max-w-[400px]">
          <form onSubmit={(e) => { handleSubmit(e) }} >
            <h2 className="text-xl mb-6">Login</h2>

            <div className='mb-4'>
              <label>
                <div className='text-xs mb-1 text-t-secondary'>Email</div>
                <input required type="email" onChange={(e) => setEmail(e.target.value)} className="border rounded-sm bg-light-primary py-1 px-2 focus:outline-gray-400 w-full" />
              </label>
            </div>

            <div className='mb-8'>
              <label>
                <div className='text-xs mb-1 text-t-secondary'>Password</div>
                <input required type="password" onChange={(e) => setPassword(e.target.value)} className="border rounded-sm bg-light-primary py-1 px-2 focus:outline-gray-400 w-full" />
              </label>
            </div>

            {notify && user &&
              <div className='mb-2 bg-green-300 w-2/3 mx-auto text-center py-0.5 rounded text-white font-bold'>
                You are Loged-in
              </div>
            }

            <div>
              <button className='bg-primary text-white text-center text-xs font-semibold w-full rounded-sm py-2 uppercase'>{isLoading ? <div>loading</div> : 'Login'}</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
