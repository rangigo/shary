import React from 'react'
import { connect } from 'react-redux'
import { SideNav } from 'react-materialize'
import { Link } from 'react-router-dom'

const Header = props => {
  const { user, loading } = props

  console.log('user', user)

  let rightNav = (
    <li>
      <Link to="/stories">
        <i className="fa fa-book" /> Public Stories
      </Link>
    </li>
  )
  let sideNavLogin = null
  let sideNavItems = null
  let logoLink = (
    <Link to="/" className="brand-logo center">
      Shary
    </Link>
  )

  if (!loading) {
    switch (user) {
      case false:
        sideNavLogin = (
          <li>
            <a href="/auth/google" className="btn red darken-1">
              <i className="fa fa-google left" /> Login with google
            </a>
          </li>
        )
        break
      default:
        rightNav = (
          <React.Fragment>
            <li>
              <Link to="/dashboard">
                <img
                  style={{
                    height: '35px',
                    width: '35px',
                    borderRadius: '50%',
                    position: 'relative',
                    margin: '0 5px',
                    top: '12px',
                  }}
                  src={user.image}
                  alt=""
                />
              </Link>
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
              <Link to="/dashboard">
                <i className="fa fa-cog" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/stories/my">
                <i className="fa fa-user" />
                My Stories
              </Link>
            </li>
            <li>
              <a href="/auth/logout">
                <i className="fa fa-sign-out" />
                Logout
              </a>
            </li>
          </React.Fragment>
        )

        logoLink = (
          <Link to="/stories" className="brand-logo center">
            Shary
          </Link>
        )
    }
  }

  return (
    <nav className="grey darken-3">
      <div className="container">
        <div className="nav-wrapper">
          {logoLink}
          <ul className="right hide-on-small-only">{rightNav}</ul>
          <SideNav
            trigger={
              <button
                className="button-collapse show-on-large"
                style={{ border: 'none', background: 'none' }}
              >
                <i className="fa fa-bars" style={{ fontSize: '25px' }} />
              </button>
            }
            options={{ closeOnClick: true }}
          >
            {sideNavLogin}
            <li>
              <Link to="/stories">
                <i className="fa fa-book" />
                Public Stories
              </Link>
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
  user: state.auth.user,
  loading: state.auth.loading,
})

export default connect(
  mapStateToProps,
  null,
)(Header)
