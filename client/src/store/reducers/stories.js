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
    default: 
      return state
  }
  
}