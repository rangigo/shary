import React from 'react'

const Welcome = (props) => {
  return (
    <div>
      <h1>Welcome to Shary!</h1>
      <p>Shary is a social network where you can share your stories with the world or
        keep it private as your own personal diary.
      </p>
      <a href="auth/google" className="btn red darken-1"><i className="fa fa-google left"></i> Login with google</a>
    </div>
  )
}

export default Welcome
