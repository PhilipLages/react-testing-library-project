import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testing the "App" component', () => {
  it('should contain a fixed number of navigation links', () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link');
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(links[0]).toBe(homeLink);
    expect(links[1]).toBe(aboutLink);
    expect(links[2]).toBe(favoriteLink);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should redirect to "/" after clicking the "Home" link', () => {
    const { history: { location } } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = location;
    expect(pathname).toBe('/');
  });

  it('should redirect to "/about" after clicking "About"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should redirect to "/favorites" after clicking "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('should redirect to "Not Found" page with unknown URL', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/anything');

    const notFound = screen.getByRole('heading', { level: 2, name: /Page requested/i });

    expect(notFound).toBeInTheDocument();
  });
});
