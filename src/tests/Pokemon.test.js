import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import { Pokemon } from '../components';
import App from '../App';
import pokemons from '../data';

describe('Testing the "Pokemon" component', () => {
  const ekans = pokemons.find(({ name }) => name === 'Ekans');
  const { id, name, type, averageWeight: { value, measurementUnit }, image } = ekans;

  it('should render the pokemon component with its informations', () => {
    renderWithRouter(<Pokemon pokemon={ ekans } isFavorite />);

    const nameElement = screen.getByText(name, { selector: 'p' });
    const typeElement = screen.getByText(type, { selector: 'p' });
    const weightElement = screen
      .getByText(`Average weight: ${value} ${measurementUnit}`, { selector: 'p' });
    const imgElement = screen.getByAltText(`${name} sprite`);

    expect(nameElement).toBeInTheDocument();
    expect(typeElement).toBeInTheDocument();
    expect(weightElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(image);
  });

  it('should have a link to pokémon details', () => {
    renderWithRouter(<Pokemon pokemon={ ekans } isFavorite />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    const URL = 'http://localhost/pokemons/23';

    expect(detailsBtn).toHaveProperty('href', URL);
  });

  it('should redirect correctly after pressing "more details"', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ ekans } isFavorite />);

    const detailsBtn = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailsBtn);
    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
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
