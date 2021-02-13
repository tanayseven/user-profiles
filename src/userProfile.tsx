import React, { useEffect, useState } from 'react'
import { UserResponse } from './usersResponse'
import { Link, RouteComponentProps } from 'react-router-dom'

type ComponentState = 'loading' | 'loaded' | 'errored'

interface MatchUserProfileParams {
  index: string
}
export const UserProfile: React.FC<RouteComponentProps<MatchUserProfileParams>> = (props) => {
  const [componentState, setComponentState] = useState<ComponentState>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [user, setUser] = useState<UserResponse>()

  function fetchUser() {
    fetch(`/api/user-list/${props.match.params.index}`)
      .then((response) =>
        response.json().then((json: UserResponse) => {
          setUser(json)
          setComponentState('loaded')
        }),
      )
      .catch((error) => {
        setErrorMessage(`Error fetching data from ther server: ${error}`)
        setComponentState('errored')
      })
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (componentState === 'loading') return <p>Loading...</p>

  if (componentState === 'errored') return <p>{errorMessage}</p>

  if (!user) return <p>Could not load user</p>

  return (
    <>
      <h1>User profile</h1>
      <Link to="/">
        <input type="button" value="Home" />
      </Link>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      <input type="button" value="Back" onClick={(__event) => props.history.go(-1)} />
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
