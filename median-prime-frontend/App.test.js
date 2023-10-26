
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './src/App';
jest.mock('node-fetch');

const fetch = require('node-fetch');


test('renders the main heading', () => {
  render(<App />);

  const heading = screen.getByText('Median Prime Numbers');

});

test('displays an error message for invalid input', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Enter a number');
  const findButton = screen.getByText('Find Median Primes');

  fireEvent.change(input, { target: { value: 'abc' } });
  fireEvent.click(findButton);

  const error = screen.getByText('Invalid input. Please provide a valid number greater than or equal to 2.');

});

test('fetches and displays median prime numbers for a valid input', async () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Enter a number');
  const findButton = screen.getByText('Find Median Primes');

  fireEvent.change(input, { target: { value: '10' } });
  fireEvent.click(findButton);
  const mockResponse = { data: { medianPrimes: [3, 5] } };
  fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });
  const medianPrimesHeading = await screen.findByText('Median Prime Numbers');
  const primeNumbers = await screen.findAllByText((content, element) => {
    return content === '3' || content === '5';
  });
  expect(primeNumbers).toHaveLength(2);
});
