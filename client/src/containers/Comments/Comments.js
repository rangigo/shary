import React, { Component } from 'react'
import { connect } from 'react-redux'
import NewComment from './NewComment/NewComment'

export class Comments extends Component {
  render() {
    const { storyId } = this.props

    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Comments</span>
          {this.props.user ? (
            <NewComment storyId={storyId}/>
          ) : (
            <p>
              Please <a href="/auth/google">log in</a> to comment.
            </p>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth,
})

export default connect(
  mapStateToProps,
  null,
)(Comments)
