import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { Button, Text } from 'native-base'
import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Home = ({ goBack }) => {
    return (
        <View style={{ flex: 1, justifyContent:'center', alignSelf:'center' }}>
        <Button bordered >
            <Text>Home</Text>
          </Button>
        </View>
    );
};

export default Home;
