import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import Story from '../../../components/Story/Story'
import Loader from '../../../components/Loader/Loader'

export class UserStories extends Component {
  state = {
    stories: [],
    err: null,
    loading: true,
  }

  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    if (this._isMounted) {
      if (this.props.match.params.userId) {
        axios
          .get(`/api/stories/user/${this.props.match.params.userId}`)
          .then(res => this.setState({ stories: res.data, loading: false }))
          .catch(err => this.setState({ err, loading: false }))
      } else {
        axios
          .get(`/api/stories/watashi`)
          .then(res => this.setState({ stories: res.data, loading: false }))
          .catch(err => this.setState({ err, loading: false }))
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { stories, err, loading } = this.state

    const { user } = this.props

    const renderStories =
      stories.length > 0 ? (
        stories.map(story => (
          <Story
            {...story}
            editable={story.user._id === user._id}
            key={story._id}
          />
        ))
      ) : (
        <p>This user does not have any public stories.</p>
      )

    return loading ? (
      <Loader />
    ) : err ? (
      <p style={{ textAlign: 'center' }}>Something wrong!</p>
    ) : (
      <div className="row">
        <h1 className="center">
          Stories{' '}
          {stories.length > 0 ? 'from ' + stories[0].user.firstName : null}
        </h1>
        {renderStories}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
  null,
)(UserStories)
