import React, { Component } from 'react'
import { Input, Row } from 'react-materialize'
import { Editor } from 'react-draft-wysiwyg'
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import draftToHtml from 'draftjs-to-html'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class EditStory extends Component {
  state = {
    title: '',
    privacy: 'public',
    allowComments: true,
    editorState: EditorState.createEmpty(),
    body: '',
    loading: true,
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(`/api/stories/${this.props.match.params.id}`)
        .then(res => {
          const { title, allowComments, privacy, body } = res.data

          // Create Editor State from html markup
          const blocksFromHtml = convertFromHTML(body)
          const state = ContentState.createFromBlockArray(
            blocksFromHtml.contentBlocks,
            blocksFromHtml.entityMap,
          )

          this.setState({
            title,
            allowComments,
            privacy,
            body,
            editorState: EditorState.createWithContent(state),
            loading: false,
          })
        })
        .catch(err => console.log(err))
    }
  }

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

  editorStateChange = editorState => {
    this.setState({
      editorState,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { title, privacy, body, allowComments } = this.state
    const updatedStory = {
      title,
      body,
      privacy,
      allowComments,
    }
    // this.props.history.replace(`/stories/${res.data._id}`)

    axios.put(`/api/stories/${this.props.match.params.id}`, updatedStory)
      .then(res => this.props.history.replace('/dashboard'))
  }

  render() {
    const { title, allowComments, privacy, editorState, loading } = this.state

    return loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        <h1>Edit Story</h1>
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
            <Editor
              editorState={editorState}
              toolbarClassName="toolbar-editor"
              editorClassName="text-editor"
              toolbar={{
                options: ['inline', 'blockType', 'link'],
              }}
              onEditorStateChange={this.editorStateChange}
            />
          </Row>

          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default withRouter(EditStory)
