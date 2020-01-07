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
      this.setState({cart: this.props.navigation.getParam('cart'), totalPrice: this.props.navigation.getParam('totalPrice'), totalItems: this.props.navigation.getParam('totalItems')})
  }


  renderCartButton(key,item)
  {
    
    if(item.quantity == 0)
    {
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

  renderItemList()
  {

    var items = []
    var stateItems = this.state.cart
    
    Object.entries(stateItems).forEach(([key,item]) => {
      items.push(<Layout style={{width:'100%', flexDirection:'row', height:100, marginTop:'3%', backgroundColor:'#FFFFFF'}} >
        <Layout style={{width:'60%' }}>
          <Text style={{fontWeight:'bold', fontSize:17, width:'60%',}}>{item.title}</Text>
          <Text style={{fontSize:16, color:'#000', marginTop:'0.2%',}}>Rs {item.actualPrice}</Text>
          <Text style={{fontSize:16, color:'#757575', }}>{item.description}</Text>
        </Layout>
        {this.renderCartButton(key,item)}
  </Layout>)
    })
    return items
  }


  render()
  {
    console.log("Cart", this.props.navigation.getParam('cart'))
  return(
    <View style={styles.container}>
      <Layout style={{width:'100%', height:'14%', backgroundColor:'#ef5350', paddingLeft:'3%'}}>
        <Text style={{color:'#FFF', fontSize:16, marginTop:'1%'}}>{this.props.navigation.getParam('ordermode')} AT</Text>
        <Layout style={{flexDirection:'row',backgroundColor:'#ef5350' , marginTop:'1%', justifyContent:'space-around'}}>
          <Layout style={{flexDirection:'row', backgroundColor:'ef5350'}}>
        <Icon name='checkmark-circle-2' width={25} height={25} fill='#FFF' />
        <Text style={{color:'#FFF', fontSize:18}}> HOME(Golf course Road)</Text>
          </Layout>
        <Text style={{color:'#FFF', fontSize:18}}>CHANGE</Text>
        </Layout>
        <Text style={{color:'#FFF', fontSize:16, paddingLeft:'14%'}}>{this.props.navigation.getParam('ordermode')} in 30 mins with LIVE TRACKING</Text>
      </Layout>
  <ScrollView style={styles.container}>
    <Layout style={{marginLeft:'6%'}}>
      {this.renderItemList()}
    </Layout>
    
    <Layout style={{height:this.screenHeight*0.1}}>
      <Text></Text>
    </Layout>

    
  </ScrollView>
  <TouchableOpacity style={{position:'absolute', bottom:0, left:0, width:'100%', height:60, backgroundColor:'#598BFF',
                             borderTopLeftRadius:10, borderTopRightRadius:10, flexDirection:"row"}}>
        <Layout style={{width:'70%', backgroundColor:'#598BFF', justifyContent:'center', paddingLeft:'2%'}}>
          <Text style={{color:'#fff'}}>{this.state.totalItems} ITEMS</Text>
          <Text style={{color:'#fff'}}>Rs {this.state.totalPrice} plus taxes</Text>
        </Layout>
        <Layout style={{backgroundColor:'#598BFF', alignItems:'center', justifyContent:'center', flexDirection:"row"}}>
          <Text style={{color:'#fff', fontSize:19}}>Place Order</Text>
          <Icon name='arrow-right' width={20} height={20} fill='#fff' />
        </Layout>
    </TouchableOpacity>
  
      
  </View>
  )
  }
}

const styles = StyleSheet.create({
  container: { height:'100%',width:'100%',  backgroundColor:'#fff' },
  text: { marginVertical: 16 },
});
