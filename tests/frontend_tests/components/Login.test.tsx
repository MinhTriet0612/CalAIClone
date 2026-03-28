import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

// Mock AuthContext
const mockLogin = vi.fn();
const mockSignup = vi.fn();

vi.mock('../../../frontend/src/contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null,
    loading: false,
    login: mockLogin,
    signup: mockSignup,
    logout: vi.fn(),
    token: null,
  }),
}));

import { Login } from '../../../frontend/src/components/Login';

function renderLogin() {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
}

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render sign in form by default', () => {
    renderLogin();

    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Password')).toBeDefined();
  });

  it('should toggle between sign in and sign up', async () => {
    renderLogin();

    const toggleButton = screen.getByText("Don't have an account? Sign up");
    fireEvent.click(toggleButton);

    expect(screen.getByText('Sign Up')).toBeDefined();
    expect(
      screen.getByText('Already have an account? Sign in'),
    ).toBeDefined();
  });

  it('should call login on form submit in sign in mode', async () => {
    mockLogin.mockResolvedValue(undefined);
    renderLogin();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should call signup on form submit in sign up mode', async () => {
    mockSignup.mockResolvedValue(undefined);
    renderLogin();
    const user = userEvent.setup();

    fireEvent.click(screen.getByText("Don't have an account? Sign up"));

    await user.type(screen.getByLabelText('Email'), 'new@example.com');
    await user.type(screen.getByLabelText('Password'), 'newpassword');

    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('new@example.com', 'newpassword');
    });
  });

  it('should display error message on auth failure', async () => {
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));
    renderLogin();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrong');

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeDefined();
    });
  });

  it('should disable inputs while loading', async () => {
    // Make login hang indefinitely
    mockLogin.mockImplementation(() => new Promise(() => {}));
    renderLogin();
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password');

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeDefined();
    });
  });
});
