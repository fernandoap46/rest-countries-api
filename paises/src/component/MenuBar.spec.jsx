import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuBar from './MenuBar';

describe('MenuBar component', () => {
  it('should render menu items', () => {
    render(<MenuBar />);

    // Verifica se o texto "Where in the world?" está presente no documento
    const menuItem = screen.getByText('Where in the world?');
    expect(menuItem).toBeInTheDocument();
  });

  it('should render ToggleButton', () => {
    render(<MenuBar />);

    // Verifica se o componente ToggleButton está presente no documento
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });
});
