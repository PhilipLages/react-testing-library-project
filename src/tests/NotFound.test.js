import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testing the "NotFound" component', () => {
  it('should contain a heading with "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });

  it('should contain an image for no pokémons found', () => {
    renderWithRouter(<NotFound />);

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgAlt = 'Pikachu crying because the page requested was not found';

    const img = screen.getByAltText(imgAlt);

    expect(img.src).toBe(URL);
  });
});
