import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { UsersList } from './UsersList'
import { MemoryRouter } from 'react-router'

it('should be initially in login state', () => {
  const setPage = () => {
    console.log('Page')
  }
  const updateCurrentUser = () => {
    console.log('No action needed')
  }
  // given
  render(<UsersList page={1} setPage={setPage} updateCurrentUser={updateCurrentUser} />)

  const loadingMessage = screen.getByText('Loading...')

  expect(loadingMessage).toBeInTheDocument()
})

it('should successfully load first five users', async () => {
  //given
  const setPage = () => {
    console.log('Page')
  }
  const updateCurrentUser = () => {
    console.log('No action needed')
  }
  render(
    <MemoryRouter>
      <UsersList page={1} setPage={setPage} updateCurrentUser={updateCurrentUser} />
    </MemoryRouter>,
  )

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
  // given
  let page = 1
  const setPage = () => {
    page = 2
  }
  const updateCurrentUser = () => {
    console.log('No action needed')
  }

  render(
    <MemoryRouter>
      <UsersList page={page} setPage={setPage} updateCurrentUser={updateCurrentUser} />
    </MemoryRouter>,
  )
  const nextPageButton = await screen.findByText(/Next Page/)

  // when
  fireEvent.click(nextPageButton)

  // re-render the same component with updated props
  render(
    <MemoryRouter>
      <UsersList page={page} setPage={setPage} updateCurrentUser={updateCurrentUser} />
    </MemoryRouter>,
  )

  // then
  const usersFirstNames = [
    await screen.findByText(/تارا/),
    await screen.findByText(/Soan/),
    await screen.findByText(/Leah/),
    await screen.findByText(/Felicia/),
    await screen.findByText(/Brielle/),
  ]
  const usersLastNames = [
    await screen.findByText(/صدر/),
    await screen.findByText(/Blanchard/),
    await screen.findByText(/Singh/),
    await screen.findByText(/Simmons/),
    await screen.findByText(/Brown/),
  ]
  usersFirstNames.forEach((user) => {
    expect(user).toBeInTheDocument()
  })
  usersLastNames.forEach((user) => {
    expect(user).toBeInTheDocument()
  })
})
