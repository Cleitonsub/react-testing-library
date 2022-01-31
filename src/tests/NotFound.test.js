import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const titleH2 = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });

    expect(titleH2).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const pokeImg = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );

    expect(pokeImg).toBeInTheDocument();
    // .toHaveProperty(keyPath, value?) encontrado por pesquisa na documentação do JEST, link:
    // https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value
    expect(pokeImg).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(pokeImg).toHaveProperty(
      'alt',
      'Pikachu crying because the page requested was not found',
    );
  });
});
