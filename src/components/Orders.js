import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, Layout, Icon } from 'react-native-ui-kitten';
import OrderCard from '../HelperComponents/OrderCard'
import OrderList from '../HelperComponents/OrderList'

export default class Orders extends React.Component{
  static navigationOptions = {
    header: null
  }
  render()
  {
    console.log(this.props.navigation.getParam('ordermode'))
  return(
  <Layout style={styles.container}>
    <Layout style={styles.locationHeader}>
      <Layout style={{width:'90%'}}>
        <Layout style={{flexDirection:'row',alignItems:'center', width:'100%'}}>
          <Icon name='navigation-2' width={20} height={20} fill='#272727' />
          <TouchableOpacity>
          <Text  numberOfLines={1} style={{fontSize:16, color:'#757575'}} >Home Location</Text>
          </TouchableOpacity>
        </Layout>
        <Text  numberOfLines={1} style={{fontSize:22}}>Golf Course</Text>
      </Layout>
      <Layout style={{flexDirection:'row',alignItems:'center', width:'20%'}}>
      <TouchableOpacity>
        <Icon name='bookmark' width={30} height={30} fill='#272727' />
        </TouchableOpacity>
      </Layout>
    </Layout>
    <Layout style={{width:'100%', flexDirection:'row', justifyContent:'space-around'}}>
      <OrderCard text="Filters" icon="funnel"/>
      <OrderCard text="Cost" icon="arrow-circle-down"/>
      <OrderCard text="Popularity" icon="award"/>
      <OrderCard text="Ratings" icon="star"/>
    </Layout>
    <OrderList navigation={this.props.navigation}/>
  </Layout>
  )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  text: { marginVertical: 16 },
  locationHeader: {height:'10%', width:'100%', paddingLeft:'3%', flexDirection:'row', marginBottom:'3%',
  shadowColor:'#000', 
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  
  elevation: 4,}
});
