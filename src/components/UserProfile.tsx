import React, { useEffect, useState } from 'react'
import { UserResponse } from '../types/UsersResponse'
import { ComponentState } from '../types/ComponentState'
import { Link } from 'react-router-dom'
import { History } from 'history'

interface Props {
  index: string
  history: History
}

export const UserProfile: React.FC<Props> = ({ index, history }) => {
  const [componentState, setComponentState] = useState<ComponentState>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [user, setUser] = useState<UserResponse>()

  function fetchUser() {
    fetch(`/api/user-list/${index}`)
      .then((response) =>
        response.json().then((json: UserResponse) => {
          setUser(json)
          setComponentState('loaded')
        }),
      )
      .catch((error) => {
        setErrorMessage(`Error fetching data from ther server: ${error}`)
        setComponentState('error')
      })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (componentState === 'loading') return <p>Loading...</p>

  if (componentState === 'error') return <p>{errorMessage}</p>

  if (!user) return <p>Could not load user</p>

  return (
    <>
      <h1>User profile</h1>
      <Link to="/">
        <input type="button" value="Home" />
      </Link>
      <button value="Back" onClick={() => history.back()}>
        Back
      </button>
      <img src={user.picture.medium} alt="user-profile-picture" />
      <p>
        Title: {user.name.title} <input type="button" value="Edit" />
      </p>
      <p>
        First Name: {user.name.first} <input type="button" value="Edit" />
      </p>
      <p>
        Last Name: {user.name.last} <input type="button" value="Edit" />
      </p>
      {/* TODO add more details of the user */}
    </>
  )
}
