import React from 'react'
import { useGlobalState } from '../context/GlobalContext'
import { Sun as SunIcon } from "@styled-icons/fa-solid"
import { Moon as MoonIcon } from "@styled-icons/fa-solid"

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { state, dispatch } = useGlobalState()

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {state.theme === 'light' ? (
        <MoonIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      ) : (
        <SunIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  )
}

export default ThemeToggle 