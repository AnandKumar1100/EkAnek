import { createSelector } from 'reselect';

const selectHome = (state) => state.home;

const getImagesListWithSearchText = () => createSelector(
    selectHome,
    (home) => home.imagesListWithSearchText
)

const getPageNo = () => createSelector(
    selectHome,
    (home) => home.pageNo
)

export {
    getImagesListWithSearchText,
    getPageNo
};