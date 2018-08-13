import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom'
import { formatDate } from '../../helpers'
import { withRouter } from 'react-router-dom'

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchMyStories()
  }

  render() {
    const { user, myStories, loading } = this.props

    const renderStories = loading ? (
      <p>Loading...</p>
    ) : myStories && myStories.length > 0 ? (
      <table className="striped">
        <thead>
          <tr>
            <th>Title </th>
            <th>Date </th>
            <th>Privacy </th>
          </tr>
        </thead>
        <tbody>
          {myStories.map(story => (
            <tr key={story._id}>
              <td>
                <Link to={`/stories/${story._id}`}>{story.title}</Link>
              </td>
              <td>{formatDate(story.date, 'MMMM Do YYYY')}</td>
              <td>
                <span style={{ textTransform: 'capitalize' }}>
                  {story.privacy}
                </span>
              </td>
              <td>
                <Link
                  className="btn left-align"
                  to={`/stories/edit/${story._id}`}
                >
                  <i className="fa fa-pencil" /> Edit
                </Link>
                <button
                  className="btn red"
                  style={{ marginLeft: '7px' }}
                  onClick={() => this.props.deleteStory(story._id)}
                >
                  <i className="fa fa-remove" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>You have not created any stories yet.</p>
    )
    return (
      <div>
        <h1>Welcome {user ? user.firstName : ''}</h1>
        <p>Here are your stories</p>
        {renderStories}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  myStories: state.stories.myStories,
  loading: state.stories.loading,
})

export default connect(
  mapStateToProps,
  actions,
)(withRouter(Dashboard))
