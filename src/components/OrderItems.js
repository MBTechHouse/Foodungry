import React from 'react';
import { StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, View, TouchableHighlight, ToastAndroid } from 'react-native';
import { Button, Layout, Text, Icon } from 'react-native-ui-kitten';
import {BoxShadow} from 'react-native-shadow';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Viewport } from '@skele/components'
import firebase from 'firebase'
import { Toast } from 'native-base';

const ViewportAwareView = Viewport.Aware(View)

export default class Orderitems extends React.Component{

  screenWidth = Dimensions.get('screen').width
  screenHeight = Dimensions.get('screen').height

  state = {
    items: {},
    cart:{},
    totalPrice: 0,
    totalItems: 0,
    categoryList:[],
  currentCategorySelected:null
  }

  async fetchItemsFromDB(restId) {
    console.log(restId)
    categoryList = []
    items = {}
    await firebase.database().ref(`restaurants/${restId}/categories`).on('value',(categories=>{
      firebase.database().ref(`restaurants/${restId}/foodItems`).on('value',(foodItems=>{

    categoryList = []
    items = {}
        if(categories && categories.val() && categories!==null && categories.val()!==null ) {
      Object.entries(categories.val()).map(([categoryId, categoryVal])=>{
        let categoryObject = {...categoryVal}
        categoryObject["categoryId"] = categoryId
        categoryList.push(categoryObject)
        items[categoryId] = {}
      })
      if(foodItems!==null && foodItems.val() && foodItems.val()!==null && foodItems.val()) {
      Object.entries(foodItems.val()).map(([foodItemId, foodItem])=>{
        let foodObject = {...foodItem}
        foodObject["quantity"] = 0
        if(items[foodItem.category])
        items[foodItem.category][foodItemId] = foodObject
      })
    }
    }
      this.setState({categoryList:categoryList, currentCategorySelected:categoryList.length>0?categoryList[0].categoryId:null, items:items})
      }))
    }))
  }

  componentDidMount() {
    this.fetchItemsFromDB(this.props.navigation.state.params.restId)
  }
  
  renderCartButton(key,item)
  {
    
    if(item.quantity == 0)
    {
      return <TouchableOpacity style={{backgroundColor:'#fff'}} 
      onPress={()=>{
        let items = this.state.items
        let cart = this.state.cart
        let totalItems = this.state.totalItems
        let totalPrice = this.state.totalPrice
        items[this.state.currentCategorySelected][key].quantity = items[this.state.currentCategorySelected][key].quantity + 1
        totalItems = totalItems + 1
        totalPrice = totalPrice + item.actualPrice
        cart[key] = item
        this.setState({cart:cart, items:items, totalPrice:totalPrice, totalItems:totalItems})}}>
        <Image source={require('../resources/icons/plus.png')} style={{width:40, height:40}} />
        </TouchableOpacity>
    }
    //paddingLeft:'5.2%',paddingRight:'5.2%',paddingTop:'1%', paddingBottom:'1%',
    else
    {
      return <Layout style={{backgroundColor:'#fff',
      borderColor:'#bdbdbd',paddingLeft:5.5}}>
        <TouchableOpacity style={{backgroundColor:'#6ed6ff', borderTopLeftRadius:15, borderTopRightRadius:15,alignItems:'center', justifyContent:'center'}}
         onPress={()=>{
          let items = this.state.items
          let cart = this.state.cart
          let totalItems = this.state.totalItems
          let totalPrice = this.state.totalPrice
          totalItems = totalItems + 1
          totalPrice = totalPrice + item.actualPrice
        items[this.state.currentCategorySelected][key].quantity = items[this.state.currentCategorySelected][key].quantity + 1
        cart[key] = items[this.state.currentCategorySelected][key]
        this.setState({items:items, cart:cart,totalPrice:totalPrice, totalItems:totalItems})
         }}>
        <Image source={require('../resources/icons/plus-nobg.png')} style={{width:30, height:30, tintColor:'#fff'}}/>
        </TouchableOpacity>
        <Text style={{backgroundColor:'#fff',color:'#272727', fontWeight:'bold', paddingLeft:'2.8%', paddingRight:'2.8%',paddingTop:'1%', paddingBottom:'1%', }}>{item.quantity}</Text>
        <TouchableOpacity style={{backgroundColor:'#6ed6ff', borderBottomLeftRadius:15, borderBottomRightRadius:15,alignItems:'center', justifyContent:'center'}} 
        onPress={()=>{
          let items = this.state.items
          let cart = this.state.cart
          let totalItems = this.state.totalItems
          let totalPrice = this.state.totalPrice
          totalItems = totalItems - 1
          totalPrice = totalPrice - item.actualPrice
          items[this.state.currentCategorySelected][key].quantity = items[this.state.currentCategorySelected][key].quantity - 1
          cart[key] = items[this.state.currentCategorySelected][key]
          if(items[this.state.currentCategorySelected][key].quantity==0)
          {
            delete cart[key]
            this.setState({items:items,cart:cart, totalPrice:totalPrice, totalItems:totalItems})
          }
          else
            this.setState({cart:cart, items:items, totalPrice:totalPrice, totalItems:totalItems})
          
        }}>
        <Image source={require('../resources/icons/minus-nobg.png')} style={{width:28, height:28, tintColor:'#fff'}}/>
        </TouchableOpacity>
      </Layout>
    }
  }

  renderItemList()
  {

    var items = []
    if(this.state.currentCategorySelected!==null){
    var stateItems = this.state.items[this.state.currentCategorySelected]
    if(stateItems!==undefined && stateItems!==null){
    Object.entries(stateItems).forEach(([key,item]) => {
      items.push(<BoxShadow setting={{
        width: this.screenWidth *0.95,
        height: this.screenHeight * 0.15,
        color: '#000',
        border: 5,
        opacity: 0.2,
        x: 0,
        y: 4,
        radius:this.screenHeight*0.02,
        style:{
          marginTop:this.screenHeight*0.01,
          marginBottom: this.screenHeight*0.015
        }
      }}>
      <View style={{width:this.screenWidth *0.95, flexDirection:'row', height:this.screenHeight*0.15, backgroundColor:'#fff', borderRadius:this.screenHeight*0.02,}} >
        <View style={{height:'100%', width:'3%', backgroundColor:(item.type == 0)?'green':(item.type == 1)?'#795548':'#d32f2f', borderTopLeftRadius:this.screenHeight*0.02, borderBottomLeftRadius:this.screenHeight*0.02}}>
          <Text></Text>
        </View>
      <View style={{width:'80%', marginLeft:'4%', justifyContent:'space-around'}}>
        <View>
          <Text style={{fontWeight:'bold', fontSize:19, width:'60%'}}>{item.title}</Text>
        <Text style={{fontSize:16, color:'#757575', marginTop:'1%'}}>{item.description}</Text>
        </View>
        <View style={{flexDirection:'row',  marginBottom:'2%',height:'20%', alignItems:'center'}}>
          <Image source={require('../resources/icons/rupee.png')} style={{width:15, height:15}} resizeMode="contain" />
          <Text style={{fontSize:18, color:'#0092cc',marginLeft:'1%',}}>{item.actualPrice}</Text>
          </View>
      </View>
      <View style={{height:'100%', justifyContent:'center', alignItems:'center'}}>
      {this.renderCartButton(key,item)}
      </View>
  </View>
  </BoxShadow>)
    })
  }
  }
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

  handlePills(text)
  {
    let pillsarr = text.split(',')
    let pillsView = []
    pillsarr.forEach(pills=>{
      pillsView.push(<View style={{padding:5, borderRadius:9, backgroundColor:'#fff',marginLeft:5, marginRight:10 }}>
        <Text>{pills}</Text>
      </View>)
    })
    return pillsView
  }

  
  _handleViewportEnter = ()=>{
    console.log("Yeneter")
  }

  _handleViewportLeave = ()=>{
    console.log("Yexit")
  }
  render()
  {
    console.log("Total Price",this.state.totalPrice)
    console.log("Total Items",this.state.totalItems)
    console.log("Cart", this.state.cart)
    console.log("Category List", this.state.categoryList)
    console.log("Items", this.state.items)
  return(
    <View>
      <Viewport.Tracker>
  <ScrollView style={styles.container} >
    
    <ViewportAwareView 
        onViewportEnter={this._handleViewportEnter}
        onViewportLeave={this._handleViewportLeave}>
    <View style={{flex:1, alignItems:'center', height:this.screenHeight*0.58,}}>
      <Image source={require('../resources/Images/food1.jpeg')} style={{width:'100%', height: this.screenHeight*0.45, marginBottom:'3%'}} />
      
      <BoxShadow
          setting={{
            width: this.screenWidth * 0.9,
            height: this.screenHeight * 0.25,
            color: '#000',
            border: 5,
            opacity: 0.2,
            x: 0,
            y: 4,
            radius:10,
            style: {
              marginVertical: 5,
              marginLeft: this.screenWidth * 0.04,
              marginRight: this.screenWidth * 0.04,
              position:'absolute', top:this.screenHeight*0.30,
            },
          }}>
      <View style={{height: this.screenHeight*0.25,borderRadius:10,  backgroundColor:'#55c2ff'}}>
        <View style={{width:'90%', flexDirection:'row',  justifyContent:'center',}}>
          <Text category="h4" style={{ fontWeight:'bold', width:'90%', color:'#fff', top:this.screenHeight*0.03, left:this.screenWidth*0.06}}>Domino's Pizza</Text>
            <View style={{borderRadius:3,padding:'1.2%', backgroundColor:'#7cb342'}}>
              <Text style={{color:'#fff'}}>4.5</Text>
            </View>
          </View>
          <View style={{flexDirection:'row', top:this.screenHeight*0.04, left:this.screenWidth*0.08}}>{this.handlePills("Fast Food, Pizza")}</View>
          <Text style={{color:'#272727',top:this.screenHeight*0.07, left:this.screenWidth*0.08, fontWeight:'bold'}}>Banashankari 3rd Stage</Text>
          <Text style={{color:'#272727',top:this.screenHeight*0.08, left:this.screenWidth*0.08, fontWeight:'bold'}}>Cost for one:- $200</Text>
        </View>
        </BoxShadow>
    </View>
    </ViewportAwareView>
    <View style={{width:'100%',height:this.screenHeight*0.1,top:this.screenHeight*0.035}}>
    <ScrollView style={{flex:1, }} horizontal={true} showsHorizontalScrollIndicator={false}>
    {
      this.state.categoryList.map(category=>{
        console.log(category.name, category.categoryId)
        if(this.state.currentCategorySelected==category.categoryId)
        {
          return <TouchableOpacity 
        style={{ height:'100%',
        marginLeft:this.screenWidth*0.03,
        marginRight:this.screenWidth*0.03,
        alignItems:'center',
        }}>
            <Text style={{fontSize:16,marginBottom:this.screenHeight*0.01,color:'#0092cc', fontWeight:'bold'}}>{category.name}</Text>
            <View style={{borderRadius:this.screenWidth*0.01/2,width:this.screenWidth*0.1, height:this.screenHeight*0.007, backgroundColor:'#55c2ff'}}>
              <Text></Text>
            </View>
          </TouchableOpacity>
        }
        return <TouchableOpacity 
        style={{ height:'100%',
        marginLeft:this.screenWidth*0.03,
        marginRight:this.screenWidth*0.03,
        alignItems:'center'}}
        onPress={()=>{this.setState({currentCategorySelected:category.categoryId})}}
        >
            <Text style={{fontSize:16}}>{category.name}</Text>
          </TouchableOpacity>
        
      })
    
    }
    </ScrollView>
    </View>

    <Layout style={{paddingLeft:'2%'}}>

      {this.renderItemList()}

    </Layout>

    <Layout style={{height:this.screenHeight*0.2}}>
      <Text></Text>
    </Layout>

  </ScrollView>
  </Viewport.Tracker>
  {this.renderCartTab()}


  </View>
  )
  }
}

const styles = StyleSheet.create({
  container: { height:'100%',width:'100%',  backgroundColor:'#fff' },
  text: { marginVertical: 16 },
});
