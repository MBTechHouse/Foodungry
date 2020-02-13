import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import {Button, Layout, Icon} from 'react-native-ui-kitten';
import OrderCard from '../HelperComponents/OrderCard';
import OrderList from '../HelperComponents/OrderList';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../components/carousel/SliderEntry';
import {BoxShadow} from 'react-native-shadow';
import styles, {colors} from '../components/carousel/index.style';
import {sliderWidth, itemWidth} from '../components/carousel/SliderEntry.style';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import firebase from 'firebase';

export default class Orders extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    appData: {},
    list: [],
    listName: 'restaurants',
    swipe: false,
    preview:false,
    cuurentCategoryId: null
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    firebase
      .database()
      .ref('/1FithETVAzs4Yb2iZtUPkEcqm2jXIjGnsBiVVgRPAcdc/')
      .on('value', snapshot =>
        this.setState({
          appData: snapshot.val(),
          list: Object.keys(snapshot.val().restaurants),
        }),
      );
  }

  animatebackgroundLtoR(swipeVal) {
    Animated.timing(this.animatedValue, {
      toValue: swipeVal,
      duration: 300,
    }).start();

    if (!this.state.swipe) this.setState({swipe: true});
  }

  animatebackgroundRtoL(swipeval) {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 300,
    }).start();

    if (this.state.swipe) this.setState({swipe: false});
  }

  w = Dimensions.get('screen').width;
  h = Dimensions.get('screen').height;

  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  getCategories() {
    let items = [];
    let cats = [];

    if (this.state.appData.categories) cats = this.state.appData.categories;
    cats.map(cat => {
      items.push(
        <BoxShadow
          setting={{
            width: this.w * 0.2,
            height: this.h * 0.14,
            color: '#000',
            border: 5,
            radius: this.w * 0.06,
            opacity: 0.1,
            x: 0,
            y: 3,
            style: {
              marginVertical: 5,
              marginLeft: this.w * 0.04,
              marginRight: this.w * 0.04,
            },
          }}>
          <TouchableOpacity
            style={{
              borderRadius: this.w * 0.06,
              width: this.w * 0.2,
              height: this.h * 0.14,
              backgroundColor: '#fff',
              alignItems: 'center',
              paddingTop: '13%',
              justifyContent: 'space-around',
              paddingBottom: '13%',
            }}
            onPress={() =>{
              if(this.state.cuurentCategoryId !== cat.categoryId)
              this.setState({
                preview:true,
                cuurentCategoryId: cat.categoryId
              })
              else
              {
                this.setState({
                  preview:false,
                  cuurentCategoryId: null
                })
              }
            }
            }>
            <Image
              source={{uri: cat.icon}}
              style={{
                width: this.w * 0.12,
                height: this.w * 0.12,
                borderRadius: (this.w * 0.18) / 2,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
              }}
            />
            <Text style={{fontSize: 11, marginTop: 10, textAlign: 'center'}}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        </BoxShadow>,
      );
    });

    return items;
  }

  getSecondFunc(temp_second)
  {
    if(temp_second!==undefined)
          {
            return <TouchableOpacity
              style={{
                borderRadius: this.w * 0.01,
                width: this.w * 0.35,
                height: this.h * 0.08,
                backgroundColor: '#272727',
                marginLeft:this.w*(0.08),
                marginRight:this.w*(0.08)
              }}
              onPress={() =>{
                if(this.state.cuurentCategoryId !== temp_second['categoryId'])
                this.setState({
                  preview:true,
                  cuurentCategoryId: temp_second['categoryId']
                })
                else
                {
                  this.setState({
                    preview:false,
                    cuurentCategoryId: null
                  })
                }
              }
              }>
              <Image
                source={{uri: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius:  this.w * 0.01,
                  opacity:0.5
                }}
                resizeMode="cover"
              />
              <Text style={{fontWeight:'bold', fontSize:18, position:'absolute', color:'#fff', paddingLeft:'42%', paddingTop:'10%'}}>
              hey
            </Text>
            </TouchableOpacity>


          }
          else
          {
            return <TouchableOpacity
            style={{
              borderRadius: this.w * 0.01,
              width: this.w * 0.35,
              height: this.h * 0.08,
              backgroundColor: '#d3d3d3',
              marginLeft:this.w*(0.08),
              marginRight:this.w*(0.08)
            }}
            >
            <Text> See All</Text>
          </TouchableOpacity>
          }
  }

  getPreview() {
    let items = [];
    let cats = [];

    if (this.state.appData.categories) cats = this.state.appData.categories;
    if (this.state.appData.categories)
    {
    for(let i=0; i<cats.length;i=i+2)
    {
      let temp_first = cats[i]
      let temp_second = cats[i+1]
      items.push(
        <View style={{width:this.w * 0.38, height:this.h * 0.19, justifyContent:'space-between' }}>
          <TouchableOpacity
            style={{
              borderRadius: this.w * 0.01,
              width: this.w * 0.35,
              height: this.h * 0.08,
              backgroundColor: '#272727',
              marginLeft:this.w*(0.08),
              marginRight:this.w*(0.08)
            }}
            onPress={() =>{
              if(this.state.cuurentCategoryId !== temp_first['categoryId'])
              this.setState({
                preview:true,
                cuurentCategoryId: temp_first['categoryId']
              })
              else
              {
                this.setState({
                  preview:false,
                  cuurentCategoryId: null
                })
              }
            }
            }>
            <Image
              source={{uri: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'}}
              style={{
                width: '100%',
                height: '100%',
                borderRadius:  this.w * 0.01,
                opacity:0.5
              }}
              resizeMode="cover"
            />
            <Text style={{fontWeight:'bold', fontSize:18, position:'absolute', color:'#fff', paddingLeft:'42%', paddingTop:'10%'}}>
              hey
            </Text>
          </TouchableOpacity>
        {this.getSecondFunc(temp_second)}

        </View>
      );
    }
  }
    return items;
  }

  getForeground() {
    return (
      <View>
      <View style={{width: '100%', height: this.h*(0.42)}}>
        <Layout style={styles1.locationHeader}>
          <Layout
            style={{
              width: '78%',
              backgroundColor: 'transparent',
              justifyContent: 'space-around',
              height: this.h*(0.11),
            }}>
            <Layout
              style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  width={this.w * 0.06}
                  height={this.w * 0.06}
                  fill="#fdfdfd"
                />
              </TouchableOpacity>
            </Layout>
            <Layout
              style={{
                flexDirection: 'row',
                width: '95%',
                height: this.h * 0.06,
                backgroundColor: 'transparent',
              }}>
              <Layout
                style={{
                  width: '15%',
                  height: '100%',
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="search-outline"
                  width={25}
                  height={25}
                  fill="#797d7f"
                />
              </Layout>
              <Layout
                style={{
                  width: '85%',
                  height: '100%',
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    fontSize: 18,
                    color: '#797d7f',
                    width: '100%',
                    height: '150%',
                  }}
                  placeholder="Search restaurants"
                  placeholderTextColor={'#797d7f'}
                />
              </Layout>
            </Layout>
          </Layout>

          <Layout
            style={{
              width: '20%',
              height: this.h*(0.11),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}>
            <BoxShadow
              setting={{
                width: this.w * 0.18,
                height: this.w * 0.18,
                color: '#000',
                border: 4,
                radius: (this.w * 0.18) / 2,
                opacity: 0.18,
                x: 0,
                y: 2,
                style: {marginVertical: 5},
              }}>
              <Image
                source={require('../resources/Images/Bhargav1.jpg')}
                style={{
                  width: this.w * 0.18,
                  height: this.w * 0.18,
                  borderRadius: (this.w * 0.18) / 2,
                }}
              />
            </BoxShadow>
          </Layout>
        </Layout>

        <View
          style={{
            position: 'absolute',
            top: this.h*(0.095),
            elevation: 20,
            paddingLeft: '10%',
          }}>
          <Carousel
            data={this.state.appData.banners}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            enableMomentum={true}
            activeSlideAlignment={'start'}
            containerCustomStyle={{
              marginTop: 15,
              overflow: 'visible', // for custom animations
            }}
            contentContainerCustomStyle={{
              paddingVertical: 10, // for custom animation
            }}
            activeAnimationType={'spring'}
            activeAnimationOptions={{
              friction: 4,
              tension: 40,
            }}
            hasParallaxImages={true}
          />
        </View>
      </View>

      <View
        style={{
          width: '70%',
          height: this.h*(0.065),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            width: '49.5%',
            height: '100%',
            backgroundColor: '#55C2FF',
            transform: [{translateX: this.animatedValue}],
            borderTopLeftRadius: this.state.swipe ? 0 : 10,
            borderBottomLeftRadius: this.state.swipe ? 0 : 10,
            borderTopRightRadius: this.state.swipe ? 10 : 0,
            borderBottomRightRadius: this.state.swipe ? 10 : 0,
            borderColor: '#55C2FF',
            borderWidth: 3,
          }}>
          <Text
            style={{fontSize: 19, fontWeight: 'bold', color: '#000'}}></Text>
        </Animated.View>
        <TouchableOpacity
          onPress={this.animatebackgroundRtoL.bind(this, this.w * 0.35)}
          style={{width: '49.5%', height: '100%'}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transpaarent',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              borderColor: '#55C2FF',
              borderWidth: 2,
            }}>
            <Text style={{fontSize: 19, fontWeight: 'bold', color: '#000'}}>
              Eat -In
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.animatebackgroundLtoR.bind(this, this.w * 0.35)}
          style={{
            width: '49.5%',
            height: '100%',
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: '#55C2FF',
            borderWidth: 2,
          }}>
          <Text style={{fontSize: 19, fontWeight: 'bold', color: '#000'}}>
            Take away
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: this.h*(0.23), top: this.h*(0.019)}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', paddingLeft: '5%'}}>
          Categories
        </Text>
        <View style={{width: '100%', height: '100%', marginTop: '3%'}}>
          <ScrollView
            style={{height: '100%'}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {this.getCategories()}
          </ScrollView>
        </View>
      </View>
      </View>
    );
  }

  stickyHeader() {
    return (
      <View style={{ borderBottomLeftRadius: 30 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', padding: 2, backgroundColor: '#55C2FF' }}>
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
            width={this.w * 0.06}
            height={this.w * 0.06}
            fill="#fdfdfd"
          />
        </TouchableOpacity>
        <ScrollView
          style={{height: this.h*0.16, width: '100%'}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {this.getCategories()}
        </ScrollView>
      </View>
    );
  }

  render() {
    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(255,255,255)', 'rgb(85,194,255)'],
    });
    console.log(this.props.navigation.getParam('ordermode'));
    return (
        <ParallaxScrollView
          style={styles1.container} contentContainerStyle={{flexGrow:1}}
          backgroundColor={'white'}
          parallaxHeaderHeight={this.h*0.715}
          stickyHeaderHeight={this.h*0.2}
          renderForeground={() => this.getForeground()}
          renderStickyHeader={() => this.stickyHeader()}
          fadeOutForeground={false}
          fadeOutBackground={false}
        >
          <View style={{width: '100%', height: (this.state.preview)?this.h*(0.23):'0%'}}>
            <View style={{width: '100%', height: (this.state.preview)?'100%':'0%'}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {this.getPreview()}
                <View style={{width:this.w*(0.09)}}>
                  <Text></Text>
                </View>
              </ScrollView>
            </View>
          </View>



          <View style={{width:'100%', top:this.h*(0.01), marginBottom:this.h*(0.03)}}>
            <OrderList
              navigation={this.props.navigation}
              list={this.state.list}
              listItems={this.state.appData[this.state.listName]}
            />
          </View>
        </ParallaxScrollView>
    );
  }
}

const styles1 = StyleSheet.create({
  container: {width:'100%', height:'100%'},
  text: {marginVertical: 16},
  locationHeader: {
    height: Dimensions.get('screen').height * 0.16,
    width: '100%',
    paddingLeft: '3%',
    flexDirection: 'row',
    marginBottom: '3%',
    paddingTop: '1%',
    shadowColor: '#000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    backgroundColor: '#55C2FF',
    borderBottomLeftRadius: 25,
  },
});
