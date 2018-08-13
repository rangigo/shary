import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios'
import { formatDate } from '../../../helpers'
import Comments from '../../Comments/Comments'
import FullComment from '../../../components/FullComment/FullComment'

export class FullStory extends Component {
  state = {
    loadStory: null,
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(`/api/stories/${this.props.match.params.id}`)
        .then(res =>
          this.setState({
            loadStory: res.data,
          }),
        )
        .catch(err => console.log(err))
    }
  }

  render() {
    let post = <p>Something wrong...</p>
    if (this.props.match.params.id) {
      post = <p>Loading...</p>
    }

    const { loadStory } = this.state

    if (loadStory) {
      const comments = loadStory.allowComments ? (
        <React.Fragment>
          <Comments storyId={this.props.match.params.id} />
          {loadStory.comments.map(comment => (
            <FullComment {...comment} key={comment._id} />
          ))}
        </React.Fragment>
      ) : null

      post = (
        <div className="row">
          <div className="col s12 m8">
            <h3>{loadStory.title}</h3>
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
    } else {
      post = <p>Something wrong...</p>
    }

    return post
  }
}

export default FullStory
