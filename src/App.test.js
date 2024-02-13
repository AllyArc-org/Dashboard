/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false, // This represents whether the media query matches or not
    media: query, // The media query string
    onchange: null, // A function that will be called when the matched status changes
    addListener: jest.fn(), // Deprecated, use addEventListener instead
    removeListener: jest.fn(), // Deprecated, use removeEventListener instead
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
})

test('renders loading spinner', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
})
