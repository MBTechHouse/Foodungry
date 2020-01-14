import React from 'react';
import { StyleSheet,Text, View, Image,TouchableOpacity, ScrollView, Linking } from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Layout,
  Text as KText
} from 'react-native-ui-kitten';
import firebase from 'firebase';

export default class OrderList extends React.Component {

  state = {
    list: [],
    listItems: {}
  }

  static getDerivedStateFromProps(props,state) {
   return({ list: props.list, listItems: props.listItems })
 }

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
              <Image source={{uri: rest.image}} style={{ resizeMode:"stretch", height: '100%', width: '100%', borderRadius: 20 }} />
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
          <TouchableOpacity style={{ height: 30, width: '100%' }} onPress={this.mapClick.bind(this, rest.latlng, rest.name)}>
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

  mapClick(latlng, name) {
    let lat = Number(latlng.split(",")[0].trim());
    let lng = Number(latlng.split(",")[1].trim());
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${name}@${latLng}`,
      android: `${scheme}${latLng}(${name})`
    });
    Linking.openURL(url);
  }

  renderItems()
  {
    let renderArray = [];
    for(let i=0; i<this.state.list.length; i++)
      renderArray.push(this.restCard(this.state.listItems[this.state.list[i]]))
    return renderArray
  }

  render()
  {
  return (
    <View style={{width:'100%', height:'100%'}}>
      {this.renderItems()}
    </View>
  );
  }
}
