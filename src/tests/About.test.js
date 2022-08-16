import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../pages/About';

describe('Testing the "About" component', () => {
  it('should render the component "About"', () => {
    renderWithRouter(<About />);
  });

  it('should contain a h2 heading with the text "About Pokédex"', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('should contain two paragraphs with information about the Pokédex', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/This application simulates/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('should contain an image of a Pokédex', () => {
    renderWithRouter(<About />);

    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText('Pokédex');

    expect(img.src).toBe(URL);
  });
});
