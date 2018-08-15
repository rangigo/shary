import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import { formatDate } from '../../../helpers'
import Comments from '../../Comments/Comments'
import FullComment from '../../../components/FullComment/FullComment'
import Loader from '../../../components/Loader/Loader'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

export class FullStory extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchSingleStory(this.props.match.params.id)
    }
  }

  componentWillUnmount() {
    this.props.clearSingleStory()
  }

  render() {
    let post = <p>Something wrong...</p>
    if (this.props.match.params.id) {
      post = <Loader />
    }

    const {
      loadStory,
      err,
      loading,
      user,
      match: {
        params: { id },
      },
    } = this.props

    if (loadStory) {
      const comments = loadStory.allowComments ? (
        <React.Fragment>
          <Comments storyId={id} />
          {loading ? (
            <Loader />
          ) : (
            loadStory.comments.map(comment => (
              <FullComment {...comment} key={comment._id} />
            ))
          )}
        </React.Fragment>
      ) : null

      post = (
        <div className="row">
          <div className="col s12 m8">
            <h3>
              {loadStory.title}
              {' '}
              {user._id === loadStory.user._id ? (
                <small>
                  <Link to={`/stories/edit/${id}`}>
                    <i className="fa fa-pencil" />
                  </Link>
                </small>
              ) : null}
            </h3>
            <div className="card story">
              <div className="card-content">
                <span className="card-title">
                  {formatDate(loadStory.date, 'MMMM Do YYYY')}
                </span>
                {ReactHtmlParser(loadStory.body)}
              </div>
            </div>
            {comments}
          </div>
          <div className="col s12 m4">
            <div className="card center-align">
              <div className="card-content">
                <span className="card-title">
                  {loadStory.user.firstName} {loadStory.user.lastName}
                </span>
                <img
                  src={loadStory.user.image}
                  alt="avatar"
                  className="circle responsive-img"
                />
              </div>
              <div className="card-action">
                <Link to={`/stories/user/${loadStory.user._id}`}>
                  More From {loadStory.user.firstName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (err) {
      post = <p>Something wrong!</p>
    }

    return post
  }
}

const mapStateToProps = state => ({
  loading: state.stories.loading,
  loadStory: state.stories.singleStory,
  err: state.stories.error,
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
  actions,
)(FullStory)
