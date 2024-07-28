import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import LoginScreen from './LoginScreen';

test('renders LoginScreen component', () => {
  const { getByText, getByPlaceholder } = render(<LoginScreen />);
  
  // Check if the component renders the email input field
  const emailInput = getByPlaceholder('Enter Email');
  expect(emailInput).toBeTruthy();
  
  // Check if the component renders the password input field
  const passwordInput = getByPlaceholder('Enter Password');
  expect(passwordInput).toBeTruthy();
  
  // Check if the component renders the "Login" button
  const loginButton = getByText('Login');
  expect(loginButton).toBeTruthy();
});

test('handles login correctly', () => {
  const { getByPlaceholder, getByText } = render(<LoginScreen />);
  
  // Simulate user input for email and password
  const emailInput = getByPlaceholder('Enter Email');
  const passwordInput = getByPlaceholder('Enter Password');
  fireEvent.changeText(emailInput, 'test@example.com');
  fireEvent.changeText(passwordInput, 'password123');
  
  // Simulate button press to trigger login
  const loginButton = getByText('Login');
  fireEvent.press(loginButton);
  
  // TODO using firebase emulator: Add assertions to check if the login logic is working correctly
});