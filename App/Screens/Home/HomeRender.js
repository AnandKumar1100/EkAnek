import React, { Component } from "react";
import { View, Dimensions, FlatList, Image, ImageBackground } from "react-native";
import { Container, Text, Header, Content, Card, CardItem, Body, Item, Icon, Input, Button, Right } from 'native-base'
import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Home = ({ handleSearch, imagesList, scrollHandler, gridColumns, showMenuOptions }) => {
    return (
        <Container>
            <Header searchBar rounded>
                <Item style={{flex:0.85}}>
                    <Input placeholder="Search" onSubmitEditing={handleSearch} />
                    <Icon name="ios-search" />
                </Item>
                <Button transparent style={{flex:0.15}} onPress={showMenuOptions}>
                    <Icon name="menu" />
                </Button>
            </Header>
            <Content contentContainerStyle={{flex:1}}>
                <FlatList
                    data={imagesList}
                    renderItem={({ item }) => <View style={{ width: deviceWidth / gridColumns, height: deviceWidth / gridColumns, margin:1 }}>
                        <Image source={{ uri: item.url_s }} style={{ flex: 1 }} resizeMethod='auto' resizeMode='stretch' />
                    </View>}
                    numColumns={gridColumns}
                    keyExtractor={(item, index) => index}
                    ListEmptyComponent={
                        <Card>
                            <CardItem>
                                <Body style={styles.center_vertically}>
                                    <Text> No Images To Display </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    }
                    onEndReached={()=>scrollHandler()}
                    onEndThreshold={0.5}
                />
            </Content>
        </Container>
    );
};

export default Home;
