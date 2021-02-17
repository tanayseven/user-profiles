import React, { useState } from 'react'
import { useHistory } from 'react-router'

// styles
import { Wrapper, ButtonWrapper } from './Login.style'

export const Login: React.FC = () => {
  const wrongLoginCredsMessage = 'Invalid username/password entered, please try again'
  const history = useHistory()
  const userList1stPageLink = '/users-list/1'
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
      <h1>Login screen</h1>
      <Wrapper>
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
        <ButtonWrapper>
          <input
            type="button"
            value="Login"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={(__event): void => {
              if (username == 'admin' && password == 'admin') {
                history.push(userList1stPageLink)
                return
              }
              setErrorMessage(wrongLoginCredsMessage)
            }}
          />
        </ButtonWrapper>
        <p>(Hint) Username: admin Password: admin</p>
        <p className="error-msg">{errorMessage}</p>
      </Wrapper>
    </>
  )
}
