import * as actionTypes from '../actions/actionTypes'

const initState = {
  publicStories: [],
  myStories: [],
  error: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PUBLIC_STORIES:
      return {
        ...state,
        publicStories: action.publicStories,
        loading: false
      }
    case actionTypes.FETCH_PUBLIC_STORIES_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_MY_STORIES:
      return {
        ...state,
        myStories: action.myStories,
        loading: false
      }
    case actionTypes.FETCH_MY_STORIES_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_SINGLE_STORY_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_SINGLE_STORY:
      return {
        ...state,
        loading: false,
        singleStory: action.singleStory
      }
    case actionTypes.FETCH_SINGLE_STORY_FAIL:
      return {
        ...state,
        error: action.err
      }
    case actionTypes.CLEAR_SINGLE_STORY:
      return {
        ...state,
        singleStory: null
      }
    case actionTypes.DELETE_STORY:
      return {
        ...state,
        myStories: state.myStories.filter(story => story._id !== action.deleteStoryId)
      }
    default: 
      return state
  }
  
}