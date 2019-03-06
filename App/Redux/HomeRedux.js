import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchImagesList: ['payload'],
  saveImagesList : ['imagesList']
})

export const HomeTypes = Types
export default Creators


export const INITIAL_STATE = Immutable({
    imagesList: []
})
  
export const saveImagesList = (state, { imagesList }) => state.merge({ imagesList })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_IMAGES_LIST]: saveImagesList
})

