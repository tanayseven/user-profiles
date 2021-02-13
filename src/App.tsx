import React from 'react'
import { Route, Switch } from 'react-router'
import { Login } from './login'
import { UsersList } from './usersList'
import { BrowserRouter } from 'react-router-dom'
import { UserProfile } from './userProfile'

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/users-list">
            <UsersList />
          </Route>
          <Route path="/user-profile/:index" component={UserProfile} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
)

export default App
