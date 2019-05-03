import React, {Component} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { withNavigation } from 'react-navigation';

type Props = {};
class MyHeader extends Component<Props> {
    state = {title: this.props.title}
    render() {
        return (
                <ImageBackground  source={require('./Backgrounds/theme-header.png')} style={{width:'100%', height: 80
                    }}>
            <Header  style={{
                backgroundColor: 'transparent',
                elevation: 0,             // Remove shadow on Android
                shadowOpacity: 0         // Remove shadow on iOS
            }}>
                <Body>
                        <Title style={{marginLeft:0}}>{this.state.title}</Title>
                </Body>


            </Header>
                </ImageBackground>

        );
    }

}

export default withNavigation(MyHeader);