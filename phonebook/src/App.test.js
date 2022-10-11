import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import App from './App'


describe('<App />', () => {
  it('renders', async () => {
    await act(async () => {
      render(<App />)
    })
    expect(screen.getByText('Phonebook')).toBeVisible()
  })
})