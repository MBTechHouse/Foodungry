import React from 'react';
import { StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, View } from 'react-native';
import { Button, Layout, Text, Icon, Input } from 'react-native-ui-kitten';
export default class ViewCart extends React.Component{


  static navigationOptions = {
     header:null
  };

  screenWidth = Dimensions.get('screen').width
  screenHeight = Dimensions.get('screen').height

  state={
    customerArrivalTime:'',
    cart:{},
    totalPrice:0,
    totalItems:0
  }

  componentDidMount()
  {
      this.setState({
        cart: this.props.navigation.getParam('cart'),
        totalPrice: this.props.navigation.getParam('totalPrice'),
        totalItems: this.props.navigation.getParam('totalItems')
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
        </View>
      );
    return <Text style={{ fontSize: 18, alignItems: 'center', color: '#aaa', fontFamily: 'serif', marginLeft: '28%', marginTop: '10%' }}>CART IS EMPTY</Text>
  }


  render()
  {
    return(
      <View style={styles.container}>
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
      <TouchableOpacity style={{position:'absolute', bottom:0, left:0, width:'100%', height:60, backgroundColor:'#55C2FF', borderTopRightRadius:40,
                                flexDirection:"row", borderRightColor: '#A6E7F9', borderRightWidth: 15, borderTopColor: '#A6E7F9', borderTopWidth: 7}}>
            <Layout style={{width:'67%', backgroundColor: 'transparent', justifyContent: 'center', paddingLeft:'5%'}}>
              <Text style={{color:'#fff', fontSize:16}}>{this.state.totalItems?this.state.totalItems:'0'} Items</Text>
              <Text style={{color:'#fff'}}>₹ {this.state.totalPrice?this.state.totalPrice:'0'}</Text>
            </Layout>

            <Layout style={{alignItems:'center', backgroundColor: 'transparent', alignItems:'center', flexDirection:"row"}}>
              <Text style={{color:'#fff'}}>Place Order</Text>
              <Icon name='arrow-right' width={20} height={20} fill='#fff' />
            </Layout>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { height:'100%',width:'100%',  backgroundColor:'#fff' },
  text: { marginVertical: 16 },
});
