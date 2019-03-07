import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchImagesList: ['payload'],
  saveImagesList : ['imagesList'],
  savePageNo : ['pageNo'],
  resetImagesList : null
})

export const HomeTypes = Types
export default Creators


export const INITIAL_STATE = Immutable({
    imagesList: [],
    pageNo : 1
})
  
export const saveImagesList = (state, { imagesList }) => {
  return state.merge({ imagesList : [...state.imagesList, ...imagesList] })
}

export const savePageNo = (state, { pageNo }) => state.merge({ pageNo })

export const resetImagesList = (state) => state.merge({ imagesList : [] })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_IMAGES_LIST]: saveImagesList,
  [Types.SAVE_PAGE_NO] : savePageNo,
  [Types.RESET_IMAGES_LIST] : resetImagesList
})

