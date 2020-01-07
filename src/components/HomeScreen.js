import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Dimensions,Text } from 'react-native';
import { Button, Layout,  } from 'react-native-ui-kitten';

export default class HomeScreen extends React.Component{

    w = Dimensions.get('screen').width
    h = Dimensions.get('screen').height


    static navigationOptions = {
        header: null
      }

  render()
  {
  return(
  <Layout style={styles.container}>

    <Image source={require('../resources/Images/spoon.png')} style={{width:'50%', height:'30%', marginTop:'8%'}} resizeMode="contain"/>
    <Text style={{ marginVertical: 16, color:'#ffebee', fontSize:this.h*0.06, fontWeight:'bold'}} category='h1'>Foodungry</Text>

    <Layout style={{ marginTop:'25%'}} />

    <Layout style={{width:'95%', height:'20%',flexDirection:'row', justifyContent:'space-around', backgroundColor:'#ef5350'}}>

        <TouchableOpacity style={{width:'37%', height:'100%', backgroundColor:'#ffebee', borderRadius:20, alignItems:'center', shadowColor: '#000',
   shadowOffset: { width: 5, height: 5 },
   shadowOpacity: 0.8,
   shadowRadius: 4,
   elevation: 8,
   paddingTop:'3%'}} onPress={()=>this.props.navigation.navigate('Orders', {ordermode:'Eat-IN'})}>
        <Image source={require('../resources/Images/dinein.png')} style={{width:'80%', height:'60%'}} resizeMode="contain"/>
            <Text style={{fontSize: this.h*0.03}}>Eat-in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'37%', height:'100%', backgroundColor:'#ffebee', borderRadius:20, alignItems:'center',  shadowColor: '#000',
   shadowOffset: { width: 5, height: 5 },
   shadowOpacity: 0.8,
   shadowRadius: 4,
   elevation: 8,
   paddingTop:'3%'
}}  onPress={()=>this.props.navigation.navigate('Orders', {ordermode:'Takeaway'})}>
        <Image source={require('../resources/Images/takeaway.png')} style={{width:'80%', height:'60%'}} resizeMode="contain"/>
            <Text style={{fontSize: this.h*0.03}}>Takeaway</Text>
        </TouchableOpacity>
    </Layout>

  </Layout>
  )
  }
}

const styles = StyleSheet.create({
  container: { width: '100%',height:'100%', alignItems: 'center', backgroundColor:'#ef5350' },
  text: { marginVertical: 16, color:'#ffebee', fontSize:50, fontWeight:'bold' },
});
