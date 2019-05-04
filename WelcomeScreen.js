import React, { Component } from 'react';
import { Image ,AsyncStorage,ImageBackground, Platform} from 'react-native';
import { Container, Header, Title, Content, CardItem, Button,View, Left, Right, Body, Icon, Text, Spinner } from 'native-base';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

export default class WelcomeScreen extends Component <Props> {
    state ={
        tutorialPage:0
    }
    static navigationOptions = {
        header: null,
    };


    render() {
        return (
          this.tutorialPages()
        );
    }

    tutorialPages()
    {
        if(this.state.tutorialPage===0)
        {
            return(
                <ImageBackground  source={require('./Backgrounds/onboarding-bg-left.png')} style={{   flexDirection: 'column',
                    justifyContent: 'center',width:'100%',height:'100%',
                    alignItems: 'center'}}>
                    <Image source={require('./Logo/khrogaty-logo.png')}
                           style={{width: 100, height: 100}} />

                    <View style={{
                        flexDirection: "column", flex: 1, position: "absolute",bottom:'8%',
                        justifyContent: 'space-between', alignItems:'center'}}>

                        <Image source={require('./vIcons/onboardFirst.png')}
                               style={{ width: 55, height: 55}} />
                        <Text style={{color:'black' ,fontWeight:'bold',fontSize:18,marginTop:7}}>Places for going out.</Text>
                        <Text style={{paddingLeft:10 ,paddingRight:10 ,textAlign:'center', fontSize:15, color: 'gray'}}> Discover new places for hanging out with your family and friends</Text>

                    </View>

                    <View style={{
                        flexDirection: "column", flex: 1, position: "absolute", bottom: 0 ,left:'68%',
                        justifyContent: 'space-between', padding: '1%' }}>

                        <Button transparent style={{backgroundColor:'transparent'}}  onPress={() => {
                            this.setState({tutorialPage:1})
                        }}>

                            <Text style={{color:'black'}}>Next</Text>
                            <Icon name="arrow-forward" style={{color:'black'}}/>
                        </Button>

                    </View>

                </ImageBackground>
            ) }

        else if(this.state.tutorialPage===1)
        {
            return(
                <ImageBackground  source={require('./Backgrounds/onboarding-bg-left.png')} style={{   flexDirection: 'column',
                    justifyContent: 'center',width:'100%',height:'100%',
                    alignItems: 'center'}}>

                    <Image source={require('./Logo/khrogaty-logo.png')}
                           style={{width: 100, height: 100}} />

                    <View style={{
                        flexDirection: "column", flex: 1, position: "absolute",bottom:'8%',
                        justifyContent: 'space-between', alignItems:'center'}}>

                        <Image source={require('./vIcons/onboardSecond.png')}
                               style={{ width: 55, height: 55}} />
                        <Text style={{color:'black' ,fontWeight:'bold',fontSize:18,marginTop:7}}>Restaurants & Coffee Shops.</Text>
                        <Text style={{paddingLeft:10 ,paddingRight:10 ,textAlign:'center',fontSize:15, color: 'gray'}}> Discover a wide Variety of restaurants and coffee shops</Text>

                    </View>


                    <View style={{
                        flexDirection: "column", flex: 1, position: "absolute", bottom: 0 ,left:'0%',
                        justifyContent: 'space-between', padding: '1%' }}>

                        <Button transparent style={{backgroundColor:'transparent'}}  onPress={() => {
                            this.setState({tutorialPage:0})
                        }}>
                            <Icon name="arrow-back" style={{color:'black'}}/>
                            <Text style={{color:'black'}}>Prev</Text>

                        </Button>

                    </View>

                    <View style={{
                        flexDirection: "column", flex: 1, position: "absolute", bottom: 0 ,left:'68%',
                        justifyContent: 'space-between', padding: '1%' }}>

                        <Button transparent style={{backgroundColor:'transparent'}}  onPress={() => {
                            this.setState({tutorialPage:2})
                        }}>

                            <Text style={{color:'black'}}>Next</Text>
                            <Icon name="arrow-forward" style={{color:'black'}}/>
                        </Button>

                    </View>


                </ImageBackground>
            )
        }else if(this.state.tutorialPage===2)
        {
            return(
                <ImageBackground  source={require('./Backgrounds/onboarding-bg-left.png')} style={{   flexDirection: 'column',
                    justifyContent: 'center',width:'100%',height:'100%',
                    alignItems: 'center'}}>

                    <Image source={require('./Logo/khrogaty-logo.png')}
                           style={{width: 100, height: 100}} />

                    <View style={{
                        flexDirection: "column", flex: 1, position: "absolute",bottom:'11%',
                        justifyContent: 'space-between', alignItems:'center'}}>

                        <Image source={require('./vIcons/onboardThird.png')}
                               style={{ width: 55, height: 55}} />
                        <Text style={{color:'black' ,fontWeight:'bold',fontSize:18,marginTop:7}}>What Do I Do ?</Text>
                        <Text style={{paddingLeft:10 ,paddingRight:10 ,textAlign:'center', fontSize:15, color: 'gray'}}> Find what to do today, this weekend, or in May.</Text>

                    </View>


                    <View style={{
                        flexDirection: "column", flex: 1, position: "absolute", bottom: 0 ,left:'0%',
                        justifyContent: 'space-between', padding: '1%' }}>

                        <Button transparent style={{backgroundColor:'transparent'}}  onPress={() => {
                            this.setState({tutorialPage:1})
                        }}>
                            <Icon name="arrow-back" style={{color:'black'}}/>
                            <Text style={{color:'black'}}>Prev</Text>

                        </Button>

                    </View>

                    <Button success style={{width:'28%',height:'6%',borderRadius:10,
                        flexDirection: "column", flex: 1, position: "absolute", bottom: '2%' ,left:'37%',
                        justifyContent: 'center', padding: '1%' }}
                            onPress={() => {
                                this.props.navigation.navigate('appStackNavigator');
                                {this.saveData()}
                            }}
                    ><Text> Start </Text></Button>


                </ImageBackground>
            )
        }




    }
    saveData(){
        AsyncStorage.setItem("here", "yes")
    }
}
