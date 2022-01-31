import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const details = screen.getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    const summary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    const summaryText = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(details).toBeInTheDocument();
    expect(linkToDetails).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas das localizações do pokémon', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const location = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i,
      level: 2,
    });
    const locationImage = screen.getAllByAltText(/Pikachu location/i);

    expect(location).toBeInTheDocument();
    expect(locationImage).toHaveLength(2);
    expect(locationImage[0]).toHaveProperty(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(locationImage[0]).toHaveProperty('alt', 'Pikachu location');
    expect(locationImage[1]).toHaveProperty(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    expect(locationImage[1]).toHaveProperty('alt', 'Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToDetails);

    const pokeFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(pokeFavorite);

    const pokeImg = screen.getByAltText(
      /Pikachu is marked as favorite/i,
    );
    expect(pokeImg).toBeInTheDocument();
  });
});
