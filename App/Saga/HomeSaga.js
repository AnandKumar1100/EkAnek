import { put, call } from 'redux-saga/effects'
import homeActions from '../Redux/HomeRedux'

export function* fetchImagesList(api, action){
    let { response, error } = yield call(api.GET, 'rest?method=flickr.photos.search&api_key=8a8848844612bb1ec0b385edd505fab8&format=json&text=a&nojsoncallback=true&per_page=20&extras=url_s&page=2')
    if (response.ok) {
        yield put(homeActions.saveImagesList(response))
    }
    else{
        console.log(error)
    }       
}