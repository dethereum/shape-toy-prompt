/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'

import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';


describe('App', () => {
  it('should render a canvas', () => {
    render(<App />)

    const canvas = screen.getByRole('img', {
      name: /draw shapes here/i
    })

    expect(canvas).toContainHTML('<canvas aria-label="Draw shapes here" role="img"/>')
  })
})