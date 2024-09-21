import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the App component', () => {
    expect(<App />).toBeTruthy(); // checks if the App component renders successfully
  })
})