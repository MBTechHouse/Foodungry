import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Layout, Text } from 'react-native-ui-kitten';
import {BottomNav, BottomNavigationShowcase} from './src/components/BottomNav';

const ApplicationContent = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Welcome to UI Kitten</Text>
  </Layout>
);

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <StatusBar hidden />
      <BottomNav />
    </ApplicationProvider>
  </React.Fragment>
);


export default App;
