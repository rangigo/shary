import React, { Component } from 'react'
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions'
import Loader from './components/Loader/Loader'
import './App.css'

import Welcome from './components/Welcome/Welcome'
import Header from './components/Header/Header'
import Stories from './containers/Stories/Stories'
import Dashboard from './containers/Dashboard/Dashboard'
import NewStory from './containers/Stories/NewStory/NewStory'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import FullStory from './containers/Stories/FullStory/FullStory'
import EditStory from './containers/Stories/EditStory/EditStory'
import UserStories  from './containers/Stories/UserStories/UserStories';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    const { loading, user } = this.props

    // Add button if user is authenticated
    const addButton = !loading && user ? (
      <div className="fixed-action-btn">
        <Link to="/stories/new" className="btn-floating btn-large pulse red">
          <i className="fa fa-plus" />
        </Link>
      </div>
    ) : null

    // Restricting routes
    const routes = !loading ? (
      user ? (
        <Switch>
          <Route path="/about" component={About} />
          <Route exact path="/stories" component={Stories} />
          <Route path="/stories/new" component={NewStory} />
          <Route path="/stories/edit/:id" component={EditStory} />
          <Route path='/stories/user/:userId' component={UserStories}/>
          <Route path="/stories/:id" component={FullStory} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to="/dashboard" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/stories" component={Stories} />
          <Route path='/stories/user/:userId' component={UserStories}/>
          <Route path="/stories/:id" component={FullStory} />
          <Route exact path="/" component={Welcome} />
          <Redirect to="/" />
        </Switch>
      )
    ) : <Loader />

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
  user: state.auth.user,
  loading: state.auth.loading,
})

export default withRouter(
  connect(
    mapStateToProps,
    actions,
  )(App),
)
