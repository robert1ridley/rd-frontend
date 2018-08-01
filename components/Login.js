import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Form, Item, Input, Button, Text, View } from 'native-base';
import { darkBlue, darkGreen, white, red } from '../helpers/colors';
import { getWebToken, processResponse, setWebToken } from '../helpers/utils';
import { BASE_URL } from 'react-native-dotenv';

class Login extends React.Component {

  state = {
    user_name: '',
    password: '',
    userError: null,
    passwordError: null
  }

  componentDidMount(){
    const { navigation } = this.props;
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
        if(data.user_name){
          navigation.navigate(
            'HomeTabs'
          )
        }
      });
    })
    .catch(err => console.log(err));
  }

  onSubmit = () => {
    const { navigation } = this.props;
    const { user_name, password } = this.state;
    const payload = {
      user_name: user_name,
      password: password,
    }
    fetch(`${BASE_URL}/login`, { 
      headers: { 
        'content-type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then(processResponse)
    .then(res => {
      const { data } = res;
      if(data.token){
        setWebToken(data.token)
        this.setState({
          userError: null,
          passwordError: null
        })
        navigation.navigate(
          'HomeTabs'
        )
      }
      if(data.error){
        this.setState({
          userError: data.error.usernameError,
          passwordError: data.error.passwordError
        })
      }
    })
    .catch(err => {
      console.log(err)
      throw err
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Form>
          <Item style={styles.inputContainer} stackedLabel underline>
            <Input 
              placeholder="Username" 
              placeholderTextColor={white}
              style={{color: white}}
              onChangeText={(user_name) => this.setState({user_name})}
            />
          </Item>
          {
            this.state.userError &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{this.state.userError}</Text>
            </View>
          }
          <Item style={styles.inputContainer} stackedLabel underline>
            <Input
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={white}
              style={{color: white}}
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          {
            this.state.passwordError &&
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{this.state.passwordError}</Text>
            </View>
          }
        </Form>
        <Button style={styles.button} block onPress={this.onSubmit}>
          <Text>Login!</Text>
        </Button>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: darkGreen
  },
  inputContainer: {
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    margin: 20,
    backgroundColor: darkBlue
  },
  errorContainer: {
    marginLeft: 20
  },
  errorMessage: {
    color: red
  }
})

export default Login;