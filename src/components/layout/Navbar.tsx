import LogoutButton from "@/features/auth/component/Logout"
import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-linear-to-br from-[#303238] to-[#141242]">
      <nav
        className="glass-nav px-6 py-4 md:px-12 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* Logo / Home */}
        <Link
          to="/movies"
          className="flex items-center gap-2 rounded-theme focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span
            className="w-10 h-10 bg-blue-700 rounded-sm flex items-center justify-center font-bold text-xl text-white"
            aria-hidden="true"
          >
            M
          </span>

          <span className="text-xl font-bold tracking-tight hidden sm:block text-white">
            MOVIE<span className="text-blue-700">DATA</span>
          </span>

          <span className="sr-only">
            Ir a la página principal MovieData
          </span>
        </Link>

        {/* Acciones */}
        <ul className="flex items-center">
          <li>
            <LogoutButton textColor = "text-white" />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar