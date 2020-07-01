import React, {Component} from 'react'
import { View, Text, ScrollView, BackHandler, TouchableOpacity  } from 'react-native'
import firebase from 'firebase'
import Header from '../shared/Header/Header'
import StepProgress from 'react-native-step-progress';
import moment from 'moment'

export default class OrderDetails extends Component {

    state = {
        foodItems: {},
        totalPrice: 0,
        ordTime: null,
        step: 0,
        arrTime: null
    }

    componentWillMount() {
        BackHandler.addEventListener(
          'orderDetailsBackPress',
          ()=>{
            this.props.navigation.navigate(this.props.navigation.state.params.screen);
            return true
          })
      }

                
    componentWillUnmount() {
        BackHandler.removeEventListener(
          'orderDetailsBackPress',
          ()=>{
            this.props.navigation.navigate(this.props.navigation.state.params.screen);
            return true
          })
      }

    componentDidMount() {
        BackHandler.addEventListener(
            'orderDetailsBackPress',
            ()=>{
              this.props.navigation.navigate(this.props.navigation.state.params.screen);
              return true
        })
        let orderId = this.props.navigation.state.params.orderId
            firebase.database().ref(`orders/${orderId}`)
                .on('value', orderDetails => {
                    if(orderDetails.val().status == 3) {
                        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({ pendingOrd: 0 })
                    } else {
                        this.setState({
                            foodItems: orderDetails.val().items,
                            totalPrice: orderDetails.val().totalPrice,
                            ordTime: orderDetails.val().ordTime,
                            arrTime: parseFloat(orderId.split('_')[1]),
                            step: orderDetails.val().status
                        })
                    }
                })
        console.log(orderId)
    }

    formTime(time) {
        if(time == '')
          return '-:-'
        let at = moment(time)
        return at.hour()+":"+at.minute()
      }    

    renderOrderedItems() {
        let items = []
        let foodItems = this.state.foodItems;
        Object.entries(foodItems).forEach(([key,item]) => {
            items.push(<View style={{width:'100%', flexDirection:'row', height:75, marginTop:'3%', backgroundColor:'#fff', borderBottomWidth: 1,
                        alignItems: 'center'}}
            >
            <View style={{width:'60%', marginRight: '10%'}}>
                <Text style={{fontWeight:'bold', fontSize:17, width:'60%',}}>{item.title}</Text>
                <Text style={{fontSize:16, color:'#000', marginTop:'0.2%'}}>₹ {item.actualPrice}</Text>
                <Text style={{fontSize:16, color:'#757575', }}>{item.description}</Text>
            </View>
            <Text style={{color:'#272727', fontWeight:'bold', paddingLeft:'2.8%', paddingRight:'2.8%',paddingTop:'1%', paddingBottom:'1%', backgroundColor:'#e8eaf6'}}>Quantity: {item.quantity}</Text>
            </View>)
        })
        return items
    }

    footer() {
        let labels = ['Order\nRequested', 'Preparing\nYour Food', 'Food Is\nReady']
        if(this.state.ordTime!==null && this.state.arrTime!==null)
        return (
        <View style={{bottom:0, position:'absolute', width:'100%'}}>
            <StepProgress
                customStyles={customStyles}
                currentPosition={this.state.step + 1}
                stepCount={3}
                labels={labels}
            />
            <View style={{ flexDirection: 'row', padding: 10, backgroundColor: '#D2F3FC', marginTop: '2%' }}>
                <Text style={{ fontSize: 12 }}>Order Time: {this.formTime(this.state.ordTime)}</Text>
                <Text style={{ alignSelf: 'center', position: 'absolute', fontSize: 12, right: 10}}>Id#: {this.state.arrTime}</Text>
            </View>
        </View>
        )
    }

    render () {
        return(
            <View style={{width:'100%', height:'100%'}}>
                <Header>Order Details</Header>
                <View style={{padding:'5%', height:'70%'}}>
                    <Text style={{fontSize:19, fontWeight:'bold'}}>Items ordered</Text>
                    <ScrollView>
                        {this.renderOrderedItems()}
                        <View style={{width: '100%', padding: '5%', backgroundColor: '#D2F3FC', marginTop: '3%' }}>
                            <View style={{alignItems:'center', backgroundColor: 'transparent', alignItems:'center', flexDirection:"row"}}>
                                <Text style={{}}>Item Total</Text>
                                <Text style={{position:'absolute', right: 10}}>₹ {this.state.totalPrice}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity 
                    activeOpacity={0.8}
                    style={{
                        width:'100%', 
                        backgroundColor: '#55C2FF', 
                        paddingTop: '4%', 
                        paddingBottom:'4%', 
                        borderRadius:10,
                        alignItems:'center'}}>
                        <Text style={{fontSize:18, fontWeight:'bold'}}>Need help ?</Text>
                    </TouchableOpacity>
                </View>
                {this.footer()}
            </View>
        )
    }
}

const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#55C2FF',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#55C2FF',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#55C2FF',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#55C2FF',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#55C2FF',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#55C2FF'
  }