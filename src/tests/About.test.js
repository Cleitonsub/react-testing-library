import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );

    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutPokedex1P = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all/i,
    );
    const aboutPokedex2P = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );

    expect(aboutPokedex1P).toBeInTheDocument();
    expect(aboutPokedex2P).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem correta de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imgLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokeImg = screen.getByAltText(/pokédex/i);

    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg).toHaveProperty('src', imgLink);
    expect(pokeImg).toHaveProperty('alt', 'Pokédex');
  });
});
