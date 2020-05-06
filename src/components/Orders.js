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
  PermissionsAndroid,
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SlideUpDrawer from '../HelperComponents/SlideUpDrawer';
import Geolocation from '@react-native-community/geolocation';
import {crowDistanceCalculator} from '../HelperComponents/DistanceCalculator'

const screenHeight = Dimensions.get('screen').height;
export default class Orders extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    appData: {},
    list: [],
    listName: 'restaurants',
    swipe: false,
    preview: false,
    cuurentCategoryId: null,
    searchRestaurants: '',
    restaurantSearchResults: [],
    onSearch: false,
    editing: false,
    animation: new Animated.Value(0),
    sourceOpen: false,
    filterMode: 0,
    location: null,
    filters: {
      sort: {
        price: {
          value: null,
          label: 'Price',
          options: [
            {label: 'Price - Low to High', optionId: 'price', value: 'ASC'},
            {label: 'Price - High to Low', optionId: 'price', value: 'DESC'},
          ],
        },
        distance: {
          value: null,
          label: 'Distance',
          options: [
            {
              label: 'Distance - Near to Far',
              optionId: 'distance',
              value: 'ASC',
            },
            {
              label: 'Distance - Fat to Near',
              optionId: 'distance',
              value: 'DESC',
            },
          ],
        },
        rating: {
          value: null,
          label: 'Rating',
          options: [
            {label: 'Rating - Low to High', optionId: 'rating', value: 'ASC'},
            {label: 'Rating - High to Low', optionId: 'rating', value: 'DESC'},
          ],
        },
      },
    },
  };

  /*
  filterMode :- 
    0 - sort
    1 - filter
  */
  
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

  async requestGeoLocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Foodungry',
          'message': 'Foodungry wants access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location") 
        Geolocation.getCurrentPosition(
          position => {
            const initialPosition = position;
            console.log(initialPosition);
            let latitude = 12.913101
            let longitude = 77.540240
            this.setState({location: {latitude: latitude, longitude: longitude}})
          },
          error => Alert.alert('Error', JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log("location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
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

  getCategories(textOnly) {
    let items = [];
    let cats = [];

    if (this.state.appData.categories) cats = this.state.appData.categories;
    cats.map(cat => {
      if (!textOnly)
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
              onPress={() => {
                if (cat.fromNode === 'collections') {
                  if (this.state.cuurentCategoryId !== cat.categoryId)
                    this.setState({
                      preview: true,
                      cuurentCategoryId: cat.categoryId,
                    });
                  else {
                    this.setState({
                      preview: false,
                      cuurentCategoryId: null,
                    });
                  }
                } else {
                  this.setState({
                    list: cat.itemIds.split(','),
                    listName: cat.fromNode,
                    preview: false,
                    cuurentCategoryId: null,
                  });
                }
              }}>
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
      else {
        items.push(
          <TouchableOpacity
            style={{
              borderRadius: this.w * 0.06,
              height: this.h * 0.06,
              width: this.w * 0.3,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'space-around',
              borderWidth: 1,
              borderColor: '#d3d3d3',
              elevation: 6,
              marginLeft: this.w * 0.03,
            }}
            onPress={() => {
              if (cat.fromNode === 'collections') {
                if (this.state.cuurentCategoryId !== cat.categoryId)
                  this.setState({
                    preview: true,
                    cuurentCategoryId: cat.categoryId,
                  });
                else {
                  this.setState({
                    preview: false,
                    cuurentCategoryId: null,
                  });
                }
              } else {
                this.setState({
                  list: cat.itemIds.split(','),
                  listName: cat.fromNode,
                  preview: false,
                  cuurentCategoryId: null,
                });
              }
            }}>
            <Text style={{fontSize: 14, textAlign: 'center', width: '100%'}}>
              {cat.name}
            </Text>
          </TouchableOpacity>,
        );
      }
    });

    return items;
  }

  getSecondFunc(temp_second) {
    if (temp_second !== undefined) {
      return (
        <TouchableOpacity
          style={{
            borderRadius: this.w * 0.01,
            width: this.w * 0.35,
            height: this.h * 0.08,
            backgroundColor: '#272727',
            marginLeft: this.w * 0.08,
            marginRight: this.w * 0.08,
          }}
          onPress={() => {
            this.setState({
              list: temp_second['restIds'].split(','),
              listName: 'restaurants',
            });
          }}>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
            }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: this.w * 0.01,
              opacity: 0.5,
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              {temp_second['name']}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            borderRadius: this.w * 0.01,
            width: this.w * 0.35,
            height: this.h * 0.08,
            backgroundColor: '#fff',
            marginLeft: this.w * 0.08,
            marginRight: this.w * 0.08,
          }}>
          <Text />
        </TouchableOpacity>
      );
    }
  }

  getPreview() {
    let items = [];
    let cats = [];
    if (this.state.appData.categories) {
      if (this.state.cuurentCategoryId) {
        let itemKeys = this.state.appData.categories[
          this.state.cuurentCategoryId
        ]['itemIds'].split(',');
        itemKeys.forEach(element => {
          cats.push(this.state.appData.collections[element]);
        });
      }
      for (let i = 0; i < cats.length; i = i + 2) {
        let temp_first = cats[i];
        let temp_second = cats[i + 1];
        items.push(
          <View
            style={{
              width: this.w * 0.38,
              height: this.h * 0.19,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                borderRadius: this.w * 0.01,
                width: this.w * 0.35,
                height: this.h * 0.08,
                backgroundColor: '#272727',
                marginLeft: this.w * 0.08,
                marginRight: this.w * 0.08,
              }}
              onPress={() => {
                this.setState({
                  list: temp_first['restIds'].split(','),
                  listName: 'restaurants',
                });
              }}>
              <Image
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: this.w * 0.01,
                  opacity: 0.5,
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  {temp_first['name']}
                </Text>
              </View>
            </TouchableOpacity>
            {this.getSecondFunc(temp_second)}
          </View>,
        );
      }
    }
    return items;
  }

  getForeground() {
    return (
      <View>
        <View style={{width: '100%', height: this.h * 0.4}}>
          <Layout style={styles1.locationHeader}>
            <Layout
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                justifyContent: 'space-around',
                height: this.h * 0.11,
              }}>
              <Layout
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  marginLeft: '2%',
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={()=>this.requestGeoLocation()}>
                  <Icon
                    name="edit-outline"
                    width={this.w * 0.06}
                    height={this.w * 0.06}
                    fill="#272727"
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 20,
                      color: '#272727',
                      fontWeight: 'bold',
                      marginRight: '2%',
                      marginLeft: '4%',
                    }}>
                    Home Location
                  </Text>
                </TouchableOpacity>
              </Layout>

              <Layout
                style={{
                  width: '100%',
                  height: this.h * 0.06,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <Layout
                  style={{
                    flexDirection: 'row',
                    width: '87%',
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
                      backgroundColor: '#fff',
                      borderTopColor: '#d3d3d3',
                      borderTopWidth: 1,
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 1,
                      borderLeftColor: '#d3d3d3',
                      borderLeftWidth: 1,
                    }}>
                    <Icon
                      name="search-outline"
                      width={25}
                      height={25}
                      fill="#797d7f"
                    />
                  </Layout>
                  <View
                    style={{
                      width: '85%',
                      height: '100%',
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      justifyContent: 'center',
                      backgroundColor: '#fff',
                      borderTopColor: '#d3d3d3',
                      borderTopWidth: 1,
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 1,
                      borderRightColor: '#d3d3d3',
                      borderRightWidth: 1,
                    }}>
                    <TextInput
                      style={{
                        fontSize: 18,
                        color: '#797d7f',
                        width: '100%',
                        height: '100%',
                      }}
                      value={this.state.searchRestaurants}
                      placeholder="Search restaurants"
                      placeholderTextColor={'#797d7f'}
                      onChangeText={text =>
                        this.setState({searchRestaurants: text})
                      }
                      onFocus={() => {
                        this.setState({onSearch: true});
                      }}
                    />
                  </View>
                </Layout>

                <Layout
                  style={{
                    width: '12%',
                    height: this.h * 0.06,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: '5%',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                    }}
                    onPress={() => {
                      if (this.state.sourceOpen) {
                        console.log('clik');
                        this.setState({sourceOpen: false}, () =>
                          this.handleClose(),
                        );
                      } else {
                        console.log('clik1');
                        this.setState({sourceOpen: true}, () =>
                          this.handleOpen(),
                        );
                      }
                    }}>
                    <MaterialCommunityIcons
                      name="filter"
                      size={25}
                      color="#55C2FF"
                    />
                  </TouchableOpacity>
                </Layout>
              </Layout>
            </Layout>
          </Layout>

          <View
            style={{
              position: 'absolute',
              top: this.h * 0.095,
              elevation: 20,
              paddingLeft: '2%',
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
          style={{width: '100%', height: this.h * 0.23, top: this.h * 0.014}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', paddingLeft: '5%'}}>
            Top Categories
          </Text>
          <View style={{width: '100%', height: '100%', marginTop: '3%'}}>
            <ScrollView
              style={{height: '100%'}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {this.getCategories(false)}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            width: '70%',
            top: this.h * 0.01,
            height: this.h * 0.064,
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
            <Text style={{fontSize: 19, fontWeight: 'bold', color: '#000'}} />
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
      </View>
    );
  }

  stickyHeader() {
    return (
      <View style={{borderBottomLeftRadius: 30}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#55C2FF',
          }}>
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
          style={{width: '100%', marginTop: '3%', height: this.h * 0.07}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingRight: 100}}>
          {this.getCategories(true)}
        </ScrollView>
      </View>
    );
  }

  async searchRestaurants(text) {
    let restaurantResults = [];
    firebase
      .database()
      .ref(`restaurants`)
      .once('value', restaurants => {
        restaurantResults = [];
        Object.entries(restaurants.val()).map(([restId, restaurant]) => {
          if (
            restaurant.foodItems !== undefined &&
            restaurant.foodItems !== null
          ) {
            Object.values(restaurant.foodItems).map(foodItem => {
              if (
                foodItem !== undefined &&
                foodItem.title !== undefined &&
                foodItem.title.toLowerCase().includes(text.toLowerCase())
              ) {
                if (!restaurantResults.includes(restId))
                  restaurantResults.push(restId);
              }
            });
          }
        });
        console.log(restaurantResults);
        this.setState({restaurantSearchResults: restaurantResults});
      });
  }

  onDrawerClose = () => {
    this.setState({sourceOpen: false}, () => this.handleClose());
  };

  renderFilterOptions(filterMode) {
    if (filterMode === 0) {
      let filterOptions = [];
      let filters = {...this.state.filters};
      Object.entries(this.state.filters.sort).map(([sortId, sortOptions]) => {
        filterOptions.push(
          <View style={{width: '100%'}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                height:30,
              }}>
              <Text style={{color: '#525252', fontSize: 20, fontWeight: 'bold'}}>
                {sortOptions.label}
              </Text>
            </View>
            <View style={{flexDirection: 'row', width:'100%', justifyContent:'space-evenly'}}>
              {sortOptions.options.map(option => {
                return (
                  <TouchableOpacity style={{
                    paddingLeft:'2%',
                    paddingRight:'2%',
                    borderWidth:option.value === sortOptions.value?3:1,
                    borderColor:option.value === sortOptions.value?'#20a6fc':'#bfbfbf',
                    borderRadius:20,
                    backgroundColor:'#fff',
                    height:60,
                    elevation:5,
                    paddingTop:'4%',
                    paddingBottom:'4%',
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                  onPress={()=>{
                    let newFilters = {...this.state.filters}
                      if(newFilters.sort[option.optionId].value === option.value) 
                        newFilters.sort[option.optionId].value = null
                      else {
                        Object.keys(newFilters.sort).map(sortId=>{
                          newFilters.sort[sortId].value = null
                         })
                        newFilters.sort[option.optionId].value = option.value
                      }
                      this.setState({
                        filters: newFilters
                      })
                  }}
                  >
                    <MaterialCommunityIcons
                      color="#20a6fc"
                      size={35}
                      name={
                        option.value === "ASC"
                        ? "sort-ascending"
                        : "sort-descending"
                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>,
        );
      });
      return <ScrollView style={{width:'100%'}}>
        {filterOptions}
        </ScrollView>;
    }
  }

  renderFilters() {
    return (
      <View style={{width: '100%', height: screenHeight * 0.5}}>
        <View
          style={{
            width: '100%',
            height: '85%',
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f4f4f4',
          }}>
          <View
            style={{
              width: '40%',
              height: '100%',
              borderRightColor: '#f4f4f4',
              borderRightWidth: 1,
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftWidth: this.state.filterMode === 0 ? 6 : 1,
                borderLeftColor:
                  this.state.filterMode === 0 ? '#20a8fc' : '#f4f4f4',
              }}
              onPress={() => {
                this.setState({filterMode: 0});
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#999999',
                  fontWeight: 'bold',
                }}>
                Sort
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftWidth: this.state.filterMode === 1 ? 6 : 1,
                borderLeftColor:
                  this.state.filterMode === 1 ? '#20a8fc' : '#f4f4f4',
                borderTopWidth: 1,
                borderTopColor: '#f4f4f4',
                borderBottomWidth: 1,
                borderBottomColor: '#f4f4f4',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#999999',
                  fontWeight: 'bold',
                }}>
                Filter
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '60%',
              height: '100%',
              paddingTop: '3%',
              paddingLeft: '3%',
            }}>
            {this.renderFilterOptions(this.state.filterMode)}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: '15%',
            flexDirection: 'row',
            borderTopColor: '#f4f4f4',
            borderTopWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              width: '50%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeftColor: '#f4f4f4',
              borderLeftWidth: 1,
            }}>
            <Text style={{fontSize: 20, color: '#999999', fontWeight: 'bold'}}>
              Reset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeftColor: '#f4f4f4',
              backgroundColor: '#20a8fc',
              borderLeftWidth: 1,
            }}
            onPress={() => {
              let filters = {...this.state.filters};
              let noSort = true;
              let selectedSortOptions = [];
              Object.entries(filters.sort).map(([sortId, sortOptions]) => {
                if (sortOptions.value !== null) {
                  selectedSortOptions = {
                    id: sortId,
                    value: sortOptions.value,
                  };
                  noSort = false;
                }
              });
              if (!noSort) {
                if(selectedSortOptions.id === 'distance'&&this.state.location===null) {
                  this.requestGeoLocation()
                }
                let data = this.state.appData[this.state.listName];
                let restaurantList = [];
                Object.entries(data).map(([key, restaurant]) => {
                  let latlng = restaurant.latlng.split(',')
                  let location = {latitude: parseFloat(latlng[0]), longitude: parseFloat(latlng[1])}
                  restaurantList.push({
                    restaurantId: key,
                    rating: restaurant.rating,
                    price: restaurant.price,
                    distance: crowDistanceCalculator(
                        this.state.location.latitude, 
                        this.state.location.longitude, 
                        location.latitude, 
                        location.longitude, 
                        'K'
                      )
                  });
                });
                console.log('Sort options');
                    if(selectedSortOptions.value === "ASC") {
                      restaurantList.sort((a, b) => a[selectedSortOptions.id] < b[selectedSortOptions.id] ? -1 : 1);
                    }
                    else{
                      restaurantList.sort((a, b) => a[selectedSortOptions.id] > b[selectedSortOptions.id] ? -1 : 1);
                    }
                console.log(restaurantList)
                let searchResult = restaurantList.map(res => res.restaurantId)
                this.setState({list: searchResult})
                this.onDrawerClose()
                console.log(searchResult);
              }
            }}>
            <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  handleOpen = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  handleClose = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  render() {
    console.log(this.state.animation, Dimensions.get('screen').height);
    //console.log(this.state.listName, this.state.list, this.state.appData[this.state.listName])
    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgb(255,255,255)', 'rgb(85,194,255)'],
    });
    if (this.state.searchRestaurants == '')
      return (
        <View style={{width: '100%', height: '100%'}}>
          <ParallaxScrollView
            style={styles1.container}
            contentContainerStyle={{flexGrow: 1}}
            backgroundColor={'white'}
            parallaxHeaderHeight={this.h * 0.718}
            renderForeground={() => this.getForeground()}
            renderStickyHeader={() => this.stickyHeader()}
            fadeOutForeground={false}
            fadeOutBackground={false}>
            <View
              style={{
                width: '100%',
                height: this.state.preview ? this.h * 0.23 : '0%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: this.state.preview ? '100%' : '0%',
                }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.getPreview()}
                  <View style={{width: this.w * 0.09}}>
                    <Text />
                  </View>
                </ScrollView>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                top: this.h * 0.01,
                marginBottom: this.h * 0.03,
              }}>
              <OrderList
                navigation={this.props.navigation}
                list={this.state.list}
                listItems={this.state.appData[this.state.listName]}
              />
            </View>
          </ParallaxScrollView>
          <SlideUpDrawer
            animationController={this.state.animation}
            onDrawerClose={this.onDrawerClose}
            styles={styles1}
            title={'Sort/Filter'}
            popUpHeight={0.6}>
            {this.renderFilters()}
          </SlideUpDrawer>
        </View>
      );
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
          <Layout
            style={{
              flexDirection: 'row',
              width: '87%',
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
                backgroundColor: '#fff',
                borderTopColor: '#d3d3d3',
                borderTopWidth: 1,
                borderBottomColor: '#d3d3d3',
                borderBottomWidth: 1,
                borderLeftColor: '#d3d3d3',
                borderLeftWidth: 1,
              }}>
              <Icon
                name="search-outline"
                width={25}
                height={25}
                fill="#797d7f"
              />
            </Layout>
            <View
              style={{
                width: '85%',
                height: '100%',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderTopColor: '#d3d3d3',
                borderTopWidth: 1,
                borderBottomColor: '#d3d3d3',
                borderBottomWidth: 1,
                borderRightColor: '#d3d3d3',
                borderRightWidth: 1,
              }}>
              <TextInput
                style={{
                  fontSize: 18,
                  color: '#797d7f',
                  width: '100%',
                  height: '100%',
                }}
                value={this.state.searchRestaurants}
                placeholder="Search restaurants"
                placeholderTextColor={'#797d7f'}
                onChangeText={text => {
                  this.setState({searchRestaurants: text}, () => {
                    this.searchRestaurants(text);
                  });
                }}
                autoFocus={true}
              />
            </View>
          </Layout>
        </View>
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          {this.state.restaurantSearchResults.length !== 0 ? (
            <ScrollView style={{width: '100%'}}>
              <OrderList
                navigation={this.props.navigation}
                list={this.state.restaurantSearchResults}
                listItems={this.state.appData[this.state.listName]}
              />
            </ScrollView>
          ) : (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../resources/Images/noresultsfound.png')}
                style={{width: 120, height: 120, tintColor: '#55C2FF'}}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  text: {marginVertical: 16},
  locationHeader: {
    height: Dimensions.get('screen').height * 0.16,
    width: '100%',
    paddingLeft: '3%',
    flexDirection: 'row',
    marginBottom: '3%',
    paddingTop: '1%',

    backgroundColor: '#fff',
    borderBottomLeftRadius: 25,
  },
  sheet: {
    position: 'absolute',
    top: '99.9%',
    left: 0,
    right: 0,
    height: '100%',
  },
  popup: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: '100%',
    paddingTop: '5%',
  },
});
