import React, { useEffect, useState } from 'react'
import { UsersResponse } from '../types/UsersResponse'
import { ComponentState } from '../types/ComponentState'
import { Link, useParams } from 'react-router-dom'

interface UrlParams {
  pageNum: string
}

export const UsersList: React.FC = () => {
  const numberOfUsersPerPage = 5
  const { pageNum } = useParams<UrlParams>()
  const [firstPage, lastPage] = [1, 20]
  const [componentState, setComponentState] = useState<ComponentState>('loading')
  const [users, setUsers] = useState<UsersResponse>([])
  const [errorMessage, setErrorMessage] = useState<string>('')

  function fetchUsers() {
    fetch(`/api/user-list/${numberOfUsersPerPage}/${pageNum}`)
      .then((response) =>
        response.json().then((json: UsersResponse) => {
          setUsers(json)
          setComponentState('loaded')
        }),
      )
      .catch((error) => {
        setErrorMessage(`Error fetching data from the server: ${error}`)
        setComponentState('error')
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (componentState === 'loading') return <p>Loading...</p>

  if (componentState === 'error') return <p>{errorMessage}</p>

  return (
    <div>
      <h1>User List</h1>
      <p>Page: {pageNum}</p>
      {
        <Link to={`/users-list/${+pageNum - 1}`} hidden={+pageNum === firstPage}>
          Previous Page
        </Link>
      }
      <Link to={`/users-list/${+pageNum + 1}`} hidden={+pageNum === lastPage}>
        Next Page
      </Link>
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
            <Link to={`/user-profile/${user.login.uuid}`} rel={`${user.login.uuid}`}>
              View/Edit full profile
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
