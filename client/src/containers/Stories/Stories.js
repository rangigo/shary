import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import Story from '../../components/Story/Story'

export class Stories extends Component {
  componentDidMount() {
    this.props.fetchPublicStories()
  }

  render() {
    const { publicStories } = this.props

    const renderStories =
      publicStories.length > 0 ? (
        publicStories.map(story => <Story {...story} key={story._id} />)
      ) : (
        <p>No stories found</p>
      )

    return (
      <div className="row">
        <h1>Stories</h1>
        {renderStories}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  publicStories: state.stories.publicStories,
})

export default connect(
  mapStateToProps,
  actions,
)(Stories)
