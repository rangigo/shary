import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions'

import Welcome from './components/Welcome/Welcome'
import Header from './components/Header/Header'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Welcome} />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default connect(null, actions)(App)
