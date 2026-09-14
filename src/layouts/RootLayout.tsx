import { NavLink, Outlet } from 'react-router'
import { PATHS } from '@/routes/paths'
import svgLogo from '@/assets/logo.svg'

export function RootLayout() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative h-full flex items-center px-2 text-sm font-medium transition-colors ${isActive
      ? 'text-txt-main font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand after:rounded-full'
      : 'text-txt-secondary hover:text-txt-main hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-border-hover hover:after:rounded-full'
    }`

  return (
    <div className="min-h-screen flex flex-col bg-app text-txt-main">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center flex-1 justify-start">
            <NavLink
              to={PATHS.HOME}
              className="flex items-center gap-2 group font-heading font-bold text-xl tracking-tight text-txt-main hover:text-brand transition-colors"
            >
              <img src={svgLogo} alt="LyfeTools" className="w-9 h-9 transition group-hover:rotate-12" />
              <span className="hidden sm:inline">LyfeTools</span>
            </NavLink>
          </div>

          <nav className="flex items-center justify-center gap-8 h-full">
            <NavLink to={PATHS.HOME} end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to={PATHS.TOOLS} className={navLinkClass}>
              Tools
            </NavLink>
          </nav>

          <div className="flex items-center flex-1 justify-end">
            <a
              href="https://github.com/lyfesan"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg text-black hover:bg-surface-subtle transition-colors"
              aria-label="GitHub repository"
              title="GitHub repository"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-surface py-6 text-center text-sm text-txt-muted">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} <a href="https://github.com/lyfesan/" className="font-semibold">lyfesan</a>. Licensed under <a href="https://www.gnu.org/licenses/gpl-3.0" className="font-semibold">GPL-3.0</a>.</p>
        </div>
      </footer>
    </div>
  )
}
