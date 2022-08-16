import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('Testing the "App" component', () => {
  it('should contain a fixed number of navigation links', () => {
    render(<App />);
  });
});
