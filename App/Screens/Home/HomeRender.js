import React, { Component } from "react";
import { View, Dimensions, FlatList, Image } from "react-native";
import { Container, Text, Header, Content, Card, CardItem, Body, Item, Icon, Input, Button } from 'native-base'
import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;

const Home = ({ handleSearch, imagesList, scrollHandler, gridColumns, showMenuOptions }) => {
    return (
        <Container>
            <Header searchBar rounded>
                <Item style={ styles.flex_85 }>
                    <Input placeholder="Search" onSubmitEditing={handleSearch} />
                    <Icon name="ios-search" />
                </Item>
                <Button transparent style={ styles.flex_15 } onPress={showMenuOptions}>
                    <Icon name="menu" />
                </Button>
            </Header>
            <Content contentContainerStyle={ styles.flex_1 }>
                <FlatList
                    data={imagesList}
                    renderItem={({ item }) => <View style={{ width: deviceWidth / gridColumns, height: deviceWidth / gridColumns, margin:1 }}>
                        <Image source={{ uri: item.url_s }} style={ styles.flex_1 } resizeMethod='auto' resizeMode='stretch' />
                    </View>}
                    numColumns={gridColumns}
                    key = { gridColumns }
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
