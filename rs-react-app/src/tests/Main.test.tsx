import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StrictMode } from 'react';
import React from 'react';

const renderMock = vi.fn();
const createRootMock = vi.fn(() => ({ render: renderMock }));

vi.mock('react-dom/client', () => ({
  createRoot: createRootMock,
}));

describe('main application element', () => {
  const originalConsoleError = console.error;
  const originalGetElementById = document.getElementById;

  beforeEach(() => {
    console.error = vi.fn();

    document.getElementById = vi.fn((id) => {
      if (id === 'root') {
        return document.createElement('div');
      }
      return null;
    });
  });

  afterEach(() => {
    console.error = originalConsoleError;
    document.getElementById = originalGetElementById;
    vi.restoreAllMocks();
  });

  it('creates root and renders app', async () => {
    const rootDiv = document.createElement('div');
    document.getElementById = vi.fn(() => rootDiv);

    await import('../main');

    expect(document.getElementById).toHaveBeenCalledWith('root');
    expect(createRootMock).toHaveBeenCalledWith(rootDiv);
    expect(renderMock).toHaveBeenCalledTimes(1);

    const renderedElement = renderMock.mock.calls[0][0];
    expect(renderedElement.type).toBe(StrictMode);
  });

  it('throws error when root element is missing', async () => {
    document.getElementById = vi.fn(() => null);

    vi.resetModules();

    await expect(import('../main')).rejects.toThrow('Root element not found');
  });

  it('renders App inside ErrorBoundary and StrictMode', async () => {
    const rootDiv = document.createElement('div');
    document.getElementById = vi.fn(() => rootDiv);

    vi.resetModules();
    await import('../main');

    expect(renderMock).toHaveBeenCalledTimes(1);
    const rendered = renderMock.mock.calls[0][0];

    expect(rendered.type).toBe(React.StrictMode);

    const errorBoundary = rendered.props.children;
    expect(errorBoundary.type.name).toBe('ErrorBoundary');
    expect(errorBoundary.props.children.type.name).toBe('App');
  });
});
