import React, { useState } from 'react'
import { useHistory } from 'react-router'

export const Login: React.FC = () => {
  const wrongLoginCredsMessage = 'Invalid username/password entered, please try again'
  const history = useHistory()
  const userListPageLink = '/users-list'
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
      <h1>Login screen</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(event): void => {
          setUsername(event.target.value)
          setErrorMessage('')
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(event): void => {
          setPassword(event.target.value)
          setErrorMessage('')
        }}
      />
      <input
        type="button"
        value="Login"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onClick={(__event): void => {
          if (username == 'admin' && password == 'admin') {
            history.push(userListPageLink)
            return
          }
          setErrorMessage(wrongLoginCredsMessage)
        }}
      />
      <p>(Hint) Username: admin Password: admin</p>
      <p>{errorMessage}</p>
    </>
  )
}
