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
    Body,
    Left,
    Title, Button, Right, Spinner
} from 'native-base';
import MyHeader from "./MyHeader";
import {Image, WebView, FlatList, View, TextInput, ImageBackground} from "react-native";
import {ListItem} from "react-native-elements";
type Props = {};
const regex = /(<([^>]+)>)/ig;
export  default class PlaceDetailsWithMaps extends Component<Props> {
    state = {counter: 0, title: this.props.navigation.getParam('title'), data: [], isRefreshing: false, text: "", addCommentRes: [], addingComment: 0}
    static navigationOptions = {
        header:null,
    };

    onRefresh = async () => {
        this.setState({
            isRefreshing: true
        });
        await this.makeRemoteRequest();

        this.setState({
            isRefreshing: false
        });
    };

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const urlString = `http://reactnative.website/iti/wp-json/wp/v2/comments?post=`;
        let id=this.props.navigation.getParam('placeId');
        const url=`${urlString}${id}`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res,
                });
            })
    };

    render() {
        return (

                <Container>
                    <ImageBackground  source={require('./Backgrounds/theme-header.png')} style={{width:'100%', height: 80
                    }}>
                        <Header  style={{
                            backgroundColor: 'transparent',
                            elevation: 0,             // Remove shadow on Android
                            shadowOpacity: 0         // Remove shadow on iOS
                        }}>
                        <Left>
                            <Button transparent onPress={()=>{
                                this.props.navigation.goBack();
                            }}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{this.state.title}</Title>
                        </Body>
                    </Header>
                    </ImageBackground>
                    <Tabs tabBarUnderlineStyle={{borderBottomWidth:2, borderBottomColor: '#45ca36'}}>
                        <Tab
                              heading={<TabHeading style={{backgroundColor: '#FFFFFF'}}>
                                  <Text style={{color: '#000000'}}>  <Image source={require('./Icons/gabout.png')}
                                                                            style={{width: 15, height: 15}} />  Info</Text>
                              </TabHeading>}>
                            {this.SendDataToDetails()}

                        </Tab>
                        <Tab  activeTabStyle={{backgroundColor: '#669933'}}
                              heading={<TabHeading style={{backgroundColor: '#FFFFFF'}}>
                                  <Text style={{color: '#000000'}}> <Image source={require('./Icons/map-marker.png')}
                                                                           style={{width: 15, height: 15}} />  Map</Text>
                              </TabHeading>}>
                            {this.SendDataToMap()}
                        </Tab>
                    </Tabs>


                </Container>
        );
    }



    SendDataToDetails (){
        return (
            <Container>

                <Content>
                    <Card>
                        <CardItem>
                            <Body>

                                <Image
                                    style={{width: '100%', height: 220 }}
                                    source={{uri: this.props.navigation.getParam('image')}} />

                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text style={{fontWeight:'bold', fontSize: 18}}>{this.props.navigation.getParam('title')}</Text>
                                <Text style={{color: 'gray'}}>{this.props.navigation.getParam('content').replace(regex, '')}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Text style={{fontWeight:'bold', fontSize: 16, paddingLeft: 10}}>More Information</Text>

                    <Card>
                        <CardItem>
                            <Text style={{color: 'gray'}}><Image source={require('./Icons/address.png')}
                                         style={{width: 20, height: 20}} /> {this.props.navigation.getParam('address')}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{color: 'gray'}}><Image source={require('./Icons/call.png')}
                                         style={{width: 20, height: 20}} /> {this.props.navigation.getParam('phone_number')}</Text>
                        </CardItem>
                        <CardItem>
                            <Text style={{color: 'gray'}}><Image source={require('./Icons/mail.png')}
                                         style={{width: 20, height: 20}} /> {this.props.navigation.getParam('email_address')}</Text>
                        </CardItem>
                    </Card>

                    <Text style={{fontWeight:'bold', fontSize: 16, paddingLeft: 10}}>Leave a comment</Text>
                    {this.getComments()}


                    <Card >
                        <CardItem>
                            <Body>
                                <TextInput  maxLength = {100}
                                            style={{height: 40, borderColor: 'white', borderWidth: 1}}
                                            onChangeText={(text) => this.setState({text})}
                                            value={this.state.text}
                                            placeholder={'Write here...'}
                                />
                            </Body>
                            <Right>
                                {this.commentButton()}
                            </Right>

                        </CardItem>
                    </Card>

                </Content>

            </Container>
        );
    }

    SendDataToMap (){
        return (
            <Container>
                <Content>
                    <WebView source={{uri: this.props.navigation.getParam('map')}} style= {{width: '100%', height: 600}}/>

                </Content>

            </Container>
        );
    }

    commentButton(){
        if(this.state.addingComment === 0){
            return(
                <Button transparent info onPress={()=>{
                    this.sendComment();
                    this.setState({addingComment: 1})
                }}>
                    {/*<Text style={{color: '#fff', fontWeight: 'bold'}}>Send</Text>*/}
                    <Image source={require('./Icons/telegram.png')}
                           style={{width: 25, height: 25}} />
                </Button>
            )
        }else{
            return(
                <Button transparent info onPress={()=>{
                }}>
                    <Spinner color='green'/>
                </Button>

            )
        }
    }

    sendComment(){
        fetch('http://reactnative.website/iti/wp-json/wp/v2/comments?author_name=Doaa'+'&author_email=doaatantawy2@gmail.com&content='+ this.state.text +'&post='+ this.props.navigation.getParam('placeId'), {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res)=> res.json())
            .then((rj)=>{
                this.setState({addCommentRes: rj, addingComment: 0, text: ""}, function(){
                    console.log(rj);
                })
            })
        this.makeRemoteRequest();
    }
    getComments(){
        return(

            <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                    <ListItem
                        leftAvatar={{ source: { uri: "http:\/\/2.gravatar.com\/avatar\/2faaa8f5be5370bf1d9de1f6ead84feb?s=48&d=mm&r=g"} }}
                        title={item.author_name}
                        subtitle={item.content.rendered}
                    />
                )}
                keyExtractor={item => item.author_name}
                ItemSeparatorComponent={this.renderSeparator}
                onRefresh={this.onRefresh}
                refreshing={this.state.isRefreshing}
            />

        );
    }

}

