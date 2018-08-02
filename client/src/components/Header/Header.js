import React from 'react'
import { connect } from 'react-redux'
import { SideNav } from 'react-materialize'

const Header = props => {
  console.log('auth', props.auth)

  let rightNav = null
  let sideNavLogin = null
  let sideNavItems = null

  switch (props.auth) {
    case null:
      break
    case false:
      rightNav = (
        <li>
          <a href="/stories">
            <i className="fa fa-book" /> Public Stories
          </a>
        </li>
      )
      sideNavLogin = (
        <li>
          <a href="auth/google" className="btn red darken-1">
            <i className="fa fa-google left" /> Login with google
          </a>
        </li>
      )
      break
    default:
      rightNav = (
        <React.Fragment>
          <li>
            <a href="/dashboard">Welcome</a>
          </li>
          <li>
            <a href="/auth/logout">
              <i className="fa fa-sign-out" /> Logout
            </a>
          </li>
        </React.Fragment>
      )
      sideNavLogin = null
      sideNavItems = (
        <React.Fragment>
          <li>
            <a href="/dashboard">
              <i className="fa fa-cog" />Dashboard
            </a>
          </li>
          <li>
            <a href="/stories/my">
              <i className="fa fa-user" />My Stories
            </a>
          </li>
          <li>
            <a href="/auth/logout">
              <i className="fa fa-sign-out" />Logout
            </a>
          </li>
        </React.Fragment>
      )
  }

  return (
    <nav className="grey darken-3">
      <div className="container">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo center">
            Stories
          </a>
          <ul className="right hide-on-small-only">{rightNav}</ul>
          <SideNav
            trigger={
              <button
                className="button-collapse show-on-large"
                style={{ border: 'none', background: 'none' }}
              >
                <i className="fa fa-bars" />
              </button>
            }
          >
            {sideNavLogin}
            <li>
              <a href="/stories">
                <i className="fa fa-book" />Public Stories
              </a>
            </li>
            <li className="divider" />
            {sideNavItems}
          </SideNav>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  null,
)(Header)
