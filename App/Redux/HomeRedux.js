import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchImagesList: ['payload'],
  saveImagesList : ['imagesListWithSearchText'],
  savePageNo : ['pageNo'],
  resetImagesList : null
})

export const HomeTypes = Types
export default Creators


export const INITIAL_STATE = Immutable({
    imagesListWithSearchText: {},
    pageNo : 1
})
  
export const saveImagesList = (state, { imagesListWithSearchText }) => {
  // Todo : Test all condition when app is offline
  let updatedImagesListWithSearchText = {...imagesListWithSearchText}
  if(state.pageNo >2){
    const searchText = Object.keys(imagesListWithSearchText)[0]
    updatedImagesListWithSearchText = { 
      [searchText] : [...state.imagesListWithSearchText[searchText], ...updatedImagesListWithSearchText[searchText]]
    }
  }
  return state.merge({ imagesListWithSearchText : {...state.imagesListWithSearchText, ...updatedImagesListWithSearchText} })
}

export const savePageNo = (state, { pageNo }) => state.merge({ pageNo })

export const resetImagesList = (state) => state.merge({ imagesList : [] })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_IMAGES_LIST]: saveImagesList,
  [Types.SAVE_PAGE_NO] : savePageNo,
  [Types.RESET_IMAGES_LIST] : resetImagesList
})

