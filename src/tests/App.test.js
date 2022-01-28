import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    const linkToFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorites).toBeInTheDocument();
  });

  it('é redirecionada para a URL /, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    const linkToAbout = screen.getByRole('link', { name: /About/i });

    userEvent.click(linkToAbout);
    userEvent.click(linkToHome);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('é redirecionada para a URL /about, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: /About/i });

    userEvent.click(linkToAbout);
    const { location: { pathname } } = history;
    const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

    expect(pathname).toBe('/about');
    expect(title).toBeInTheDocument();
  });

  it('é redirecionada para a URL /favorites, ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const linkToFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(linkToFavorites);
    const { location: { pathname } } = history;
    const title = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });

    expect(pathname).toBe('/favorites');
    expect(title).toBeInTheDocument();
  });
  it('é redirecionada para a Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Tchurusbango-thurusbago');

    const title = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    
    expect(title).toBeInTheDocument();
  });
});
