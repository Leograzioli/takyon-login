import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className=" bg-primary">
        <div className="max-w-[1100px] h-[80px] mx-auto flex items-center justify-between px-4 xl:px-0">
            <img className="h-[50px]" src="/assets/takyon-logo.jpg" alt="logo takyon" />

            <nav className="text-white font-semibold capitalize ">
              <ul className='flex gap-x-4'>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'border-b-2 border-white hover:text-gray-500 hover:border-b-gray-500' : 'hover:text-gray-500 hover:border-b-gray-500'} to={'/login'}>Login</NavLink>
                </li>
                <li>
                  <NavLink className={({ isActive }) => isActive ? 'border-b-2 border-white hover:text-gray-500 hover:border-b-gray-500' : 'hover:text-gray-500 hover:border-b-gray-500'} to={'/'}>home</NavLink>
                </li>
              </ul>
            </nav>

        </div>
    </header>
  )
}
