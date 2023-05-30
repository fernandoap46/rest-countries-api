import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleButton from './ToggleButton';

describe('ToggleButton component', () => {
  it('should render ToggleButton button', () => {
    // Renderiza o componente ToggleButton
    render(<ToggleButton />);

    // Obtém o botão do ToggleButton com base no papel (role)
    const toggleButton = screen.getByRole('button');

    // Verifica se o botão está presente no documento
    expect(toggleButton).toBeInTheDocument();
  });

  it('should toggle state when button is clicked', () => {
    // Renderiza o componente ToggleButton
    render(<ToggleButton />);

    // Obtém o botão do ToggleButton com base no papel (role)
    const toggleButton = screen.getByRole('button');

    // Verifica o estado inicial do botão, que deve estar desativado
    expect(toggleButton.getAttribute('aria-pressed')).toBe('false');

    // Simula um clique no botão
    fireEvent.click(toggleButton);

    // Verifica se o estado do botão foi alterado para ativado após o clique
    expect(toggleButton.getAttribute('aria-pressed')).toBe('true');

    // Simula outro clique no botão
    fireEvent.click(toggleButton);

    // Verifica se o estado do botão foi alterado de volta para desativado após o segundo clique
    expect(toggleButton.getAttribute('aria-pressed')).toBe('false');
  });
});

