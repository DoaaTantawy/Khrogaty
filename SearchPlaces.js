import React, {Component} from 'react';
import { SearchBar, ListItem} from 'react-native-elements';
import {View, Text, FlatList, ActivityIndicator, Image} from "react-native";
import MyHeader from "./MyHeader";
import { createStackNavigator, createAppContainer} from "react-navigation";
import {Body, Card, CardItem, Container, Content, Left} from "native-base";
import PlaceDetailsWithMaps from "./PlaceDetailsWithMaps";

export  default class SearchPlaces extends Component {
    static navigationOptions = {
        header:null,
    };
    constructor(props) {
        super(props);

        this.state = {
            title: "Search Places",
            loading: false,
            data: [],
            error: null,
        };

        this.arrayholder = [];
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const url = `http://reactnative.website/iti/wp-json/wp/v2/posts`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: '',
                    error: res.error || null,
                    loading: false,
                });
                this.arrayholder = res;
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = item.title.rendered.toUpperCase();
            if(text){
                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            }
            else {
                return itemData.indexOf("");
            }

        });
        this.setState({
            data: newData,
        });
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };


    ListEmpty = () => {
        return (
            //View to show when list is empty
            <View style={{
                width: '100%', height: '100%',
                flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
            }}>
                <Image source={require('./vIcons/noSearchicon.png')} style={{
                    width: 120, height: 120,
                    justifyContent: 'center', alignItems: 'center'
                }} />

                <Text style={{
                    marginTop: 40,
                    fontWeight: 'bold', textAlign: 'center', fontSize: 15,
                    justifyContent: 'center', alignItems: 'center'
                }}> Search for any places</Text>

            </View>
        );
    };
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
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            button onPress={() => {
                            this.props.navigation.navigate('PlaceDetailsWithMaps', {
                                title: item.title.rendered,
                                image: item.better_featured_image.source_url,
                                content: item.content.rendered,
                                map: item.acf.map_location,
                                phone_number:item.acf.phone_number,
                                email_address:item.acf.email_address,
                                address:item.acf.address,
                                placeId:item.id,
                            })
                        }}
                            leftAvatar={{ source: { uri: item.better_featured_image.source_url } }}
                            title={item.title.rendered}
                        />
                    )}

                    ListEmptyComponent={this.ListEmpty}
                    keyExtractor={item => item.title.rendered}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>


            </Container>
        );
    }


}
