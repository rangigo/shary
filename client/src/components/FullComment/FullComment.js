import React from 'react'
import { formatDate } from '../../helpers/index'
import { Link } from 'react-router-dom'

const FullComment = ({ commentBody, commentUser, commentDate }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h5>{commentBody}</h5>
        <div className="chip">
          <img src={commentUser.image} alt="avatar"/>
          <Link to={`/stories/user/${commentUser._id}`}>{commentUser.firstName} {commentUser.lastName}</Link>
        </div>
        <br/>
        <small>Posted: {formatDate(commentDate, 'MMMM Do YYYY')}</small>
      </div>
    </div>
  )
}

export default FullComment
