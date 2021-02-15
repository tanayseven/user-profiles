import React from 'react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { MemoryRouter, Route } from 'react-router'
import { UserProfile } from './UserProfile'
import { fireEvent, render, screen } from '@testing-library/react'

const renderComponent = ({ userLoginUuid, history }: { userLoginUuid: string; history: MemoryHistory }) =>
  render(
    <MemoryRouter initialEntries={[`/users-profile/${userLoginUuid}`]}>
      <Route path="/users-profile/:userLoginUuid" history={history}>
        <UserProfile history={history} />
      </Route>
    </MemoryRouter>,
  )

it('should be initially in login state', async () => {
  // given
  const history = createMemoryHistory()
  renderComponent({ userLoginUuid: '6395346c-b109-49d9-8a62-7598802e00ef', history })

  const loadingMessage = screen.getByText('Loading...')

  expect(loadingMessage).toBeInTheDocument()
  await screen.findByText('User profile')
})

it('should display all editable fields when loaded', async () => {
  //given
  const history = createMemoryHistory()

  // when
  renderComponent({ userLoginUuid: '6395346c-b109-49d9-8a62-7598802e00ef', history })

  // then
  const titleField = await screen.findByText(/Title/)
  const firstNameField = await screen.findByText(/First Name/)
  const lastNameField = await screen.findByText(/Last Name/)
  expect(titleField).toBeInTheDocument()
  expect(firstNameField).toBeInTheDocument()
  expect(lastNameField).toBeInTheDocument()
})

it('should be go back to the previous page on clicking the back button', async () => {
  // given
  const history = createMemoryHistory()
  history.replace('/users-profile/1')
  renderComponent({ userLoginUuid: '6395346c-b109-49d9-8a62-7598802e00ef', history })
  const backButton = await screen.findByText(/Back/)

  // when
  fireEvent.click(backButton)

  // then
  expect(history.location.pathname).toEqual('/users-profile/1')
})
