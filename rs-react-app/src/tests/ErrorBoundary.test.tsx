import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';
import Main from '../components/Main';
import type { ItemModel } from '../models/models';

const consoleErrorMock = vi
  .spyOn(console, 'error')
  .mockImplementation(() => {});

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorMock.mockClear();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe Content')).toBeInTheDocument();
    expect(
      screen.queryByText('Ooops! Something went wrong!')
    ).not.toBeInTheDocument();
  });

  it('displays fallback UI when error is caught', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Ooops! Something went wrong!')
    ).toBeInTheDocument();
    expect(screen.getByText('Reload page')).toBeInTheDocument();
  });

  it('logs error to console when error is thrown by child', async () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const BrokenComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(
      await screen.findByText(/Ooops! Something went wrong!/i)
    ).toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalled();

    consoleErrorMock.mockRestore();
  });

  it('handles error thrown by MainComponent crash button', () => {
    const mockItems: ItemModel[] = [
      { name: 'Luke', description: 'Jedi master' },
      { name: 'Vader', description: 'Sith lord' },
    ];

    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Main items={mockItems} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Crash App')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Crash App'));

    expect(
      screen.getByText('Ooops! Something went wrong!')
    ).toBeInTheDocument();
    expect(screen.getByText('Reload page')).toBeInTheDocument();

    expect(consoleErrorMock).toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });

  it('reloads page when reload button is clicked', () => {
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });
    const errorSpy = vi.spyOn(console, 'error');
    errorSpy.mockImplementation(() => {});

    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText('Reload page');
    fireEvent.click(reloadButton);

    expect(reloadMock).toHaveBeenCalledTimes(1);
    errorSpy.mockRestore();
  });
});
