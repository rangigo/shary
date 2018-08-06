import React from 'react'
import { connect } from 'react-redux'

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Welcome {user ? user.firstName : ''}</h1>
      <p>Here are your stories</p>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth,
})

export default connect(
  mapStateToProps,
  null,
)(Dashboard)
