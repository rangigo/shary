import React from 'react'
import { connect } from 'react-redux'

const Welcome = props => {
  return (
    <div>
      <h1>Welcome to Shary!</h1>
      <p>
        Shary is where you can share your stories with the
        world or keep it private as your own personal diary.
      </p>
      {/* {props.auth !== null ? (
        props.auth ? null : ( */}
          <a href="/auth/google" className="btn red darken-1">
            <i className="fa fa-google left" /> Login with google
          </a>
      {/*   )
       ) : null} */}
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(
  mapStateToProps,
  null,
)(Welcome)
