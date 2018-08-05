import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { darkBlue } from '../helpers/colors';

class Logout extends React.Component {
  componentDidMount() {
    const { navigation } = this.props;
    AsyncStorage.clear()
    .then(() => {
      navigation.navigate(
        'Login'
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={darkBlue} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Logout;