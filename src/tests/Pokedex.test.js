import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const titleH2 = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(titleH2).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const buttonNextPoke = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonNextPoke).toBeInTheDocument();
    expect(buttonNextPoke).toHaveTextContent('Próximo pokémon');

    const pokeName = screen.getByText(/Pikachu/i);
    expect(pokeName.innerHTML).toBe('Pikachu');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Charmander');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Caterpie');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Ekans');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Alakazam');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Mew');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Rapidash');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Snorlax');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Dragonair');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Pikachu');
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const buttonsFilter = screen.getAllByTestId(/pokemon-type-button/i);
    const buttonAllPoke = screen.getByRole('button', { name: /All/i });

    expect(buttonAllPoke).toBeInTheDocument();
    expect(buttonAllPoke).toHaveTextContent('All');
    expect(buttonsFilter[0]).toHaveTextContent('Electric');
    expect(buttonsFilter[1]).toHaveTextContent('Fire');
    expect(buttonsFilter[2]).toHaveTextContent('Bug');
    expect(buttonsFilter[3]).toHaveTextContent('Poison');
    expect(buttonsFilter[4]).toHaveTextContent('Psychic');
    expect(buttonsFilter[5]).toHaveTextContent('Normal');
    expect(buttonsFilter[6]).toHaveTextContent('Dragon');

    userEvent.click(buttonsFilter[1]);

    const pokeName = screen.getByText(/Charmander/i);
    expect(pokeName.innerHTML).toBe('Charmander');
    const buttonNextPoke = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Rapidash');
    userEvent.click(buttonNextPoke);
    expect(pokeName.innerHTML).toBe('Charmander');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const buttonsFilter = screen.getAllByTestId(/pokemon-type-button/i);
    userEvent.click(buttonsFilter[1]); // Cliquei no botão Fire

    const pokeName = screen.getByText(/Charmander/i);
    expect(pokeName.innerHTML).toBe('Charmander');

    const buttonAllPoke = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAllPoke); // Cliquei no botão All

    expect(pokeName.innerHTML).toBe('Pikachu');
    expect(buttonAllPoke).toBeInTheDocument();
    expect(buttonAllPoke).toHaveTextContent('All');
  });
});
