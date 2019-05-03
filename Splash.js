import React, {Component} from 'react';
import {View, Image, ImageBackground, AsyncStorage} from 'react-native';
import { Container, Text,Card, CardItem, Content, Left, Body, Right,Spinner } from 'native-base';

type Props = {};
export default class Splash extends Component<Props> {
    state = {counter: 0, title: "news Single"}
    static navigationOptions = {
        header: null,
    };


    render() {
        return (
            <Container style={{alignContent: "center", justifyContent: "center"}}>
                <ImageBackground  source={require('./Backgrounds/splash-bg.png')} style={{   flexDirection: 'column',
                    justifyContent: 'center',width:'100%',height:'100%',
                    alignItems: 'center'}}>
                    <Image source={require('./Logo/khrogaty-logo.png')}
                           style={{width: 100, height: 100}} />

                </ImageBackground>

                {this.moveToHome()}

            </Container>
        );
    }

    moveToHome(){
        AsyncStorage.getItem("here").then((val)=>{
            setTimeout(()=>{
                if(val === "yes"){
                    this.props.navigation.navigate('tabs');
                }else{
                    this.props.navigation.navigate('WelcomeScreen');
                }

            }, 1000);
        });
    }
}
