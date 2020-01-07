import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text, Icon , Input } from 'react-native-ui-kitten';

export default class Search extends React.Component{
  state = {
    value: '',
    secureTextEntry: true,
  };

 
  onChangeText = (value) => {
    this.setState({ value });
  };

  onIconPress = () => {
    const secureTextEntry = !this.state.secureTextEntry;
    this.setState({ secureTextEntry });
  };

  renderIcon = (style) => {
    const iconName = this.state.secureTextEntry ? 'eye-off' : 'eye';
    return (
      <Icon {...style} name={iconName}/>
    );
  };

  render() {
    return (
      <Layout style={{marginTop:'30%', alignItems:'center'}}>
      <Input
        value={this.state.value}
        placeholder='Search for restaurants'
        onChangeText={this.onChangeText}
        style={{
          borderRadius:20,
          width:'80%',
          height:80,
           backgroundColor:'#e3f2fd'
        }}
      />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  text: { marginVertical: 16 },
});

