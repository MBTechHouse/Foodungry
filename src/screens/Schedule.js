import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import firebase from 'firebase' 

export default class Schedule extends Component {

    state = {
        orders:[]
    }

    componentDidMount() {
        let orders = [...this.state.orders]
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/myOrders`).on('value',(orderIds)=>{
            if(orderIds.val()!==null) {
                Object.keys(orderIds.val()).map(orderId=>{
                    firebase.database().ref(`orders/${orderId}`).once('value',(order)=>{
                        if(order.val().orderMode && order.val().orderMode==1)
                        firebase.database().ref(`1FithETVAzs4Yb2iZtUPkEcqm2jXIjGnsBiVVgRPAcdc/restaurants/${order.val().restId}`).once('value',(restaurant)=>{
                            let orderObj = {...order.val()}
                            orderObj['restaurantName'] = restaurant.val().name
                            let date = new Date(order.val().ordTime)
                            orderObj["date"] = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

                            console.log("232323232",orderObj)
                            orders = [...this.state.orders]
                            orders.push(orderObj)
                            this.setState({orders})
                        })
                    })
                })
                console.log("done")
            }
        })
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
                    <Text>{order.ordTime}</Text>
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
                    <Text style={{fontSize:22, fontWeight:'bold'}}>Schedule</Text>
                </View>
                <View style={{height:20}}/>
                <ScrollView contentContainerStyle={{paddingLeft:'3%', paddingRight:'3%', paddingBottom:300}}>
                    {this.renderPastOrders()}
                </ScrollView>

            </View>
        )
    }
}