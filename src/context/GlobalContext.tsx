import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface GlobalState {
  theme: 'light' | 'dark';
  // ... other state properties
}

type ActionType = 
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  // ... other action types

const initialState: GlobalState = {
  theme: typeof window !== 'undefined' 
    ? localStorage.getItem('theme') as 'light' | 'dark' || 'light'
    : 'light',
  // ... other initial state
};

const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

const globalReducer = (state: GlobalState, action: ActionType): GlobalState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return {
        ...state,
        theme: newTheme,
      };
    case 'SET_THEME':
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
      }
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Apply theme class to both html and body
  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.body.classList.add('bg-gray-900'); // Add background color
      document.body.classList.remove('bg-white');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.body.classList.remove('bg-gray-900');
      document.body.classList.add('bg-white'); // Add background color
    }
  }, [state.theme]);

  useEffect(() => {
    document.body.classList.add('h-[100vh]');
  }, [])

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
}; 