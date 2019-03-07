import React, { PropTypes } from "react";
import Home from './HomeRender';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { ActionSheet } from 'native-base'
import loginActions from '../../Redux/HomeRedux'
import * as selectors from '../../Selectors/HomeSelector';
import { EMPTY_STRING, CANCEL_INDEX, INITIAL_GRID_COLUMNS } from '../../Constants'

class HomeContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      gridColumns : 2
    }
    this.searchText = null
  }

  handleSearch = (event) =>{
    if(event.nativeEvent.text == EMPTY_STRING)
      this.props.actions.resetImagesList() 
    else if (this.searchText !== event.nativeEvent.text)
      {
        this.props.actions.resetImagesList()
        this.searchText = event.nativeEvent.text
        this.fetchImagesList(this.searchText, 1)
      }
  }

  fetchImagesList = (searchText, pageNumber)=> {
    const { savePageNo, fetchImagesList } = this.props.actions
    savePageNo(pageNumber+1)
    fetchImagesList({ searchText , pageNumber })
  }

  scrollHandler = () =>{
    const { pageNo } = this.props
    this.fetchImagesList(this.searchText, pageNo)
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
        this.setState({ gridColumns: BUTTONS[buttonIndex] === 3 ? INITIAL_GRID_COLUMNS : BUTTONS[buttonIndex] });
      }
    )
  }

  render() {
    const { imagesList } = this.props
    const { gridColumns } = this.state
    return (
      <Home 
      gridColumns={gridColumns}
      handleSearch={this.handleSearch}
      imagesList={imagesList}
      showMenuOptions={this.showMenuOptions}
      scrollHandler={this.scrollHandler}/>
    );
  }
}

const makeMapStateToProps = () => {
  const getImagesList = selectors.getImagesList()
  const getPageNo = selectors.getPageNo()
  const mapStateToProps = (state) => {
    return {
      imagesList : getImagesList(state),
      pageNo : getPageNo(state)
    }
  }
  return mapStateToProps
}

function mapDispatchToProps(dispatch) {
  const actionsToBind = Object.assign({}, loginActions);
  return {
    actions: bindActionCreators(actionsToBind, dispatch)
  }
}

export default connect(makeMapStateToProps, mapDispatchToProps)(HomeContainer);