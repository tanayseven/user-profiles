import React, { useEffect, useState } from 'react'
import { UsersResponse } from '../types/UsersResponse'
import { ComponentState } from '../types/ComponentState'
import { Link } from 'react-router-dom'

interface Props {
  page: number
  setPage: (page: number) => void
  updateCurrentUser: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export const UsersList: React.FC<Props> = ({ page, setPage, updateCurrentUser }) => {
  const numberOfUsersPerPage = 5
  const [users, setUsers] = useState<UsersResponse>([])
  const [componentState, setComponentState] = useState<ComponentState>(ComponentState.LOADING)
  const [errorMessage, setErrorMessage] = useState<string>('')

  function fetchUsers() {
    fetch(`/api/user-list/${numberOfUsersPerPage}/${page}`)
      .then((response) =>
        response.json().then((json: UsersResponse) => {
          setUsers(json)
          setComponentState(ComponentState.LOADED)
        }),
      )
      .catch((error) => {
        setErrorMessage(`Error fetching data from the server: ${error}`)
        setComponentState(ComponentState.ERROR)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [users])

  if (componentState === ComponentState.LOADING) return <p>Loading...</p>

  if (componentState === ComponentState.ERROR) return <p>{errorMessage}</p>

  return (
    <div>
      <h1>User List</h1>
      <p>Page: {page}</p>
      <input
        type="button"
        value="Previous Page"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1)
            fetchUsers()
          }
        }}
      />
      <input
        type="button"
        value="Next Page"
        onClick={() => {
          if (page < 20) {
            setPage(page + 1)
            fetchUsers()
          }
        }}
      />
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <img src={user.picture.thumbnail} alt="profile-picture" />
            <p>
              Title: <span>{user.name.title}</span>
            </p>
            <p>
              First Name: <span>{user.name.first}</span>
            </p>
            <p>
              Last Name: <span>{user.name.last}</span>
            </p>
            <Link to={`/user-profile/${index}`} rel={`${index}`} onClick={updateCurrentUser}>
              View/Edit full profile
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
