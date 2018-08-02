import * as actionTypes from './actionTypes'

import axios from 'axios'

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/auth/verify')
    
    dispatch({
      type: actionTypes.FETCH_USER,
      userData: res.data,
    })
  } catch (err) {
    console.log(err)
  }

}
