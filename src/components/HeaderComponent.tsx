import { Link } from "react-router-dom";
import { useAuthStorage } from "../store";

export default function HeaderComponent() {
  const { role, username, clearAuth } = useAuthStorage();

  const linkRoles = {
    'ADMIN': [
      { label: 'Create company', path: '/create-company' },
      { label: 'logout', path: '' },
    ],
    'CLIENT': [
      { label: 'My orders', path: '/my-orders' },
      { label: 'logout', path: '' },
    ],
    'VISITOR': [
      { label: 'Sing in', path: '/auth/login' },
    ]
  }

  return (
    <header className="flex flex-row justify-between align-items-center px-10 py-5 border-b-2">
      <Link to={'/'} >
        <h1 className="text-4xl font-bold">Companystrator</h1>
      </Link>
      <nav className="flex flex-row gap-10">
        {username && (<h2 className="text-2xl my-auto font-bold">Welcome {username}</h2>)}
        <ul className="flex flex-row justify-content-center align-items-center gap-2">
          <li>
            <Link to={'/'} className="inline-block text-2xl hover:bg-gray-400 px-4 py-2 rounded-2xl transition-colors">
              Companies
            </Link>
          </li>
          {linkRoles[role].map((link) => (
            (link.label === 'logout'
              ? (
                  <li key={link.label}>
                    <button 
                      onClick={clearAuth}
                      className="text-2xl hover:bg-gray-400 px-4 py-2 rounded-2xl transition-colors cursor-pointer" 
                    >
                      Log out
                    </button>
                  </li>
                )
              : (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="inline-block text-2xl hover:bg-gray-400 px-4 py-2 rounded-2xl transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )
          ))}
        </ul>
      </nav>
    </header>
  )
}
