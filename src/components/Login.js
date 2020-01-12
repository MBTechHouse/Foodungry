import React, { Component } from 'react';
import { Image, TouchableOpacity, ActivityIndicator, ToastAndroid, ProgressBarAndroid, Text, Dimensions } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input, Textarea } from 'native-base';
import firebase from 'firebase';

let w = Dimensions.get('screen').width;
let h = Dimensions.get('screen').height;

export default class Login extends Component {

  static navigationOptions = {
      header: null
    }

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        hasError: false,
        errorText: '',
        loggedIn: true,
        loading: false,
      };
  }

  componentDidMount() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.navigation.navigate('Orders');
        } else {
          this.setState({ loggedIn: false });
        }
      });
  }

  loadingSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator style={{ marginTop: 25 }} size="large" />;
    }
    return (
      <View>
        <View style={{alignItems: 'center', flexDirection: 'row' }}>
          <Button onPress={() => this.login()} style={{backgroundColor: '#D2F3FC', marginTop: 20, marginRight: 30, padding: 15, borderRadius: 25 }}>
            <Text style={{color: '#333'}}>  Login  </Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate('Signup')}
              style={{backgroundColor: '#fdfdfd', marginTop: 20, marginLeft: 15, padding: 15, borderRadius: 25 }}>
            <Text style={{color: '#01bff1'}}>Sign Up</Text>
          </Button>
        </View>
        <Text style={{color: '#333', marginTop: '7%', marginBottom: '2%', alignSelf: 'center' }}>Or Login With</Text>
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.googlelogin()} style={{ width: '30%' }}>
            <Image source={require('../resources/Images/google.png')} style={{ resizeMode: 'contain', height: 30, width: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.fblogin()} style={{ width: '30%' }}>
            <Image source={require('../resources/Images/fb.png')} style={{ resizeMode: 'contain', height: 30, width: 30 }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  login() {
    this.setState({ loading: true });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.setState({ loading: false, email: '', password: '' });
      this.props.navigation.navigate('Orders');
    })
     .catch(() => this.setState({hasError: true, errorText: 'Invalid Credentials !', loading: false }));
  }

  render() {
    if(!this.state.loggedIn)
    {
      return(
        <Container style={{backgroundColor: '#fdfdfd'}}>
          <View style={{ position: 'absolute', right: 0, width: w/1.4, height: 0, backgroundColor: 'transparent', borderLeftWidth: w/2, borderBottomWidth: h/2, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#D2F3FC' }} />
          <View style={{ position: 'absolute', right: 0, width: w/1.5, height: 0, backgroundColor: 'transparent', borderLeftWidth: w/2, borderBottomWidth: h, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#01bff1' }} />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <View style={{ position: 'absolute', width: '50%', height: '20%', top: '5%', left: '20%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
            <Image source={require('../resources/Images/logo.png')} style={{ resizeMode: 'cover', width: '60%', height: '50%' }} />
            <View>
              <Text style={{ fontSize: 12 }}>Welcome To</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'serif' }}> FOODUNGRY</Text>
            </View>
          </View>
          <View style={{ marginTop: h/2.5, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Item rounded style={{ borderColor: "#333" }}>
                <Icon active name='ios-person' style={{color: "#333"}}  />
                <Input placeholder='Email' style={{ color: "#333" }} onChangeText={(text) => this.setState({email: text})} placeholderTextColor="#333" />
            </Item>
            <View style={{ backgroundColor: 'transparent', height: '5%' }} />
            <Item rounded style={{ borderColor: "#333" }}>
                <Icon active name='ios-key' style={{color: "#333"}} />
                <Input placeholder='Password' style={{ color: "#333" }} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#333" />
            </Item>
            {this.state.hasError?<Text style={{color: "#c0392b", textAlign: 'center', marginTop: 10}}>{this.state.errorText}</Text>:null}
            {this.loadingSpinner()}
          </View>
          </View>
        </Container>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#01bff1' }}>
       <View style={{ position: 'absolute', left: -120, top: -50, height: 350, width: 350, borderRadius: 500, backgroundColor: '#D2F3FC'}} />
       <Image source={require('../resources/Images/logo.png')} style={styles.loadStyle} />
       <View style={{ position: 'absolute', bottom: 0, width: w/0.27, height: 0, backgroundColor: 'transparent', borderLeftWidth: w*2.5, borderBottomWidth: h/2, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#D2F3FC' }} />
       <View style={{ position: 'absolute', bottom: '15%', width:'90%', justifyContent: 'center', alignItems: 'center'}}>
         <View style={{ width: '15%', height: '2%', backgroundColor: '#888'}} />
         <Text style={{ color: '#888', fontSize: 16, padding: '5%', fontStyle: 'italic', fontFamily: 'serif', textAlign: 'center' }}>"Be the Reason someone believes in Good People"</Text>
         <View style={{ width: '15%', height: '2%', backgroundColor: '#888'}} />
       </View>
       <ProgressBarAndroid style={{ position: 'absolute', bottom: '5%', width: '100%', color: '#01bff1' }} styleAttr="Horizontal" indeterminate={true} />
      </View>
     );
  }
}

const styles = {
  loadStyle: {
    position: 'absolute',
    resizeMode: 'contain',
    top: '12%',
    left: '7%',
    width: '45%',
    height: '20%'
  }
};
