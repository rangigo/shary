import React, { Component } from 'react'
import { Row, Input } from 'react-materialize'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

export class NewComment extends Component {
  state = {
    commentBody: '',
  }

  handleChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { commentBody } = this.state

    const newComment = {
      commentBody,
    }

    axios
      .post(`/api/stories/comments/${this.props.storyId}`, newComment)
      .then(res => this.props.history.replace(`/stories/${res.data._id}`))
  }

  render() {
    const { commentBody } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <Row>
          <Input
            name="commentBody"
            label="Add Comment"
            type="textarea"
            value={commentBody}
            onChange={this.handleChange}
            s={12}
          />
        </Row>

        <input type="submit" value="Submit" className="btn" />
      </form>
    )
  }
}

export default withRouter(NewComment)
