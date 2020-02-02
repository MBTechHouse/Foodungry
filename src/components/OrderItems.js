import React from 'react';
import { StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, View } from 'react-native';
import { Button, Layout, Text, Icon } from 'react-native-ui-kitten';
export default class Orderitems extends React.Component{


  static navigationOptions = {
      title: "Domino's Pizza",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontSize: 18,
          },
  };

  state = {
    items: {
      0: {
        title:'Cafe Frappe',
        description: 'Coffee',
        strikePrice: 120,
        actualPrice: 90,
        quantity:0
      },
      1: {
        title:'Macroni',
        description: 'Noodles',
        strikePrice: 200,
        actualPrice: 110,
        quantity:0
      },
      2: {
        title:'Margherita',
        description: 'Pizza',
        strikePrice: 375,
        actualPrice: 210,
        quantity:0
      },
      3: {
        title:'Softy',
        description: 'Ice Cream',
        strikePrice: 75,
        actualPrice: 50,
        quantity:0
      },
      4: {
        title:'Cafe Frappe',
        description: 'Coffee',
        strikePrice: 120,
        actualPrice: 90,
        quantity:0
      },
      5: {
        title:'Macroni',
        description: 'Noodles',
        strikePrice: 200,
        actualPrice: 110,
        quantity:0
      },
      6: {
        title:'Margherita',
        description: 'Pizza',
        strikePrice: 375,
        actualPrice: 210,
        quantity:0
      },
      7: {
        title:'Softy',
        description: 'Ice Cream',
        strikePrice: 75,
        actualPrice: 50,
        quantity:0
      },

    },

    cart:{},
    totalPrice: 0,
    totalItems: 0
  }

  screenWidth = Dimensions.get('screen').width
  screenHeight = Dimensions.get('screen').height


  renderCartButton(key,item)
  {

    if(item.quantity == 0)
    {
      return <TouchableOpacity style={{borderRadius:4,paddingLeft:'5.2%',paddingRight:'5.2%',paddingTop:'1%', paddingBottom:'1%', backgroundColor:'#fff',
      borderWidth:1, borderColor:'#bdbdbd'}}
      onPress={()=>{
        let items = this.state.items
        let cart = this.state.cart
        let totalItems = this.state.totalItems
        let totalPrice = this.state.totalPrice
        items[key].quantity = items[key].quantity + 1
        totalItems = totalItems + 1
        totalPrice = totalPrice + item.actualPrice
        cart[key] = item
        this.setState({cart:cart, items:items, totalPrice:totalPrice, totalItems:totalItems})}}>
        <Text style={{color:'#7cb342', fontWeight:'bold'}}>ADD +</Text>
        </TouchableOpacity>
    }
    //paddingLeft:'5.2%',paddingRight:'5.2%',paddingTop:'1%', paddingBottom:'1%',
    else
    {
      return <Layout style={{flexDirection:'row',borderRadius:4, backgroundColor:'#fff',
      borderWidth:1, borderColor:'#bdbdbd'}}>
        <TouchableOpacity style={{color:'#7cb342', fontWeight:'bold'}}
         onPress={()=>{
          let items = this.state.items
          let cart = this.state.cart
          let totalItems = this.state.totalItems
          let totalPrice = this.state.totalPrice
          totalItems = totalItems - 1
          totalPrice = totalPrice - item.actualPrice
          items[key].quantity = items[key].quantity - 1
          cart[key] = items[key]
          if(items[key].quantity==0)
          {
            delete cart[key]
            this.setState({items:items,cart:cart, totalPrice:totalPrice, totalItems:totalItems})
          }
          else
            this.setState({cart:cart, items:items, totalPrice:totalPrice, totalItems:totalItems})
         }}>
        <Text style={{color:'red', fontWeight:'bold', paddingLeft:'2.5%', paddingRight:'2.5%',paddingTop:'1%', paddingBottom:'1%'}}>-</Text>
        </TouchableOpacity>
        <Text style={{color:'#272727', fontWeight:'bold', paddingLeft:'2.8%', paddingRight:'2.8%',paddingTop:'1%', paddingBottom:'1%', backgroundColor:'#e8eaf6'}}>{item.quantity}</Text>
        <TouchableOpacity style={{color:'#7cb342', fontWeight:'bold'}}
        onPress={()=>{
          let items = this.state.items
          let cart = this.state.cart
          let totalItems = this.state.totalItems
          let totalPrice = this.state.totalPrice
          totalItems = totalItems + 1
          totalPrice = totalPrice + item.actualPrice
        items[key].quantity = items[key].quantity + 1
        cart[key] = items[key]
        this.setState({items:items, cart:cart,totalPrice:totalPrice, totalItems:totalItems})
        }}>
        <Text style={{color:'#7cb342', fontWeight:'bold', paddingLeft:'2.5%', paddingRight:'2.5%',paddingTop:'1%', paddingBottom:'1%'}}>+</Text>
        </TouchableOpacity>
      </Layout>
    }
  }

  renderItemList()
  {

    var items = []
    var stateItems = this.state.items

    Object.entries(stateItems).forEach(([key,item]) => {
      items.push(<Layout style={{width:'100%', flexDirection:'row', height:100, marginTop:'3%', backgroundColor:'#FFFFFF'}} >
      <Image source={require('../resources/Images/food3.jpg')}  style={{width:'20%', height:'70%', marginLeft:'5%', borderRadius:10}} resizeMode="cover"/>
      <Layout style={{width:'80%', marginLeft:'4%'}}>
        <Layout style={{width:'100%', flexDirection:'row', }}>
          <Text style={{fontWeight:'bold', fontSize:17, width:'60%',}}>{item.title}</Text>
            {this.renderCartButton(key,item)}
        </Layout>
        <Text style={{fontSize:16, color:'#757575', }}>{item.description}</Text>
        <Layout style={{flexDirection:'row'}}>
          <Text style={{fontSize:16, color:'#757575', marginTop:'0.2%', textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>Rs {item.strikePrice}</Text>
          <Text style={{fontSize:16, color:'#000', marginTop:'0.2%', marginLeft:'3%', }}>Rs {item.actualPrice}</Text>
        </Layout>
        <Text style={{fontSize:16, color:'red', marginTop:'1%' }}>Save {item.strikePrice - item.actualPrice}</Text>
      </Layout>
  </Layout>)
    })
    return items
  }

  renderCartTab()
  {
    if(this.state.totalItems > 0)
    {
      return (
        <TouchableOpacity style={{position:'absolute', bottom:0, left:0, width:'100%', height:60, backgroundColor:'#55C2FF', borderTopRightRadius:40,
                                  flexDirection:"row", borderRightColor: '#A6E7F9', borderRightWidth: 15, borderTopColor: '#A6E7F9', borderTopWidth: 7}}
                          onPress={()=>{this.props.navigation.navigate('ViewCart', {cart: this.state.cart, totalPrice: this.state.totalPrice, totalItems: this.state.totalItems, ordermode:this.props.navigation.getParam('ordermode')})}}
        >
              <Layout style={{width:'70%', backgroundColor: 'transparent', justifyContent: 'center', paddingLeft:'5%'}}>
                <Text style={{color:'#fff', fontSize:16}}>{this.state.totalItems} Items</Text>
                <Text style={{color:'#fff'}}>Rs {this.state.totalPrice} + taxes</Text>
              </Layout>

              <Layout style={{alignItems:'center', backgroundColor: 'transparent', alignItems:'center', flexDirection:"row"}}>
                <Text style={{color:'#fff'}}>View Cart</Text>
                <Icon name='arrow-right' width={20} height={20} fill='#fff' />
              </Layout>
          </TouchableOpacity>
      );
    }
  }

  render()
  {
    console.log("Total Price",this.state.totalPrice)
    console.log("Total Items",this.state.totalItems)
    console.log("Cart", this.state.cart)
    console.log("nav", this.props.navigation.getParam('ordermode'))
  return(
    <View>
  <ScrollView style={styles.container}>
    <Image source={require('../resources/Images/food1.jpeg')} style={{width:'100%', height: this.screenHeight*0.3, marginBottom:'3%'}} />

    <Layout style={{marginLeft:'3%'}}>

      <Layout style={{width:'100%', flexDirection:'row', }}>
        <Text category="h4" style={{ fontWeight:'bold', width:'90%'}}>Domino's Pizza</Text>
          <Layout style={{borderRadius:3,padding:'1.2%', backgroundColor:'#7cb342'}}>
            <Text style={{color:'#fff'}}>4.5</Text>
          </Layout>
        </Layout>
        <Text style={{color:'#272727', marginTop:'0.6%'}}>Fast Food, Pizza</Text>
        <Text style={{color:'#757575', marginTop:'0.6%'}}>Banashankari 3rd Stage</Text>
        <Text style={{color:'#757575', marginTop:'0.6%'}}>Cost for one:- $200</Text>
      </Layout>

    <Layout>

      {this.renderItemList()}

    </Layout>

    <Layout style={{height:this.screenHeight*0.2}}>
      <Text></Text>
    </Layout>

  </ScrollView>
  {this.renderCartTab()}


  </View>
  )
  }
}

const styles = StyleSheet.create({
  container: { height:'100%',width:'100%',  backgroundColor:'#fff' },
  text: { marginVertical: 16 },
});
