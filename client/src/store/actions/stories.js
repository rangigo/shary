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

export const deleteStory = (id) => async dispatch => {
  try {
    await axios.delete(`/api/stories/${id}`)

    dispatch({
      type: actionTypes.DELETE_STORY,
      deleteStoryId: id
    })
  } catch(err){
    console.log(err)
  }
}
