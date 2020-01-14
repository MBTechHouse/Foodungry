import React from 'react'
import {View, Text, TouchableHighlight,Image, Dimensions, Animated } from 'react-native'
import {BoxShadow} from 'react-native-shadow';
import { withNavigation } from 'react-navigation';

class AddButton extends React.Component{

    buttonSize = new Animated.Value(1)
    handlePress() {
        console.log("Animation - Foodungry Bottom Nav")
        Animated.sequence([
            Animated.timing(this.buttonSize,{
                toValue: 0.95,
                duration:200
            }),
            Animated.timing(this.buttonSize,{
                toValue: 1,
            })
        ]).start() 
        setTimeout(()=>
        {

            this.props.navigation.navigate('Orders');
        },200)
    }

    render()
    {
        return(
            <View style={{position:'absolute', alignItems:'center',top:-30,}}>
                <Animated.View style={{transform: [{scale:this.buttonSize}],alignItems:'center', justifyContent:'center', position:'absolute',  shadowColor:'#7F58FF',shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.37,
          shadowRadius: 5,

          elevation: 12,}}>
                    <TouchableHighlight underlayColor="transparent" onPress={() => this.handlePress()}>
                    <BoxShadow setting={{
      width:75,
      height:75,
      color:"#55c2ff",
      border:4,
      radius:30.5,
        opacity:0.2,
        x:0,
        y:2,
  }}>
                        <View style={{borderColor:'#8AD1FF', borderWidth:5, borderRadius:37.5, width: 75, height: 75, backgroundColor:'#8AD1FF'}}>
                            <Image source={require('../../resources/Images/logo.png')} style={{width:65, height:65}} />
                            </View>
                        </BoxShadow>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        )
    }
}

export default withNavigation(AddButton);
