import React, { Component } from 'react';
import { Image, TouchableOpacity, ActivityIndicator, ToastAndroid, ProgressBarAndroid, Text, Dimensions } from 'react-native';
import { Container, View, Left, Right, Button, Icon, Item, Input, Textarea } from 'native-base';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import firebase from 'firebase';
import Quote from '../HelperComponents/Quote';

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

  login() {
    this.setState({ loading: true });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.setState({ loading: false, email: '', password: '' });
      this.props.navigation.navigate('Orders');
    })
     .catch(() => this.setState({hasError: true, errorText: 'Invalid Credentials !', loading: false }));
  }

  async googlelogin() {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
        await GoogleSignin.configure({
          scopes: ["profile", "email"],
          webCientId: '463691451730-rirvsp1ikqn8luvh6ob4b3l45t5uh01m.apps.googleusercontent.com'
        });
        const data = await GoogleSignin.signIn();
        this.setState({ loading: true });
        GoogleSignin.getTokens().then(async (res) => {
          const credential = firebase.auth.GoogleAuthProvider.credential(null, res.accessToken)
          const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
          let userDet = firebaseUserCredential.user;
          firebase.database().ref().child('users').child(userDet.uid).set({
            email: userDet.email? userDet.email: '',
            name: userDet.displayName? userDet.displayName: '',
            phone: userDet.phoneNumber? userDet.phoneNumber: '',
          });
        });
        this.setState({ loading: false });
      } catch (e) {
        if (e.code === statusCodes.SIGN_IN_CANCELLED)
          return;
        this.setState({ loading: false, hasError: true, errorText: 'Error while Logging In' });
        if (e.code === statusCodes.SIGN_IN_REQUIRED)
          return;
        console.error(e);
      }
  }

  async fblogin() {
    try {
      let fb = LoginManager;
      const test = await AccessToken.getCurrentAccessToken();
      if (!test) fb.logOut();
      const result = await fb.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        return;
      }
      this.setState({ loading: true });
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
      }
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      let userDet = firebaseUserCredential.user;
      firebase.database().ref().child('users').child(userDet.uid).set({
        email: userDet.email? userDet.email: '',
        name: userDet.displayName? userDet.displayName: '',
        phone: userDet.phoneNumber? userDet.phoneNumber: '',
      });
      this.setState({ loading: false });
    } catch (e) {
      this.setState({ loading: false, hasError: true, errorText: 'Error while Logging In' });
      console.error(e);
    }
  }

  loadingSpinner() {
    if (this.state.loading) {
      return <ActivityIndicator style={{ marginTop: 25 }} size="large" />;
    }
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{alignItems: 'center', flexDirection: 'row' }}>
          <Button onPress={() => this.login()} style={{backgroundColor: '#D2F3FC', marginTop: 0, marginRight: 30, padding: 15, borderRadius: 25 }}>
            <Text style={{color: '#333'}}>  Login  </Text>
          </Button>
          <Button onPress={() => this.props.navigation.navigate('Signup')}
              style={{backgroundColor: '#fdfdfd', marginTop: 0, marginLeft: 15, padding: 15, borderRadius: 25 }}>
            <Text style={{color: '#01bff1'}}>Sign Up</Text>
          </Button>
        </View>
        <Text style={{ fontFamily: 'serif', fontSize: 15, marginTop: '5%', marginRight: '2%', color: '#333', fontWeight: 'bold' }}>OR</Text>
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', height: '17%', marginTop: '5%' }}>
          <TouchableOpacity onPress={() => this.googlelogin()} style={{ width: '15%', height: '100%', marginRight: '7%' }}>
            <Image source={require('../resources/Images/google.png')} style={{ resizeMode: 'contain', height: '100%', width: '100%' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.fblogin()} style={{ width: '15%', height: '100%', marginRight: '7%' }}>
            <Image source={require('../resources/Images/fb.png')} style={{ resizeMode: 'contain', height: '100%', width: '100%' }} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  forgotPassword() {
    firebase.auth().sendPasswordResetEmail(this.state.email).then(
      () => ToastAndroid.show('Password Reset sent to your Email', ToastAndroid.SHORT))
      .catch(() => ToastAndroid.show('Invalid Email', ToastAndroid.SHORT));
  }

  render() {
    if(!this.state.loggedIn)
    {
      return(
        <Container style={{backgroundColor: '#fdfdfd'}}>
          <View style={{ position: 'absolute', right: 0, width: w/1.6, height: 0, backgroundColor: 'transparent', borderLeftWidth: w/2, borderBottomWidth: h, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#01bff1' }} />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
          <View style={{ position: 'absolute', width: '50%', height: '20%', top: '5%', left: '45%', justifyContent: 'center', alignItems: 'center' }} >
            <Image source={require('../resources/Images/logo.png')} style={{ resizeMode: 'cover', width: '60%', height: '50%' }} />
            <View>
              <Text style={{ fontSize: 12, marginTop: '5%', textAlign: 'center' }}>Welcome To</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'serif' }}>FOODUNGRY</Text>
            </View>
          </View>
          <View style={{ marginTop: h/2.6, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Item rounded style={{ borderColor: "#333" }}>
                <Icon active name='ios-person' style={{color: "#333"}}  />
                <Input placeholder='Email' style={{ color: "#333" }} onChangeText={(text) => this.setState({email: text})} placeholderTextColor="#333" />
            </Item>
            <View style={{ backgroundColor: 'transparent', height: '5%' }} />
            <Item rounded style={{ borderColor: "#333" }}>
                <Icon active name='ios-key' style={{color: "#333"}} />
                <Input placeholder='Password' style={{ color: "#333" }} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true} placeholderTextColor="#333" />
            </Item>
            <TouchableOpacity onPress={() => this.forgotPassword()}
              style={{ alignSelf: 'flex-start', marginLeft: '5%', marginTop: '3%',  }}
            >
            <Text style={{ fontSize: 13 }}>Forgot Password?</Text>
            </TouchableOpacity>
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
         <Quote />
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
