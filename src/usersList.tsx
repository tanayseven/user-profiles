import React, { useEffect, useState } from 'react'
import { UsersResponse } from './usersResponse'
import { Link } from 'react-router-dom'

type ComponentState = 'loading' | 'loaded' | 'errored'

export const UsersList: React.FC = () => {
  const numberOfUsersPerPage = 5
  const [users, setUsers] = useState<UsersResponse>([])
  const [page, setPage] = useState<number>(1)
  const [componentState, setComponentState] = useState<ComponentState>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  function fetchUsers() {
    fetch(`/api/user-list/${numberOfUsersPerPage}/${page}`)
      .then((response) =>
        response.json().then((json: UsersResponse) => {
          setUsers(json)
          setComponentState('loaded')
        }),
      )
      .catch((error) => {
        setErrorMessage(`Error fetching data from the server: ${error}`)
        setComponentState('errored')
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [users])

  if (componentState === 'loading') return <p>Loading...</p>

  if (componentState === 'errored') return <p>{errorMessage}</p>

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
            <Link to={`/user-profile/${index}`}>View/Edit full profile</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
