import React from 'react'
import { connect } from 'react-redux'
import Loader from '../Loader/Loader'

const Welcome = ({ loading }) => {
  const welcome = loading ? (
    <Loader />
  ) : (
    <div>
      <h1>Welcome to Shary!</h1>
      <p>
        Shary is where you can share your stories with the world or keep it
        private as your own personal diary.
      </p>
      <a href="/auth/google" className="btn red darken-1">
        <i className="fa fa-google left" /> Login with google
      </a>
    </div>
  )

  return welcome
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
})

export default connect(
  mapStateToProps,
  null,
)(Welcome)
