import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';

describe('Testing the "Pokédex" component', () => {
  it('should contain a heading with "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);

    const pokemonsTitle = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });

    expect(pokemonsTitle).toBeInTheDocument();
  });

  it('should have filter by type buttons with data-testId="pokemon-type-button"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);

    const SEVEN = 7;
    const typeBtns = screen.getAllByTestId('pokemon-type-button');

    expect(typeBtns).toHaveLength(SEVEN);
  });

  it('should filter the correct pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);

    const poisonBtn = screen.getByRole('button', { name: 'Poison' });

    userEvent.click(poisonBtn);

    const ekans = screen.getByText('Ekans', { selector: 'p' });

    expect(ekans).toBeInTheDocument();
  });

  it('should have "próximo pokémon" button enable', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ { 25: false } }
    />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
  });
});
