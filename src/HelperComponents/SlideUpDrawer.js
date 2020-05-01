import React from 'react'
import {View,Text, Animated,Platform, Dimensions,KeyboardAvoidingView} from 'react-native';

import AntDesign from "react-native-vector-icons/AntDesign";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CloseDrawerIcon = ({ onDrawerClose }) => {
    return (
      <AntDesign
        name="close"
        size={23}
        color="#272727"
        style={{ position: "absolute", right: 0, top: 0 }}
        onPress={() => onDrawerClose()}
      />
    );
  };

const SlideUpDrawer = (props)=> {
    return(

        <View style={[props.styles.sheet]}>
            <Animated.View
              style={[
                props.styles.popup,
                {
                  transform: [
                    {
                      translateY: props.animationController.interpolate({
                        inputRange: [0.01, 1],
                        outputRange: [0, -1 * (screenHeight *props.popUpHeight)],
                        extrapolate: "clamp"
                      })
                    }
                  ]
                }
              ]}
            >
              <View
                style={{
                  width: "90%",
                  flexDirection: "row",
                  paddingLeft:'10%',
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ fontSize: 21 }}>{props.title}</Text>
                <CloseDrawerIcon onDrawerClose={props.onDrawerClose} />
              </View>
              <KeyboardAvoidingView behavior={ "padding"}  
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 10}
            enabled={Platform.OS === "ios" ? true : false}>
            <View style={{height:'100%'}}>
              {props.children}
              </View>
            </KeyboardAvoidingView>
            </Animated.View>
          </View>
        
    )
}

export default SlideUpDrawer;