import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route } from 'react-router'
import { UsersList } from './UsersList'
import { createMemoryHistory, MemoryHistory } from 'history'

const renderComponent = ({ pageNum, history }: { pageNum: string; history: MemoryHistory }) =>
  render(
    <MemoryRouter initialEntries={[`/users-list/${pageNum}`]}>
      <Route path="/users-list/:pageNum" history={history}>
        <UsersList />
      </Route>
    </MemoryRouter>,
  )

it('should be initially in login state', async () => {
  // given
  const history = createMemoryHistory()
  renderComponent({ pageNum: '1', history })

  const loadingMessage = screen.getByText('Loading...')

  expect(loadingMessage).toBeInTheDocument()
  await screen.findByText('User List')
})

it('should successfully load first five users', async () => {
  //given
  const history = createMemoryHistory()
  renderComponent({ pageNum: '1', history })

  // then
  const usersFirstNames = [
    await screen.findByText(/Harvey/),
    await screen.findByText(/آیناز/),
    await screen.findByText(/Ayten/),
    await screen.findByText(/Shiva/),
    await screen.findByText(/Tristan/),
  ]
  const usersLastNames = [
    await screen.findByText(/یاسمی/),
    await screen.findByText(/Daniels/),
    await screen.findByText(/Brauner/),
    await screen.findByText(/De Kleine/),
    await screen.findByText(/Ross/),
  ]
  usersFirstNames.forEach((user) => {
    expect(user).toBeInTheDocument()
  })
  usersLastNames.forEach((user) => {
    expect(user).toBeInTheDocument()
  })
})

it('should successfully load next five users on click of next page', async () => {
  //given
  const history = createMemoryHistory()
  history.replace('/users-list/1')
  renderComponent({ pageNum: '1', history })
  const nextPageButton = await screen.findByText(/Next Page/)

  // when
  fireEvent.click(nextPageButton)

  expect(history.location.pathname).toEqual('/users-list/1')
})
