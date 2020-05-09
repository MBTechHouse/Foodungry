import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import firebase from 'firebase' 

export default class PastOrders extends Component {

    state = {
        orders:[]
    }

    componentDidMount() {
        let orders = []
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/myOrders`).on('value',(orderIds)=>{
            if(orderIds.val()!==null) {
                console.log(orderIds.val())
                Object.keys(orderIds.val()).map(orderId=>{
                    firebase.database().ref(`orders/${orderId}`).on('value',(order)=>{
                        firebase.database().ref(`1FithETVAzs4Yb2iZtUPkEcqm2jXIjGnsBiVVgRPAcdc/restaurants/${order.val().restId}`).once('value',(restaurant)=>{
                            let orderObj = {...order.val()}
                            orderObj['restaurantName'] = restaurant.val().name
                            let date = new Date(order.val().ordTime)
                            orderObj["date"] = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
                            orders.push(orderObj)
                        })
                    })
                })
            }
        })
        console.log(orders)
        this.setState({orders})
    }

    renderPastOrders() {
        let pastOrder = []
        this.state.orders.forEach(order=>{
            pastOrder.push(
            <TouchableOpacity 
            activeOpacity={0.8}
            style={{
                width:'100%', 
                height:80, 
                borderRadius:10,
                backgroundColor:'#fff', 
                flexDirection:'row',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,}}>
                <View style={{width:'80%', justifyContent:'center', paddingLeft:'6%'}}>
                    <Text>{order.restaurantName}</Text>
                    <Text>{order.date}</Text>
                </View>
                <View style={{
                    backgroundColor:'#55C2FF',
                    width:'20%', 
                    alignItems:'center', 
                    justifyContent:'center',
                    borderTopRightRadius:10, 
                    borderBottomRightRadius:10}}>
                    <Text style={{fontSize:19, fontWeight:'bold'}}>
                        Rs. {order.totalPrice}
                        </Text>
                </View>
            </TouchableOpacity>)
            pastOrder.push(<View style={{height:20}}/>)
        })
        return pastOrder
    }

    render() {
        return (
            <View>
                <View style={{
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
                    <Text style={{fontSize:22, fontWeight:'bold'}}>Past Orders</Text>
                </View>
                <View style={{height:20}}/>
                <ScrollView contentContainerStyle={{paddingLeft:'3%', paddingRight:'3%', paddingBottom:300}}>
                    {this.renderPastOrders()}
                </ScrollView>

            </View>
        )
    }
}