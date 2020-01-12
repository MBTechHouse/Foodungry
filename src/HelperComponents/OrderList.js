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

export default class OrderList extends React.Component {

  getColor(r) {
    if(0.0 <= r && r < 2.0) return '#A60808'
    if(2.0 <= r && r < 3.0) return '#D72929'
    if(3.0 <= r && r < 3.7) return '#DE9318'
    if(3.7 <= r && r < 4.2) return '#2ABE27'
    if(4.2 <= r && r <= 5.0) return '#076B05'
  }

  restCard(rest) {
    return (
      <Layout style={{ width:'100%', flexDirection:'row', height:100, backgroundColor:'#FFFFFF' }}>
        <TouchableOpacity style={{width:'90%', flexDirection:'row', height:'100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => {this.props.navigation.navigate('OrderItemList', {ordermode: this.props.navigation.getParam('ordermode')})}}
        >

            <Layout style={{ position:'absolute', elevation:6, left:7, height:70, width: 85, borderRadius:20 }}>
              <Image source={rest.image} style={{ resizeMode:"stretch", height: '100%', width: '100%', borderRadius: 20 }} />
            </Layout>

            <Layout style={{width:'85%', height:90, borderRadius:20, elevation: 5, padding: 5, marginLeft: '15%' }}>
              <Layout style={{ marginLeft: '17%' }}>
                <Text style={{fontWeight:'bold', fontSize:15, width:'100%', fontFamily: 'serif' }}>{rest.name}</Text>
                <Text style={{fontSize:10, color:'#757575', width:'100%', marginTop: '3%'}}>{rest.type}</Text>
                <Text style={{fontSize:10, color:'#757575'}}>{rest.cuisine}</Text>
                <Text style={{fontSize:10, color:'#9e9e9e'}}>{rest.pricing}</Text>
              </Layout>
            </Layout>

        </TouchableOpacity>

        <Layout style={{ width: '5%', height: 90, marginLeft: '2%' }}>
          <TouchableOpacity style={{ height: 30, width: '100%' }}>
          <Image source={require('../resources/Images/mapIcon.png')} style={{ resizeMode:"contain", height: '100%', width: '100%' }} />
          </TouchableOpacity>
          <Layout style={{ width: '100%', height: 60, elevation: 5, borderRadius: 20, marginTop: 2, justifyContent: 'flex-end' }}>
            <Layout style={{ width: '100%', height: (rest.rating/5*100)+'%', borderRadius: 20, backgroundColor: this.getColor(rest.rating), justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text style={{fontSize:9, color:'#fff', marginBottom: 5, fontWeight: 'bold' }}>{rest.rating.toFixed(1)}</Text>
            </Layout>
          </Layout>
        </Layout>

      </Layout>
    )
  }

  renderItems()
  {
    let rests = [{
      name: "Domino's Pizza",
      image: require('../resources/Images/rest1.jpeg'),
      type: "Motel, Inoor Eating | Jayanagar, Bangalore",
      cuisine: "Continental, Northindian, Italian",
      pricing: "$200 per person | 10% person coupon",
      rating: 4.3
    },
    {
      name: "Chulha Chauki Da Dhaba",
      image: require('../resources/Images/rest2.jpeg'),
      type: "Cafe, Outdoor Eating | J P Nagar, Bangalore",
      cuisine: "Fast Food, Chicken Wings, Tea",
      pricing: "$120 per person | 50% person coupon",
      rating: 3.2
    },
    {
      name: "Starbucks",
      image: require('../resources/Images/rest3.jpeg'),
      type: "Cafe, Hookah | Palace Road, Bangalore",
      cuisine: "Sandwich, South Indian, Sutta",
      pricing: "$100 per person | 35% person coupon",
      rating: 4.0
    },
    {
      name: "Eat N Drink",
      image: require('../resources/Images/rest4.jpeg'),
      type: "Drive In, Inoor Eating | Uttarahalli, Bangalore",
      cuisine: "Chinese, Japanese, Noth Indina",
      pricing: "$75 per person | 1 + 1 on Food",
      rating: 2.7
    },
    {
      name: "Singh Da Dhaba",
      image: require('../resources/Images/rest4.jpeg'),
      type: "Motel, Inoor Eating | Jayanagar, Bangalore",
      cuisine: "Cheese Burst, Pizza",
      pricing: "$50 per person | 20% person coupon",
      rating: 3.3
    }];

    let renderArray= []
    for(let i=0; i<rests.length;i++)
      renderArray.push(this.restCard(rests[i]))
    return renderArray
  }

  render()
  {
  return (
    <ScrollView style={{width:'100%', height:'100%'}}>
      {this.renderItems()}
    </ScrollView>
  );
  }
}
