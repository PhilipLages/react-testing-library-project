import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Testing the "FavoritePokemons" component', () => {
  it('should have a message if there is no favorite pokémon', () => {
    renderWithRouter(<FavoritePokemons />);

    const noPokemonMsg = screen.getByText(/No favorite pokemon found/i);

    expect(noPokemonMsg).toBeInTheDocument();
  });
});
