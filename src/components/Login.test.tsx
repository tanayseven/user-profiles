import React from 'react'
import { Router } from 'react-router'
import { Login } from './Login'
import { fireEvent, render, screen } from '@testing-library/react'
import { createBrowserHistory } from 'history'

it('should go to the users list screen with correct login credentials', () => {
  // given
  const history = createBrowserHistory()
  history.replace('/')
  render(
    <Router history={history}>
      <Login />
    </Router>,
  )
  const usernameTextBox = screen.getByPlaceholderText('username')
  const passwordTextBox = screen.getByPlaceholderText('password')
  const loginButton = screen.getByText('Login')

  // when
  fireEvent.change(usernameTextBox, { target: { value: 'admin' } })
  fireEvent.change(passwordTextBox, { target: { value: 'admin' } })
  fireEvent.click(loginButton)

  // then
  const currentLocation = history.location.pathname
  expect(currentLocation).toEqual('/users-list/1')
  const errorMessage = screen.queryByText('Invalid username/password entered, please try again')
  expect(errorMessage).toBeFalsy()
})

it('should show error message when logged in with wrong login credentials', () => {
  // given
  const history = createBrowserHistory()
  history.replace('/')
  render(
    <Router history={history}>
      <Login />
    </Router>,
  )
  const usernameTextBox = screen.getByPlaceholderText('username')
  const passwordTextBox = screen.getByPlaceholderText('password')
  const loginButton = screen.getByText('Login')

  // when
  fireEvent.change(usernameTextBox, { target: { value: 'foo' } })
  fireEvent.change(passwordTextBox, { target: { value: 'bar' } })
  fireEvent.click(loginButton)

  // then
  const currentLocation = location.pathname
  expect(currentLocation).toEqual('/')
  const errorMessage = screen.getByText('Invalid username/password entered, please try again')
  expect(errorMessage).toBeInTheDocument()
})
