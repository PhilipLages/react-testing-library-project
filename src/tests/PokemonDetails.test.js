import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing the "PokemonDetails" component', () => {
  const ekans = pokemons.find(({ name }) => name === 'Ekans');
  const { id, name, foundAt } = ekans;
  const locations = foundAt.find((location) => location);
  const { location, map } = locations;

  it('should render PokemonDetails with its informations', () => {
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${id}`);

    const detTitle = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    const summaryTitle = screen.getByRole('heading', { level: 2, name: /summary/i });
    const summaryText = screen.getByText(/It can freely detach/i, { selector: 'p' });

    expect(detTitle).toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });

  it('should contain location maps for the selected pokemon', () => {
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${id}`);

    const locationsTitle = screen
      .getByRole('heading', { level: 2, name: `Game Locations of ${name}` });
    const img = screen.getByAltText(`${name} location`);
    const locationtext = screen.getByText(location, { selector: 'em' });

    expect(locationsTitle).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(locationtext).toBeInTheDocument();
    expect(img.src).toBe(map);
  });

  it('should check the checkbox after pressing it', () => {
    const { history } = renderWithRouter(<App />);

    history.push(`/pokemons/${id}`);

    const checkbox = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    const favoriteImg = screen.getByAltText(`${name} is marked as favorite`);

    expect(favoriteImg.src).toBe('http://localhost/star-icon.svg');
  });
});
