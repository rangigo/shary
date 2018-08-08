import * as actionTypes from '../actions/actionTypes'

const initState = {
  publicStories: [],
  newStory: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PUBLIC_STORIES:
      return {
        ...state,
        publicStories: action.publicStories
      }
    case actionTypes.SUBMIT_STORY:
      return {
        ...state,
        newStory: action.newStory
      }
    default: 
      return state
  }
  
}