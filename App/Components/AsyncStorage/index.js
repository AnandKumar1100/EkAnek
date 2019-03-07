import { AsyncStorage } from 'react-native'
import * as constants from './constants'
import { dispatch } from '../../Redux/store';
import homeActions from '../../Redux/HomeRedux'

export async function saveImagesListInAsyncStorage(imagesList) {   
    try {
        await AsyncStorage.setItem(constants.IMAGES_LIST_WITH_SEARCH_TEXT, JSON.stringify(imagesList))
    }
    catch (error) {
        console.log('AsyncStorage error: ' + error);
    }
}

export async function fetchImagesListInAsyncStorage() {
    try {
      let imagesListWithSearchText = await AsyncStorage.getItem(constants.IMAGES_LIST_WITH_SEARCH_TEXT)
      if (imagesListWithSearchText) {
        imagesListWithSearchText = JSON.parse(imagesListWithSearchText)
        dispatch(homeActions.saveImagesList({...imagesListWithSearchText}))
      }
      else{
        dispatch(homeActions.saveImagesList({}))
      }
    }
    catch (error) {
      console.log('AsyncStorage error: ' + error);
    }
  }


