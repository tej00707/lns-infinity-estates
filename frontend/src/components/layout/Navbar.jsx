import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../services/auth.js'
import { useAuth } from '../../hooks/useAuth.js'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150
        ${isActive
          ? 'text-zinc-900 bg-zinc-100'
          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const { loggedIn, adminUser, user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="white" fillOpacity="0.9"/>
                <path d="M8 4L11 6V10L8 12L5 10V6L8 4Z" fill="white" fillOpacity="0.4"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-zinc-900 leading-none">LNS Infinity</span>
              <span className="block text-xs text-zinc-500 leading-none mt-0.5">Estates</span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/properties">Properties</NavItem>
            {loggedIn && !adminUser && (
              <NavItem to="/favorites">Saved</NavItem>
            )}
            {loggedIn && adminUser && (
              <>
                <NavItem to="/admin/properties">Properties</NavItem>
                <NavItem to="/admin/inquiries">Inquiries</NavItem>
              </>
            )}
          </nav>

          {/* Auth Controls */}
          <div className="hidden md:flex items-center gap-3">
            {loggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center">
                    <span className="text-xs font-medium text-white leading-none">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-medium text-zinc-900 leading-none">{user?.name}</p>
                    {adminUser && <p className="text-xs text-zinc-500 mt-0.5">Admin</p>}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer px-2 py-1.5 rounded-lg hover:bg-zinc-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-50"
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/register"
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
                >
                  Get started
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4l12 12M16 4L4 16"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 6h14M3 10h14M3 14h14"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-4 pb-4 pt-2">
          <div className="flex flex-col gap-1">
            <MobileNavItem to="/" onClick={() => setMobileOpen(false)}>Home</MobileNavItem>
            <MobileNavItem to="/properties" onClick={() => setMobileOpen(false)}>Properties</MobileNavItem>
            {loggedIn && !adminUser && (
              <MobileNavItem to="/favorites" onClick={() => setMobileOpen(false)}>Saved</MobileNavItem>
            )}
            {loggedIn && adminUser && (
              <>
                <MobileNavItem to="/admin/properties" onClick={() => setMobileOpen(false)}>Manage Properties</MobileNavItem>
                <MobileNavItem to="/admin/inquiries" onClick={() => setMobileOpen(false)}>Manage Inquiries</MobileNavItem>
              </>
            )}
            <div className="mt-3 pt-3 border-t border-zinc-100">
              {loggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg cursor-pointer"
                >
                  Sign out
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <MobileNavItem to="/login" onClick={() => setMobileOpen(false)}>Sign in</MobileNavItem>
                  <MobileNavItem to="/register" onClick={() => setMobileOpen(false)}>Get started</MobileNavItem>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function MobileNavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
        ${isActive ? 'text-zinc-900 bg-zinc-100' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'}`
      }
    >
      {children}
    </NavLink>
  )
}
