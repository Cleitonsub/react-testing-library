import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByAltText(/Pikachu sprite/i);

    expect(pokeName.innerHTML).toBe('Pikachu');
    expect(pokeType.innerHTML).toBe('Electric');
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokeImg).toHaveProperty('alt', 'Pikachu sprite');
    expect(pokeImg).toHaveProperty(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('Teste se o card indicado contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });

    expect(linkToDetails).toBeInTheDocument();
    expect(linkToDetails).toHaveProperty('href', 'http://localhost/pokemons/25');
  });

  it('O link de navegação é redirecionado da aplicação para a página de detalhes', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);
    const title = screen.getByRole('heading', { name: /Pikachu Details/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('Teste se a URL exibida muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const pokeFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(pokeFavorite);

    const pokeImg = screen.getByAltText(
      /Pikachu is marked as favorite/i,
    );
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(pokeImg).toHaveProperty('alt', 'Pikachu is marked as favorite');
  });
});
