import React, { Component } from 'react'
import { Row, Input } from 'react-materialize'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../../../store/actions/index'

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
    
    this.props.addComment(newComment, this.props.match.params.id)
    this.setState({
      commentBody: ''
    })
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

export default connect(null, actions)(withRouter(NewComment))
