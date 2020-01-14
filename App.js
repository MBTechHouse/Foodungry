import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Text } from 'react-native-ui-kitten';
import {BottomNav} from './src/components/BottomNav';
import firebase from 'firebase';

class App extends React.Component {
  constructor(props) {
    super(props);
    //firebase.auth().signOut();
    if (!firebase.apps.length) {
      const config = {
        apiKey: "AIzaSyDjQ8TIeuEmGzzZRcIyaIeVbe_uVtFv72Y",
        authDomain: "foodungry-e5e61.firebaseapp.com",
        databaseURL: "https://foodungry-e5e61.firebaseio.com",
        projectId: "foodungry-e5e61",
        storageBucket: "foodungry-e5e61.appspot.com",
        messagingSenderId: "193096773571",
        appId: "1:193096773571:web:4f6eb99fd13f1fceaad776",
        measurementId: "G-BNYPGSD6NJ"
      };
      firebase.initializeApp(config);
    }
  }

  render() {
    return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <StatusBar hidden />
        <BottomNav />
      </ApplicationProvider>
    </React.Fragment>
    );
  }
}


export default App;
