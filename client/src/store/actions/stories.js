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
      publicStories: res.data
    })
  } catch(err) {
    console.log(err)
  }
}

export const fetchMyStoriesStart = () => ({
  type: actionTypes.FETCH_MY_STORIES_START
})


export const fetchMyStories = () => async dispatch =>  {
  dispatch(fetchMyStoriesStart())

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

export const fetchSingleStoryStart = () => ({
  type: actionTypes.FETCH_SINGLE_STORY_START
})

export const fetchSingleStory = (id) => async dispatch => {
  dispatch(fetchMyStoriesStart())
  
  try {
    const res = await axios.get(`/api/stories/${id}`)

    dispatch({
      type: actionTypes.FETCH_SINGLE_STORY,
      singleStory: res.data
    })
  } catch(err) {
    dispatch(fetchSingleStoryFail(err))
  }
}

export const fetchSingleStoryFail = (err) => ({
  type: actionTypes.FETCH_SINGLE_STORY_FAIL,
  err
})

export const clearSingleStory = () => ({
  type: actionTypes.CLEAR_SINGLE_STORY
})

export const addComment = (comment, id) => async dispatch => {
  try {
    await axios.post(`/api/stories/${id}/comments`, comment)

    // Re-fetch new comments
    dispatch(fetchSingleStory(id))
  } catch(err) {
    console.log(err)
  }
}

