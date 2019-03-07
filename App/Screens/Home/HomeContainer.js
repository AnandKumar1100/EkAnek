import React, { PropTypes } from "react";
import { NetInfo } from 'react-native'
import Home from './HomeRender';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ActionSheet } from 'native-base'
import homeActions from '../../Redux/HomeRedux'
import * as selectors from '../../Selectors/HomeSelector';
import { EMPTY_STRING, CANCEL_INDEX, INITIAL_GRID_COLUMNS } from '../../Constants'
import { saveImagesListInAsyncStorage, fetchImagesListInAsyncStorage } from '../../Components/AsyncStorage/index'
import isEqual from 'lodash/isEqual'

class HomeContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      gridColumns : 2,
      searchText : null
    }
    this.isConnected = true
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentDidUpdate(prevProps){
    if(!isEqual(prevProps.imagesListWithSearchText, this.props.imagesListWithSearchText) && this.isConnected){
      saveImagesListInAsyncStorage(this.props.imagesListWithSearchText)
    }
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
 }

  handleConnectivityChange = connection => {
    if(connection.type == 'none' ||connection.type == 'unknown')
      this.isConnected = false
    else
      this.isConnected = true
  }

  handleSearch = (event) =>{
    const { searchText } = this.state
    if (event.nativeEvent.text !== EMPTY_STRING && searchText !== event.nativeEvent.text){
        if(this.isConnected)
          this.fetchImagesList(event.nativeEvent.text, 1)
        else fetchImagesListInAsyncStorage()
      }
    this.setState({ searchText : event.nativeEvent.text })
  }

  fetchImagesList = (searchText, pageNumber)=> {
    const { savePageNo, fetchImagesList } = this.props.actions
    savePageNo(pageNumber+1)
    fetchImagesList({ searchText , pageNumber })
  }

  scrollHandler = () =>{
    const { pageNo } = this.props
    if(this.isConnected)
      this.fetchImagesList(this.state.searchText, pageNo)
    else alert('Sorry No Internet Connection Available')
  }

  showMenuOptions = () =>{
    var BUTTONS = ["2", "3", "4", "Cancel"];
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Grid Columns"
      },
      buttonIndex => {
        this.setState({ gridColumns: BUTTONS[buttonIndex] === "Cancel" ? INITIAL_GRID_COLUMNS : BUTTONS[buttonIndex] });
      }
    )
  }

  render() {
    const { imagesListWithSearchText } = this.props
    const { gridColumns, searchText } = this.state
    return (
      <Home 
      gridColumns={gridColumns}
      handleSearch={this.handleSearch}
      imagesList={searchText ? imagesListWithSearchText[searchText] : []}
      showMenuOptions={this.showMenuOptions}
      scrollHandler={this.scrollHandler}/>
    );
  }
}

const makeMapStateToProps = () => {
  const getImagesListWithSearchText = selectors.getImagesListWithSearchText()
  const getPageNo = selectors.getPageNo()
  const mapStateToProps = (state) => {
    return {
      imagesListWithSearchText : getImagesListWithSearchText(state),
      pageNo : getPageNo(state)
    }
  }
  return mapStateToProps
}

function mapDispatchToProps(dispatch) {
  const actionsToBind = Object.assign({}, homeActions);
  return {
    actions: bindActionCreators(actionsToBind, dispatch)
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(HomeContainer);