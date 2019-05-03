import React, { Component } from 'react';
import {
    Container,
    Header,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    Text,
    Content,
    Card,
    CardItem,
    Left,
    Body,
    Button
} from 'native-base';
import MyHeader from "./MyHeader";
import {ActivityIndicator, Image, View} from "react-native";

type Props = {};
export default class RestaurantsTaps extends Component<Props> {
    state = {counter: 0, title: "Restaurants", loaded: 0, data: [], loading: false }
    static navigationOptions = {
        header:null,
    };

    componentDidMount() {
        this.setState({ loading: true });
        fetch("http://reactnative.website/iti/wp-json/wp/v2/posts?categories=3")
            .then((response)=>response.json())
            .then((resJson)=>{
                this.setState({
                    data: resJson}, function f() {
                    console.log(resJson);
                    this.setState({ loading: false });

                });
            })
        // alert(Dimensions.get('window').width + "-" + Dimensions.get('window').height);
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <Container>
                <MyHeader title={this.state.title} home="1"/>
                <Tabs tabBarUnderlineStyle={{borderBottomWidth:2, borderBottomColor: '#45ca36'}} >
                    <Tab
                        activeTabStyle={{backgroundColor: '#669933'}}
                        heading={<TabHeading style={{backgroundColor: '#FFFFFF'}}>
                            <Text style={{color: '#000000'}}>All</Text>
                        </TabHeading>}
                    >

                        <Content>
                        {this.returnData()}
                        </Content>
                    </Tab>
                    <Tab  activeTabStyle={{backgroundColor: '#669933'}}
                          heading={<TabHeading style={{backgroundColor: '#FFFFFF'}}>
                              <Text style={{color: '#000000'}}>Restaurants</Text>
                          </TabHeading>}
                    >
                        <Content>
                        {this.returnData()}
                        </Content>
                    </Tab>
                    <Tab
                        activeTabStyle={{backgroundColor: '#669933'}}
                        heading={<TabHeading style={{backgroundColor: '#FFFFFF'}}>
                            <Text style={{color: '#000000'}}>Coffee Shops</Text>
                        </TabHeading>}
                    >
                        <Content>
                        {this.returnData()}
                        </Content>
                    </Tab>
                </Tabs>
            </Container>
        );
    }



    returnData(){
        return(
            this.state.data.map((mappingData) => {
                return (
                    <Card key={mappingData.id}>
                        <CardItem >
                            <Left style={{flex: 2}}>
                                <Image
                                    style={{width: 120, height: 160, borderRadius: 10}}
                                    source={{uri: mappingData.better_featured_image.source_url}}/>
                            </Left>
                            <Body style={{flex: 3}}>
                                <Text style={{fontWeight: 'bold', color: '#000'}}>{mappingData.title.rendered}</Text>
                                <Text numberOfLines={1} style={{color: '#45ca36', marginTop: 8, fontSize:10}}> <Image source={require('./Icons/map-marker.png')}
                                                                                                                      style={{ width: 10, height: 10}} /> {mappingData.acf.address} </Text>
                                <Text style={{color: '#999', marginTop: 10}}>{mappingData.excerpt.rendered}</Text>

                                <Button success style={{width: 100 ,height: 30,borderRadius:15, marginTop: 10,
                                    justifyContent: 'center'}}
                                        onPress={() => {
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
                                        }}
                                ><Text>Details</Text></Button>
                            </Body>
                        </CardItem>
                    </Card>
                )
            })

        )


    }

}