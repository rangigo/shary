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
    case actionTypes.FETCH_PUBLIC_STORIES_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_MY_STORIES:
      return {
        ...state,
        myStories: action.myStories
      }
    case actionTypes.DELETE_STORY:
      console.log(state.myStories)
      return {
        ...state,
        myStories: state.myStories.filter(story => story._id !== action.deleteStoryId)
      }
    default: 
      return state
  }
  
}