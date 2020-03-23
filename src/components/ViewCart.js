import React from 'react';
import { StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, View, Alert, ToastAndroid } from 'react-native';
import { Button, Layout, Text, Icon, Input } from 'react-native-ui-kitten';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import StepProgress from 'react-native-step-progress';
import firebase from 'firebase';
import RazorpayCheckout from 'react-native-razorpay';

export default class ViewCart extends React.Component{

  static navigationOptions = {
     header:null
  };

  screenWidth = Dimensions.get('screen').width
  screenHeight = Dimensions.get('screen').height

  state={
    arrTime: '',
    ordTime: '',
    cart:{},
    totalPrice:0,
    totalItems:0,
    restId: '',
    showPicker: false,
    user: {},
    step: 0
  }

  componentDidMount()
  {
    firebase.database().ref('users/'+firebase.auth().currentUser.uid)
      .on('value', snapshot => this.setState({ user: snapshot.val() }, () => {
        if(this.state.user.pendingOrd == 1)
          this.updatePage()
      }
    ));

    this.setState({
      cart: this.props.navigation.getParam('cart'),
      totalPrice: this.props.navigation.getParam('totalPrice'),
      totalItems: this.props.navigation.getParam('totalItems'),
      restId: '1RNk7guJOkSSAB3fxfgO21HJnvp1'
    });
  }

  updatePage() {
    firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/myOrders')
    .once('value', order => {
      let arr = Object.keys(order.val())
      firebase.database().ref('orders/'+arr[arr.length-1])
      .on('value', ord => this.setState({ step: ord.val().status, ordTime: ord.val().ordTime, arrTime: parseFloat(arr[arr.length-1].split('_')[1]) }, () => {
        if(this.state.step == 3)
          firebase.database().ref('users/'+firebase.auth().currentUser.uid).update({ pendingOrd: 0 })
      }))
    });
  }

  renderCartButton(key,item)
  {
    if(item.quantity == 0) {
      return <TouchableOpacity style={{borderRadius:4,paddingLeft:'5.2%',paddingRight:'5.2%',paddingTop:'1%', paddingBottom:'1%', backgroundColor:'#fff',
      borderWidth:1, borderColor:'#bdbdbd', height:'40%'}}
      onPress={()=>{
        let cart = this.state.cart
        let totalItems = this.state.totalItems
        let totalPrice = this.state.totalPrice
        let cartItem = cart[key]
        cartItem.quantity = cartItem.quantity + 1
        cart[key] = cartItem
        totalItems = totalItems + 1
        totalPrice = totalPrice + item.actualPrice

        this.setState({cart:cart, totalPrice:totalPrice, totalItems:totalItems})}}>
        <Text style={{color:'#7cb342', fontWeight:'bold'}}>ADD +</Text>
        </TouchableOpacity>
    }
    //paddingLeft:'5.2%',paddingRight:'5.2%',paddingTop:'1%', paddingBottom:'1%',
    else
    {
      return <Layout style={{flexDirection:'row',borderRadius:4, backgroundColor:'#fff',
      borderWidth:1, borderColor:'#bdbdbd', height:'40%'}}>
        <TouchableOpacity style={{color:'#7cb342', fontWeight:'bold'}}
         onPress={()=>{
          let cart = this.state.cart
          let totalItems = this.state.totalItems
          let totalPrice = this.state.totalPrice
          let cartItem = cart[key]
          cartItem.quantity = cartItem.quantity - 1
          cart[key] = cartItem
          totalItems = totalItems - 1
          totalPrice = totalPrice - item.actualPrice

          if(cart[key].quantity==0)
          {
            delete cart[key]
            this.setState({cart:cart, totalPrice:totalPrice, totalItems:totalItems})
          }
          else
            this.setState({cart:cart, totalPrice:totalPrice, totalItems:totalItems})
         }}>
        <Text style={{color:'red', fontWeight:'bold', paddingLeft:'2.5%', paddingRight:'2.5%',paddingTop:'1%', paddingBottom:'1%'}}>-</Text>
        </TouchableOpacity>
        <Text style={{color:'#272727', fontWeight:'bold', paddingLeft:'2.8%', paddingRight:'2.8%',paddingTop:'1%', paddingBottom:'1%', backgroundColor:'#e8eaf6'}}>{item.quantity}</Text>
        <TouchableOpacity style={{color:'#7cb342', fontWeight:'bold'}}
        onPress={()=>{
          let cart = this.state.cart
          let totalItems = this.state.totalItems
          let totalPrice = this.state.totalPrice
          let cartItem = cart[key]
          cartItem.quantity = cartItem.quantity + 1
          cart[key] = cartItem
          totalItems = totalItems + 1
          totalPrice = totalPrice + item.actualPrice
        this.setState({cart:cart, totalPrice:totalPrice, totalItems:totalItems})
        }}>
        <Text style={{color:'#7cb342', fontWeight:'bold', paddingLeft:'2.5%', paddingRight:'2.5%',paddingTop:'1%', paddingBottom:'1%'}}>+</Text>
        </TouchableOpacity>
      </Layout>
    }
  }

  renderItemList() {
    var items = []
    var stateItems = this.state.cart;
    Object.entries(stateItems).forEach(([key,item]) => {
      items.push(<Layout style={{width:'100%', flexDirection:'row', height:75, marginTop:'3%', backgroundColor:'#fff', borderBottomWidth: 1,
                    alignItems: 'center'}}
      >
        <Layout style={{width:'60%', marginRight: '10%'}}>
          <Text style={{fontWeight:'bold', fontSize:17, width:'60%',}}>{item.title}</Text>
          <Text style={{fontSize:16, color:'#000', marginTop:'0.2%'}}>₹ {item.actualPrice}</Text>
          <Text style={{fontSize:16, color:'#757575', }}>{item.description}</Text>
        </Layout>
        {this.renderCartButton(key,item)}
      </Layout>)
    })
    return items
  }

  getScrollView()
  {
    if(this.state.cart)
      return (
        <View>
          <Layout style={{marginLeft:'6%'}}>
            {this.renderItemList()}
          </Layout>
          <Layout style={{width: '100%', padding: '5%', backgroundColor: '#D2F3FC', marginTop: '3%' }}>
            <Layout style={{alignItems:'center', backgroundColor: 'transparent', alignItems:'center', flexDirection:"row"}}>
              <Text style={{}}>Item Total</Text>
              <Text style={{position:'absolute', right: 10}}>₹ {this.state.totalPrice}</Text>
            </Layout>
          </Layout>
          <TouchableOpacity
            style={{ width: '50%', borderRadius: 25, borderWidth: 0, padding: '2%',
            backgroundColor: '#55C2FF', marginTop: '5%', alignSelf: 'center' }}
            onPress={() => this.setState({ showPicker: true })}
          >
            <Text style={{ alignSelf: 'center', color: 'white' }}>Arrival Time: {this.formTime(this.state.arrTime)}</Text>
          </TouchableOpacity>
        </View>
      );
    return <Text style={{ fontSize: 18, alignItems: 'center', color: '#aaa', fontFamily: 'serif', marginLeft: '28%', marginTop: '10%' }}>CART IS EMPTY</Text>
  }

  uploadOrder() {
    let at = this.state.arrTime
    if(at == '-:-') {
      Alert.alert("Oops...", "Please specify your Arrival Time.")
      return
    }

    let t = Date.now()
    if(at < Date.now()) {
      Alert.alert("Oops...", "Select a valid arrival time.")
      this.setState({ arrTime: '' })
      return
    }
    this.setState({ ordTime: t })
    let oid = "order_" + at
    let ord = {
      restId: this.state.restId,
      email: this.state.user.email,
      phone: this.state.user.phone,
      ordTime: t,
      items: this.state.cart,
      totalPrice: this.state.totalPrice,
      status: 0
    }

    let temp = {}

    temp['orders/' + oid] = ord
    temp['users/' + firebase.auth().currentUser.uid + '/pendingOrd'] = 1
    temp['users/' + firebase.auth().currentUser.uid + '/myOrders/' + oid] = "-"
    temp['restaurants/' + this.state.restId + '/myOrders/' + oid] = "-"

    firebase.database().ref().update(temp);

    firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/myOrders')
    .once('value', order => {
      let arr = Object.keys(order.val())
      firebase.database().ref('orders/'+arr[arr.length-1]+'/status')
      .on('value', status => this.setState({ step: status.val() }))
    });
  }

  capturePayment(orderId) {
    let t = Date.now()
    let options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_LrlEZ9KyFeDU92',
      amount: '250',
      name: 'Foodungry',
      order_id: orderId,//Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar'
      },
      theme: {color: '#53a20e'}
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  }

    
  createOrder() {
    let orderApiUrl = "https://api.razorpay.com/v1/orders"
    let orderApiHeader = new Headers();
    orderApiHeader.append("content-type", "application/json");
    // let apiKey = "rzp_test_LrlEZ9KyFeDU92"
    // let apiSecret = "R1BnrzYspuWeJphoD55juJie"
    // let encodedBasicAuth = base64.encode(apiKey + ":" + apiSecret)
    // orderApiHeader.append("Authorization", "Basic "+ encodedBasicAuth);
    // console.log(encodedBasicAuth)
    //Replace with the above code after server is integrated
    orderApiHeader.append("Authorization", "Basic cnpwX3Rlc3RfTHJsRVo5S3lGZURVOTI6UjFCbnJ6WXNwdVdlSnBob0Q1NWp1Smll");
    let orderApiOptions = 
      JSON.stringify({"amount":25000,"currency":"INR","receipt":"rcptid_11","payment_capture":1});

    let requestOptions = {
      method: 'POST',
      headers: orderApiHeader,
      body: orderApiOptions,
      redirect: 'follow'
    };

    fetch(orderApiUrl, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        this.capturePayment(result.id)
      })
      .catch(error => console.log('error', error));
  }

  formTime(time) {
    if(time == '')
      return '-:-'
    let at = new Date(time)
    return at.getHours()+":"+at.getMinutes()
  }

  footer() {
    if(this.state.user.pendingOrd == 1) {
      let labels = ['Order\nRequested', 'Preparing\nYour Food', 'Food Is\nReady']

      return (
        <Layout>
          <StepProgress
              customStyles={customStyles}
              currentPosition={this.state.step + 1}
              stepCount={3}
              labels={labels}
          />
          <Layout style={{ flexDirection: 'row', padding: 10, backgroundColor: '#D2F3FC', marginTop: '2%' }}>
            <Text style={{ fontSize: 12 }}>Order Time: {this.formTime(this.state.ordTime)}</Text>
            <Text style={{ alignSelf: 'center', position: 'absolute', fontSize: 12, right: 10}}>Id#: {this.state.arrTime}</Text>
          </Layout>
        </Layout>
      )
    }
    return (
      <TouchableOpacity style={{position:'absolute', bottom:0, left:0, width:'100%', height:60, backgroundColor:'#55C2FF', borderTopRightRadius:40,
                                flexDirection:"row", borderRightColor: '#A6E7F9', borderRightWidth: 15, borderTopColor: '#A6E7F9', borderTopWidth: 7}}
                        onPress={() => 
                          {
                            this.createOrder();
                          }
                        }
              >
            <Layout style={{width:'67%', backgroundColor: 'transparent', justifyContent: 'center', paddingLeft:'5%'}}>
              <Text style={{color:'#fff', fontSize:16}}>{this.state.totalItems?this.state.totalItems:'0'} Items</Text>
              <Text style={{color:'#fff'}}>₹ {this.state.totalPrice?this.state.totalPrice:'0'}</Text>
            </Layout>

            <Layout style={{alignItems:'center', backgroundColor: 'transparent', alignItems:'center', flexDirection:"row"}}>
              <Text style={{color:'#fff'}}>Place Order</Text>
              <Icon name='arrow-right' width={20} height={20} fill='#fff' />
            </Layout>
        </TouchableOpacity>
    )
  }

  render()
  {
    return(
      <View style={styles.container}>
        <DateTimePickerModal
          isVisible={this.state.showPicker}
          mode="time"
          onConfirm={time => {
            let d = Date.parse(time) + Date.now()%10000
            if(d < Date.now())
              Alert.alert("Oops...", "Select a valid arrival time.")
            else
              this.setState({ arrTime: d, showPicker: false })
          }}
          onCancel={() => this.setState({ showPicker: false })}
        />
        <Layout style={{backgroundColor: '#55C2FF', borderLeftColor: '#A6E7F9', borderLeftWidth: 15, borderBottomColor: '#A6E7F9', borderBottomWidth: 7, borderBottomLeftRadius: 40, flexDirection:'row'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 19,
              color: '#fdfdfd',
              fontWeight: 'bold',
              fontFamily: 'serif',
              margin: '3%',
              marginLeft: '5%'
            }}>
            CART
          </Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '22%' }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                color: '#fdfdfd',
                fontWeight: 'bold',
                marginRight: '2%',
                marginLeft: '4%',
              }}>
              Home Location
            </Text>
            <Icon
              name="edit-outline"
              width={this.screenWidth * 0.06}
              height={this.screenWidth * 0.06}
              fill="#fdfdfd"
            />
          </TouchableOpacity>
        </Layout>
      <ScrollView style={styles.container}>
        {this.getScrollView()}
      </ScrollView>
      {this.footer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { height:'100%',width:'100%',  backgroundColor:'#fff' },
  text: { marginVertical: 16 },
});

customStyles = {
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
