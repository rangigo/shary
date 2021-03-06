import React from 'react'
import { Link } from 'react-router-dom'
import { truncate, stripTags } from '../../helpers'

const Story = ({ title, body, user, _id, editable }) => {
  return (
    <div className="col s12 m4">
      <div className="card">
        <div className="card-image">
          {editable ? (
            <Link
              to={`/stories/edit/${_id}`}
              className="btn-floating halfway-fab red"
            >
              <i className="fa fa-pencil" />
            </Link>
          ) : null}
        </div>
        <div className="card-content center-align">
          <h5>{title}</h5>
          <p style={{ height: '125px' }}>{truncate(stripTags(body), 150)}</p>
          <br />
          <div className="chip">
            <img src={user.image} alt="avatar" />
            <Link to={`/stories/user/${user._id}`}>{user.firstName} {user.lastName}</Link>
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
