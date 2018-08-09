import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios'
import { formatDate } from '../../../helpers'

export class FullStory extends Component {
  state = {
    loadStory: null,
  }

  componentDidMount() {
    this.loadStory()
  }

  loadStory = () => {
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
      post = (
        <div className="row">
          <div className="col s12 m9">
            <h3>{loadStory.title}</h3>
            <div className="card story">
              <div className="card-content">
                <span className="card-title">{formatDate(loadStory.date, 'MMMM Do YYYY')}</span>
                {ReactHtmlParser(loadStory.body)}
              </div>
            </div>
          </div>
          <div className="col s12 m3">
            <div className="card center-align">
              <div className="card-content">
                <span className="card-title">{loadStory.user.firstName} {loadStory.user.lastName}</span>
                <img src={loadStory.user.image} alt="avatar" className='circle responsive-img' />
              </div>
              <div className="card-action">
                <Link to={`/stories/user/${loadStory.user._id}`}>More From {loadStory.user.firstName}</Link> 
              </div>
            </div>
          </div>
        </div>
      )
    }

    return post
  }
}

export default FullStory
