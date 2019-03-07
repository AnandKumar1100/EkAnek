import { createSelector } from 'reselect';

const selectHome = (state) => state.home;

const getImagesList = () => createSelector(
    selectHome,
    (home) => home.imagesList
)

const getPageNo = () => createSelector(
    selectHome,
    (home) => home.pageNo
)

export {
    getImagesList,
    getPageNo
};