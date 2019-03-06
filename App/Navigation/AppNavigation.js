import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from "../Screens/Home";

const PrimaryNav = createStackNavigator(
    { 
      Home : {screen : Home}
    },
    { initialRouteName: 'Home', headerMode: "none" }
  );

export default createAppContainer(PrimaryNav);
