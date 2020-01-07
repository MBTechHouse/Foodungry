import React from 'react';
import { StyleSheet,Text, View, Image,TouchableOpacity, ScrollView } from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Layout,
  Text as KText
} from 'react-native-ui-kitten';

const SAMPLE_DATA = {
  title: 'Title for Item',
  description: 'Description for Item',
};

export default class OrderList extends React.Component {

  data = new Array(12).fill(SAMPLE_DATA);

  renderItemAccessory = (style) => (
    <Button style={style}>FOLLOW</Button>
  );

  renderItemIcon = (style) => (
    <Icon {...style} name='person' />
  );

  renderItem = ({ item, index }) => (
      <TouchableOpacity style={{width:'100%', flexDirection:'row', height:100, marginTop:'3%', backgroundColor:'#FFFFFF', borderBottomWidth:2, borderBottomColor:'green'}} 
      onPress={() => {
        this.props.navigation.navigate('OrderItemList', {ordermode: this.props.navigation.getParam('ordermode')})}}
        >
          
            <Layout style={{width:'34%', marginLeft:'4%', marginRight:'2%', height:90,marginTop:'2%'}}>
              <Text style={{fontWeight:'bold', fontSize:18, width:'100%', textAlign:'right'}}>Domino's Pizza</Text>
              <Text style={{fontSize:12, color:'#757575', marginTop:'1%', width:'100%',textAlign:'right'}}>Cafe, Inoor Eating | Koramangala, Bangalore</Text>
            </Layout>

            <Image source={require('../resources/Images/food1.jpeg')}  style={{width:'20%', height:'70%', marginLeft:'1%', borderRadius:10}} resizeMode="cover"/>

            <Layout style={{width:'30%', marginLeft:'2%', height:90,marginTop:'2%'}}>
            <Text style={{fontSize:14, color:'#757575', marginTop:'1%'}}>Fast Food, Pizza</Text>
            <Text style={{fontSize:14, color:'#9e9e9e', marginTop:'1%'}}>$200 per person | 10% person coupon</Text>
            </Layout>
          
      </TouchableOpacity>
     
     
   
  );

  renderItems()
  {
    let names = ["Domino's Pizza","Chulha Chauki Da Dhaba", "Starbucks", "Eat N Drink", "Singh Da Dhaba" ]
    let type = ["Motel, Inoor Eating | Jayanagar, Bangalore","Cafe, Outdoor Eating | J P Nagar, Bangalore","Cafe, Hookah | Palace Road, Bangalore"
  ,"Restaurant, Outdoor Eating | AGS Layout, Bangalore","Drive In, Inoor Eating | Uttarahalli, Bangalore"]
    let cuisine = ["Continental, Northindian, Italian", "Fast Food, Chicken Wings, Tea","Sandwich, South Indian, Sutta","Chinese, Japanese, Noth Indina","Cheese Burst, Pizza"]
    let renderArray= []
    for(let i=0; i<5;i++)
    {
      renderArray.push( <TouchableOpacity style={{width:'100%', flexDirection:'row', height:100, marginTop:'3%', backgroundColor:'#FFFFFF', borderBottomWidth:2, borderBottomColor:'green'}} 
      onPress={() => {
        this.props.navigation.navigate('OrderItemList', {ordermode: this.props.navigation.getParam('ordermode')})}}
        >
          
            <Layout style={{width:'34%', marginLeft:'2%', marginRight:'2%', height:90,marginTop:'2%'}}>
              <Text style={{fontWeight:'bold', fontSize:18, width:'100%', textAlign:'right'}}>{names[i]}</Text>
              <Text style={{fontSize:12, color:'#757575', marginTop:'1%', width:'100%',textAlign:'right'}}>{type[i]}</Text>
            </Layout>

            <Image source={require('../resources/Images/food1.jpeg')}  style={{width:'25%', height:'90%', marginLeft:'1%', borderRadius:10}} resizeMode="cover"/>

            <Layout style={{width:'30%', marginLeft:'2%', height:90,marginTop:'2%'}}>
            <Text style={{fontSize:14, color:'#757575', marginTop:'1%'}}>{cuisine[i]}</Text>
            <Text style={{fontSize:14, color:'#9e9e9e', marginTop:'1%'}}>$200 per person | 10% person coupon</Text>
            </Layout>
          
      </TouchableOpacity>)
    }
    return renderArray
  }

  render()
  {
  return (
    <ScrollView style={{width:'100%'}}>
      {this.renderItems()}
    </ScrollView>
  );
  }
};

const styles = StyleSheet.create({
  list: {
    height: 150,
    width:'100%',
    marginTop:'5%',
    backgroundColor:'#FFFFFF'
  },
});
