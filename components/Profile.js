import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BASE_URL } from 'react-native-dotenv';
import { getWebToken } from '../helpers/utils';
import { darkGreen, white } from '../helpers/colors';

class Profile extends React.Component {
  state = {
    user_name: null,
    age: null,
    created_date: null
  }
  componentDidMount() {
    getWebToken()
    .then(res => {
      const token = JSON.parse(res);
      fetch(`${BASE_URL}/userprofile`, { 
        headers: { 
          'content-type': 'application/json',
          'x-access-token': token
        },
        method: "GET"
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          user_name: data.user_name,
          age: data.age,
          created_date: data.created_date
        })
      })
    })
  }
  render() {
    const { user_name, age, created_date} = this.state;
    return (
      <View style={styles.container}>
        {
          user_name &&
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Name: {user_name}</Text>
            <Text style={styles.welcomeText}>Age: {age}</Text>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkGreen
  },

  textContainer: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  
  welcomeText: {
    color: white,
    fontSize: 20,
    marginBottom: 15
  }
})

export default Profile;