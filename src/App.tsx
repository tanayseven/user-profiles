import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// components
import { Login } from './components/Login'
import { UserProfile } from './components/UserProfile'
import { UsersList } from './components/UsersList'

// styles
import { GlobalStyle } from './App.style'

const App: React.FC = () => {
  const history = createBrowserHistory()

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/users-list/:pageNum">
              <UsersList />
            </Route>
            <Route path="/user-profile/:userLoginUuid">
              <UserProfile history={history} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
