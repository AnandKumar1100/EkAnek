import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

import { HomeTypes } from '../Redux/HomeRedux'

import { fetchImagesList } from './HomeSaga'

const api = API.create()


export default function* root() {
  yield all([
    takeLatest(HomeTypes.FETCH_IMAGES_LIST, fetchImagesList, api),
  ])
}

