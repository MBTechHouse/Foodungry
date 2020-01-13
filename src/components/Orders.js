import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Dimensions, ScrollView, Animated } from 'react-native';
import { Button, Layout, Icon } from 'react-native-ui-kitten';
import OrderCard from '../HelperComponents/OrderCard'
import OrderList from '../HelperComponents/OrderList'
import Carousel from 'react-native-snap-carousel';
 import SliderEntry from '../components/carousel/SliderEntry'
 import {BoxShadow} from 'react-native-shadow'
 import styles, { colors } from '../components/carousel/index.style';
 import { sliderWidth, itemWidth } from '../components/carousel/SliderEntry.style'; 
export default class Orders extends React.Component{
  static navigationOptions = {
    header: null
  }
  state = {entries:[
    {
        title: 'Favourites landscapes 1',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/SsJmZ9jl.jpg'
    },
    {
        title: 'Favourites landscapes 2',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/5tj6S7Ol.jpg'
    },
    {
        title: 'Favourites landscapes 3',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        illustration: 'https://i.imgur.com/pmSqIFZl.jpg'
    },
    {
        title: 'Favourites landscapes 4',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/cA8zoGel.jpg'
    },
    {
        title: 'Favourites landscapes 5',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/pewusMzl.jpg'
    },
    {
        title: 'Favourites landscapes 6',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        illustration: 'https://i.imgur.com/l49aYS3l.jpg'
    }
], Categories:{ cat1: {title:'Romantic'}, cat2:{title:'Bombat'}, cat3:{title:'Bombat'}, cat4:{title:'Bombat'}, cat5:{title:'Bombat'} }
, swipe:false
}
  
  componentWillMount()
  {
    this.animatedValue = new Animated.Value(0);
  }
 
  animatebackgroundLtoR(swipeVal)
  {
    Animated.timing(this.animatedValue, {
      toValue: swipeVal,
      duration:200
    }).start();

    if(!this.state.swipe)
    this.setState({swipe:true})
  }

  animatebackgroundRtoL(swipeval)
  {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration:200
    }).start();

    if(this.state.swipe)
    this.setState({swipe:false})
  }

  w = Dimensions.get('screen').width
  h = Dimensions.get('screen').height
  _renderItem ({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
}
  


  render()
  {
    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(255,255,255)', 'rgb(85,194,255)']
    })
    console.log(this.props.navigation.getParam('ordermode'))
  return(
  <View style={styles1.container}>

    <View style={{width:'100%', height:'53%'}}>
    <Layout style={styles1.locationHeader}>

<Layout style={{width:'80%', backgroundColor:'transparent', justifyContent:'space-around', height:'70%'}}>
  <Layout style={{flexDirection:'row',backgroundColor:'transparent', }}>
      <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}}>               
        <Text  numberOfLines={1} style={{fontSize:20, color:'#272727', fontWeight:'bold', marginRight:'2%',marginLeft:'4%'}} >Home Location</Text>
        <Icon name='edit-outline' width={this.w*(0.06)} height={this.w*(0.06)} fill='#272727' />
      </TouchableOpacity>
  </Layout>
  <Layout style={{flexDirection:'row', width:'95%', height: this.h*(0.06), backgroundColor:'transparent'}}>      
    <Layout style={{width:'15%', height:'100%', borderTopLeftRadius:20, borderBottomLeftRadius:20, alignItems:'center', justifyContent:'center'}}>
      <Icon name='search-outline' width={25} height={25} fill='#797d7f' />
    </Layout>
    <Layout style={{width:'85%', height:'100%', borderTopRightRadius:20, borderBottomRightRadius:20, justifyContent:'center'}}>
        <TextInput 
        style={{fontSize:18, color:'#797d7f', width:'100%', height:'150%'}} 
        placeholder="Search restaurants"
        placeholderTextColor={"#797d7f"}/>
    </Layout>
  </Layout>
</Layout>

<Layout style={{width:'20%', height:'70%', alignItems:'center', justifyContent:'center', backgroundColor:'transparent'}}>
<BoxShadow setting={{
      width:this.w*(0.18),
      height:this.w*(0.18),
      color:"#000",
      border:4,
      radius:this.w*(0.18)/2,
        opacity:0.18,
        x:0,
        y:2,
      style:{marginVertical:5}
  }}>
  <Image source={require('../resources/Images/Bhargav1.jpg')} 
  style={{width:this.w*(0.18), height:this.w*(0.18), borderRadius:this.w*(0.18)/2
  }}/>
  </BoxShadow>
</Layout>

</Layout>
     
    

<View style={{ position:'absolute', top:'25%', elevation:20, paddingLeft:'10%'}}>
                
                <Carousel
                  data={this.state.entries}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  inactiveSlideScale={0.95}
                  inactiveSlideOpacity={1}
                  enableMomentum={true}
                  activeSlideAlignment={'start'}
                  containerCustomStyle={{
                    marginTop: 15,
                    overflow: 'visible' // for custom animations
                }}
                  contentContainerCustomStyle={{
                    paddingVertical: 10 // for custom animation
                }}
                  activeAnimationType={'spring'}
                  activeAnimationOptions={{
                      friction: 4,
                      tension: 40
                  }}
                  hasParallaxImages={true}
                />
            </View>
    </View>

    <View style={{width:'70%', height:'7%', flexDirection:'row', justifyContent:'space-between'}}>
    
    <Animated.View style={{ position:'absolute',width:'49.5%', height:'100%',backgroundColor:'#55C2FF', transform: [{translateX: this.animatedValue}], borderTopLeftRadius:(this.state.swipe)?0:10, 
    borderBottomLeftRadius:(this.state.swipe)?0:10,borderTopRightRadius:(this.state.swipe)?10:0, borderBottomRightRadius:(this.state.swipe)?10:0, borderColor:'#55C2FF', borderWidth:3}}>
          <Text style={{fontSize:19, fontWeight:'bold', color:'#000'}} ></Text>
          </Animated.View>
    <TouchableOpacity onPress={this.animatebackgroundRtoL.bind(this, this.w*(0.35))} style={{width:'49.5%', height:'100%', }}>
        <View style={{width:'100%', height:'100%',backgroundColor:'transpaarent', alignItems:'center', justifyContent:'center', borderTopLeftRadius:10, borderBottomLeftRadius:10, borderColor:'#55C2FF', borderWidth:3}}>
          <Text style={{fontSize:19, fontWeight:'bold', color:'#000'}} >Eat -In</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.animatebackgroundLtoR.bind(this, this.w*(0.35))} style={{width:'49.5%', height:'100%', backgroundColor:'transparent', alignItems:'center',justifyContent:'center',
      borderTopRightRadius:10, borderBottomRightRadius:10, borderColor:'#55C2FF', borderWidth:3}}>
          <Text style={{fontSize:19,fontWeight:'bold', color:'#000'}} >Take away</Text>
      </TouchableOpacity>


    </View>

    <View style={{ width:'100%',height:'18%', top:'5%'}}>
      <Text style={{fontSize:18, fontWeight:'bold',paddingLeft:'5%'}}>Top Categories</Text>
      <View style={{width:'100%', height:'100%', marginTop:'3%', }}>
      <ScrollView style={{height:'100%' }} horizontal={true}  showsHorizontalScrollIndicator={false}>
          {Object.values(this.state.Categories).map(title=>{
      return (<BoxShadow setting={{
        width:this.w*(0.2),
        height:this.h*(0.14),
        color:"#000",
        border:5,
        radius:this.w*(0.06),
          opacity:0.1,
          x:0,
          y:3,
        style:{marginVertical:5, marginLeft:this.w*(0.04), marginRight:this.w*(0.04)}
    }}>
          <TouchableOpacity style={{borderRadius:this.w*(0.06), width:this.w*(0.2), height:this.h*(0.14), backgroundColor:'#fff', alignItems:'center' , paddingTop:'13%', justifyContent:'space-around', paddingBottom:'13%'}}>
          <Image source={require('../resources/Images/heart.png')} 
    style={{width:this.w*(0.12), height:this.w*(0.12), borderRadius:this.w*(0.18)/2,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    }}/>  
            <Text style={{fontSize:14, marginTop:10}}>{title.title}</Text>
          </TouchableOpacity>
          </BoxShadow>)
    })}
    </ScrollView>
    </View>
    </View>

    
    

    
  </View>
  )
  }
}

const styles1 = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  text: { marginVertical: 16 },
  locationHeader: {
  height:Dimensions.get('screen').height*(0.18), width:'100%', paddingLeft:'3%', flexDirection:'row', marginBottom:'3%', paddingTop:'1%',
  shadowColor:'#000', 
  shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          
          elevation: 12,
  backgroundColor:'#55C2FF',
  borderBottomLeftRadius: 25,
  }
});
