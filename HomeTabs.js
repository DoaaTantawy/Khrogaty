import React, {Component} from 'react';
import {View, Image, Dimensions, ImageBackground} from 'react-native';
import {Container, Text, Card, CardItem, Content, Left, Body, Right, Button, Header, Title} from 'native-base';
import { createStackNavigator, createAppContainer} from "react-navigation";
import MyHeader from './MyHeader';
import PlaceDetailsWithMaps from "./PlaceDetailsWithMaps";
import FindPlaces from "./FindPlaces";


type Props = {};
export  default class HomeTabs extends Component<Props> {
    state = {counter: 0, loaded: 0, data: [], data2: [], data3: []}
    static navigationOptions = {
        header:null,
    };



    componentDidMount() {

        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=4")
            .then((response)=>response.json())
            .then((resJson)=>{
                this.setState({
                    data: resJson}, function f() {
                    console.log(resJson);

                });
            })
        this.makeRemoteRequestRestaurants();
        this.makeRemoteRequestThings();

    }

    makeRemoteRequestRestaurants = () => {
        const url = `http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data2: res,
                });
            })
    };

    makeRemoteRequestThings = () => {
        const url = `http://reactnative.website/iti/wp-json/wp/v2/posts?categories=2`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data3: res,
                });
            })
    };
    render() {
        return (
            <Container>
                        <ImageBackground  source={require('./Backgrounds/home-header.png')} style={{
                            justifyContent: 'center',width:'100%',height:130,
                            alignItems: 'center'}}>
                        <Image source={require('./Logo/khrogaty-logo.png')}
                               style={{width: 100, height: 100}} />
                        </ImageBackground>
                <Content>

                <Header noShadow style={{backgroundColor: "#FFFFFF"}}>
                            <Left>
                                <Image source={require('./vIcons/homeOne.png')}
                                       style={{ width: 40, height: 40}} />
                            </Left>
                            <Body>
                                <Text style={{fontSize: 16, fontWeight: 'bold'}} >
                                    What Do I Do
                                </Text>
                            </Body>

                            <Right>
                                <Button transparent success onPress={() => {
                                    this.props.navigation.navigate('Things To Do')
                                }}>
                                <Text style={{fontSize:12}}>
                                    View More
                                </Text>
                                </Button>
                            </Right>
                </Header>

                <Content horizontal={true}>
                    {this.returnData()}

                </Content>

                <Header noShadow style={{backgroundColor: "#FFFFFF"}}>
                    <Left>
                        <Image source={require('./vIcons/homeTwo.png')}
                               style={{ width: 40, height: 40}} />
                    </Left>
                    <Body>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}} >
                            Restaurants & Coffee shops
                        </Text>
                    </Body>

                    <Right>
                        <Button transparent success onPress={() => {
                            this.props.navigation.navigate('Restaurants')
                        }}>
                            <Text style={{fontSize:12}}>
                                View More
                            </Text>
                        </Button>
                    </Right>
                </Header>

                <Content horizontal={true}>
                    {this.returnDataRestaurants()}

                </Content>

                <Header noShadow style={{backgroundColor: "#FFFFFF"}}>
                    <Left>
                        <Image source={require('./vIcons/homeThree.png')}
                               style={{ width: 40, height: 40}} />
                    </Left>
                    <Body>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}} >
                            Places For Going Out
                        </Text>
                    </Body>

                    <Right>
                        <Button transparent success onPress={() => {
                            this.props.navigation.navigate('Find Places')
                        }}>
                            <Text style={{fontSize:12}}>
                                View More
                            </Text>
                        </Button>
                    </Right>
                </Header>

                <Content horizontal={true}>
                    {this.returnDataThings()}

                </Content>

    </Content>
            </Container>
        );
    }

    returnData(){
        return(
            this.state.data.map((mappingData) => {
                return (
                    <View key={mappingData.id} style={{height: 200}}>
                    <Card transparent style={{ padding: 0, margin: 0}}>
                        <CardItem style={{width:160}} button onPress={() => {
                            this.props.navigation.navigate('PlaceDetailsWithMaps', {
                                title: mappingData.title.rendered,
                                image: mappingData.better_featured_image.source_url,
                                content: mappingData.content.rendered,
                                map: mappingData.acf.map_location,
                                phone_number:mappingData.acf.phone_number,
                                email_address:mappingData.acf.email_address,
                                address:mappingData.acf.address,
                                placeId:mappingData.id,
                            })
                        }}>

                            <Body>
                                <Image
                                    style={{width:160, height: 120, borderRadius: 10}}
                                    source={{uri: mappingData.better_featured_image.source_url}}/>
                                <Text numberOfLines={1} style={{fontWeight: 'bold', color: '#000',fontSize:12}}>{mappingData.title.rendered}</Text>
                                <Text numberOfLines={1} style={{color: '#999', marginTop: 8, fontSize:10}}> <Image source={require('./Icons/map-marker.png')}
                                                                                                                  style={{ width: 10, height: 10}} /> {mappingData.acf.address} </Text>
                            </Body>
                        </CardItem>

                    </Card>
                    </View>
                )
            })

        )


    }

    returnDataRestaurants(){
        return(
            this.state.data2.map((mappingData) => {
                return (
                    <View key={mappingData.id} style={{height: 200}}>
                        <Card transparent style={{padding: 0, margin: 0}}>
                            <CardItem style={{width:160}} button onPress={() => {
                                this.props.navigation.navigate('PlaceDetailsWithMaps', {
                                    title: mappingData.title.rendered,
                                    image: mappingData.better_featured_image.source_url,
                                    content: mappingData.content.rendered,
                                    map: mappingData.acf.map_location,
                                    phone_number:mappingData.acf.phone_number,
                                    email_address:mappingData.acf.email_address,
                                    address:mappingData.acf.address,
                                    placeId:mappingData.id,
                                })
                            }}>

                                <Body>
                                    <Image
                                        style={{width:160, height: 120, borderRadius: 10}}
                                        source={{uri: mappingData.better_featured_image.source_url}}/>
                                    <Text numberOfLines={1} style={{fontWeight: 'bold', color: '#000',fontSize:12}}>{mappingData.title.rendered}</Text>
                                    <Text numberOfLines={1} style={{color: '#999', marginTop: 8, fontSize:10}}> <Image source={require('./Icons/map-marker.png')}
                                                                                                                      style={{ width: 10, height: 10}} /> {mappingData.acf.address} </Text>
                                </Body>
                            </CardItem>

                        </Card>
                    </View>
                )
            })

        )


    }

    returnDataThings(){
        return(
            this.state.data3.map((mappingData) => {
                return (
                    <View key={mappingData.id} style={{height: 200}}>
                        <Card transparent style={{padding: 0, margin: 0}}>
                            <CardItem style={{width:160}} button onPress={() => {
                                this.props.navigation.navigate('PlaceDetailsWithMaps', {
                                    title: mappingData.title.rendered,
                                    image: mappingData.better_featured_image.source_url,
                                    content: mappingData.content.rendered,
                                    map: mappingData.acf.map_location,
                                    phone_number:mappingData.acf.phone_number,
                                    email_address:mappingData.acf.email_address,
                                    address:mappingData.acf.address,
                                    placeId:mappingData.id,
                                })
                            }}>

                                <Body>
                                    <Image
                                        style={{width:160, height: 120, borderRadius: 10, paddingRight: 10}}
                                        source={{uri: mappingData.better_featured_image.source_url}}/>
                                    <Text numberOfLines={1} style={{fontWeight: 'bold', color: '#000',fontSize:12}}>{mappingData.title.rendered}</Text>
                                    <Text numberOfLines={1} style={{color: '#999', marginTop: 8, fontSize:10}}> <Image source={require('./Icons/map-marker.png')}
                                                                                                                         style={{ width: 10, height: 10}} /> {mappingData.acf.address} </Text>
                                </Body>
                            </CardItem>

                        </Card>
                    </View>
                )
            })

        )


    }

}
