import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { WebView } from 'react-native-webview';

export default class CustomerFeeback extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Customer Feedback",
        headerStyle: { backgroundColor: "#ffffff" },
    });
    render() {
        console.log("https://docs.google.com/forms/d/e/1FAIpQLSc2eIkdtc_glTxql2DVvbk9IrtsQOZigF7gBvnhLpdBloQuhg/viewform?usp=sf_link")
        return(
            <View style={{width:'100%', height:'100%'}}>
                <WebView 
                source={{ uri: "https://docs.google.com/forms/d/e/1FAIpQLSc2eIkdtc_glTxql2DVvbk9IrtsQOZigF7gBvnhLpdBloQuhg/viewform?usp=sf_link" }} />
            </View>
        )
    }
}