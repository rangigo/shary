import React, { Component } from 'react'
import { Input, Row } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import ReactQuill from 'react-quill'

import './NewStory.css'

class NewStory extends Component {
  state = {
    title: '',
    privacy: 'public',
    allowComments: true,
    body: '',
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link'],
      ['clean'],
    ],
  }

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'color',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
  ]

  handleChange = e => {
    const { name, value } = e.target

    if (name === 'allowComments') {
      this.setState({
        [name]: e.target.checked,
      })
    } else
      this.setState({
        [name]: value,
      })
  }

  quillChange = value => {
    this.setState({
      body: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { title, privacy, body, allowComments } = this.state
    const newStory = {
      title,
      body,
      privacy,
      allowComments,
    }

    axios
      .post('/api/stories', newStory)
      .then(res => this.props.history.replace(`/stories/${res.data._id}`))
  }

  render() {
    const { title, allowComments, privacy, body } = this.state

    return (
      <div>
        <h1>Add New Story</h1>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <Row>
            <Input
              s={12}
              type="text"
              name="title"
              label="Title"
              value={title}
              onChange={this.handleChange}
            />
          </Row>

          <Row>
            <Input
              s={12}
              type="select"
              name="privacy"
              label="Privacy"
              value={privacy}
              onChange={this.handleChange}
            >
              <option value="public">Public</option>
              <option value="private"> Private</option>
              <option value="unpublished"> Unpublished</option>
            </Input>
          </Row>

          <Row>
            <Input
              name="allowComments"
              type="checkbox"
              label="Allow Comments"
              className="filled-in"
              checked={allowComments}
              onChange={this.handleChange}
            />
          </Row>

          <Row>
            <h5 style={{ paddingLeft: '0.75rem' }}>Tell us your Story: </h5>
            <ReactQuill
              value={body}
              onChange={this.quillChange}
              modules={this.modules}
              formats={this.formats}
            />
          </Row>

          <input style={{marginTop: '2.5em'}} type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default withRouter(NewStory)
