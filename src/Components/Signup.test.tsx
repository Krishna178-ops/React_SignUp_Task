import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './Signup'; // Adjust the import path as necessary
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AxiosResponse } from 'axios';

describe('SignUp Component', () => {
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
  });

  it('renders correctly', () => {
    render(<SignUp />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Programming Language')).toBeInTheDocument();
    expect(screen.getByText('Sex')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('allows input to be entered', () => {
    render(<SignUp />);
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    userEvent.type(nameInput, 'John Doe');
    expect(nameInput.value).toBe('John Doe');
  });

  it('submits the form and shows success message', async () => {
    mock.onPost('https://jsonplaceholder.typicode.com/posts').reply(200, {
      id: 1,
      name: "John Doe",
      sex: "Male",
      programmingLanguage: "JavaScript"
    });

    render(<SignUp />);
    
    userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    userEvent.selectOptions(screen.getByLabelText('Programming Language'), ['javascript']);
    userEvent.click(screen.getByLabelText('Male'));

    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Data submitted successfully!')).toBeInTheDocument();
    });
  });

  it('handles server error', async () => {
    mock.onPost('https://jsonplaceholder.typicode.com/posts').networkError();

    render(<SignUp />);
    
    userEvent.type(screen.getByLabelText('Name'), 'John Doe');
    userEvent.selectOptions(screen.getByLabelText('Programming Language'), ['javascript']);
    userEvent.click(screen.getByLabelText('Male'));

    userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });
  });
});