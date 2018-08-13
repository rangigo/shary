import React from 'react'
import { Link } from 'react-router-dom'
import { truncate, stripTags } from '../../helpers'
import './Story.css'

const Story = ({ title, body, user, _id }) => {
  return (
    <div className="col s12 m4">
      <div className="card">
        <div className="card-image">
          <Link
            to={`/stories/edit/${_id}`}
            className="btn-floating halfway-fab red"
          >
            <i className="fa fa-pencil" />
          </Link>
        </div>
        <div className="card-content center-align">
          <h5>{title}</h5>
          <p className="story-text">{truncate(stripTags(body), 150)}</p>
          <br />
          <div className="chip">
            <img src={user.image} alt="avatar" />
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="card-action center-align">
          <Link className="btn grey" to={`/stories/${_id}`}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Story
