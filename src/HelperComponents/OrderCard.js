import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { Button, Layout, Icon } from 'react-native-ui-kitten';

export default class OrderCard extends React.Component {
    render()
    {
        return(
            <TouchableOpacity style={{borderWidth:1, borderColor:'#bdbdbd', flexDirection:'row', borderRadius:20, padding:'1%'}}>
                <Icon name={this.props.icon} width={20} height={20} fill='#757575' />
                <Text style={{marginLeft:'2%', color:'#757575'}}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}