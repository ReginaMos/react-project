import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

vi.mock('../pages/HomePage', () => ({
  default: () => <div>Mocked Home Page</div>,
}));

vi.mock('../pages/AboutPage', () => ({
  default: () => <div>Mocked About Page</div>,
}));

vi.mock('../pages/DetailPage', () => ({
  default: () => <div>Mocked Detail Page</div>,
}));

vi.mock('../pages/NotFoundPage', () => ({
  default: () => <div>Mocked Not Found Page</div>,
}));

describe('App component routing', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('redirects from / to /1 and renders HomePage', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Mocked Home Page')).toBeInTheDocument();
  });

  it('renders AboutPage on /about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Mocked About Page')).toBeInTheDocument();
  });
});
