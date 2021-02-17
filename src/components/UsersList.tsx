import React, { useEffect, useState } from 'react'
import { UsersResponse } from '../types/UsersResponse'
import { ComponentState } from '../types/ComponentState'
import { Link, useParams } from 'react-router-dom'

import { Wrapper, NavigationWrapper } from './UsersList.style'

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
  }, [pageNum])

  if (componentState === 'loading') return <p>Loading...</p>

  if (componentState === 'error') return <p>{errorMessage}</p>

  return (
    <div>
      <h1>User List</h1>
      <p>Page: {pageNum}</p>
      <NavigationWrapper>
        {
          <Link to={`/users-list/${+pageNum - 1}`} hidden={+pageNum === firstPage}>
            Previous Page
          </Link>
        }
        <Link to={`/users-list/${+pageNum + 1}`} hidden={+pageNum === lastPage}>
          Next Page
        </Link>
      </NavigationWrapper>
      <Wrapper>
        <ul className="list img-list">
          {users.map((user, index) => (
            <li key={index}>
              <Link className="inner" to={`/user-profile/${user.login.uuid}`} rel={`${user.login.uuid}`}>
                <div className="li-img">
                  <img src={user.picture.thumbnail} alt="profile-picture" />
                </div>
                <div className="li-text">
                  <h4 className="li-head">
                    Title: <span>{user.name.title}</span>
                  </h4>
                  <p className="li-sub">
                    First Name: <span>{user.name.first}</span>
                  </p>
                  <p className="li-sub">
                    Last Name: <span>{user.name.last}</span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    </div>
  )
}
