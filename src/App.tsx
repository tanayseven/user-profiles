import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// components
import { Login } from './components/Login'
import { UserProfile } from './components/UserProfile'
import { UsersList } from './components/UsersList'

const App: React.FC = () => {
  const history = createBrowserHistory()

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/users-list/:pageNum">
              <UsersList history={history} />
            </Route>
            <Route path="/user-profile/:userId">
              <UserProfile history={history} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
