import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search form', () => {
  render(<App />);
  const element = screen.getByTestId('search-form');
  expect(element).toBeInTheDocument();
});

test('renders search button', () => {
  render(<App />);
  const element = screen.getByTestId('search-button');
  expect(element).toBeInTheDocument();
});