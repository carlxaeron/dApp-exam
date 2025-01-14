import * as React from "react"
import { Home as HomeIcon } from "@styled-icons/fa-solid"
import { Wallet as WalletIcon } from "@styled-icons/fa-solid"
import { Sun as SunIcon } from "@styled-icons/fa-solid"
import { Link } from "gatsby"
import ThemeToggle from "./ThemeToggle"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const getLinkClassName = (path: string) => {
    const baseClasses = "flex items-center justify-center p-4 cursor-pointer border-b-2"
    return location.pathname === path
      ? `${baseClasses} border-green-400`
      : `${baseClasses} border-transparent hover:border-green-400`
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="text-center mb-4 relative">
        <nav>
          <ul className="flex justify-center items-center text-xs">
            <Link to="/" className={getLinkClassName('/')}>
              <HomeIcon className="HomeIcon h-4" />&nbsp;Home
            </Link>
            <Link to="/wallet" className={getLinkClassName('/wallet/')}>
              <WalletIcon className="WalletIcon h-4" />&nbsp;Wallet
            </Link>
          </ul>
        </nav>
        <ThemeToggle className="w-[1.5rem] absolute right-2 cursor-pointer top-[50%] translate-y-[-50%]" />
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout