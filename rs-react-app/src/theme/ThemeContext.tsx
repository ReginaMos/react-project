import { useState } from 'react';
import type { ErrorProps } from '../models/models';
import { ThemeContext } from './theme-context';

export const ThemeProvider = ({ children }: ErrorProps) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext };
