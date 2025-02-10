import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const {logout} = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (
    <>
    <div className='flex h-screen'>
      {/* Sidebar de movil */}
      <div className='lg-hidden'>
        <button>
        </button>
      </div>
      <div>
        <aside className='fixed lg:static w-64 bg-gray-800 h-full hidden lg:block transition-transform flex flex-col'>
          <nav className='flex-1 p-4 space-y-2'>
            <NavLink to='/admin' className='block p-2 text-white hover:text-amber-700'>
              Dashboard
            </NavLink>
            <NavLink to='/admin/users' className='block p-2 text-white  hover:text-amber-700'>
              Users
            </NavLink>
            <NavLink to='/admin/settings' className='block p-2 text-white  hover:text-amber-700'>
              Setting
            </NavLink>
          </nav>
          <div className='p-4 border-t border-gray-700'>
            <button 
            onClick={handleLogout}
            className='w-full bg-red-500 text-white rounded p-2 hover:bg-red-800 transition-colors'>
              Logout
            </button>
          </div>
        </aside>
      </div>
      <div>
        <main className='flex-1 p-4'>
          <Outlet />
        </main>
      </div>
    </div>
    </>

  )
}

export default AdminLayout