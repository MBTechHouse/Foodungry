import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, Text, Dimensions } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input } from 'native-base';
import firebase from 'firebase';

let w = Dimensions.get('screen').width;
let h = Dimensions.get('screen').height;

export default class Signup extends Component {

  static navigationOptions = {
      header: null
    }

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        phone: '',
        password: '',
        rePassword: '',
        hasError: false,
        errorText: '',
        loading: false
      };
  }

  loadingSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator style={{ marginTop: 25 }} size="large" />;
    }
    return (
      <View style={{alignItems: 'center'}}>
        <Button onPress={() => this.validate()} style={{backgroundColor: '#01bff1', marginTop: 20, padding: 15, borderRadius: 25}}>
          <Text style={{color: '#fdfdfd'}}>Sign Me Up</Text>
        </Button>
      </View>
    )
  }

  render() {

    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <View style={{ position: 'absolute', height: w/1.4, right: 0, height: 0, backgroundColor: 'transparent', borderLeftWidth: w/2, borderTopWidth: h/8, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#D2F3FC' }} />
        <View style={{ position: 'absolute', height: w/1.4, height: 0, backgroundColor: 'transparent', borderRightWidth: w, borderTopWidth: h/5.9, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#01bff1' }} />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
            <View style={{marginBottom: 35, width: '100%'}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left', width: '100%', color: '#01bff1'}}>Welcome Foodie, </Text>
              <Text style={{fontSize: 18, textAlign: 'left', width: '100%', color: '#888'}}>Let's get you started </Text>
            </View>
            <Item>
                <Icon active name='ios-mail' style={{color: '#01bff1'}} />
                <Input placeholder='Email' onChangeText={(text) => this.setState({email: text})} keyboardType="email-address" placeholderTextColor="#888" />
            </Item>
            <Item>
                <Icon active name='ios-person' style={{color: '#01bff1'}} />
                <Input placeholder='Company Name' onChangeText={(text) => this.setState({name: text})} placeholderTextColor="#888" />
            </Item>
            <Item>
                <Icon active name='ios-phone-portrait' style={{color: '#01bff1'}} />
                <Input placeholder='Mobile' onChangeText={(text) => this.setState({phone: text})} placeholderTextColor="#888" />
            </Item>
            <Item>
                <Icon active name='ios-key' style={{color: '#01bff1'}} />
                <Input placeholder='Password' onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#888" />
            </Item>
            <Item>
                <Icon active name='ios-key' style={{color: '#01bff1'}} />
                <Input placeholder='Repeat your password' onChangeText={(text) => this.setState({rePassword: text})} secureTextEntry={true} placeholderTextColor="#888" />
            </Item>
            {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
            {this.loadingSpinner()}
          </View>
        </ScrollView>
      </Container>
    );
  }

  validate() {
    if(this.state.email===""||this.state.name===""||this.state.username===""||this.state.password===""||this.state.rePassword==="") {
      this.setState({hasError: true, errorText: 'Please fill all fields !'});
      return;
    }
    if(!this.verifyEmail(this.state.email)) {
      this.setState({hasError: true, errorText: 'Please enter a valid email address !'});
      return;
    }
    if(this.state.password.length < 8) {
      this.setState({hasError: true, errorText: 'Passwords must contains at least 8 characters !'});
      return;
    }
    if(!this.verifyPhone(this.state.phone)) {
      this.setState({hasError: true, errorText: 'Mobile number must have 10 digits only !'});
      return;
    }
    if(this.state.password !== this.state.rePassword) {
      this.setState({hasError: true, errorText: 'Passwords does not match !'});
      return;
    }
    this.setState({hasError: false});
    this.signup()
  }

  verifyEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  verifyPhone(phone) {
    var reg = /^[0-9]{10}$/;
    return reg.test(phone);
  }

  signup() {
    this.setState({ loading: true });
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(
      () => {
        firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).set({
            email: this.state.email,
            name: this.state.name,
            phone: this.state.phone
          },()=>{this.props.navigation.navigate('Orders')})
    })
     .catch(() => this.setState({hasError: true, errorText: 'Invalid Credentials !', loading: false }));
  }


}
