import { put, call } from 'redux-saga/effects'
import homeActions from '../Redux/HomeRedux'
import { API_KEY, PAGE_SIZE } from '../Constants'

export function* fetchImagesList(api, action){
    const { searchText, pageNumber } = action.payload
    let { response, error } = yield call(api.GET, `rest?method=flickr.photos.search&api_key=${API_KEY}&format=json&text=${searchText}&nojsoncallback=true&per_page=${PAGE_SIZE}&extras=url_s&page=${pageNumber}`)

    if (response.ok) {
        yield put(homeActions.saveImagesList({[searchText] : response.data.photos.photo}))
    }
    else{
        console.log(error)
    }       
}