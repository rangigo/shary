import * as actionTypes from './actionTypes'

import axios from 'axios'

export const fetchPublicStories = () => async dispatch => {
  try {
    const res = await axios.get('/api/stories')

    dispatch({
      type: actionTypes.FETCH_PUBLIC_STORIES,
      publicStories: res.data
    })
  } catch(err) {
    console.log(err)
  }
}

export const submitStory = (newStory, history) => async dispatch => {
  try {
    const res = await axios.post('/api/stories', newStory)

    history.push(`/stories/${res.data._id}`)

    dispatch({
      type: actionTypes.SUBMIT_STORY,
      newStory: res.data
    })
  } catch(err) {
    console.log(err)
  }
}