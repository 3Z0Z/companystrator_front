import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-row justify-between align-items-center px-10 py-5 border-b-2">
      <Link to={'/'} >
        <h1 className="text-4xl">Companystrator</h1>
      </Link>
      <nav>
        <ul className="flex flex-row justify-content-center align-items-center gap-10">
          <li>
            <Link to={'/'} className="text-2xl hover:bg-gray-400 px-4 py-2 rounded-2xl transition-colors">Companies</Link>
          </li>
          <li>
            <Link to={'/auth'} className="text-2xl hover:bg-gray-400 px-4 py-2 rounded-2xl transition-colors">Sing in</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
