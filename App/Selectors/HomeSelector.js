import { createSelector } from 'reselect';

const selectHome = (state) => state.home;

const getImagesList = () => createSelector(
    selectHome,
    (home) => home.imagesList
)

export {
    getImagesList
};