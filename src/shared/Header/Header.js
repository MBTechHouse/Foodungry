import React from 'react';
import {View, Text} from 'react-native';


const Header = (props) => <View style={{
    width:'100%', 
    height:60, 
    alignItems:'center', 
    justifyContent:'center',
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,}}>
    <Text style={{fontSize:22, fontWeight:'bold'}}>{props.children}</Text>
</View>

export default Header;