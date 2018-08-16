import React, { Component } from 'react'
import { Input, Row } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../../components/Loader/Loader'
import { connect } from 'react-redux'
import ReactQuill from 'react-quill'

class EditStory extends Component {
  state = {
    title: '',
    privacy: 'public',
    allowComments: true,
    body: '',
    loading: true,
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
    'color',
    'background',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'link',
  ]

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(`/api/stories/${this.props.match.params.id}`)
        .then(res => {
          const { title, allowComments, privacy, body, user } = res.data

          // Check for edit permissions
          if (user._id !== this.props.user._id) {
            this.props.history.replace('/')
          } else {
            this.setState({
              title,
              allowComments,
              privacy,
              body,
              loading: false,
            })
          }
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

  quillChange = value => {
    this.setState({
      body: value,
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

    axios
      .put(`/api/stories/${this.props.match.params.id}`, updatedStory)
      .then(res =>
        this.props.history.replace(`/stories/${this.props.match.params.id}`),
      )
  }

  render() {
    const { title, allowComments, privacy, body, loading } = this.state

    return loading ? (
      <Loader />
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

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
  null,
)(withRouter(EditStory))
