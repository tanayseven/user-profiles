import React, { useState } from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

// components
import { Login } from './components/Login'
import { UserProfile } from './components/UserProfile'
import { UsersList } from './components/UsersList'

const App: React.FC = () => {
  const [pageNum, setPageNum] = useState<number>(1)
  const [currentUser, setCurrentUser] = useState<string>('0')

  const history = createBrowserHistory()

  const updateUserIndex = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const index = e.currentTarget.rel
    setCurrentUser(index)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/users-list">
              <UsersList page={pageNum} setPage={setPageNum} updateCurrentUser={updateUserIndex} />
            </Route>
            <Route path="/user-profile">
              <UserProfile index={currentUser} history={history} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
