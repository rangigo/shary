import React, { Component } from 'react'
import { Input, Row } from 'react-materialize'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './NewStory.css'

class NewStory extends Component {
  state = {}

  render() {
    return (
      <div>
        <h1>Add New Story</h1>
        <form action="/stories" method="post" className="col s12">
          <Row>
            <Input s={12} type="text" name="title" label="Title" />
          </Row>

          <Row>
            <Input
              s={12}
              type="select"
              name="privacy"
              label="Privacy"
              defaultValue="public"
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
              checked={true}
            />
          </Row>

          <Row>
            <h5 style={{ paddingLeft: '0.75rem' }}>Tell us your Story: </h5>
            <Editor
              toolbarClassName='toolbar-editor'
              editorClassName='text-editor'
              toolbar={{
                options: ['inline', 'blockType', 'link']
              }}
            />
          </Row>

          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    )
  }
}

export default NewStory
