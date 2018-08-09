import * as actionTypes from './actionTypes'

import axios from 'axios'

export const fetchPublicStoriesStart = () => ({
  type: actionTypes.FETCH_PUBLIC_STORIES_START
})

 
export const fetchPublicStories = () => async dispatch => {
  dispatch(fetchPublicStoriesStart())
  
  try {
    const res = await axios.get('/api/stories')

    dispatch({
      type: actionTypes.FETCH_PUBLIC_STORIES,
      publicStories: res.data,
      loading: false
    })
  } catch(err) {
    console.log(err)
  }
}

export const fetchMyStories = () => async dispatch =>  {

  try {
    const res = await axios.get('/api/stories/watashi')
    dispatch({
      type: actionTypes.FETCH_MY_STORIES,
      myStories: res.data
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