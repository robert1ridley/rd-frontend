import React from 'react';
import { View, StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons, Entypo } from '@expo/vector-icons';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { grey, darkBlue, darkGreen, white } from './helpers/colors';

const Tabs = createBottomTabNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      tabBarLabel: 'Login',
      tabBarIcon: ({ tintColor }) => <Entypo name='login' size={30} color={tintColor} />
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      tabBarLabel: 'Sign Up',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-create' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: darkBlue,
      shadowColor: grey,
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkBlue
      },
      title: 'R and D'
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={darkBlue} barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
