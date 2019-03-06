import React, { PropTypes } from "react";
import Home from './HomeRender';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import loginActions from '../../Redux/HomeRedux'
import * as selectors from '../../Selectors/HomeSelector';

class HomeContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  goToScreen = (key, params) => {
    this.props.navigation.navigate(key, params)
  }

  render() {
    return (
      <Home />
    );
  }
}

const makeMapStateToProps = () => {
  const getImagesList = selectors.getImagesList()
  const mapStateToProps = (state) => {
    return {
      imagesList : getImagesList(state)
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