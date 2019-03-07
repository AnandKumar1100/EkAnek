import { StyleSheet, Dimensions, Platform} from 'react-native'

const window = Dimensions.get('window');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default{
  center_vertically :{
    alignItems:'center'
  },

  text_color_white:{
    color:'white'
  },

  flex_85 : {
    flex:0.85
  },

  flex_15 : {
    flex:0.15
  },

  flex_1 :{
    flex:1
  }
};
