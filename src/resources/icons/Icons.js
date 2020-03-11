import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../../constants/color'
export const LeftArrow = ({onIconPress})=>{
    return (<Ionicons
     name="ios-arrow-dropleft-circle" 
     size={30} 
     color={COLORS.PRIMARY_COLOR}
     onPress={()=>onIconPress()}/>)
}

export const RightArrow = ({onIconPress})=>{
    return (<Ionicons
     name="ios-arrow-dropright-circle" 
     size={30} 
     color={COLORS.PRIMARY_COLOR}
     onPress={()=>onIconPress()}/>)
}