import React, { Component } from 'react'
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions'
import './App.css'

import Welcome from './components/Welcome/Welcome'
import Header from './components/Header/Header'
import Stories from './containers/Stories/Stories'
import Dashboard from './components/Dashboard/Dashboard'
import NewStory from './containers/NewStory/NewStory'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Story from './components/Story/Story'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    // Add button if user is authenticated
    const addButton = this.props.user ? (
      <div className="fixed-action-btn">
        <Link to="stories/new" className="btn-floating btn-large red">
          <i className="fa fa-plus" />
        </Link>
      </div>
    ) : null

    // Restricting routes
    const routes = this.props.user ? (
      <Switch>
        <Route path="/about" component={About} />
        <Route exact path="/stories" component={Stories} />
        <Route path="/stories/new" component={NewStory} />
        <Route path="/stories/:id" component={Story} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect to="/dashboard" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/stories" component={Stories} />
        <Route exact path="/" component={Welcome} />
        <Redirect to="/" />
      </Switch>
    )

    return (
      <React.Fragment>
        <Header />
        {addButton}
        <main>
          <div className="container">{routes}</div>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth,
})

export default withRouter(
  connect(
    mapStateToProps,
    actions,
  )(App),
)
