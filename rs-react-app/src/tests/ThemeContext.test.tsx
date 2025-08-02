import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from '../theme/ThemeContext';
import userEvent from '@testing-library/user-event';

function TestComponent() {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={changeTheme}>Toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('provides default theme as light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('toggles theme between light and dark', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeText = screen.getByTestId('theme');
    const toggleButton = screen.getByRole('button', { name: /toggle/i });

    expect(themeText.textContent).toBe('light');

    await user.click(toggleButton);
    expect(themeText.textContent).toBe('dark');

    await user.click(toggleButton);
    expect(themeText.textContent).toBe('light');
  });
});
